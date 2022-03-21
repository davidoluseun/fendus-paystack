import * as React from "react";
import { Box, Link, Icon, Flex } from "@chakra-ui/react";
import { Link as RouteLink, useLocation } from "react-router-dom";

type SideNavLinkProps = {
  text: string;
  to: string;
  LinkIcon: React.ComponentType;
  setSideNavIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNavLink = (props: SideNavLinkProps) => {
  const { text, to, LinkIcon, setSideNavIsOpen } = props;
  const location = useLocation();

  const handleClose = () => {
    if (to !== location.pathname) setSideNavIsOpen(false);
  };

  return (
    <Link
      as={RouteLink}
      to={to}
      px="4"
      py="10px"
      mx="-4"
      display="flex"
      alignItems="center"
      onClick={handleClose}
      _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
    >
      <Flex align="center">
        <Icon as={LinkIcon} mr="3" boxSize="22px" />
        <Box as="span">{text}</Box>
      </Flex>
    </Link>
  );
};

export default SideNavLink;
