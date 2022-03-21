import { Image, Flex } from "@chakra-ui/react";
import Spinner from "../../images/spinner.gif";

const AppLoader = () => {
  return (
    <Flex align="center" justify="center" h="100vh">
      <Image src={Spinner} alt="Loading..." />
    </Flex>
  );
};

export default AppLoader;
