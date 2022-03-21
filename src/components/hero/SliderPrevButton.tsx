import { IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { CustomArrowProps } from "react-slick";

const SliderPrevButton = ({ onClick }: CustomArrowProps) => {
  return (
    <IconButton
      h="60px"
      left="0"
      top="50%"
      zIndex="1"
      minW="40px"
      color="#fff"
      onClick={onClick}
      borderRadius="0"
      borderRightRadius="md"
      position="absolute"
      aria-label="Previous"
      fontWeight="extrabold"
      bg="rgba(218, 11, 47, .8)"
      transform="translate(0, -50%)"
      _hover={{ bg: "rgba(218, 11, 47, .8)" }}
      _active={{ bg: "rgba(218, 11, 47, .8)" }}
      icon={<MdKeyboardArrowLeft size="32px" />}
    />
  );
};

export default SliderPrevButton;
