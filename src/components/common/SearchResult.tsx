import * as React from "react";
import { Box, Link, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type SearchResultProps = {
  queryProducts: ProductTypes[];
  clearQuery: () => void;
};

const SearchResult = ({ queryProducts, clearQuery }: SearchResultProps) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handlePushToProduct = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    queryProduct: ProductTypes
  ) => {
    e.preventDefault();

    clearQuery();
    navigate(`/products/${queryProduct.category.name}/${queryProduct._id}`);
  };

  return (
    <Box
      mt="1"
      w={{ base: "100%", sm: "400px" }}
      maxH="400px"
      overflowY="auto"
      top={{ base: "50px", lg: "42px" }}
      borderRadius="md"
      position="absolute"
      border={
        colorMode === "light"
          ? "1px solid rgba(0, 0, 0, .15)"
          : "1px solid #3f4142"
      }
      display={queryProducts.length === 0 ? "none" : "block"}
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      boxShadow="0 1px 2px rgba(0, 0, 0, .15)"
    >
      {queryProducts.map((queryProduct) => (
        <Link
          py="2"
          px="2"
          key={queryProduct._id}
          display="block"
          textTransform="capitalize"
          onClick={(e) => handlePushToProduct(e, queryProduct)}
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          {queryProduct.title}
        </Link>
      ))}
    </Box>
  );
};

export default SearchResult;
