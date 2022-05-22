import * as React from "react";
import { Box, Heading, Flex, Link, Icon, useColorMode } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAlert } from "react-alert";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProductLayout02List from "./ProductLayout02List";
import { AppContext } from "../common/AppContext";
import { saveCart, deleteCart } from "../../services/cartService";
import { getCurrentUser } from "../../services/authService";

type ProductLayout02Props = {
  products: ProductTypes[];
  title?: string;
  hasHeading?: boolean;
  hasMore?: boolean;
  path?: string;
};

const ProductLayout02 = (props: ProductLayout02Props) => {
  const { products, title, hasHeading, hasMore, path } = props;
  const { state, dispatch } = React.useContext(AppContext);

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const alert = useAlert();
  const currentUser = getCurrentUser();

  const handleIncrement = async (product: ProductTypes) => {
    if (!currentUser) {
      colorMode === "light"
        ? toast.dark("Please sign in to add a product to cart")
        : toast("Please sign in to add a product to cart");

      return null;
    }

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
    const cartProduct = state.cart.find((c) => c.productId === product._id);

    const payload = {
      productId: product._id,
      title: product.title,
      price: product.price,
      desc: product.desc,
      img: product.img,
      qty: 1,
    };

    if (!cartProduct) {
      dispatch({ type: "ADD_TO_CART", payload });

      colorMode === "light"
        ? toast.dark("Product added to cart")
        : toast("Product added to cart");

      try {
        await saveCart({ productId: payload.productId, qty: payload.qty });
      } catch (ex) {
        dispatch({
          type: "KEEP_ORIGINAL_STATE",
          payload: originalState,
        });
      }
    } else {
      dispatch({ type: "INCREMENT_ITEM", payload: cartProduct });

      try {
        if (currentUser)
          await saveCart({
            productId: cartProduct.productId,
            qty: cartProduct.qty + 1,
          });
      } catch (ex) {
        dispatch({
          type: "KEEP_ORIGINAL_STATE",
          payload: originalState,
        });
      }
    }
  };

  const handleDecrement = async (product: ProductTypes) => {
    const originalState = state;
    const cartProduct = state.cart.find((c) => c.productId === product._id);

    if (!cartProduct) return null;

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

    if (cartProduct.qty === 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: cartProduct });

      colorMode === "light"
        ? toast.dark("Product removed from cart")
        : toast("Product removed from cart");
      try {
        if (currentUser) await deleteCart(cartProduct.productId);
      } catch (ex) {
        dispatch({
          type: "KEEP_ORIGINAL_STATE",
          payload: originalState,
        });
      }
    } else {
      dispatch({ type: "DECREMENT_ITEM", payload: cartProduct });

      try {
        if (currentUser)
          await saveCart({
            productId: cartProduct.productId,
            qty: cartProduct.qty - 1,
          });
      } catch (ex) {
        dispatch({
          type: "KEEP_ORIGINAL_STATE",
          payload: originalState,
        });
      }
    }
  };

  return (
    <Box mt="6" as={hasHeading ? "section" : "div"}>
      {hasHeading && (
        <Flex align="center" px="4" py="3" justify="space-between">
          <Heading as="h1" ml="-4" fontSize="20px" textTransform="capitalize">
            {title}
          </Heading>
          {hasMore && (
            <Link
              as={RouteLink}
              to={path ? path : "/"}
              display="flex"
              fontWeight="semibold"
              _hover={{ textDecor: "none" }}
            >
              View more
              <Icon
                boxSize="20px"
                alignSelf="flex-end"
                as={MdKeyboardArrowRight}
              />
            </Link>
          )}
        </Flex>
      )}
      <ProductLayout02List
        products={products}
        cart={state.cart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </Box>
  );
};

export default ProductLayout02;
