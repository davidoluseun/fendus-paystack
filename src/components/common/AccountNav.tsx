import { Flex, useColorMode } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import AccountNavLinkProps from "./AccountNavLink";

const AccountNav = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      p="4"
      direction="column"
      alignSelf="start"
      borderRadius="md"
      display={{ base: "none", lg: "flex" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
    >
      <AccountNavLinkProps text="Profile" to="/profile" LinkIcon={FaUser} />
      <AccountNavLinkProps
        text="Orders"
        to="/orders"
        LinkIcon={FaShippingFast}
      />
      <AccountNavLinkProps
        text="Wishlist"
        to="/wishlist"
        LinkIcon={MdFavorite}
      />
    </Flex>
  );
};

export default AccountNav;
