import * as React from "react";
import { Box, Button, Flex, Icon, Image, useColorMode } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { RiTruckLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import {
  RiQuestionAnswerLine,
  RiDashboardLine,
  RiShoppingBagLine,
} from "react-icons/ri";
import { CgSoftwareUpload } from "react-icons/cg";
import { BiMessageRoundedDots, BiLogIn, BiLogOut } from "react-icons/bi";
import { AppContext } from "../common/AppContext";
import SideNavLink from "./SideNavLink";
import ThemeToggler from "./ThemeToggler";
import Categories from "./Categories";
import { signOut } from "../../services/authService";
import DefaultUser from "../../images/user.webp";

type SideNavProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNav = ({ isOpen, setIsOpen }: SideNavProps) => {
  const { state } = React.useContext(AppContext);

  const { colorMode } = useColorMode();

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  return (
    <Flex
      left="0"
      top="0"
      bottom="0"
      id="side-nav"
      position="fixed"
      zIndex="modal"
      overflowY="auto"
      direction="column"
      w={{ base: "80vw", sm: "280px" }}
      boxShadow="0 1px 2px rgba(0, 0, 0, 1)"
      visibility={{ base: isOpen ? "visible" : "hidden", lg: "hidden" }}
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      transform={isOpen ? "translateY(0)" : "translateX(-100%)"}
      transition="transform .2s ease"
    >
      <Flex
        px="4"
        pt="4"
        pb="10px"
        top="0"
        position="sticky"
        flexGrow={1}
        fontWeight="semibold"
        direction="column"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
        borderBottom={
          colorMode === "light" ? "1px solid #aeb6b9" : "1px solid #3f4142"
        }
      >
        <Flex justify="space-between">
          <Image
            w="75px"
            h="75px"
            borderRadius="full"
            alt="Profile"
            src={
              state.profilePhoto
                ? state.profilePhoto.replace(
                    "upload/",
                    "upload/c_thumb,g_face,w_300,h_300/"
                  )
                : DefaultUser
            }
          />
          <Box display={{ sm: "none" }}>
            <ThemeToggler />
          </Box>
        </Flex>

        <Flex mt="3">
          <Box mr="1">Hi👋</Box>
          <Box textTransform="capitalize">
            {state.user?.firstName && state.user.firstName}
          </Box>
        </Flex>
        <Box fontSize="14px">{state.user?.email && state.user.email}</Box>
      </Flex>

      <Flex
        px="4"
        direction="column"
        borderBottom={
          colorMode === "light" ? "1px solid #aeb6b9" : "1px solid #3f4142"
        }
      >
        <SideNavLink
          text="Profile"
          to="/profile"
          LinkIcon={AiOutlineUser}
          setSideNavIsOpen={setIsOpen}
        />

        <SideNavLink
          text="Orders"
          to="/orders"
          LinkIcon={RiTruckLine}
          setSideNavIsOpen={setIsOpen}
        />

        <SideNavLink
          text="Wishlist"
          to="/wishlist"
          LinkIcon={MdFavoriteBorder}
          setSideNavIsOpen={setIsOpen}
        />
      </Flex>

      {state.user?.isAdmin && (
        <Flex
          px="4"
          direction="column"
          borderBottom={
            colorMode === "light" ? "1px solid #aeb6b9" : "1px solid #3f4142"
          }
        >
          <SideNavLink
            text="Dashboard"
            to="/admin/dashboard"
            LinkIcon={RiDashboardLine}
            setSideNavIsOpen={setIsOpen}
          />

          <SideNavLink
            text="Products"
            to="/admin/products"
            LinkIcon={RiShoppingBagLine}
            setSideNavIsOpen={setIsOpen}
          />

          <SideNavLink
            text="Add Product"
            to="/admin/products/new"
            LinkIcon={CgSoftwareUpload}
            setSideNavIsOpen={setIsOpen}
          />

          <SideNavLink
            text="Orders"
            to="/admin/orders"
            LinkIcon={RiTruckLine}
            setSideNavIsOpen={setIsOpen}
          />
        </Flex>
      )}

      <Flex
        px="4"
        direction="column"
        borderBottom={
          colorMode === "light" ? "1px solid #aeb6b9" : "1px solid #3f4142"
        }
      >
        <Categories setSideNavIsOpen={setIsOpen} isSideNav={true} />
      </Flex>

      <Flex px="4" direction="column">
        <SideNavLink
          text="FAQs"
          to="/faqs"
          LinkIcon={RiQuestionAnswerLine}
          setSideNavIsOpen={setIsOpen}
        />

        <SideNavLink
          text="Contact Us"
          to="/contact"
          LinkIcon={BiMessageRoundedDots}
          setSideNavIsOpen={setIsOpen}
        />
      </Flex>

      <Flex
        px="4"
        bottom="0"
        position="sticky"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
        borderTop={
          colorMode === "light" ? "1px solid #aeb6b9" : "1px solid #3f4142"
        }
      >
        {state.user ? (
          <Button
            px="4"
            py="2"
            mx="-4"
            flexGrow={1}
            bg="transparent"
            fontWeight="normal"
            borderRadius="none"
            justifyContent="flex-start"
            onClick={handleSignOut}
            _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
          >
            <Flex align="center">
              <Icon as={BiLogOut} mr="3" boxSize="22px" />
              <Box as="span">Sign Out</Box>
            </Flex>
          </Button>
        ) : (
          <>
            <Box mr="4" flexBasis="50%" maxW="50%">
              <SideNavLink
                text="Sign In"
                to="/sign-in"
                LinkIcon={BiLogIn}
                setSideNavIsOpen={setIsOpen}
              />
            </Box>

            <Box ml="4" flexBasis="50%" maxW="50%">
              <SideNavLink
                text="Sign Up"
                to="/sign-up"
                LinkIcon={AiOutlineUserAdd}
                setSideNavIsOpen={setIsOpen}
              />
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default SideNav;
