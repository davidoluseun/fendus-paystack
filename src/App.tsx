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
          const { data: categories } = await getCategories();
          const { data: products } = await getProducts();
          const { data: user } = await getUser();
          const { data: cart } = await getCarts();
          const { data: wishlist } = await getWishlists();

          const initAppData = { categories, products, user, cart, wishlist };

          if (!didCancel)
            dispatch({
              type: "SET_INIT_APP_DATA_WITH_AUTH",
              payload: initAppData,
            });
        } else {
          
          const { data: categories } = await getCategories();
          const { data: products } = await getProducts();

          const initAppData = { categories, products };

          if (!didCancel)
            dispatch({ type: "SET_INIT_APP_DATA", payload: initAppData });
        }
      } catch (ex) {
        if (!didCancel) setError(true);
      }

      if (!didCancel) setLoading(false);
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
              text="An error occurred due to failing network. Check your internet connection and try again."
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
