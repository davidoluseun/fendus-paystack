import { Box, Heading, Text, Link, useColorMode } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

type EmptyCategoryTypes = {
  category: string;
  isWishlist?: boolean;
};

const EmptyCategory = ({ category, isWishlist }: EmptyCategoryTypes) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p="4"
      as="section"
      borderRadius="md"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
    >
      <Heading as="h1" fontSize="24px" mb="2">
        Your {category} is empty!
      </Heading>
      <Box fontSize={{ sm: "18px" }}>
        <Text>You don't have any product in your {category}.</Text>
        <Text>
          {isWishlist ? (
            <>
              Shop on our{" "}
              <Link as={RouteLink} to="/" color="link">
                homepage.
              </Link>
            </>
          ) : (
            <>
              Shop on our{" "}
              <Link as={RouteLink} to="/" color="link">
                homepage
              </Link>{" "}
              or visit your{" "}
              <Link as={RouteLink} to="/wishlist" color="link">
                wishlist.
              </Link>
            </>
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default EmptyCategory;
