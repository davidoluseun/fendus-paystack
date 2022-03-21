import * as React from "react";
import { FormLabel, InputRightElement, FormControl } from "@chakra-ui/react";
import { VisuallyHidden, Input, InputGroup } from "@chakra-ui/react";
import { FormErrorMessage, useColorMode } from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type PasswordFieldProps = {
  name: string;
  label: string;
  type?: string;
  isTextarea?: boolean;
  isHidden?: boolean;
  placeholder?: string;
  errors: any;
  touched: any;
};

const PasswordField = (props: PasswordFieldProps) => {
  const { name, label, isHidden, placeholder, errors, touched } = props;
  const [isPassword, setIsPassword] = React.useState(true);
  const { colorMode } = useColorMode();

  const handleToggleField = () => setIsPassword(!isPassword);

  return (
    <Field name={name}>
      {({ field }: FieldAttributes<any>) => (
        <FormControl mb="4" isInvalid={!!errors[name] && touched[name]}>
          {isHidden ? (
            <VisuallyHidden>
              <FormLabel>{label}</FormLabel>
            </VisuallyHidden>
          ) : (
            <FormLabel>{label}</FormLabel>
          )}

          <InputGroup>
            <Input
              {...field}
              type={isPassword ? "password" : "text"}
              boxShadow="none !important"
              _hover={{ borderColor: "none" }}
              placeholder={placeholder}
              bg={colorMode === "light" ? "#fff" : "inputDarkBg"}
              focusBorderColor={colorMode === "light" ? "#000" : "#fff"}
              borderColor={colorMode === "light" ? "darkBorder" : "#3f4142"}
              errorBorderColor={
                colorMode === "light" ? "errorLight" : "errorDark"
              }
            />
            <InputRightElement
              cursor="pointer"
              onClick={handleToggleField}
              children={
                isPassword ? (
                  <MdVisibilityOff size="20px" />
                ) : (
                  <MdVisibility size="20px" />
                )
              }
            />
          </InputGroup>

          <FormErrorMessage
            fontSize="14px"
            color={colorMode === "light" ? "errorLight" : "errorDark"}
          >
            {errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default PasswordField;
