import * as yup from "yup";

export const deliveryFormSchema = yup.object().shape({
  name: yup.string().trim().required("Full name is required."),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required.")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
      "Invalid phone number."
    ),
  address: yup.string().trim().required("Address is required"),
  state: yup.string().trim().required("State is required"),
  lga: yup.string().trim().required("State is required"),
  busStop: yup.string().trim(),
});

export default deliveryFormSchema;
