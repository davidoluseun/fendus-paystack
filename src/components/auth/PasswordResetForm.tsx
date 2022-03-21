import { Box, Heading, Button } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import PasswordField from "../common/PasswordField";
import { passwordResetSchema } from "../../schemas/passwordResetSchema";

type FormDataTypes = {
  password: string;
};
type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type PasswordResetFromProps = {
  userEmail: string;
  doSubmit: (formData: FormDataTypes, formik: FormikTypes) => Promise<void>;
};

const PasswordResetForm = ({ userEmail, doSubmit }: PasswordResetFromProps) => {
  return (
    <Box>
      <Box textAlign="center" mb="4">
        <Heading as="h1" fontSize="26px">
          Reset Password
        </Heading>
      </Box>

      <Box as="p" mb="2" fontWeight="500">
        Email: <Box as="span">{userEmail}</Box>
      </Box>

      <Formik
        initialValues={{ password: "" }}
        validationSchema={passwordResetSchema}
        onSubmit={doSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <PasswordField
              name="password"
              label="New password"
              placeholder="Enter your new password"
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
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordResetForm;
