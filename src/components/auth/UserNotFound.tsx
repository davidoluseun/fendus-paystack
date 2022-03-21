import { Flex, Heading, Text } from "@chakra-ui/react";

const UserNotFound = () => {
  return (
    <Flex h="200px" direction="column" justify="center" textAlign="center">
      <Heading as="h1" fontSize="18px">
        User not found
      </Heading>
      <Text mt="2">This acccount has been deleted</Text>
    </Flex>
  );
};

export default UserNotFound;
