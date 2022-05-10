import * as React from "react";
import { Box, Heading, Button, Link, useColorMode } from "@chakra-ui/react";
import { Link as RouteLink, Navigate } from "react-router-dom";
import { Formik, Form, FormikState } from "formik";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import PasswordField from "../common/PasswordField";
import { signUp } from "../../services/userService";
import { getCurrentUser } from "../../services/authService";
import { signUpSchema } from "../../schemas/signUpSchema";

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<SignUpTypes>> | undefined
  ) => void;
};

const SignUp = () => {
  const { colorMode } = useColorMode();
  const currentUser = getCurrentUser();
  const alert = useAlert();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (formData: SignUpTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    try {
      await signUp(formData);

      alert.show(
        `Hi👋 ${formData.firstName}, a verification link has been sent to your email address, follow the link to verify your email and then sign in.`
      );

      resetForm();
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400)
        colorMode === "light"
          ? toast.dark(ex.response.data)
          : toast(ex.response.data);
    }
    setSubmitting(false);
  };

  if (currentUser) return <Navigate to="/" />;

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
            Create Account
          </Heading>
          <Box as="p">Create a new account</Box>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <CustomField
                name="firstName"
                type="text"
                label="First name"
                placeholder="Enter your first name"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <CustomField
                name="lastName"
                type="text"
                label="Last name"
                placeholder="Enter your last name"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <CustomField
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <Button
                w="100%"
                my="4"
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
                Create Account
              </Button>

              <Box as="p">
                Already have an account?
                <Link
                  ml="1"
                  to="/sign-in"
                  as={RouteLink}
                  color={colorMode === "light" ? "linkLight" : "linkDark"}
                >
                  Sign in
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;
