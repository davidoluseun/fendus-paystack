import * as yup from "yup";

export const passwordResetSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default passwordResetSchema;
