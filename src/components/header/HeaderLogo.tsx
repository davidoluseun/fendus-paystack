import { Link, Image, useColorMode } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import LightLogo from "../../images/logo-light.png";
import DarkLogo from "../../images/logo-dark.png";

const HeaderLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Link as={RouteLink} to="/" px={{ sm: "2" }} d="flex" alignItems="center">
      <Image
        w="110px"
        pl="1"
        h="32px"
        alt="Logo"
        src={colorMode === "light" ? DarkLogo : LightLogo}
      />
    </Link>
  );
};

export default HeaderLogo;
