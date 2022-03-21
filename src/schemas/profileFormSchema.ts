import * as yup from "yup";

export const profileFormSchema = yup.object().shape({
  firstName: yup.string().trim().required("First name is required."),
  lastName: yup.string().trim().required("Last name is required."),
  dob: yup.date(),
  phone: yup
    .string()
    .trim()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
      "Invalid phone number."
    ),
});

export default profileFormSchema;
