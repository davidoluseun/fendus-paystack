import { Box, useColorMode } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";

const ChartTooltip = ({ active, payload }: any) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {active && payload && payload.length && (
        <Box
          py="1"
          px="6px"
          borderRadius="sm"
          bg={colorMode === "light" ? "#000" : "#fff"}
          color={colorMode === "light" ? "#fff" : "#000"}
        >
          <Box>{payload[0].payload.month}</Box>
          <Box>Orders: {payload[0].payload.ordersCount}</Box>
          <CurrencyFormat
            renderText={(value: number) => <Box>Sales: {value}</Box>}
            decimalScale={2}
            value={payload[0].payload.sales}
            displayType={"text"}
            thousandSeparator={true}
            prefix="&#8358;"
          />
        </Box>
      )}
    </>
  );
};

export default ChartTooltip;
