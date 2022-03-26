import * as React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../common/AppContext";
import { getCartSubtotal } from "../../utils/getCartSubtotal";
import { getDeliveryFee } from "../../utils/getDeliveryFee";
import Error from "../common/Error";
import { saveOrder } from "../../services/orderService";
import Spinner from "../../images/spinner.gif";

const Success = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [tryAgain, setTryAgain] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const { cart, deliveryState, paymentId } = state;

  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const subTotal = getCartSubtotal(cart);
  const deliveryFee = getDeliveryFee(deliveryState, cart.length);

  React.useEffect(() => {
    let didCancel = false;

    const SendData = async () => {
      setError(false);

      try {
        await saveOrder({ paymentId, subTotal, deliveryFee });

        if (!didCancel) {
          dispatch({ type: "EMPTY_CART" });
          dispatch({ type: "SET_PAYMENT_ID", payload: "" });
          navigate("/orders", { replace: true });
        }
      } catch (ex) {
        if (!didCancel) setError(true);
      }

      if (!didCancel) setTryAgain(false);
    };

    if (subTotal) SendData();

    return () => {
      didCancel = true;
    };
  }, [paymentId, subTotal, deliveryFee, dispatch, navigate, tryAgain]);

  const handleTryAgain = () => setTryAgain(true);

  return (
    <>
      {hasError ? (
        <Error
          onTryAgain={handleTryAgain}
          text="An error occurred due to failing network. Check your internet connection and try again."
        />
      ) : (
        <Box
          p="4"
          pt={{ base: "25px", md: "75px" }}
          minH={{ base: "250px", md: "350px" }}
          textAlign="center"
          borderRadius="md"
          bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
          backgroundImage={`url(${Spinner})`}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        >
          processing your order, please wait...
        </Box>
      )}
    </>
  );
};

export default Success;
