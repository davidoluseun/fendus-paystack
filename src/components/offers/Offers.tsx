import { Grid } from "@chakra-ui/react";
import { FaShippingFast, FaThumbsUp } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import Offer from "./Offer";

const Offers = () => {
  return (
    <Grid
      mt="6"
      gridGap="4"
      borderRadius="md"
      display="grid"
      className="hide-scrollbar"
      overflowX={{ base: "scroll", lg: "unset" }}
      templateColumns={{ base: "repeat(4, 210px)", lg: "repeat(4, 1fr)" }}
    >
      <Offer
        title="Fast Delivery"
        text="Nationwide delivery"
        OfferIcon={FaShippingFast}
      />
      <Offer
        title="Secure Payment"
        text="100% Secure"
        OfferIcon={RiSecurePaymentFill}
      />
      <Offer
        title="Online Support"
        text="Prompt Support"
        OfferIcon={BiSupport}
      />
      <Offer
        title="Great Feedback"
        text="90% Positive"
        OfferIcon={FaThumbsUp}
      />
    </Grid>
  );
};

export default Offers;
