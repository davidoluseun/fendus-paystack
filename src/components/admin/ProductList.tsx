import {
  Box,
  Grid,
  Flex,
  Heading,
  Image,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import ReactTooltip from "react-tooltip";
import { FaPenFancy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type ProductListProps = {
  products: ProductTypes[];
  onEdit: (productId: string) => void;
  onDelete: (id: string) => Promise<void>;
};

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  const { colorMode } = useColorMode();

  return (
    <Grid
      mt="6"
      gridGap="6"
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {products.map((product) => (
        <Flex
          key={product._id}
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
              aria-label="Edit product"
              icon={<FaPenFancy size="20px" />}
              data-tip="Edit"
              data-for="edit"
              onClick={() => onEdit(product._id)}
              bg={colorMode === "light" ? "bg" : "#323334"}
              _hover={{
                bg: `${colorMode === "light" ? "bg" : "#323334"}`,
              }}
              _active={{
                bg: `${colorMode === "light" ? "bg" : "#323334"}`,
              }}
            />
            <ReactTooltip
              id="edit"
              effect="solid"
              backgroundColor={colorMode === "light" ? "#000" : "#fff"}
              textColor={colorMode === "light" ? "#f5f6f7" : "#000"}
            />
          </Flex>

          <Image
            borderTopRadius="md"
            alt="Product image"
            src={product.img.replace("upload/", "upload/w_480,h_480/")}
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
              {product.title}
            </Heading>

            <Flex justify="space-between" align="center">
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
                value={product.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix="&#8358;"
              />

              <Box position="absolute" right="4px" bottom="4px">
                <IconButton
                  borderRadius="full"
                  aria-label="Delete product"
                  icon={<MdDelete size="24px" />}
                  data-tip="Delete"
                  data-for="delete"
                  onClick={() => onDelete(product._id)}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                />
                <ReactTooltip
                  id="delete"
                  effect="solid"
                  backgroundColor={colorMode === "light" ? "#000" : "#fff"}
                  textColor={colorMode === "light" ? "#f5f6f7" : "#000"}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Grid>
  );
};

export default ProductList;
