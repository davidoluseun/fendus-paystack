import * as React from "react";
import { useColorMode } from "@chakra-ui/react";
import { FormikState } from "formik";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import AuthMail from "./AuthMail";
import { getCurrentUser } from "../../services/authService";
import { resendVerifyEmail } from "../../services/authService";

type FormDataTypes = {
  email: string;
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const SendEmailVerificationLink = () => {
  const alert = useAlert();
  const { colorMode } = useColorMode();
  const currentUser = getCurrentUser();

  const handleSubmit = async (formData: FormDataTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    try {
      await resendVerifyEmail(formData);

      resetForm();

      alert.show(
        "Hi👋, an email verification link has been sent to your email address, follow the link to verify your email."
      );
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
    <AuthMail
      heading="Verify Email"
      doSubmit={handleSubmit}
      text="Enter your account's email address and we will send you a verification link"
    />
  );
};

export default SendEmailVerificationLink;
