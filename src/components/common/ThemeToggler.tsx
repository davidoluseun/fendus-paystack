import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      ml="-1"
      bg="transparent"
      aria-label="Toggle theme"
      onClick={toggleColorMode}
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      icon={
        colorMode === "light" ? (
          <MdBrightness7 size="24px" />
        ) : (
          <MdBrightness4 size="24px" />
        )
      }
    />
  );
};

export default ThemeToggler;
