import * as yup from "yup";

export const orderStatusFormSchema = yup.object().shape({
  status: yup.string().trim().required("Status is required."),
});

export default orderStatusFormSchema;
