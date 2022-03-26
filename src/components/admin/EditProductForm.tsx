import * as React from "react";
import {
  Box,
  Heading,
  Button,
  Grid,
  Flex,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPenFancy } from "react-icons/fa";
import { AppContext } from "../common/AppContext";
import CustomField from "../common/CustomField";
import CustomSelect from "../common/CustomSelect";
import ProductImageField from "./ProductImageField";
import Error from "../common/Error";
import AdminNav from "./AdminNav";
import ContentLoader from "./ProductFormContentLoader";
import { getProduct, saveProduct } from "../../services/productService";
import { upload } from "../../services/imageUploadService";
import { productFormSchema } from "../../schemas/productFormSchema";
import { options as statusOptions } from "../../utils/selectStatusOptions";

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<SaveProductTypes>> | undefined
  ) => void;
};

type ParamTypes = {
  id: string;
};

const EditProductForm = () => {
  const { state } = React.useContext(AppContext);
  const [product, setProduct] = React.useState<ProductTypes | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [resetSelect, setResetSelect] = React.useState(false);
  const { id: paramId } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data } = await getProduct(paramId);

        if (!didCancel) setProduct(data);
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 404)
            navigate("/not-found", { replace: true });
          else setError(true);
      }

      if (!didCancel) {
        setLoading(false);
        setTryAgain(false);
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [shouldTryAgain, paramId, navigate]);

  const handleTryAgain = () => setTryAgain(true);

  let initialValues = {
    title: product ? product.title : "",
    categoryId: product ? product.category._id : "",
    img: product ? product.img : "",
    desc: product ? product.desc : "",
    inStock: product ? product.inStock : "",
    price: product ? product.price : "",
  };

  const handleFileName = (fileName: string) => {
    setFileName(fileName);
  };

  const handleSubmit = async (data: SaveProductTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;

    setSubmitting(true);

    try {
      if (product?.img !== data.img) {
        const response = await upload(data.img as File);
        data.img = response.data.secure_url;
      }

      await saveProduct(data, product?._id);

      resetForm();
      setResetSelect(true);
      setFileName("");
      setSubmitting(false);

      navigate("/admin/products");
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400)
        colorMode === "light"
          ? toast.dark(ex.response.data)
          : toast(ex.response.data);

      setSubmitting(false);
    }
  };

  const categoryOptions = state.categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AdminNav />
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error
                text="An error occurred due to failing network. Check your internet connection and try again."
                onTryAgain={handleTryAgain}
              />
            ) : (
              <Box>
                <Flex align="center">
                  <Icon
                    color="primary"
                    boxSize={{ base: "20px", lg: "24px" }}
                    as={FaPenFancy}
                  />
                  <Heading
                    as="h1"
                    ml={{ base: "1", sm: "2" }}
                    fontSize={{ base: "18px", sm: "24px" }}
                  >
                    Edit Product
                  </Heading>
                </Flex>

                <Box
                  p="4"
                  mt="6"
                  borderRadius="md"
                  boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                  bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                >
                  <Formik
                    initialValues={initialValues}
                    validationSchema={productFormSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                      <Form>
                        <Grid
                          templateColumns={{ sm: "repeat(2, 1fr)" }}
                          gridGap={{ sm: "6" }}
                        >
                          <CustomField
                            name="title"
                            type="text"
                            label="Title"
                            placeholder="Enter title"
                            isHidden={false}
                            hasAsterisk={true}
                            errors={errors}
                            touched={touched}
                          />

                          <CustomSelect
                            name="categoryId"
                            label="Category"
                            options={categoryOptions}
                            hasAsterisk={true}
                            reset={resetSelect}
                            placeholder="Select category"
                            errors={errors}
                            touched={touched}
                          />
                        </Grid>

                        <ProductImageField
                          errors={errors}
                          touched={touched}
                          setFieldValue={setFieldValue}
                          fileName={fileName}
                          onFileName={handleFileName}
                        />

                        <CustomField
                          name="desc"
                          label="Description"
                          placeholder="Enter description"
                          isHidden={false}
                          hasAsterisk={true}
                          isTextarea={true}
                          errors={errors}
                          touched={touched}
                        />

                        <Grid
                          templateColumns={{ sm: "repeat(2, 1fr)" }}
                          gridGap={{ sm: "6" }}
                        >
                          <CustomSelect
                            name="inStock"
                            label="Status"
                            hasAsterisk={true}
                            reset={resetSelect}
                            options={statusOptions}
                            placeholder="Select status"
                            errors={errors}
                            touched={touched}
                          />

                          <CustomField
                            name="price"
                            type="text"
                            label="Price"
                            placeholder="Enter price"
                            isHidden={false}
                            hasAsterisk={true}
                            errors={errors}
                            touched={touched}
                          />
                        </Grid>

                        <Button
                          my="4"
                          bg="primary"
                          color="#fff"
                          type="submit"
                          fontWeight="semibold"
                          border="1px solid"
                          borderColor="primary"
                          isLoading={isSubmitting}
                          _hover={{ bg: "primary" }}
                          _active={{ bg: "primary" }}
                        >
                          Save Product
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default EditProductForm;
