import { Box, useColorMode } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const ImageLoader01 = () => {
  const { colorMode } = useColorMode();

  return (
    <Box position="absolute" top="0" bottom="0" left="0" right="0">
      <ContentLoader
        height="100%"
        width="100%"
        speed={0.9}
        backgroundColor={colorMode === "light" ? "#d9d9d9" : "#333"}
        foregroundColor={colorMode === "light" ? "#ededed" : "#999"}
        viewBox="0 0 100% 100%"
      >
        <rect rx="6" ry="6" width="100%" height="100%" />
      </ContentLoader>
    </Box>
  );
};

export default ImageLoader01;
