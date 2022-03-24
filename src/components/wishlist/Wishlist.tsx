import * as React from "react";
import {
  Box,
  Heading,
  Flex,
  Image,
  Grid,
  Button,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useAlert } from "react-alert";
import { MdFavorite } from "react-icons/md";
import { AppContext } from "../common/AppContext";
import { FiX } from "react-icons/fi";
import AccountNav from "../common/AccountNav";
import EmptyCategory from "../common/EmptyCategory";
import { saveToCarts, deleteWishlist } from "../../services/wishlistService";

const Wishlist = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { colorMode } = useColorMode();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
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

    try {
      const request = { userId: state.user?._id };

      setIsSubmitting(true);
      await saveToCarts(request as saveToCartTypes);

      setIsSubmitting(false);
      dispatch({ type: "ADD_WISHLIST_TO_CART" });

      navigate("/cart");
    } catch (ex) {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFromWishlist = async (product: WishlistTypes) => {
    const originalState = state;

    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });

    try {
      await deleteWishlist(product.productId);
    } catch (ex) {
      dispatch({ type: "KEEP_ORIGINAL_STATE", payload: originalState });
    }
  };

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        <Box>
          <Flex as="section" justify="space-between">
            <Flex align="center">
              <Icon
                as={MdFavorite}
                color="primary"
                boxSize={{ base: "20px", sm: "24px" }}
              />
              <Heading
                as="h1"
                ml={{ base: "1", sm: "2" }}
                fontSize={{ base: "18px", sm: "24px" }}
              >
                Wishlist
              </Heading>
            </Flex>

            {state.wishlist.length !== 0 && (
              <Button
                bg="primary"
                color="#fff"
                _hover={{ bg: "primary", color: "#fff" }}
                _active={{ bg: "primary", color: "#fff" }}
                fontSize={{ base: "14px", sm: "16px" }}
                isLoading={isSubmitting}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            )}
          </Flex>

          <Box mt="6">
            {state.wishlist.length === 0 ? (
              <EmptyCategory category="wishlist" isWishlist={true} />
            ) : (
              <Grid
                gridGap="6"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
              >
                {state.wishlist.map((wishProduct) => (
                  <Flex
                    key={wishProduct.productId}
                    direction="column"
                    borderRadius="md"
                    position="relative"
                    justifyContent="space-between"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                    bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                  >
                    <Flex
                      justify="flex-end"
                      position="absolute"
                      right="8px"
                      top="8px"
                      order={{ sm: 1 }}
                      mb={{ sm: "0" }}
                    >
                      <IconButton
                        borderRadius="full"
                        aria-label="Remove item from cart"
                        icon={<FiX size="24px" />}
                        data-tip="Remove"
                        data-for="remove"
                        onClick={() => handleRemoveFromWishlist(wishProduct)}
                        bg={colorMode === "light" ? "bg" : "#323334"}
                        _hover={{
                          bg: `${colorMode === "light" ? "bg" : "#323334"}`,
                        }}
                        _active={{
                          bg: `${colorMode === "light" ? "bg" : "#323334"}`,
                        }}
                      />
                      <ReactTooltip
                        id="remove"
                        effect="solid"
                        backgroundColor={
                          colorMode === "light" ? "#000" : "#fff"
                        }
                        textColor={colorMode === "light" ? "#f5f6f7" : "#000"}
                      />
                    </Flex>

                    <Image
                      borderTopRadius="md"
                      alt="Product image"
                      src={wishProduct.img.replace("upload/", "upload/w_480/")}
                    />

                    <Flex p="3" direction="column">
                      <Heading
                        as="h3"
                        mb="2"
                        noOfLines={1}
                        fontSize="inherit"
                        fontWeight="semibold"
                        textTransform="capitalize"
                      >
                        {wishProduct.title}
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
                          value={wishProduct.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix="&#8358;"
                        />
                      </Box>
                    </Flex>
                  </Flex>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Wishlist;
