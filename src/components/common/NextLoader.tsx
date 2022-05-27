import { Image, Flex } from "@chakra-ui/react";
import Spinner from "../../images/spinner.gif";

const NextLoader = () => {
  return (
    <Flex justify="center">
      <Image
        src={Spinner}
        alt="Loading..."
        w={{ base: "100px", md: "200px" }}
      />
    </Flex>
  );
};

export default NextLoader;
