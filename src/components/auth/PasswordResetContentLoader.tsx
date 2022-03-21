import { Box } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const PasswordResetContentLoader = () => {
  return (
    <Box>
      <ContentLoader
        height={200}
        width={"100%"}
        speed={0.9}
        backgroundColor={"#0F3460"}
        foregroundColor={"#999"}
      >
        <rect rx="6" ry="6" width={"100%"} height={200} />
      </ContentLoader>
    </Box>
  );
};

export default PasswordResetContentLoader;
