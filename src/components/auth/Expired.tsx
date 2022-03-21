import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

type ExpiredProps = {
  heading: string;
  text: string;
  to: string;
};

const Expired = ({ heading, text, to }: ExpiredProps) => {
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
        Your request to {text} has expired or the link has already been used.
        Please request for a new link{" "}
        <Link color="link" as={RouteLink} to={to}>
          here
        </Link>
      </Text>
    </Flex>
  );
};

export default Expired;
