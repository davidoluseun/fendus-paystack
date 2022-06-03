import * as React from "react";
import {
  Box,
  Heading,
  Flex,
  Image,
  Grid,
  LinkBox,
  LinkOverlay,
  IconButton,
  Link,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAlert } from "react-alert";
import CurrencyFormat from "react-currency-format";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AppContext } from "../common/AppContext";
import ImageLoader from "../common/ImageLoader02";
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
      <Grid
        mt="4"
        gridGap="6"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {products.map((product) => (
          <LinkBox
            key={product._id}
            bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
            borderRadius="md"
            boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
          >
            <Box pb="100%" position="relative">
              <Image
                alt="Product image"
                borderTopRadius="md"
                position="absolute"
                src={product.img.replace("upload/", "upload/w_480,h_480/")}
                fallback={<ImageLoader />}
              />
            </Box>

            <Flex p="3" justify="space-between">
              <Flex mr="2" direction="column" justify="space-between">
                <Heading
                  as="h3"
                  fontSize="inherit"
                  fontWeight="semibold"
                  textTransform="capitalize"
                >
                  <LinkOverlay
                    as={RouteLink}
                    to={`/products/${product.category.name}/${product._id}`}
                    noOfLines={1}
                  >
                    {product.title}
                  </LinkOverlay>
                </Heading>
                <Box>
                  <CurrencyFormat
                    renderText={(value: number) => (
                      <Box
                        fontWeight="semibold"
                        color={colorMode === "light" ? "primary" : "#fff"}
                      >
                        {value}
                      </Box>
                    )}
                    decimalScale={2}
                    value={product?.price}
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
                </Box>
              </Flex>
              <Flex direction="column" flexBasis="30px" align="flex-end">
                <IconButton
                  h="26px"
                  order={1}
                  minW="26px"
                  bg="transparent"
                  borderRadius="4px"
                  border="1px solid"
                  aria-label="Increase number of item by one"
                  color={colorMode === "light" ? "primary" : "light"}
                  borderColor={colorMode === "light" ? "primary" : "light"}
                  disabled={product.inStock ? false : true}
                  _hover={{
                    bg: `${colorMode === "light" ? "primary" : "light"}`,
                    color: `${colorMode === "light" ? "#fff" : "#000"}`,
                  }}
                  _active={{
                    bg: `${colorMode === "light" ? "primary" : "light"}`,
                    color: `${colorMode === "light" ? "#fff" : "#000"}`,
                  }}
                  icon={<FiPlus size="20px" />}
                  zIndex="2"
                  onClick={() => handleIncrement(product)}
                />
                <Flex
                  direction="column"
                  align="center"
                  visibility={
                    state.cart.find((c) => c.productId === product._id)?.qty
                      ? "visible"
                      : "hidden"
                  }
                >
                  <IconButton
                    h="26px"
                    minW="26px"
                    bg="transparent"
                    borderRadius="4px"
                    border="1px solid"
                    aria-label="Decrease number of item by one"
                    color={colorMode === "light" ? "primary" : "light"}
                    borderColor={colorMode === "light" ? "primary" : "light"}
                    _hover={{
                      bg: `${colorMode === "light" ? "primary" : "light"}`,
                      color: `${colorMode === "light" ? "#fff" : "#000"}`,
                    }}
                    _active={{
                      bg: `${colorMode === "light" ? "primary" : "light"}`,
                      color: `${colorMode === "light" ? "#fff" : "#000"}`,
                    }}
                    zIndex="2"
                    onClick={() => handleDecrement(product)}
                    icon={<FiMinus size="20px" />}
                  />
                  <Box as="span" my="1">
                    {state.cart.find((c) => c.productId === product._id)?.qty ||
                      0}
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductLayout02;
