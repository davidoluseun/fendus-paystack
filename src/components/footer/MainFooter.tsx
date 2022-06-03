import {
  Grid,
  Box,
  Image,
  Link,
  Text,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  VisuallyHidden,
  FormErrorMessage,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldAttributes, FormikState } from "formik";
import { Link as RouteLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../services/authService";
import { subscribe } from "../../services/subscribeService";
import { newsletterFormSchema } from "../../schemas/newsletterFormSchema";
import LightLogo from "../../images/logo-light.png";

type FormDataTypes = {
  email: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const MainFooter = () => {
  const { colorMode } = useColorMode();

  const currentUser = getCurrentUser();

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    try {
      const firstName = currentUser ? currentUser.firstName : "";
      await subscribe({ firstName, email: formData.email });

      colorMode === "light"
        ? toast.dark("Thanks for subscribing")
        : toast("Thanks for subscribing");

      resetForm();
    } catch (ex) {}
    setSubmitting(false);
  };

  return (
    <Grid
      py="10"
      gridRowGap="30px"
      gridColumnGap="5%"
      templateColumns={{ base: "auto", md: "1.3fr 1.2fr .8fr" }}
    >
      <Box>
        <Link as={RouteLink} to="/">
          <Image src={LightLogo} alt="Logo" mb={{ base: "4", md: "6" }} />
        </Link>
        <Text>
          Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue,
          magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
          accumsan porttitor, facilisis luctus, metus.
        </Text>
        <Box mt="4">
          <Text>Got Questions? Call us 24/7</Text>
          <Link href="tel:+2348068623394">+2348068623394</Link>
        </Box>
      </Box>

      <Box flexBasis={{ base: "100%" }}>
        <Heading as="h3" fontSize="26px" mb={{ base: "4", md: "6" }}>
          Newsletter
        </Heading>
        <Box>
          Opt in to our mailing list to get updates on our latest prouducts.
        </Box>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={newsletterFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field name="email">
                {({ field }: FieldAttributes<any>) => {
                  return (
                    <FormControl
                      mt="4"
                      maxW="400px"
                      isInvalid={!!errors["email"] && touched["email"]}
                    >
                      <VisuallyHidden>
                        <FormLabel>Email address</FormLabel>
                      </VisuallyHidden>
                      <Flex>
                        <Input
                          {...field}
                          type="email"
                          border="1px solid"
                          borderRightRadius="0"
                          focusBorderColor={
                            colorMode === "light" ? "#000" : "#fff"
                          }
                          errorBorderColor="errorDark"
                          boxShadow="none !important"
                          placeholder="Enter your email address"
                          _hover={{ borderColor: "none" }}
                          bg={colorMode === "light" ? "#fff" : "inputDarkBg"}
                          borderColor={
                            colorMode === "light" ? "darkBorder" : "#3f4142"
                          }
                        />
                        <Button
                          bg="primary"
                          color="#fff"
                          type="submit"
                          border="1px solid"
                          borderColor="primary"
                          borderLeftRadius="0"
                          isLoading={isSubmitting}
                          _hover={{ bg: "primary" }}
                          _active={{ bg: "primary" }}
                        >
                          Subscribe
                        </Button>
                      </Flex>
                      <FormErrorMessage color="errorDark">
                        {errors["email"]}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
            </Form>
          )}
        </Formik>
      </Box>

      <Box fontStyle="normal" as="address" flexBasis={{ base: "100%" }}>
        <Heading
          as="h3"
          fontStyle="normal"
          fontSize="26px"
          mb={{ base: "4", md: "6" }}
        >
          Get In Touch
        </Heading>
        <Box>
          Shop D001 Ogba Multipurpose <br />
          Shopping Complex, <br />
          Ogba, Lagos.
        </Box>
        <Link
          mt="4"
          d="inline-block"
          target="_blank"
          rel="noreferrer"
          href="mailto:info@fendus.com"
        >
          info@fendus.com
        </Link>
      </Box>
    </Grid>
  );
};

export default MainFooter;
