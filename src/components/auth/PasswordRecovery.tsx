import { useColorMode } from "@chakra-ui/react";
import { FormikState } from "formik";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import AuthMail from "./AuthMail";
import { getCurrentUser } from "../../services/authService";
import { recoverPassword } from "../../services/authService";

type FormDataTypes = {
  email: string;
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const PasswordRecovery = () => {
  const alert = useAlert();
  const { colorMode } = useColorMode();
  const currentUser = getCurrentUser();

  const handleSubmit = async (formData: FormDataTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    try {
      await recoverPassword(formData);

      resetForm();

      alert.show(
        "Hi👋, a password reset link has been sent to your email address, follow the link to reset your password."
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
      heading="Recover Password"
      doSubmit={handleSubmit}
      text="Enter your account's email address and we will send you a password reset link."
    />
  );
};

export default PasswordRecovery;
