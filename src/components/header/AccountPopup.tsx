import * as React from "react";
import {
  Flex,
  Box,
  Button,
  Link,
  Divider,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { MdFavorite, MdKeyboardArrowDown } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { AppContext } from "../common/AppContext";
import { signOut } from "../../services/authService";

const AccountPopup = () => {
  const { state } = React.useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const { colorMode } = useColorMode();

  React.useEffect(() => {
    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  const handleClose = (e: MouseEvent) => setIsOpen(false);

  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  return (
    <Box position="relative" zIndex="popover" id="account-popup">
      <Button
        p="2"
        d="flex"
        bg="transparent"
        aria-expanded={isOpen}
        textTransform="capitalize"
        aria-controls="account-popup"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        onClick={handleToggle}
        leftIcon={<FaUser size="24px" />}
      >
        {state.user?.firstName ? state.user.firstName : "Account"}

        <Icon
          ml="1"
          boxSize="22px"
          as={MdKeyboardArrowDown}
          transition="all 0.15s ease-in-out;"
          transform={isOpen ? "rotate(-180deg)" : ""}
        />
      </Button>
      <Flex
        top="100%"
        right="0"
        mt="1"
        w="200px"
        role="menu"
        id="category-list"
        position="absolute"
        direction="column"
        borderRadius="md"
        opacity={isOpen ? "1" : "0"}
        visibility={isOpen ? "visible" : "hidden"}
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
        border={
          colorMode === "light"
            ? "1px solid rgba(0, 0, 0, .15)"
            : "1px solid #3f4142"
        }
        transform={
          isOpen ? "scale(1) translateY(0)" : "scale(0.75) translateY(-21px)"
        }
        transition="all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out"
      >
        {state.user ? (
          <Link
            py="8px"
            px="6px"
            fontWeight="bold"
            textAlign="center"
            borderTopRadius="md"
            bg={colorMode === "light" ? "#f0f2f5" : "#2e2f30"}
            onClick={handleSignOut}
            _hover={{ textDecor: "none" }}
          >
            Sign out
          </Link>
        ) : (
          <>
            <Link
              as={RouteLink}
              to="/sign-in"
              py="8px"
              px="6px"
              bg="primary"
              color="#fff"
              fontWeight="bold"
              textAlign="center"
              borderTopRadius="md"
              _hover={{ textDecor: "none" }}
            >
              Sign in
            </Link>
            <Flex my="2" align="center">
              <Divider
                opacity="1"
                borderColor={
                  colorMode === "light" ? "rgba(0, 0, 0, .2)" : "#3f4142"
                }
              />
              <Box mx="2" fontSize="14px">
                OR
              </Box>
              <Divider
                opacity="1"
                borderColor={
                  colorMode === "light" ? "rgba(0, 0, 0, .2)" : "#3f4142"
                }
              />
            </Flex>
            <Link
              as={RouteLink}
              to="/sign-up"
              py="8px"
              px="6px"
              fontWeight="bold"
              textAlign="center"
              bg={colorMode === "light" ? "#f0f2f5" : "#2e2f30"}
              _hover={{ textDecor: "none" }}
            >
              Sign up
            </Link>
          </>
        )}
        <Link
          as={RouteLink}
          to="/profile"
          p="2"
          d="flex"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Icon mr="2" as={FaUser} boxSize="18px" />
          Profile
        </Link>
        <Link
          as={RouteLink}
          to="/orders"
          p="2"
          d="flex"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Icon mr="2" as={FaShippingFast} boxSize="18px" />
          Orders
        </Link>
        <Link
          as={RouteLink}
          to="/wishlist"
          p="2"
          d="flex"
          alignItems="center"
          borderBottomRadius="md"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Icon mr="2" as={MdFavorite} boxSize="18px" />
          Wishlist
        </Link>

        {state.user?.isAdmin && (
          <Link
            as={RouteLink}
            to="/admin/dashboard"
            p="2"
            d="flex"
            alignItems="center"
            borderBottomRadius="md"
            _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
          >
            <Icon mr="2" as={RiDashboardFill} boxSize="18px" />
            Dashboard
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default AccountPopup;
