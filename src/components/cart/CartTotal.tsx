import { Box, Button, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Subtotal from "../common/Subtotal";

type CartTotalProps = {
  cart: CartTypes[];
  deliveryState: string;
};

const CartTotal = ({ cart, deliveryState }: CartTotalProps) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handlePushToCheckout = () => navigate("/checkout");

  return (
    <Box
      p="4"
      borderRadius="md"
      alignSelf="start"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
    >
      <Subtotal cart={cart} deliveryState={deliveryState} />

      {cart.length !== 0 && (
        <Button
          w="100%"
          bg="primary"
          color="#fff"
          border="1px solid"
          borderColor="primary"
          _hover={{ bg: "primary" }}
          _active={{ bg: "primary" }}
          onClick={handlePushToCheckout}
        >
          Proceed to Checkout
        </Button>
      )}
    </Box>
  );
};

export default CartTotal;
