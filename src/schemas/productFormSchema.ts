import * as yup from "yup";

export const productFormSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required."),
  categoryId: yup.string().trim().required("Category is required."),
  desc: yup.string().trim().required("Description is required."),
  inStock: yup.boolean().required("Status is required."),
  img: yup.mixed().required("Image is required."),
  price: yup
    .number()
    .typeError("Price must be a number.")
    .min(0, "price must be greater than or equal to 0")
    .integer("Price must be an integer.")
    .required("Price is required."),
});

export default productFormSchema;
