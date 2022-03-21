import { Box, Divider, useColorMode } from "@chakra-ui/react";
import MainFooter from "./MainFooter";
import SubFooter from "./SubFooter";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="footer"
      mt="10"
      color="light"
      position="relative"
      bg={colorMode === "light" ? "secondary" : "surfaceDarkBg"}
    >
      <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
        <MainFooter />
        <Divider borderColor="light" />
        <SubFooter />
      </Box>
    </Box>
  );
};

export default Footer;
