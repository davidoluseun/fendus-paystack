import * as React from "react";
import { Box, Grid, Flex, Icon, Heading, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { FaShoppingBag } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminNav from "./AdminNav";
import ProductList from "./ProductList";
import Error from "../common/Error";
import ContentLoader from "./ProductsContentLoader";
import NextLoader from "../common/NextLoader";
import NextError from "../common/NextError";
import { getProducts, deleteProduct } from "../../services/productService";
import { parseHeaders } from "../../utils/parseHeaders";

const Products = () => {
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState("");
  const [nextLoading, setNextLoading] = React.useState(false);
  const [, setNextError] = React.useState(false);

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const alert = useAlert();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data, headers } = await getProducts("page=1&pageSize=6");
        const headersLinks = parseHeaders(headers);

        if (!didCancel) {
          setProducts(data);
          setNextUrl(headersLinks.next);
        }
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
  }, [shouldTryAgain]);

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
            const originalProducts = products;

            const newProducts = products.filter(
              (product) => product._id !== id
            );

            setProducts(newProducts);

            try {
              await deleteProduct(id);
            } catch (ex) {
              setProducts(originalProducts);
            }
          },
        },
      ],
    });
  };

  const fetchNextProducts = async (nextUrl: string) => {
    setNextLoading(true);
    setNextError(false);

    try {
      const queryStr = nextUrl.slice(nextUrl.indexOf("?") + 1);
      const { data, headers } = await getProducts(queryStr);
      const headersLinks = parseHeaders(headers);

      setProducts(products.concat(data));
      setNextUrl(headersLinks.next);
    } catch (ex) {
      setNextError(true);
      colorMode === "light"
        ? toast.dark(
            <NextError
              text="Failed to load products"
              onTryAgain={handleNextTryAgain}
            />,
            { autoClose: false }
          )
        : toast(
            <NextError
              text="Failed to load products"
              onTryAgain={handleNextTryAgain}
            />,
            { autoClose: false }
          );
    }
    setNextLoading(false);
  };

  const handleFetchNextProducts = () => {
    if (nextUrl) fetchNextProducts(nextUrl);
  };

  const handleNextTryAgain = () => fetchNextProducts(nextUrl);

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

                <Box mb={nextLoading ? "-10" : 0}>
                  <InfiniteScroll
                    scrollThreshold={0.85}
                    dataLength={products.length}
                    next={handleFetchNextProducts}
                    hasMore={nextUrl ? true : false}
                    loader={nextLoading && <NextLoader />}
                  >
                    <ProductList
                      products={products}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </InfiniteScroll>
                </Box>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Products;
