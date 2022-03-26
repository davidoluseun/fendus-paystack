import * as React from "react";
import { Box, Grid, useColorMode } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { AppContext } from "../common/AppContext";
import DeliveryInfo from "./DeliveryInfo";
import DeliveryForm from "./DeliveryForm";
import SubHelperLinks from "../common/SubHelperLinks";
import MakePayment from "./MakePayment";
import ContentLoader from "./PaymentContentLoader";
import Error from "../common/Error";
import ErrorBoundary from "../common/ErrorBoundary";
import { getInfo, saveInfo } from "../../services/deliveryService";

const Payment = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [deliveryInfo, setDeliveryInfo] = React.useState<DeliveryTypes>(null);
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { colorMode } = useColorMode();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data } = await getInfo();

        if (!didCancel) {
          setDeliveryInfo(data);
          if (data) {
            dispatch({ type: "SET_DELIVERY_STATE", payload: data.state });
            setIsSubmitted(true);
          }
        }
      } catch (ex: unknown) {
        if (!didCancel) setError(true);
      }

      if (!didCancel) {
        setLoading(false);
        setTryAgain(false);
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [shouldTryAgain, dispatch]);

  const handleTryAgain = () => setTryAgain(true);

  const handleUpdate = () => setIsSubmitted(false);

  const handleSubmit = async (info: DeliveryTypes) => {
    try {
      const { data } = await saveInfo(info, deliveryInfo?._id);

      setDeliveryInfo(data);
      dispatch({ type: "SET_DELIVERY_STATE", payload: data.state });
      setIsSubmitted(true);

      return true;
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400)
        colorMode === "light"
          ? toast.dark(ex.response.data)
          : toast(ex.response.data);

      return false;
    }
  };

  return (
    <ErrorBoundary>
      <Box mb={{ lg: "5" }}>
        <SubHelperLinks isPayment={true} />
      </Box>

      <Grid templateColumns={{ lg: "1fr .5fr" }} gridGap="6">
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error
                text="An error occurred due to failing network. Check your internet connection and try again."
                onTryAgain={handleTryAgain}
              />
            ) : (
              <>
                {isSubmitted ? (
                  <DeliveryInfo
                    onUpdate={handleUpdate}
                    deliveryInfo={deliveryInfo}
                  />
                ) : (
                  <DeliveryForm
                    doSubmit={handleSubmit}
                    deliveryInfo={deliveryInfo}
                  />
                )}
              </>
            )}
          </>
        )}

        <MakePayment
          isSubmitted={isSubmitted}
          deliveryState={state.deliveryState}
        />
      </Grid>
    </ErrorBoundary>
  );
};

export default Payment;
