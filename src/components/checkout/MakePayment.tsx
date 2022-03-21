import * as React from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import { usePaystackPayment } from "react-paystack";
import { AppContext } from "../common/AppContext";
import Subtotal from "../common/Subtotal";
import { getCartSubtotal } from "../../utils/getCartSubtotal";
import { getDeliveryFee } from "../../utils/getDeliveryFee";

type MakePaymentProps = {
  isSubmitted: boolean;
  deliveryState: string;
};

const MakePayment = ({ isSubmitted, deliveryState }: MakePaymentProps) => {
  const { state, dispatch } = React.useContext(AppContext);
  const { cart, user } = state;

  const { colorMode } = useColorMode();

  const subTotal = getCartSubtotal(cart);
  const deliveryFee = getDeliveryFee(deliveryState, cart.length);
  const total = subTotal + deliveryFee;

  const config = {
    publicKey: `${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`,
    reference: new Date().getTime().toString(),
    email: user?.email || "",
    amount: total * 100,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    const { reference: paymentId } = reference;

    dispatch({ type: "SET_PAYMENT_ID", payload: paymentId });
  };

  return (
    <Box minW={{ lg: "300px" }}>
      <Box
        p="4"
        borderRadius="md"
        alignSelf="start"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Subtotal cart={cart} deliveryState={deliveryState} />

        <Button
          w="100%"
          mt="4"
          bg="primary"
          color="#fff"
          _hover={{ bg: "primary" }}
          _active={{ bg: "primary" }}
          disabled={
            isSubmitted && deliveryState !== "" && subTotal !== 0 ? false : true
          }
          onClick={() => initializePayment(onSuccess)}
        >
          Make Payment
        </Button>
      </Box>
    </Box>
  );
};

export default MakePayment;
