import * as React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Image,
  Icon,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import { FaShippingFast } from "react-icons/fa";
import { format } from "date-fns";
import OrderSummary from "../common/OrderSummary";
import CustomSelect from "../common/CustomSelect";
import AdminNav from "./AdminNav";
import Error from "../common/Error";
import ContentLoader from "../common/OrderContentLoader";
import options from "../../utils/orderStatusOptions";
import orderStatusFormSchema from "../../schemas/orderStatusFormSchema";
import { saveStatus, getAdminOrder } from "../../services/orderService";

type ParamTypes = {
  id: string;
};

type FormDataTypes = {
  status: "" | "pending" | "delivered" | "cancelled";
};

type FormikTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const Order = () => {
  const [order, setOrder] = React.useState<OrderTypes>();
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { colorMode } = useColorMode();
  const { id } = useParams<ParamTypes>();
  const navigate = useNavigate();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      setTryAgain(false);

      try {
        const { data } = await getAdminOrder(id);
        if (!didCancel) setOrder(data);
      } catch (ex: any) {
        if (!didCancel)
          if (ex.response && ex.response.status === 404)
            navigate("/not-found", { replace: true });
          else setError(true);
      }

      if (!didCancel) setLoading(false);
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [shouldTryAgain, id, navigate]);

  const handleTryAgain = () => setTryAgain(true);

  const handleSubmit = async (formData: FormDataTypes, formik: FormikTypes) => {
    if (!order) return;

    const { resetForm } = formik;
    setSubmitting(true);

    try {
      await saveStatus(formData, order._id);

      resetForm();

      colorMode === "light"
        ? toast.dark("Status updated.")
        : toast("Status updated.");
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400)
        colorMode === "light"
          ? toast.dark(ex.response.data)
          : toast(ex.response.data);
    }
    setSubmitting(false);
  };

  return (
    <Box
      className="order"
      as="section"
      px={{ base: "4", md: "6" }}
      marginX="auto"
      maxW="1200px"
    >
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AdminNav />
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error
                onTryAgain={handleTryAgain}
                text="An error occurred due to failing network. Check your internet connection and try again."
              />
            ) : (
              <Box>
                <Flex align="center" fontSize={{ sm: "24px" }}>
                  <Icon
                    as={FaShippingFast}
                    color="primary"
                    boxSize={{ base: "20px", sm: "24px" }}
                  />
                  <Heading
                    as="h1"
                    ml={{ base: "1", sm: "3" }}
                    fontSize="inherit"
                  >
                    Order Details
                  </Heading>
                </Flex>

                <Box
                  my="6"
                  borderRadius="md"
                  boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                >
                  <Flex
                    p="3"
                    color="#fff"
                    align="center"
                    borderTopRadius="md"
                    justify="space-between"
                    direction={{ base: "column", sm: "row" }}
                    bg={colorMode === "light" ? "secondary" : "surfaceDarkBg"}
                    borderBottom={
                      colorMode === "dark" ? "1px solid #3f4142" : ""
                    }
                  >
                    <Box>
                      <Box as="span" mr="2" fontWeight="semibold">
                        Order ID:
                      </Box>
                      <Box as="span">{order?.paymentId}</Box>
                    </Box>

                    <Box ml="3" flexGrow={1}>
                      <Box as="span" mr="2" fontWeight="semibold">
                        Placed on:
                      </Box>
                      <Box as="span">
                        {order && (
                          <>{format(Number(order?.paymentId), "dd/MM/yyyy")}</>
                        )}
                      </Box>
                    </Box>

                    <Box w={{ base: "150px", sm: "170px" }} mb="-4">
                      <Formik
                        initialValues={{ status: "" }}
                        validationSchema={orderStatusFormSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ errors, touched }) => (
                          <Form id="status">
                            <CustomSelect
                              name="status"
                              label="Order Status"
                              isHidden={true}
                              options={options}
                              hasAsterisk={true}
                              placeholder="Order status"
                              errors={errors}
                              touched={touched}
                            />
                          </Form>
                        )}
                      </Formik>
                    </Box>
                  </Flex>

                  <Grid
                    p="4"
                    gridGap="3"
                    borderBottomRadius="md"
                    templateColumns={{ sm: "repeat(2, 1fr)" }}
                    bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                  >
                    {order?.products.map((product) => (
                      <Flex align="center" key={product._id}>
                        <Image
                          w="125px"
                          borderRadius="md"
                          alt={product.title}
                          src={product.img.replace(
                            "upload/",
                            "upload/w_480,h_480/"
                          )}
                        />
                        <Box ml="4">
                          <Heading
                            as="h3"
                            mb="1"
                            fontSize="14px"
                            textTransform="capitalize"
                          >
                            {product.title}
                          </Heading>

                          <CurrencyFormat
                            renderText={(value: number) => (
                              <Flex fontSize="14px">
                                <Box mr="1">{value}</Box>
                                <Box>x {product.qty}</Box>
                              </Flex>
                            )}
                            decimalScale={2}
                            value={product.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix="&#8358;"
                          />
                        </Box>
                      </Flex>
                    ))}
                  </Grid>
                </Box>

                <Grid
                  templateColumns={{ md: "1fr .8fr" }}
                  gridGap="6"
                  alignItems="start"
                >
                  <Box
                    p="4"
                    as="section"
                    borderRadius="md"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                    bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                  >
                    <Heading
                      as="h2"
                      fontSize="18px"
                      fontWeight="semibold"
                      mb="3"
                    >
                      Delivery Address
                    </Heading>
                    <Text>{order?.deliveryAddress}</Text>
                  </Box>

                  <Flex direction="column">
                    <OrderSummary
                      total={order?.total}
                      deliveryFee={order?.deliveryFee}
                    />

                    <Button
                      mt="6"
                      bg="primary"
                      color="#fff"
                      form="status"
                      type="submit"
                      alignSelf="flex-end"
                      isLoading={isSubmitting}
                      _hover={{ bg: "primary", color: "#fff" }}
                      _active={{ bg: "primary", color: "#fff" }}
                    >
                      Update Status
                    </Button>
                  </Flex>
                </Grid>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Order;
