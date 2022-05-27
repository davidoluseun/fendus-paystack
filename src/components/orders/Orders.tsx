import * as React from "react";
import {
  Grid,
  Box,
  Flex,
  Heading,
  Icon,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { FaShippingFast } from "react-icons/fa";
import OrdersTable from "../common/OrdersTable";
import AccountNav from "../common/AccountNav";
import EmptyCategory from "../common/EmptyCategory";
import ContentLoader from "../common/OrdersContentLoader";
import Error from "../common/Error";
import { getOrders } from "../../services/orderService";
import { parseHeaders } from "../../utils/parseHeaders";

const Orders = () => {
  const [orders, setOrders] = React.useState<OrderTypes[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState("");
  const [prevUrl, setPrevUrl] = React.useState("");
  const [nextError, setNextError] = React.useState(false);
  const [prevError, setPrevError] = React.useState(false);

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data, headers } = await getOrders("pageSize=5");
        const headersLinks = parseHeaders(headers);

        if (!didCancel) {
          setOrders(data);
          setNextUrl(headersLinks.next);
          setPrevUrl(headersLinks.prev);
        }
      } catch (ex) {
        if (!didCancel) setError(true);
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
  }, [shouldTryAgain]);

  const handleTryAgain = () => setTryAgain(true);

  const fetchNextOrders = async () => {
    setLoading(true);
    setNextError(false);

    try {
      const queryStr = nextUrl.slice(nextUrl.indexOf("?") + 1);
      const { data, headers } = await getOrders(queryStr);
      const headersLinks = parseHeaders(headers);

      setOrders(data);
      setNextUrl(headersLinks.next);
      setPrevUrl(headersLinks.prev);
    } catch (ex) {
      setNextError(true);
    }
    setLoading(false);
  };

  const fetchPrevOrders = async () => {
    setLoading(true);
    setPrevError(false);

    try {
      const queryStr = prevUrl.slice(prevUrl.indexOf("?") + 1);
      const { data, headers } = await getOrders(queryStr);
      const headersLinks = parseHeaders(headers);

      setOrders(data);
      setNextUrl(headersLinks.next);
      setPrevUrl(headersLinks.prev);
    } catch (ex) {
      setPrevError(true);
    }
    setLoading(false);
  };

  const handleNextTryAgain = () => fetchNextOrders();

  const handlePrevTryAgain = () => fetchPrevOrders();

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {hasError || nextError || prevError ? (
              <Error
                onTryAgain={
                  nextError
                    ? handleNextTryAgain
                    : prevError
                    ? handlePrevTryAgain
                    : handleTryAgain
                }
                text="An error occurred due to failing network. Check your internet connection and try again."
              />
            ) : (
              <Box overflow="auto">
                <Flex align="center">
                  <Icon
                    as={FaShippingFast}
                    color="primary"
                    boxSize={{ base: "20px", sm: "24px" }}
                  />
                  <Heading
                    as="h1"
                    ml={{ base: "1", sm: "2" }}
                    fontSize={{ base: "18px", sm: "24px" }}
                  >
                    Orders
                  </Heading>
                </Flex>

                {orders.length === 0 ? (
                  <Box mt="6">
                    <EmptyCategory category="orders" />
                  </Box>
                ) : (
                  <Box>
                    <Box
                      className="hide-scrollbar"
                      overflowX={{ base: "scroll", lg: "unset" }}
                    >
                      <OrdersTable orders={orders} />
                    </Box>

                    <ButtonGroup isAttached variant="outline">
                      <Button
                        bg="primary"
                        color="#fff"
                        border="1px solid"
                        borderColor="primary"
                        isDisabled={!prevUrl}
                        onClick={fetchPrevOrders}
                        _hover={{ bg: "primary", color: "#fff" }}
                        _active={{ bg: "primary", color: "#fff" }}
                      >
                        Previous
                      </Button>
                      <Button
                        bg="primary"
                        color="#fff"
                        border="1px solid"
                        borderColor="primary"
                        isDisabled={!nextUrl}
                        onClick={fetchNextOrders}
                        _hover={{ bg: "primary", color: "#fff" }}
                        _active={{ bg: "primary", color: "#fff" }}
                      >
                        Next
                      </Button>
                    </ButtonGroup>
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Orders;
