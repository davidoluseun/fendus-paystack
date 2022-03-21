import { Box, Heading, Text, Button, useColorMode } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import CustomField from "../common/CustomField";
import { authMailSchema } from "../../schemas/authMailSchema";

type FormDataTypes = {
  email: string;
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};
type AuthMailProps = {
  heading: string;
  doSubmit: (formData: FormDataTypes, formik: FormikTypes) => Promise<void>;
  text: string;
};

const AuthMail = ({ doSubmit, heading, text }: AuthMailProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box as="section" px="4">
      <Box
        p="4"
        maxW="400px"
        mx="auto"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Box textAlign="center" mb="4">
          <Heading as="h1" fontSize="26px">
            {heading}
          </Heading>
          <Text mt="1">{text}</Text>
        </Box>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={authMailSchema}
          onSubmit={doSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <CustomField
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <Button
                w="100%"
                bg="primary"
                color="#fff"
                type="submit"
                fontWeight="semibold"
                border="1px solid"
                borderColor="primary"
                isLoading={isSubmitting}
                _hover={{ bg: "primary" }}
                _active={{ bg: "primary" }}
              >
                Send Link
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AuthMail;
