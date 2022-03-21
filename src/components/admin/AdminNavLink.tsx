import * as React from "react";
import { Link, Icon } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

type AdminNavLinkProps = {
  text: string;
  to: string;
  LinkIcon: React.ComponentType;
};

const AdminNavLink = ({ text, to, LinkIcon }: AdminNavLinkProps) => {
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

export default AdminNavLink;
