import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  VisuallyHidden,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";
import Select from "react-select";

type CustomSelectProps = {
  name: string;
  label: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  reset?: boolean;
  hasAsterisk?: boolean;
  placeholder?: string;
  errors: any;
  touched: any;
  options: {
    value: string | boolean;
    label: string;
  }[];
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    borderColor: "rgba(0, 0, 0, .3)",
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    textTransform: "capitalize",
  }),

  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    background: "rgba(0, 0, 0, .3)",
  }),

  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    color: "blue",
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "rgba(0, 0, 0, .3)",
  }),

  placeholder: (provided: any, state: any) => ({
    ...provided,
    fontSize: "1rem",
    color: "#a0aec0",
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    color: "#000",
  }),

  menu: (provided: any, state: any) => ({
    ...provided,
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, .3)",
    boxShadow: "none",
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    color: "#000",
    cursor: "pointer",
    textTransform: "capitalize",
  }),
};

const CustomSelect = (props: CustomSelectProps) => {
  const {
    name,
    label,
    isHidden,
    placeholder,
    isDisabled,
    errors,
    touched,
    hasAsterisk,
    options,
    reset,
  } = props;

  const { colorMode } = useColorMode();

  return (
    <Field name={name}>
      {({ field, form, onBlur }: FieldAttributes<any>) => (
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

          <Select
            name={name}
            options={options}
            value={
              reset
                ? null
                : options.find((option) => option.value === field.value)
            }
            className={
              !!errors[name] && touched[name]
                ? "select-container invalid"
                : "select-container"
            }
            isDisabled={isDisabled}
            classNamePrefix="inner"
            onChange={(option) => form.setFieldValue(name, option?.value)}
            onBlur={onBlur}
            styles={customStyles}
            placeholder={placeholder}
          />

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

export default CustomSelect;
