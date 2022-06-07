import { Box, useColorMode } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const OrdersContentLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <ContentLoader
        height={460}
        width={"100%"}
        speed={0.9}
        backgroundColor={colorMode === "light" ? "#d9d9d9" : "#333"}
        foregroundColor={colorMode === "light" ? "#ededed" : "#999"}
      >
        <rect rx="6" ry="6" width={110} height={35} />
        <rect y="59" rx="6" ry="6" width={"100%"} height={40} />
        <rect y="123" rx="6" ry="6" width={"100%"} height={337} />
      </ContentLoader>
    </Box>
  );
};

export default OrdersContentLoader;
