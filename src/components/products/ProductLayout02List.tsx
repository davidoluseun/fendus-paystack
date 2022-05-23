import {
  Box,
  Heading,
  Flex,
  Image,
  Grid,
  LinkBox,
  LinkOverlay,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import { Link as RouteLink } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";

type ProductLayout02ListProps = {
  cart: CartTypes[];
  products: ProductTypes[];
  onDecrement: (product: ProductTypes) => Promise<null | undefined>;
  onIncrement: (product: ProductTypes) => Promise<null | undefined>;
};

const ProductLayout02List = (props: ProductLayout02ListProps) => {
  const { products, onDecrement, onIncrement, cart } = props;
  const { colorMode } = useColorMode();

  return (
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
          <Image
            alt="Product image"
            borderTopRadius="md"
            src={product.img.replace("upload/", "upload/w_480/")}
          />

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
                onClick={() => onIncrement(product)}
              />
              <Flex
                direction="column"
                align="center"
                visibility={
                  cart.find((c) => c.productId === product._id)?.qty
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
                  onClick={() => onDecrement(product)}
                  icon={<FiMinus size="20px" />}
                />
                <Box as="span" my="1">
                  {cart.find((c) => c.productId === product._id)?.qty || 0}
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </LinkBox>
      ))}
    </Grid>
  );
};
export default ProductLayout02List;
