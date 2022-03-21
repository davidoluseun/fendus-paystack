import { Box, Flex, Heading, Divider, useColorMode } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";

type OrderSummaryProps = {
  total: number | undefined;
  deliveryFee: number | undefined;
};

const OrderSummary = ({ total, deliveryFee }: OrderSummaryProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p="4"
      as="section"
      borderRadius="md"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
    >
      <Heading as="h2" mb="3" fontSize="18px" fontWeight="semibold">
        Order Summary
      </Heading>
      <Flex mb="2" justify="space-between">
        <Box>Subtotal:</Box>

        {total !== undefined && deliveryFee !== undefined && (
          <CurrencyFormat
            renderText={(value: number) => <Box>{value}</Box>}
            decimalScale={2}
            value={total - deliveryFee}
            displayType={"text"}
            thousandSeparator={true}
            prefix="&#8358;"
          />
        )}
      </Flex>
      <Flex mb="2" justify="space-between">
        <Box>Delivery:</Box>
        {deliveryFee !== undefined && (
          <CurrencyFormat
            renderText={(value: number) => <Box>{value}</Box>}
            decimalScale={2}
            value={deliveryFee}
            displayType={"text"}
            thousandSeparator={true}
            prefix="&#8358;"
          />
        )}
      </Flex>

      <Divider mb="2" />

      <Flex justify="space-between">
        <Box fontWeight="semibold">Total:</Box>
        {total && (
          <CurrencyFormat
            renderText={(value: number) => <Box>{value}</Box>}
            decimalScale={2}
            value={total}
            displayType={"text"}
            thousandSeparator={true}
            prefix="&#8358;"
          />
        )}
      </Flex>
    </Box>
  );
};

export default OrderSummary;
