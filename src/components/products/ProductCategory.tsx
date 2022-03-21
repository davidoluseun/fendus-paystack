import * as React from "react";
import { Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import ProductLayout02 from "../products/ProductLayout02";
import MainHelperLinks from "../common/MainHelperLinks";
import ContentLoader from "./ProductCategoryContentLoader";
import Error from "../common/Error";
import { getProducts } from "../../services/productService";

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
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [shouldTryAgain, setTryAgain] = React.useState(false);

  const { category: paramCategory } = useParams<ParamTypes>();
  const navigate = useNavigate();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      setTryAgain(false);

      try {
        const { data } = await getProducts(paramCategory);

        if (!didCancel) setProducts(data);
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 400)
            navigate("/not-found", { replace: true });
          else setError(true);
      }

      if (!didCancel) setLoading(false);
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [shouldTryAgain, paramCategory, navigate]);

  const handleTryAgain = () => setTryAgain(true);

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
              <MainHelperLinks links={getLinks(paramCategory)} />
              <ProductLayout02 products={products.slice(0, 4)} />
              <ProductLayout02 products={products.slice(4, 8)} />
              <ProductLayout02 products={products.slice(8, 12)} />
              <ProductLayout02 products={products.slice(12, 16)} />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductCategory;
