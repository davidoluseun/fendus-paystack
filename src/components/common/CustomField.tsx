import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VisuallyHidden,
  FormErrorMessage,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";

type CustomFieldProps = {
  name: string;
  label: string;
  type?: string;
  isTextarea?: boolean;
  isHidden?: boolean;
  isDisabled?: boolean;
  hasAsterisk?: boolean;
  placeholder?: string;
  errors: any;
  touched: any;
};

const CustomField = (props: CustomFieldProps) => {
  const {
    name,
    label,
    isHidden,
    type,
    isTextarea,
    isDisabled,
    placeholder,
    errors,
    touched,
    hasAsterisk,
  } = props;

  const { colorMode } = useColorMode();

  return (
    <Field name={name}>
      {({ field }: FieldAttributes<any>) => (
        <FormControl mb="4" isInvalid={!!errors[name] && touched[name]}>
          {isHidden ? (
            <VisuallyHidden>
              <FormLabel>{label}</FormLabel>
            </VisuallyHidden>
          ) : (
            <Flex>
              <FormLabel mr="2">{label}</FormLabel>
              {hasAsterisk && (
                <Box
                  as="span"
                  color={colorMode === "light" ? "errorLight" : "errorDark"}
                >
                  *
                </Box>
              )}
            </Flex>
          )}
          {!isTextarea ? (
            <Input
              {...field}
              type={type}
              boxShadow="none !important"
              disabled={isDisabled}
              _hover={{ borderColor: "none" }}
              placeholder={placeholder}
              bg={colorMode === "light" ? "#fff" : "inputDarkBg"}
              focusBorderColor={colorMode === "light" ? "#000" : "#fff"}
              borderColor={colorMode === "light" ? "darkBorder" : "#3f4142"}
              errorBorderColor={
                colorMode === "light" ? "errorLight" : "errorDark"
              }
            />
          ) : (
            <Textarea
              {...field}
              boxShadow="none !important"
              placeholder={placeholder}
              _hover={{ borderColor: "none" }}
              bg={colorMode === "light" ? "#fff" : "inputDarkBg"}
              focusBorderColor={colorMode === "light" ? "#000" : "#fff"}
              borderColor={colorMode === "light" ? "darkBorder" : "#3f4142"}
              errorBorderColor={
                colorMode === "light" ? "errorLight" : "errorDark"
              }
            />
          )}

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

export default CustomField;
