import {
  Flex,
  Box,
  Text,
  VisuallyHidden,
  Icon,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";
import { MdFavorite } from "react-icons/md";

const SubFooter = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      py="4"
      justify="space-between"
      align="center"
      direction="column"
      fontSize={{ base: "14px", md: "16px" }}
    >
      <Box>
        <Text textAlign="center">
          Copyright 2021 Fendus - All Rights Reserved.
        </Text>
      </Box>
      <Box>
        <Box>
          Made with{" "}
          <Box as="em" verticalAlign="sub">
            <VisuallyHidden>love</VisuallyHidden>
            <Icon as={MdFavorite} boxSize="4" color="red" />
          </Box>{" "}
          by{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            textDecor="underline"
            data-tip="A. David Oluseun"
            data-for="aod"
            href="https://davidoluseun.herokuapp.com/"
          >
            aod
          </Link>
          <ReactTooltip
            id="aod"
            effect="solid"
            backgroundColor={colorMode === "light" ? "#000" : "#fff"}
            textColor={colorMode === "light" ? "light" : "#000"}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default SubFooter;
