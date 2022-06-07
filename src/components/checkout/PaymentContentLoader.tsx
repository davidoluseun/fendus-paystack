import { Box, useColorMode } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const PaymentContentLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p="4"
      borderRadius="md"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
    >
      <ContentLoader
        height={300}
        width={"100%"}
        speed={0.9}
        backgroundColor={colorMode === "light" ? "#d9d9d9" : "#333"}
        foregroundColor={colorMode === "light" ? "#ededed" : "#999"}
      >
        <rect rx="6" ry="6" width="40%" height="24" />
        <rect y="40" rx="6" ry="6" width="100%" height="260" />
      </ContentLoader>
    </Box>
  );
};

export default PaymentContentLoader;
