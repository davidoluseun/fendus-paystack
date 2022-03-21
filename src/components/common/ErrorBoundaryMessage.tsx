import { Flex, Text, Link, Heading, useColorMode } from "@chakra-ui/react";

const ErrorBoundaryMessage = () => {
  const { colorMode } = useColorMode();

  const handleRefresh = () => (window.location.href = "/checkout");

  return (
    <Flex
      p="4"
      minH="300px"
      borderRadius="md"
      direction="column"
      align="center"
      justify="center"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
    >
      <Heading as="h1" mb="2" fontSize={{ base: "18px", sm: "24px" }}>
        Something went wrong.
      </Heading>
      <Text textAlign="center" maxW="550px">
        An unexpected error occurred due to failing network, ensure you have a
        stable internet connection and{" "}
        <Link color="link" onClick={handleRefresh}>
          refresh
        </Link>{" "}
        this page
      </Text>
    </Flex>
  );
};

export default ErrorBoundaryMessage;
