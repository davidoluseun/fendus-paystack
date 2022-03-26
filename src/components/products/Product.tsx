import * as React from "react";
import { Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../common/AppContext";
import ProductLayout02 from "./ProductLayout02";
import ProductItem from "./ProductItem";
import Error from "../common/Error";
import ContentLoader from "./ProductContentLoader";
import MainHelperLinks from "../common/MainHelperLinks";
import { getProduct } from "../../services/productService";

type ParamTypes = {
  category: string;
  id: string;
};

type LinksType = {
  category: string | undefined;
  product: ProductTypes | undefined;
  id: string | undefined;
};

const getLinks = ({ category, product, id }: LinksType) => {
  return [
    { text: "Home", to: "/" },
    { text: category, to: `/products/${category}` },
    { text: product?.title, to: `/products/${category}/${id}` },
  ];
};

const Product = () => {
  const { state } = React.useContext(AppContext);
  const [product, setProduct] = React.useState<ProductTypes>();
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);

  const navigate = useNavigate();
  let { category, id } = useParams<ParamTypes>();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data } = await getProduct(id);

        if (!didCancel) setProduct(data);
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 404)
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
  }, [shouldTryAgain, id, navigate]);

  const reletedProducts = state.products.filter(
    (product) => product.category.name === category && product._id !== id
  );

  const links = getLinks({ category, product, id });

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
              {product && (
                <>
                  <MainHelperLinks links={links} />
                  <ProductItem product={product} />
                  <ProductLayout02
                    hasHeading={true}
                    title="Related Products"
                    products={reletedProducts.slice(0, 4)}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Product;
