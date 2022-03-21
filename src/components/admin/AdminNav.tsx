import { Flex, useColorMode } from "@chakra-ui/react";
import { FaShippingFast, FaShoppingBag } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { CgSoftwareUpload } from "react-icons/cg";
import AdminNavLink from "./AdminNavLink";

const AdminNav = () => {
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
      <AdminNavLink
        text="Dashboard"
        to="/admin/dashboard"
        LinkIcon={RiDashboardFill}
      />
      <AdminNavLink
        text="Products"
        to="/admin/products"
        LinkIcon={FaShoppingBag}
      />
      <AdminNavLink
        text="Add Product"
        to="/admin/products/new"
        LinkIcon={CgSoftwareUpload}
      />
      <AdminNavLink
        text="Orders"
        to="/admin/orders"
        LinkIcon={FaShippingFast}
      />
    </Flex>
  );
};

export default AdminNav;
