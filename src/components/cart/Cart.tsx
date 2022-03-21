import * as React from "react";
import { Box, Grid, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { AppContext } from "../common/AppContext";
import CartProduct from "./CartProduct";
import CartTotal from "./CartTotal";
import SubHelperLinks from "../common/SubHelperLinks";
import EmptyCategory from "../common/EmptyCategory";
import { getCurrentUser } from "../../services/authService";
import { saveCart, deleteCart, deleteCarts } from "../../services/cartService";

const Cart = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { cart, deliveryState } = state;
  const currentUser = getCurrentUser();

  const navigate = useNavigate();
  const alert = useAlert();

  const handleIncrement = async (product: CartTypes) => {
    if (state.paymentId) {
      alert.show(
        `Hi ${state.user?.firstName}, you have an unprocessed order request. You have made payment, but we are yet to process your order. This is most likely due to failing network. Click "Ok" to complete your request.`,
        {
          title: "Unprocessed Order Request",
          closeCopy: "Close",
          actions: [
            {
              copy: "Ok",
              onClick: () => {
                navigate("/checkout");
              },
            },
          ],
        }
      );
      return null;
    }

    const originalState = state;
    dispatch({ type: "INCREMENT_ITEM", payload: product });

    try {
      if (currentUser)
        await saveCart({ productId: product.productId, qty: product.qty + 1 });
    } catch (ex) {
      dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
    }
  };

  const handleDecrement = async (product: CartTypes) => {
    if (state.paymentId) {
      alert.show(
        `Hi ${state.user?.firstName}, you have an unprocessed order request. You have made payment, but we are yet to process your order. This is most likely due to failing network. Click "Ok" to complete your request.`,
        {
          title: "Unprocessed Order Request",
          closeCopy: "Close",
          actions: [
            {
              copy: "Ok",
              onClick: () => {
                navigate("/checkout");
              },
            },
          ],
        }
      );

      return null;
    }

    const originalState = state;

    dispatch({ type: "DECREMENT_ITEM", payload: product });

    try {
      if (currentUser)
        await saveCart({ productId: product.productId, qty: product.qty - 1 });
    } catch (ex) {
      dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
    }
  };

  const handleRemoveFromCart = async (product: CartTypes) => {
    if (state.paymentId) {
      alert.show(
        `Hi ${state.user?.firstName}, you have an unprocessed order request. You have made payment, but we are yet to process your order. This is most likely due to failing network. Click "Ok" to complete your request.`,
        {
          title: "Unprocessed Order Request",
          closeCopy: "Close",
          actions: [
            {
              copy: "Ok",
              onClick: () => {
                navigate("/checkout");
              },
            },
          ],
        }
      );
      return null;
    }

    const originalState = state;

    dispatch({ type: "REMOVE_FROM_CART", payload: product });

    try {
      if (currentUser) await deleteCart(product.productId);
    } catch (ex) {
      dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
    }
  };

  const handleEmptyCart = async () => {
    if (state.paymentId) {
      alert.show(
        `Hi ${state.user?.firstName}, you have an unprocessed order request. You have made payment, but we are yet to process your order. This is most likely due to failing network. Click "Ok" to complete your request.`,
        {
          title: "Unprocessed Order Request",
          closeCopy: "Close",
          actions: [
            {
              copy: "Ok",
              onClick: () => {
                navigate("/checkout");
              },
            },
          ],
        }
      );
      return null;
    }

    const originalState = state;

    dispatch({ type: "EMPTY_CART" });

    try {
      if (currentUser) await deleteCarts();
    } catch (ex) {
      dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
    }
  };

  return (
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "1fr .5fr" }} gridGap="6" alignItems="start">
        <Box>
          <Flex align="center" justify="space-between" mb={{ lg: "5" }}>
            <SubHelperLinks isCart={true} />

            {cart.length !== 0 && (
              <Button
                bg="primary"
                color="#fff"
                _hover={{ bg: "primary", color: "#fff" }}
                _active={{ bg: "primary", color: "#fff" }}
                display={{ base: "none", lg: "flex" }}
                onClick={handleEmptyCart}
              >
                Empty Cart
              </Button>
            )}
          </Flex>

          {cart.length === 0 ? (
            <EmptyCategory category="cart" />
          ) : (
            <CartProduct
              cart={cart}
              incrementItem={handleIncrement}
              decrementItem={handleDecrement}
              removeItemFromCart={handleRemoveFromCart}
            />
          )}
        </Box>
        <Box mt={{ lg: "60px" }}>
          <CartTotal cart={cart} deliveryState={deliveryState} />
        </Box>
      </Grid>
    </Box>
  );
};

export default Cart;
