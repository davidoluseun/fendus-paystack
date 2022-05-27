import { Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

type InvalidProps = {
  heading: string;
  text: string;
  to: string;
};

const Invalid = ({ heading, text, to }: InvalidProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex h="200px" direction="column" justify="center" textAlign="center">
      <Heading
        as="h1"
        fontSize="18px"
        maxW={{ base: "245px", sm: "none" }}
        mx={{ base: "auto", sm: "0" }}
      >
        {heading}
      </Heading>
      <Text mt="2" maxW="320px" mx="auto">
        Your {text} link is invalid. Request for a valid link{" "}
        <Link
          to={to}
          as={RouteLink}
          color={colorMode === "light" ? "linkLight" : "linkDark"}
        >
          here
        </Link>
      </Text>
    </Flex>
  );
};

export default Invalid;
