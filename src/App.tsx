import * as React from "react";
import { ChakraProvider as Chakra } from "@chakra-ui/react";
import { AppContext } from "./components/common/AppContext";
import Error from "./components/common/Error";
import AppLoader from "./components/common/AppLoader";
import Fendus from "./Fendus";
import { getCurrentUser } from "./services/authService";
import { getCategories } from "./services/categoryService";
import { getProducts } from "./services/productService";
import { getCarts } from "./services/cartService";
import { getWishlists } from "./services/wishlistService";
import { getUser } from "./services/userService";
import theme from "./theme/theme";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { dispatch } = React.useContext(AppContext);
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);

  React.useEffect(() => {
    let didCancel = false;

    const currentUser = getCurrentUser();

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        if (currentUser) {
          const responses = await Promise.all([
            getCategories(),
            getProducts("pageSize=50"),
            getUser(),
            getCarts(),
            getWishlists(),
          ]);

          const categories = responses[0].data;
          const products = responses[1].data;
          const user = responses[2].data;
          const cart = responses[3].data;
          const wishlist = responses[4].data;

          const localStoragePaymentId = localStorage.getItem("paymentId");
          const paymentId = localStoragePaymentId ? localStoragePaymentId : "";

          const initAppData = {
            categories,
            products,
            user,
            cart,
            wishlist,
            paymentId,
          };

          if (!didCancel)
            dispatch({
              type: "SET_INIT_APP_DATA_WITH_AUTH",
              payload: initAppData,
            });
        } else {
          const responses = await Promise.all([getCategories(), getProducts()]);

          const categories = responses[0].data;
          const products = responses[1].data;

          const initAppData = { categories, products };

          if (!didCancel)
            dispatch({ type: "SET_INIT_APP_DATA", payload: initAppData });
        }
      } catch (ex) {
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
  }, [dispatch, shouldTryAgain]);

  const handleTryAgain = () => setTryAgain(true);

  return (
    <Chakra resetCSS={true} theme={theme}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          {hasError ? (
            <Error
              isBaseError={true}
              onTryAgain={handleTryAgain}
              text="An error occurred! This might be due to failing network. Check your internet connection and try again."
            />
          ) : (
            <Fendus />
          )}
        </>
      )}
    </Chakra>
  );
}

export default App;
