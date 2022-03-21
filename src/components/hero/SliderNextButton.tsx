import { IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CustomArrowProps } from "react-slick";

const SliderNextButton = ({ onClick }: CustomArrowProps) => {
  return (
    <IconButton
      h="60px"
      top="50%"
      right="0px"
      zIndex="1"
      minW="40px"
      color="#fff"
      onClick={onClick}
      borderRadius="0px"
      borderLeftRadius="md"
      aria-label="Next"
      position="absolute"
      fontWeight="extrabold"
      bg="rgba(218, 11, 47, .8)"
      transform="translate(0, -50%)"
      _hover={{ bg: "rgba(218, 11, 47, .8)" }}
      _active={{ bg: "rgba(218, 11, 47, .8)" }}
      icon={<MdKeyboardArrowRight size="32px" />}
    />
  );
};

export default SliderNextButton;
