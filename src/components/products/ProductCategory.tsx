import * as React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductLayout02 from "../products/ProductLayout02";
import MainHelperLinks from "../common/MainHelperLinks";
import ContentLoader from "./ProductCategoryContentLoader";
import Error from "../common/Error";
import NextLoader from "../common/NextLoader";
import NextError from "../common/NextError";
import { getProducts } from "../../services/productService";
import { parseHeaders } from "../../utils/parseHeaders";

type ParamTypes = {
  category: string;
};

const getLinks = (category: string | undefined) => {
  if (!category) return [];

  return [
    { text: "Home", to: "/" },
    { text: category, to: `/products/${category}` },
  ];
};

const ProductCategory = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setError] = React.useState(false);
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState("");
  const [nextLoading, setNextLoading] = React.useState(false);
  const [, setNextError] = React.useState(false);

  const { category } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await getProducts(`category=${category}&pageSize=8`);
        const { data, headers } = response;
        const headersLinks = parseHeaders(headers);

        if (!didCancel) {
          setProducts(data);
          setNextUrl(headersLinks.next);
        }
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 400)
            navigate("/not-found", { replace: true });
          else setError(true);
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
  }, [shouldTryAgain, category, navigate]);

  const handleTryAgain = () => setTryAgain(true);

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
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      {isLoading ? (
        <ContentLoader />
      ) : (
        <>
          {hasError ? (
            <Error
              text="An error occurred due to failing network. Check your internet connection and try again."
              onTryAgain={handleTryAgain}
            />
          ) : (
            <>
              <MainHelperLinks links={getLinks(category)} />
              <Box mb={nextLoading ? "-10" : 0}>
                <InfiniteScroll
                  scrollThreshold={0.85}
                  dataLength={products.length}
                  next={handleFetchNextProducts}
                  hasMore={nextUrl ? true : false}
                  loader={nextLoading && <NextLoader />}
                >
                  <ProductLayout02 products={products} />
                </InfiniteScroll>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductCategory;
