import * as yup from "yup";

export const authMailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email address.")
    .required("Email is required."),
});

export default authMailSchema;
