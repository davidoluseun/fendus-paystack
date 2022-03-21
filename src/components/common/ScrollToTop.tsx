import * as React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { animateScroll as scroll } from "react-scroll";
import { FaRocket } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const revealToTop = React.useCallback(() => {
    let halfHeight = document.body.clientHeight / 2;

    if (window.scrollY > halfHeight && isVisible === false) setIsVisible(true);

    if (window.scrollY < halfHeight && isVisible === true) setIsVisible(false);
  }, [isVisible]);

  React.useEffect(() => {
    window.addEventListener("scroll", revealToTop);

    return () => {
      window.removeEventListener("scroll", revealToTop);
    };
  }, [isVisible, revealToTop]);

  const handleToTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    scroll.scrollToTop({
      duration: 300,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <Box
      bg="secondary"
      opacity={isVisible ? "1" : "0"}
      visibility={isVisible ? "visible" : "hidden"}
      transition="all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out"
    >
      <IconButton
        pt="2"
        pb="1"
        w="50px"
        h="50px"
        color="#fff"
        bottom="90px"
        right="20px"
        zIndex="1000"
        position="fixed"
        border="1px solid"
        borderRadius="full"
        bg="inherit !important"
        borderColor="transparent"
        aria-label="Scroll to top"
        onClick={handleToTop}
        icon={<FaRocket style={{ transform: "rotate(315deg)" }} size="24px" />}
      />
    </Box>
  );
};

export default ScrollToTop;
