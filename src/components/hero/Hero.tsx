import { Flex, Box } from "@chakra-ui/react";
import Category from "./Category";
import HeroSlider from "./HeroSlider";
import Offers from "../offers/Offers";

const Hero = () => {
  return (
    <Box as="section">
      <Flex h={{ md: "359px" }}>
        <Category />
        <HeroSlider />
      </Flex>
      <Offers />
    </Box>
  );
};

export default Hero;
