import { Flex, Text, Heading, Button, useColorMode } from "@chakra-ui/react";

type ErrorProps = {
  onTryAgain: () => void;
  text: string;
  hasNoBg?: boolean;
  isBaseError?: boolean;
};

const Error = ({ onTryAgain, text, isBaseError }: ErrorProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      p="4"
      as="section"
      borderRadius="md"
      direction="column"
      align="center"
      justify="center"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      h={isBaseError ? "100vh" : ""}
      bg={
        isBaseError
          ? "transparent"
          : colorMode === "light"
          ? "#fff"
          : "surfaceDarkBg"
      }
    >
      <Heading as="h1" fontSize={{ sm: "24px" }}>
        Something Went Wrong
      </Heading>
      <Text
        maxW="470px"
        mb="4"
        mt={{ base: "1", sm: "2" }}
        textAlign="center"
        fontSize={{ sm: "18px" }}
      >
        {text}
      </Text>
      <Button
        bg="primary"
        color="#fff"
        _hover={{ bg: "primary" }}
        _active={{ bg: "primary" }}
        onClick={onTryAgain}
      >
        Try Again
      </Button>
    </Flex>
  );
};

export default Error;
