import { Box, Image, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import NotFoundImg from "../../images/404.jpg";

const NotFound = () => {
  return (
    <Box mt="-8" mb="-10" position="relative" pb="55.93%" bg="secondary">
      <Image position="absolute" top="0" left="0" src={NotFoundImg} alt="" />
      <Link
        as={RouteLink}
        to="/"
        px="4"
        h="40px"
        bg="primary"
        color="#fff"
        display="flex"
        alignItems="center"
        borderRadius="md"
        position="absolute"
        top="65%"
        left="calc(50% - 92px)"
        _hover={{ textDecor: "none" }}
      >
        Back to Homepage
      </Link>
    </Box>
  );
};

export default NotFound;
