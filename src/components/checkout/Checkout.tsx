import * as React from "react";
import { Box } from "@chakra-ui/react";
import { AppContext } from "../common/AppContext";
import Success from "./Success";
import Payment from "./Payment";

const Checkout = () => {
  const { state } = React.useContext(AppContext);

  return (
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      {state.paymentId ? <Success /> : <Payment />}
    </Box>
  );
};

export default Checkout;
