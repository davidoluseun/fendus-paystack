import { Link, Icon } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const LiveChat = () => {
  return (
    <Link
      w="50px"
      h="50px"
      bottom="25px"
      right="20px"
      zIndex="1000"
      position="fixed"
      bg="#25d366"
      color="#fff"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="50px"
      target="_blank"
      rel="noopener noreferrer"
      href="https://wa.me/2349154105623"
    >
      <Icon boxSize="24px" as={FaWhatsapp} />
    </Link>
  );
};

export default LiveChat;
