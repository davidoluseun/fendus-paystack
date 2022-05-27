import { Flex, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

type NextErrorProps = {
  onTryAgain: () => void;
  text: string;
};

const NextError = ({ text, onTryAgain }: NextErrorProps) => {
  const handleClick = () => {
    toast.dismiss();
    onTryAgain();
  };

  return (
    <Flex align="center" justify="space-between">
      {text}
      <Button
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        onClick={handleClick}
      >
        Retry
      </Button>
    </Flex>
  );
};

export default NextError;
