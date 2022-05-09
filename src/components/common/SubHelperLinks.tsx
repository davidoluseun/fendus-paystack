import { Flex, Link, Icon, Button, useColorMode } from "@chakra-ui/react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

type SubHelperLinksProps = {
  isCart?: boolean;
  isPayment?: boolean;
};

const SubHelperLinks = ({ isCart, isPayment }: SubHelperLinksProps) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handlePushToCheckout = () => navigate("/checkout");

  return (
    <Flex align="center" fontSize="14px" display={{ base: "none", lg: "flex" }}>
      <Link
        p="2"
        to="/cart"
        as={RouteLink}
        color={isCart ? (colorMode === "light" ? "primary" : "linkDark") : ""}
        _hover={{ textDecor: "none" }}
      >
        Cart
      </Link>
      <Icon boxSize="18px" as={MdKeyboardArrowRight} />

      <Button
        p="2"
        h="37px"
        borderRadius="0"
        fontSize="14px"
        bg="transparent"
        fontWeight="normal"
        color={
          isPayment ? (colorMode === "light" ? "primary" : "linkDark") : ""
        }
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        _disabled={{ opacity: ".7", cursor: "not-allowed" }}
        onClick={handlePushToCheckout}
      >
        Checkout
      </Button>
      <Icon boxSize="18px" as={MdKeyboardArrowRight} />
      <Link p="2" to="/orders" as={RouteLink} _hover={{ textDecor: "none" }}>
        Orders
      </Link>
    </Flex>
  );
};

export default SubHelperLinks;
