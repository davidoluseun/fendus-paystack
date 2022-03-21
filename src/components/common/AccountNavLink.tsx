import * as React from "react";
import { Link, Icon } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

type AccountNavLinkProps = {
  text: string;
  to: string;
  LinkIcon: React.ComponentType;
};

const AccountNavLink = ({ text, to, LinkIcon }: AccountNavLinkProps) => {
  return (
    <Link
      p="2"
      as={RouteLink}
      to={to}
      display="flex"
      alignItems="center"
      _hover={{ textDecor: "none" }}
    >
      <Icon mr="3" as={LinkIcon} boxSize="20px" />
      {text}
    </Link>
  );
};

export default AccountNavLink;
