import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup.string().trim().required("first name is required."),
  lastName: yup.string().trim().required("last name is required."),
  email: yup
    .string()
    .trim()
    .email("Invalid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default signUpSchema;
