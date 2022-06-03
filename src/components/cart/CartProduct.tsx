import {
  Box,
  Image,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import ReactTooltip from "react-tooltip";
import { FiX } from "react-icons/fi";
import { FiPlus, FiMinus } from "react-icons/fi";
import ImageLoader from "../common/ImageLoader01";

type CartProductProps = {
  cart: CartTypes[];
  incrementItem: (product: CartTypes) => void;
  decrementItem: (product: CartTypes) => void;
  removeItemFromCart: (product: CartTypes) => void;
};

const CartProduct = (props: CartProductProps) => {
  const { cart, incrementItem, decrementItem, removeItemFromCart } = props;
  const { colorMode } = useColorMode();

  return (
    <Box>
      {cart.map((product) => (
        <Flex
          key={product.productId}
          p="4"
          mb="6"
          as="section"
          borderRadius="md"
          position="relative"
          direction={{ base: "column", sm: "row" }}
          boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
          bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
        >
          <Flex
            zIndex="1"
            top="24px"
            right="24px"
            mb={{ sm: "0" }}
            order={{ sm: 1 }}
            justify="flex-end"
            position={{ base: "absolute", sm: "static" }}
          >
            <IconButton
              borderRadius="full"
              aria-label="Remove item from cart"
              icon={<FiX size="24px" />}
              data-tip="Remove"
              data-for="remove"
              onClick={() => removeItemFromCart(product)}
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
              backgroundColor={colorMode === "light" ? "#000" : "#fff"}
              textColor={colorMode === "light" ? "#f5f6f7" : "#000"}
            />
          </Flex>

          <Flex align="center" justify="center">
            <Box
              position="relative"
              h={{ sm: "120px" }}
              pb={{ base: "100%", sm: "0px" }}
              w={{ base: "100%", sm: "120px" }}
            >
              <Image
                borderRadius="md"
                alt="Product image"
                position="absolute"
                fallback={<ImageLoader />}
                src={product.img.replace("upload/", "upload/w_480,h_480/")}
              />
            </Box>
          </Flex>

          <Flex
            pl={{ sm: "4" }}
            flexGrow={1}
            direction="column"
            justify="space-between"
          >
            <Box mb="3" mt={{ base: "2", sm: "0" }} pr="5">
              <Heading
                as="h1"
                mb="2"
                fontSize="20px"
                textTransform="capitalize"
              >
                {product.title}
              </Heading>
              <Text noOfLines={2}>{product.desc}</Text>
            </Box>

            <Flex justify="space-between" fontSize="14px">
              <Flex>
                <CurrencyFormat
                  renderText={(value: number) => (
                    <Flex>
                      <Box mr="1">{value}</Box>
                      <Box>x {product.qty}</Box>
                    </Flex>
                  )}
                  decimalScale={2}
                  value={product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="&#8358;"
                />

                <CurrencyFormat
                  renderText={(value: number) => (
                    <Box
                      ml="1"
                      fontWeight="semibold"
                      color={colorMode === "light" ? "primary" : "#3b91f7"}
                    >
                      {value}
                    </Box>
                  )}
                  decimalScale={2}
                  value={product.price * product.qty}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="&#8358;"
                />
              </Flex>

              <Flex align="center" justify="space-between">
                <IconButton
                  minW="26px"
                  h="26px"
                  border="1px solid"
                  bg="transparent"
                  borderRadius="4px"
                  aria-label="Increase number of item by one"
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
                  onClick={() => incrementItem(product)}
                  icon={<FiPlus size="20px" />}
                />
                <Box as="span" mx="2">
                  {product.qty}
                </Box>
                <IconButton
                  minW="26px"
                  h="26px"
                  bg="transparent"
                  borderRadius="4px"
                  border="1px solid"
                  aria-label="Decrease number of item by one"
                  disabled={product.qty === 1 ? true : false}
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
                  onClick={() => decrementItem(product)}
                  icon={<FiMinus size="20px" />}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default CartProduct;
