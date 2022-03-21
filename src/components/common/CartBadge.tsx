import { Box, Icon, Flex, Button, useColorMode } from "@chakra-ui/react";
import { IoMdCart } from "react-icons/io";

type CartBadgeProps = {
  cart: CartTypes[];
  onClick: () => void;
};

const CartBadge = ({ cart, onClick }: CartBadgeProps) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      p="2"
      d="flex"
      mr={cart.length < 100 ? "4" : "5"}
      bg="transparent"
      position="relative"
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      onClick={onClick}
    >
      <Box position="relative">
        <Icon alignSelf="flex-end" boxSize="24px" as={IoMdCart} />
        <Flex
          px="4px"
          py="0"
          h="20px"
          minW="20px"
          top="13px"
          right="-3px"
          bg="primary"
          color="#fff"
          direction="row"
          wrap="wrap"
          justify="center"
          align="center"
          fontWeight="500"
          fontSize="12px"
          lineHeight="1"
          borderRadius="10px"
          position="absolute"
          transform="scale(1) translate(50%, -50%)"
          transformOrigin="100% 0%"
          border="2px solid"
          borderColor={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
        >
          {cart.length < 100 ? cart.length : "99+"}
        </Flex>
      </Box>
    </Button>
  );
};

export default CartBadge;
