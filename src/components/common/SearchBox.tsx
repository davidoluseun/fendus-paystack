import * as React from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

type SearchBoxProps = {
  hasRightElement?: boolean;
  hasAutoFocus?: boolean;
  value: string;
  onChange: (query: string) => void;
};

const SearchBox = ({ hasRightElement, value, onChange }: SearchBoxProps) => {
  const { colorMode } = useColorMode();

  return (
    <InputGroup>
      <Input
        h="42px"
        name="search"
        type="search"
        borderRadius="full"
        value={value}
        focusBorderColor={colorMode === "light" ? "#000" : "#fff"}
        boxShadow="none !important"
        borderColor={colorMode === "light" ? "darkBorder" : "#3f4142"}
        autoComplete="off"
        placeholder="Search products..."
        onChange={(e) => onChange(e.currentTarget.value)}
        bg={colorMode === "light" ? "#fff" : "inputDarkBg"}
        _hover={{ borderColor: "darkBorer" }}
      />
      {hasRightElement && (
        <InputRightElement
          pointerEvents="none"
          children={<MdSearch size="24px" />}
        />
      )}
    </InputGroup>
  );
};

export default SearchBox;
