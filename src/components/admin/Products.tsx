import * as React from "react";
import {
  Box,
  Grid,
  Flex,
  Icon,
  Heading,
  Image,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import ReactTooltip from "react-tooltip";
import { useAlert } from "react-alert";
import { FaPenFancy, FaShoppingBag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from "../common/AppContext";
import AdminNav from "./AdminNav";
import Error from "../common/Error";
import ContentLoader from "./ProductsContentLoader";
import { getProducts, deleteProduct } from "../../services/productService";

const Products = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const alert = useAlert();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data: products } = await getProducts();

        if (!didCancel) dispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (ex) {
        if (!didCancel) setError(true);
      }

      if (!didCancel) {
        setLoading(false);
        setTryAgain(false);
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [shouldTryAgain, dispatch]);

  const handleTryAgain = () => setTryAgain(true);

  const handleEdit = (productId: string) =>
    navigate(`/admin/products/${productId}`);

  const handleDelete = async (id: string) => {
    alert.show("Are you sure you want to delete this product?", {
      title: "Delete Product",
      closeCopy: "No",
      actions: [
        {
          copy: "Yes",
          onClick: async () => {
            const originalProducts = state.products;

            const products = state.products.filter(
              (product) => product._id !== id
            );

            dispatch({ type: "SET_PRODUCTS", payload: products });

            try {
              await deleteProduct(id);
            } catch (ex) {
              dispatch({ type: "SET_PRODUCTS", payload: originalProducts });
            }
          },
        },
      ],
    });
  };

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AdminNav />

        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error
                onTryAgain={handleTryAgain}
                text="An error occurred due to failing network. Check your internet connection and try again."
              />
            ) : (
              <Box>
                <Flex align="center">
                  <Icon
                    as={FaShoppingBag}
                    color="primary"
                    boxSize={{ base: "20px", lg: "24px" }}
                  />
                  <Heading
                    as="h1"
                    ml={{ base: "1", sm: "2" }}
                    fontSize={{ base: "18px", sm: "24px" }}
                  >
                    Products
                  </Heading>
                </Flex>

                <Grid
                  mt="6"
                  gridGap="6"
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                >
                  {state.products.map((product) => (
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
                          onClick={() => handleEdit(product._id)}
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
                          backgroundColor={
                            colorMode === "light" ? "#000" : "#fff"
                          }
                          textColor={colorMode === "light" ? "#f5f6f7" : "#000"}
                        />
                      </Flex>

                      <Image
                        borderTopRadius="md"
                        alt="Product image"
                        src={product.img.replace(
                          "upload/",
                          "upload/w_480,h_480/"
                        )}
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
                                color={
                                  colorMode === "light" ? "primary" : "#fff"
                                }
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
                              onClick={() => handleDelete(product._id)}
                              bg="transparent"
                              _hover={{ bg: "transparent" }}
                              _active={{ bg: "transparent" }}
                            />
                            <ReactTooltip
                              id="delete"
                              effect="solid"
                              backgroundColor={
                                colorMode === "light" ? "#000" : "#fff"
                              }
                              textColor={
                                colorMode === "light" ? "#f5f6f7" : "#000"
                              }
                            />
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Products;
