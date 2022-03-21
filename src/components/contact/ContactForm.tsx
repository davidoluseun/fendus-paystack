import { Box, Heading, Button, Grid, useColorMode } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { useAlert } from "react-alert";
import CustomField from "../common/CustomField";
import { contactFormSchema } from "../../schemas/contactFormSchema";
import http from "../../services/httpService";

type FormDataTypes = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const ContactForm = () => {
  const alert = useAlert();
  const { colorMode } = useColorMode();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phoneNumber: "",
  };

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    try {
      const res = await http.post("/contact", formData);

      if (res.status === 200) {
        alert.show(`Hi ${formData.firstName}, thanks for getting in touch.`);
        resetForm();
      } else {
        alert.show("It seems our mail server is down, please try again.");
      }
    } catch (ex) {
      alert.show(
        "An error occured. Check your internet connection and try again."
      );
    }

    setSubmitting(false);
  };

  return (
    <Box as="section">
      <Box
        p="4"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Heading as="h1" fontSize="20px" mb="4">
          Send us a Message
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={contactFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="firstName"
                  type="text"
                  label="First name"
                  placeholder="Enter your first name"
                  isHidden={false}
                  hasAsterisk={true}
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
                  hasAsterisk={true}
                  touched={touched}
                />
              </Grid>

              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="Enter your email address"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
                <CustomField
                  type="text"
                  name="phoneNumber"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  isHidden={false}
                  errors={errors}
                  touched={touched}
                />
              </Grid>
              
              <CustomField
                name="message"
                label="Message"
                placeholder="Enter your message"
                isHidden={false}
                hasAsterisk={true}
                isTextarea={true}
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
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ContactForm;
