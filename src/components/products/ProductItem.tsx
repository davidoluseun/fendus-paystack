import * as React from "react";
import {
  Box,
  Grid,
  Image,
  Heading,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import { AppContext } from "../common/AppContext";
import { saveCart } from "../../services/cartService";
import { saveWishlist } from "../../services/wishlistService";
import { getCurrentUser } from "../../services/authService";

type ProductItemProps = {
  product: ProductTypes;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const { state, dispatch } = React.useContext(AppContext);
  const [isInCart, setIsInCart] = React.useState(false);

  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const currentUser = getCurrentUser();
  const alert = useAlert();

  React.useEffect(() => {
    const cartProduct = state.cart.find((c) => c.productId === product._id);

    if (!cartProduct) setIsInCart(false);
    else setIsInCart(true);
  }, [state.cart, product._id]);

  const handlePushToCart = () => {
    navigate("/cart");
  };

  const handleAddToCart = async (product: ProductTypes) => {
    if (!currentUser) {
      colorMode === "light"
        ? toast.dark("Sign in to your account to add a product to your cart")
        : toast("Sign in to your account to add a product to your cart");

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
    const wishProduct = state.wishlist.find((c) => c.productId === product._id);

    const payload = {
      productId: product._id,
      title: product.title,
      price: product.price,
      desc: product.desc,
      img: product.img,
      qty: 1,
    };

    if (wishProduct) {
      alert.show("This item is in wishlist, do you wish to move it to cart?", {
        title: "Move to Cart",
        closeCopy: "No",
        actions: [
          {
            copy: "Yes",
            onClick: async () => {
              setIsInCart(true);
              dispatch({ type: "MOVE_FROM_WISHLIST_TO_CART", payload });
              colorMode === "light"
                ? toast.dark("Product moved to cart")
                : toast("Product moved to cart");
              try {
                await saveCart({
                  productId: payload.productId,
                  qty: payload.qty,
                });
              } catch (ex) {
                dispatch({
                  type: "KEEP_ORIGINAL_STATE",
                  payload: originalState,
                });
              }
            },
          },
        ],
      });
    } else if (!cartProduct) {
      setIsInCart(true);
      dispatch({ type: "ADD_TO_CART", payload });
      colorMode === "light"
        ? toast.dark("Product added to cart")
        : toast("Product added to cart");

      try {
        await saveCart({ productId: payload.productId, qty: payload.qty });
      } catch (ex) {
        dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
      }
    }
  };

  const handleAddToWishlist = async (product: ProductTypes) => {
    if (!currentUser) {
      colorMode === "light"
        ? toast.dark(
            "Sign in to your account to add a product to your wishlist"
          )
        : toast("Sign in to your account to add a product to your wishlist");

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
    const wishProduct = state.wishlist.find((c) => c.productId === product._id);

    const payload = {
      productId: product._id,
      title: product.title,
      price: product.price,
      desc: product.desc,
      img: product.img,
    };

    if (cartProduct) {
      alert.show("This item is in cart, do you wish to move it to wishlist?", {
        title: "Move to Wishlist",
        closeCopy: "No",
        actions: [
          {
            copy: "Yes",
            onClick: async () => {
              setIsInCart(false);
              dispatch({ type: "MOVE_FROM_CART_TO_WISHLIST", payload });
              colorMode === "light"
                ? toast.dark("Product moved to wishlist")
                : toast("Product moved to wishlist");
              try {
                await saveWishlist({ productId: payload.productId });
              } catch (ex) {
                dispatch({
                  type: "KEEP_ORIGINAL_STATE",
                  payload: originalState,
                });
              }
            },
          },
        ],
      });
    } else if (!wishProduct) {
      dispatch({ type: "ADD_TO_WISHLIST", payload });
      colorMode === "light"
        ? toast.dark("Product added to wishlist")
        : toast("Product added to wishlist");

      try {
        await saveWishlist({ productId: payload.productId });
      } catch (ex) {
        dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
      }
    } else
      colorMode === "light"
        ? toast.dark("Product already in wishlist")
        : toast("Product already in wishlist");
  };

  return (
    <Box mt="6" as="section">
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gridGap="4">
        <Flex align="center" justify="center">
          <Image
            w={{ sm: "300px" }}
            align="center"
            borderRadius="md"
            alt="Product image"
            src={product.img.replace("upload/", "upload/w_480/")}
          />
        </Flex>
        <Box>
          <Heading mb="4" fontSize="26px" textTransform="capitalize">
            {product.title}
          </Heading>

          <Text mb="4">{product.desc}</Text>

          <Flex mb="5" direction="column">
            <CurrencyFormat
              renderText={(value: number) => (
                <Box fontWeight="semibold">{value}</Box>
              )}
              decimalScale={2}
              value={product.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix="&#8358;"
            />

            <Box
              fontWeight="semibold"
              color={
                product.inStock
                  ? `${colorMode === "light" ? "green" : "#05af05"}`
                  : `${colorMode === "light" ? "#da0707" : "#ff4734"}`
              }
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </Box>
          </Flex>

          <Flex>
            {isInCart ? (
              <Button
                flexBasis="120px"
                bg="transparent"
                border="1px solid"
                color={colorMode === "light" ? "primary" : "#fff"}
                borderColor={colorMode === "light" ? "primary" : "#fff"}
                _hover={{
                  bg: "primary",
                  color: "#fff",
                  borderColor: "primary",
                }}
                _active={{
                  bg: "primary",
                  color: "#fff",
                  borderColor: "primary",
                }}
                onClick={handlePushToCart}
              >
                View Cart
              </Button>
            ) : (
              <Button
                flexBasis="120px"
                bg="transparent"
                border="1px solid"
                color={colorMode === "light" ? "primary" : "#fff"}
                borderColor={colorMode === "light" ? "primary" : "#fff"}
                disabled={product.inStock ? false : true}
                _hover={{
                  bg: "primary",
                  color: "#fff",
                  borderColor: "primary",
                }}
                _active={{
                  bg: "primary",
                  color: "#fff",
                  borderColor: "primary",
                }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            )}

            <Button
              ml="5"
              bg="primary"
              color="#fff"
              border="1px solid"
              borderColor="primary"
              disabled={product.inStock ? false : true}
              _hover={{ bg: "primary", color: "#fff" }}
              _active={{ bg: "primary", color: "#fff" }}
              onClick={() => handleAddToWishlist(product)}
            >
              Add to Wishlist
            </Button>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductItem;
