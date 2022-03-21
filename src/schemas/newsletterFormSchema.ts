import * as yup from "yup";

export const newsletterFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email address.")
    .required("Email address is required."),
});

export default newsletterFormSchema;
