import { Box, Heading, Button, Grid, useColorMode } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import CustomField from "../common/CustomField";
import CustomSelect from "../common/CustomSelect";
import { deliveryFormSchema } from "../../schemas/deliveryFormSchema";
import { options } from "../../utils/selectStateOptions";

type FormDataTypes = {
  name: string;
  phone: string;
  address: string;
  state: string;
  lga: string;
  busStop: string;
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type DeliveryFormProps = {
  doSubmit: (data: any) => Promise<boolean>;
  deliveryInfo: DeliveryTypes;
};

const DeliveryForm = ({ doSubmit, deliveryInfo }: DeliveryFormProps) => {
  const { colorMode } = useColorMode();

  const initialValues = {
    name: deliveryInfo ? deliveryInfo.name : "",
    phone: deliveryInfo ? deliveryInfo.phone : "",
    address: deliveryInfo ? deliveryInfo.address : "",
    state: deliveryInfo ? deliveryInfo.state : "",
    lga: deliveryInfo ? deliveryInfo.lga : "",
    busStop: deliveryInfo
      ? deliveryInfo.busStop
        ? deliveryInfo.busStop
        : ""
      : "",
  };

  const handleSubmit = async (formData: FormDataTypes, formik: FormikTypes) => {
    const { setSubmitting, resetForm } = formik;
    setSubmitting(true);

    const isSubmitted = await doSubmit(formData);

    if (isSubmitted) resetForm();

    setSubmitting(false);
  };

  return (
    <Box as="section">
      <Box
        p="4"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Heading as="h1" mb="4" fontSize="20px">
          Delivery Details
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={deliveryFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="name"
                  type="text"
                  label="Full name"
                  placeholder="Enter your full name"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="phone"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomSelect
                  name="state"
                  label="State"
                  options={options}
                  hasAsterisk={true}
                  placeholder="Select delivery state"
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="lga"
                  type="text"
                  label="LGA (Local Govt. Area)"
                  placeholder="Enter LGA"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>
              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="busStop"
                  type="text"
                  label="Nearest Bus Stop"
                  placeholder="Enter nearest bus stop"
                  isHidden={false}
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="address"
                  type="text"
                  label="Address"
                  placeholder="Enter delivery address"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Button
                w="100%"
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
                Submit Details
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default DeliveryForm;
