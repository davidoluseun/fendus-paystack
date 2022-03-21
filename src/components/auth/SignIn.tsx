import {
  Box,
  Flex,
  Heading,
  Button,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { Formik, Form, FormikState } from "formik";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import PasswordField from "../common/PasswordField";
import { getCurrentUser } from "../../services/authService";
import { signIn } from "../../services/authService";
import { signInSchema } from "../../schemas/signInSchema";
import defaultUser from "../../images/user.webp";

type LocationTypes = {
  from: {
    pathname: string;
  };
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<SignInTypes>> | undefined
  ) => void;
};

const SignIn = () => {
  const location = useLocation();
  const locationState = location.state as LocationTypes;

  const { colorMode } = useColorMode();
  const currentUser = getCurrentUser();
  const alert = useAlert();

  const handleSubmit = async (formData: SignInTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    try {
      await signIn(formData);

      setSubmitting(false);
      resetForm();

      window.location.href = locationState ? locationState.from.pathname : "/";
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400)
        if (ex.response.data === "Account unverified.")
          alert.show("Hi👋, please verify your email in order to sign in.");
        else
          colorMode === "light"
            ? toast.dark(ex.response.data)
            : toast(ex.response.data);

      setSubmitting(false);
    }
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <Box as="section" px="4">
      <Box
        p="4"
        mx="auto"
        maxW="400px"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Box textAlign="center" mb="4">
          <Image src={defaultUser} mx="auto" mb="2" alt="" />
          <Heading as="h1" fontSize="26px">
            Welcome Back
          </Heading>
          <Text>Login to continue</Text>
        </Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={handleSubmit}
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

              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <Flex
                mt="-2"
                justify="space-between"
                fontSize={{ base: "14px", sm: "16px" }}
              >
                <Link color="link" as={RouteLink} to="/verify">
                  Verify Email
                </Link>
                <Link color="link" as={RouteLink} to="/password/recovery">
                  Forgot Password?
                </Link>
              </Flex>

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
                Login
              </Button>

              <Text fontSize={{ base: "14px", sm: "16px" }}>
                Don't have an account?
                <Link ml="1" color="link" to="/sign-up" as={RouteLink}>
                  Create one
                </Link>
              </Text>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignIn;
