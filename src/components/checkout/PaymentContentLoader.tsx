import { Box } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const PaymentContentLoader = () => {
  return (
    <Box
      p="4"
      bg="#fff"
      borderRadius="md"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <ContentLoader
        height={300}
        width={"100%"}
        speed={0.9}
        backgroundColor={"#0F3460"}
        foregroundColor={"#999"}
      >
        <rect rx="6" ry="6" width="40%" height="24" />
        <rect y="40" rx="6" ry="6" width="100%" height="260" />
      </ContentLoader>
    </Box>
  );
};

export default PaymentContentLoader;
