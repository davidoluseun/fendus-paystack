import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type AuthSuccessProps = {
  heading: string;
  text: string;
};

const AuthSuccess = ({ heading, text }: AuthSuccessProps) => {
  const navigate = useNavigate();

  const handlePushToSignIn = () => navigate("/sign-in");

  return (
    <Flex py="3" direction="column">
      <Box textAlign="center" mb="3">
        <Heading as="h1" fontSize="26px">
          {heading}
        </Heading>
      </Box>

      <Text mb="5">{text}</Text>

      <Button
        alignSelf="flex-end"
        color="#fff"
        bg="primary"
        border="1px solid"
        borderColor="primary"
        onClick={handlePushToSignIn}
        _hover={{ bg: "primary" }}
        _active={{ bg: "primary" }}
      >
        Continue
      </Button>
    </Flex>
  );
};

export default AuthSuccess;
