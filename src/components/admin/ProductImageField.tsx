import * as React from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";
import { FormikErrors, FormikTouched } from "formik";
import { useDropzone } from "react-dropzone";

type ProductImageFieldProps = {
  errors: FormikErrors<SaveProductTypes>;
  touched: FormikTouched<SaveProductTypes>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  fileName: string;
  onFileName: (fileName: string) => void;
};

const ProductImageField = (props: ProductImageFieldProps) => {
  const { errors, touched, setFieldValue, fileName, onFileName } = props;
  const [isInvalid, setInvalid] = React.useState(false);
  const { colorMode } = useColorMode();

  const maxSize = 819200,
    maxFiles = 1;

  const onDrop = React.useCallback(
    (acceptedFiles, fileRejections) => {
      if (acceptedFiles[0]) {
        delete errors["img"];
        setFieldValue("img", acceptedFiles[0]);
        onFileName(acceptedFiles[0].name);
      }

      if (fileRejections.length) {
        if (fileRejections.length > 1) {
          errors["img"] = "Only one file is required.";
          touched["img"] = true;
          setInvalid(true);
          onFileName("");

          return;
        }

        fileRejections[0].errors.forEach((error: any) => {
          if (error.code === "file-invalid-type") {
            errors["img"] =
              "File type is not supported. Please select a jpeg, png or webp file.";
            touched["img"] = true;
            setInvalid(true);
            onFileName("");
            return;
          }
          if (error.code === "file-too-large") {
            errors["img"] = "Image size is too big.";
            touched["img"] = true;
            setInvalid(true);
            onFileName("");
            return;
          }
        });
      }
    },
    [onFileName, setFieldValue, errors, touched]
  );

  const { getRootProps, getInputProps, open, isFocused } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/webp",
    noClick: true,
    maxSize,
    maxFiles,
  });

  return (
    <FormControl
      mb="4"
      isInvalid={
        (!!errors["img"] && isInvalid) || (!!errors["img"] && touched["img"])
      }
    >
      <Flex
        p="5"
        direction="column"
        align="center"
        bg={colorMode === "light" ? "bg" : "inputDarkBg"}
        borderRadius="md"
        border="1.9px dashed"
        borderColor={
          isFocused
            ? colorMode === "light"
              ? "#000"
              : "#fff"
            : (!!errors["img"] && isInvalid) ||
              (!!errors["img"] && touched["img"])
            ? colorMode === "light"
              ? "errorLight"
              : "errorDark"
            : colorMode === "light"
            ? "darkBorder"
            : "#3f4142"
        }
        outline="none"
        aria-label="Drag and drop area"
        transition="border .24s ease-in-out"
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <Flex direction="column">
          <Heading fontSize="16px" textAlign="center">
            Drag 'n' drop product image here
          </Heading>

          <Button
            mt="5"
            bg="primary"
            color="#fff"
            alignSelf="center"
            border="1px solid"
            borderColor="primary"
            onClick={open}
            _hover={{ bg: "primary" }}
            _active={{ bg: "primary" }}
          >
            Select file
          </Button>
        </Flex>
      </Flex>
      <FormErrorMessage
        fontSize="14px"
        color={colorMode === "light" ? "errorLight" : "errorDark"}
      >
        {errors["img"]}
      </FormErrorMessage>

      {fileName && <Box mt="2">{fileName} selected</Box>}
    </FormControl>
  );
};

export default ProductImageField;
