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
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import { FaShippingFast } from "react-icons/fa";
import { format } from "date-fns";
import AccountNav from "../common/AccountNav";
import OrderSummary from "../common/OrderSummary";
import ContentLoader from "../common/OrderContentLoader";
import Error from "../common/Error";
import { getOrder, cancelOrder } from "../../services/orderService";

type ParamTypes = {
  id: string;
};

const Order = () => {
  const [order, setOrder] = React.useState<OrderTypes>();
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const navigate = useNavigate();
  const { id } = useParams<ParamTypes>();
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      setTryAgain(false);

      try {
        const { data } = await getOrder(id);
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

  const handleCancel = async (id: string) => {
    setSubmitting(true);

    try {
      const { data } = await cancelOrder({ status: "cancelled" }, id);

      setOrder(data);

      colorMode === "light"
        ? toast.dark("Order cancelled.")
        : toast("Order cancelled.");
    } catch (ex) {}

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
        <AccountNav />

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
                    color="#fff"
                    justify="space-between"
                    borderTopRadius="md"
                    align="center"
                    px={{ base: "3", sm: "4" }}
                    py={order?.status === "pending" ? "3" : "5"}
                    direction={{ base: "column", sm: "row" }}
                    bg={colorMode === "light" ? "secondary" : "surfaceDarkBg"}
                    borderBottom={
                      colorMode === "dark" ? "1px solid #3f4142" : ""
                    }
                  >
                    <Box>
                      <Box as="span" mr="2" fontWeight="semibold">
                        Payment ID:
                      </Box>
                      <Box as="span">{order?.paymentId}</Box>
                    </Box>

                    <Box ml="3" flexGrow={order?.status === "pending" ? 1 : 0}>
                      <Box as="span" mr="2" fontWeight="semibold">
                        Placed on:
                      </Box>
                      <Box as="span">
                        {order && (
                          <>{format(Number(order.paymentId), "dd/MM/yyyy")}</>
                        )}
                      </Box>
                    </Box>

                    {order?.status === "pending" && (
                      <Button
                        bg="primary"
                        color="#fff"
                        mt={{ base: "6px", sm: "0" }}
                        onClick={() => handleCancel(order?._id)}
                        isLoading={isSubmitting}
                        _hover={{ bg: "primary", color: "#fff" }}
                        _active={{ bg: "primary", color: "#fff" }}
                      >
                        Cancel Order
                      </Button>
                    )}
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
                        {product.img ? (
                          <Image
                            w="125px"
                            borderRadius="md"
                            alt={product.title}
                            src={product.img.replace(
                              "upload/",
                              "upload/w_480,h_480/"
                            )}
                          />
                        ) : (
                          <Box>Hello</Box>
                        )}
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

                  <OrderSummary
                    total={order?.total}
                    deliveryFee={order?.deliveryFee}
                  />
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
