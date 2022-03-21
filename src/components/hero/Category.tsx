import { Flex, useColorMode } from "@chakra-ui/react";
import Categories from "../common/Categories";

const Category = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      p="4"
      mr="6"
      w="230px"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      flexShrink={0}
      borderRadius="md"
      direction="column"
      display={{ base: "none", lg: "flex" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Categories />
    </Flex>
  );
};

export default Category;
