import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { FaUser } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import CustomField from "../common/CustomField";
import { profileFormSchema } from "../../schemas/profileFormSchema";

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<SaveUserTypes>> | undefined
  ) => void;
};

type ProfileFormProps = {
  user: UserTypes;
  doSubmit: (formData: SaveUserTypes) => Promise<boolean>;
};

const ProfileForm = ({ user, doSubmit }: ProfileFormProps) => {
  const { colorMode } = useColorMode();

  const initialValues = {
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    phone: user ? (user.phone ? user.phone : "") : "",
    dob: user ? (user.dob ? format(parseISO(user.dob), "yyyy-MM-dd") : "") : "",
  };

  const handleSubmit = async (formData: SaveUserTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    const isSubmitted = await doSubmit(formData);

    if (isSubmitted) resetForm();

    setSubmitting(false);
  };

  return (
    <Box>
      <Flex align="center" fontSize={{ base: "18px", sm: "24px" }}>
        <Icon as={FaUser} color="primary" />
        <Heading as="h1" ml={{ base: "1", sm: "2" }} fontSize="inherit">
          Profile
        </Heading>
      </Flex>

      <Box
        p="4"
        mt="6"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={profileFormSchema}
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
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="phone"
                  type="text"
                  label="Phone number"
                  placeholder="Select your phone number"
                  isHidden={false}
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="dob"
                  type="date"
                  label="Date of birth"
                  placeholder="Enter your dob"
                  isHidden={false}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Button
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
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ProfileForm;
