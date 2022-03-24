import {
  Box,
  Heading,
  Flex,
  Link,
  Image,
  Icon,
  Grid,
  LinkBox,
  LinkOverlay,
  useColorMode,
} from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import { Link as RouteLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

type ProductLayout01Props = {
  products: ProductTypes[];
  title?: string;
  hasHeading?: boolean;
  hasMore?: boolean;
  path?: string;
};

const ProductLayout01 = (props: ProductLayout01Props) => {
  const { products, title, hasHeading, hasMore, path } = props;

  const { colorMode } = useColorMode();

  return (
    <Box mt="6" as={hasHeading ? "section" : "div"} borderRadius="md">
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
        p="3"
        gridGap="5"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
      >
        {products.map((product) => (
          <LinkBox
            key={product._id}
            borderRadius="md"
            justifyContent="space-between"
          >
            <Image
              alt="Product image"
              borderRadius="md"
              src={product.img.replace("upload/", "upload/w_480/")}
            />

            <Heading
              as="h3"
              mt="2"
              mb="1"
              noOfLines={1}
              fontSize="inherit"
              fontWeight="semibold"
              textTransform="capitalize"
              maxW={{ base: "90px", sm: "initial", lg: "100px", xl: "initial" }}
            >
              <LinkOverlay
                as={RouteLink}
                to={`/products/${product.category.name}/${product._id}`}
              >
                {product.title}
              </LinkOverlay>
            </Heading>

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
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductLayout01;
