import * as React from "react";
import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { MdSearch, MdArrowBack } from "react-icons/md";
import _ from "lodash";
import { AppContext } from "../common/AppContext";
import AccountPopup from "./AccountPopup";
import SearchBox from "../common/SearchBox";
import SearchResult from "../common/SearchResult";
import SideNav from "../common/SideNav";
import HelpPopup from "./HelpPopup";
import HeaderLogo from "./HeaderLogo";
import ThemeToggler from "../common/ThemeToggler";
import CartBadge from "../common/CartBadge";

const Header = () => {
  const { state } = React.useContext(AppContext);
  const [sideNavIsOpen, setSideNavIsOpen] = React.useState(false);
  const [searchIsOpen, setSearchIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let queryProducts: ProductTypes[] = [];

  if (searchQuery) {
    queryProducts = state.products.filter((p) =>
      _.includes(p.title.toLowerCase(), searchQuery.toLowerCase())
    );
  }

  const handlePushToProduct = () => navigate("/cart");

  const handleOpenSideNav = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setSideNavIsOpen(true);
  };

  const handleGoBack = () => navigate(-1);

  const handleToggleSearch = (e: React.SyntheticEvent) =>
    setSearchIsOpen(!searchIsOpen);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleClearSearch = () => setSearchQuery("");

  return (
    <Box
      mb="8"
      top="0"
      as="header"
      zIndex="sticky"
      position="sticky"
      py={{ base: "10px", lg: "3" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      borderBottom={colorMode === "dark" ? "1px solid #3f4142" : ""}
    >
      <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
        <Flex flexWrap="wrap" justify="space-between">
          <Flex mr={{ lg: "10" }}>
            {pathname === "/" ? (
              <IconButton
                ml="-2"
                bg="transparent"
                h={{ base: "36px", sm: "40px" }}
                minW={{ base: "36px", sm: "40px" }}
                display={{ base: "flex", lg: "none" }}
                aria-label="Open navigation"
                aria-controls="side-nav"
                aria-expanded={sideNavIsOpen}
                icon={<CgMenu size="24px" />}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                onClick={handleOpenSideNav}
              />
            ) : (
              <IconButton
                ml="-2"
                bg="transparent"
                h={{ base: "36px", sm: "40px" }}
                minW={{ base: "36px", sm: "40px" }}
                display={{ base: "flex", lg: "none" }}
                aria-label="Go back"
                icon={<MdArrowBack size="24px" />}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                onClick={handleGoBack}
              />
            )}

            <Box
              top="0"
              left="0"
              right="0"
              bottom="0"
              position="fixed"
              zIndex="modal"
              role="presentation"
              onClick={() => setSideNavIsOpen(false)}
              visibility={{
                base: sideNavIsOpen ? "visible" : "hidden",
                lg: "hidden",
              }}
              bg="rgba(0, 0, 0, .6)"
            ></Box>

            <SideNav isOpen={sideNavIsOpen} setIsOpen={setSideNavIsOpen} />
            <HeaderLogo />
          </Flex>

          <Flex
            px="2"
            flexGrow={1}
            position="relative"
            display={{ base: "none", lg: "flex" }}
          >
            <SearchBox
              value={searchQuery}
              onChange={handleSearch}
              hasRightElement={true}
            />
            <SearchResult
              clearQuery={handleClearSearch}
              queryProducts={queryProducts}
            />
          </Flex>

          <Flex px={{ md: "2" }}>
            <Flex display={{ base: "none", lg: "flex" }}>
              <AccountPopup />
              <HelpPopup />
            </Flex>
            <IconButton
              mr="-1"
              bg="transparent"
              display={{ base: "flex", lg: "none" }}
              aria-label="Toggle search"
              aria-controls="search"
              aria-expanded={searchIsOpen}
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              icon={
                searchIsOpen ? <FiX size="24px" /> : <MdSearch size="24px" />
              }
              onClick={handleToggleSearch}
            />
            <CartBadge cart={state.cart} onClick={handlePushToProduct} />
            <Box display={{ base: "none", sm: "block" }}>
              <ThemeToggler />
            </Box>
          </Flex>

          <Flex
            pt="2"
            flexBasis="100%"
            id="search"
            position="relative"
            display={{
              base: searchIsOpen ? "flex" : "none",
              lg: "none",
            }}
          >
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <SearchResult
              clearQuery={handleClearSearch}
              queryProducts={queryProducts}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
