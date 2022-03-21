import * as React from "react";
import { Flex, Box, Heading, Divider } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import { getCartSubtotal } from "../../utils/getCartSubtotal";
import { getDeliveryFee } from "../../utils/getDeliveryFee";

type SubtotalProps = {
  cart: CartTypes[];
  deliveryState: string;
};

const Subtotal = ({ cart, deliveryState }: SubtotalProps) => {
  const subTotal = getCartSubtotal(cart);
  const deliveryFee = getDeliveryFee(deliveryState, cart.length);

  return (
    <Box>
      <Heading as="h2" mb="3" fontSize="18px" fontWeight="semibold">
        Total Summary
      </Heading>

      <Flex mb="2" justify="space-between">
        <Box>Subtotal:</Box>
        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={subTotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Flex mb="2" justify="space-between">
        <Box>Delivery:</Box>

        <CurrencyFormat
          renderText={(value: number) => (
            <Box>{deliveryState !== "" ? <>{value}</> : "--"}</Box>
          )}
          decimalScale={2}
          value={deliveryFee}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Divider mb="2" />

      <Flex mb="2" justify="space-between">
        <Box fontWeight="semibold">Total:</Box>

        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={subTotal + deliveryFee}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Divider mb="2" />
    </Box>
  );
};

export default Subtotal;
