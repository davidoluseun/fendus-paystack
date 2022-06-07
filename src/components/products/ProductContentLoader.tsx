import { Box, useColorMode } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const ProductContentLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <ContentLoader
        height={600}
        width={"100%"}
        speed={0.9}
        backgroundColor={colorMode === "light" ? "#d9d9d9" : "#333"}
        foregroundColor={colorMode === "light" ? "#ededed" : "#999"}
      >
        <rect rx="6" ry="6" width={"100%"} height={300} />
        <rect y="324" rx="6" ry="6" width={200} height={35} />
        <rect y="382" rx="6" ry="6" width={"100%"} height={218} />
      </ContentLoader>
    </Box>
  );
};

export default ProductContentLoader;
