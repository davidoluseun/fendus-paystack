import * as React from "react";
import { Box, Grid, Flex, Icon, Heading, useColorMode } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import { FaShippingFast } from "react-icons/fa";
import { MdShoppingBasket } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import AdminNav from "./AdminNav";
import Chart from "./DashboardChart";
import Error from "../common/Error";
import ContentLoader from "./DashboardContentLoader";
import { getProducts } from "../../services/productService";
import { getAdminOrders } from "../../services/orderService";
import { getTotalSales } from "../../utils/getTotalSales";

const Dashboard = () => {
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [orders, setOrders] = React.useState<OrderTypes[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [shouldTryAgain, setTryAgain] = React.useState(false);

  const { colorMode } = useColorMode();

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data: products } = await getProducts();
        const { data: orders } = await getAdminOrders();

        if (!didCancel) {
          setProducts(products);
          setOrders(orders);
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

  const totalSales = getTotalSales(orders);

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
                onTryAgain={handleTryAgain}
                text="An error occurred due to failing network. Check your internet connection and try again."
              />
            ) : (
              <Box>
                <Flex align="center">
                  <Icon
                    as={RiDashboardFill}
                    color="primary"
                    boxSize={{ base: "18px", sm: "20px", lg: "24px" }}
                  />
                  <Heading
                    as="h1"
                    ml={{ base: "1", sm: "2" }}
                    fontSize={{ base: "18px", sm: "24px" }}
                  >
                    Dashboard
                  </Heading>
                </Flex>

                <Grid
                  mt="6"
                  gridGap={{ base: "5", xl: "6" }}
                  templateColumns={{ sm: "repeat(3, 1fr)" }}
                >
                  <Flex
                    p="3"
                    borderRadius="md"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                    bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                  >
                    <Flex
                      w="48px"
                      h="48px"
                      flexShrink={0}
                      justify="center"
                      align="center"
                      borderRadius="50%"
                      mr={{ base: "2", xl: "3" }}
                      bg="rgba(15, 52, 96, .2)"
                    >
                      <Icon
                        as={GiTakeMyMoney}
                        boxSize="24px"
                        color={colorMode === "light" ? "#0f3460" : "#0477ff"}
                      />
                    </Flex>
                    <Box>
                      <Heading as="h2" fontSize={{ base: "16px", xl: "18px" }}>
                        Total Sales
                      </Heading>
                      <CurrencyFormat
                        renderText={(value: number) => <Box>{value}</Box>}
                        decimalScale={2}
                        value={totalSales}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix="&#8358;"
                      />
                    </Box>
                  </Flex>

                  <Flex
                    p="3"
                    borderRadius="md"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                    bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                  >
                    <Flex
                      w="48px"
                      h="48px"
                      flexShrink={0}
                      mr={{ base: "2", xl: "3" }}
                      justify="center"
                      align="center"
                      borderRadius="50%"
                      bg="rgba(218, 11, 47, .2)"
                    >
                      <Icon
                        as={FaShippingFast}
                        boxSize="24px"
                        color="#da0b2f"
                      />
                    </Flex>
                    <Box>
                      <Heading as="h2" fontSize={{ base: "16px", xl: "18px" }}>
                        Total Orders
                      </Heading>
                      <Box>{orders.length}</Box>
                    </Box>
                  </Flex>

                  <Flex
                    p="3"
                    borderRadius="md"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                    bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                  >
                    <Flex
                      w="48px"
                      h="48px"
                      flexShrink={0}
                      mr={{ base: "2", xl: "3" }}
                      justify="center"
                      align="center"
                      borderRadius="50%"
                      bg="rgba(253, 138, 20, .2)"
                    >
                      <Icon
                        as={MdShoppingBasket}
                        boxSize="24px"
                        color="#fd8a14"
                      />
                    </Flex>
                    <Box>
                      <Heading as="h2" fontSize={{ base: "16px", xl: "18px" }}>
                        Total Products
                      </Heading>
                      <Box>{products.length}</Box>
                    </Box>
                  </Flex>

                  <Box
                    gridColumnStart={{ sm: 1 }}
                    gridColumnEnd={{ sm: 4 }}
                    className="hide-scrollbar"
                    overflowX={{ base: "scroll", lg: "unset" }}
                  >
                    <Box
                      p="4"
                      borderRadius="md"
                      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                      bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
                    >
                      <Heading
                        as="h2"
                        mb="4"
                        fontSize={{ base: "16px", xl: "18px" }}
                      >
                        Sales statistics
                      </Heading>
                      <Box
                        fontSize="14px"
                        className="hide-scrollbar"
                        overflowX={{ base: "scroll", lg: "unset" }}
                      >
                        <Chart orders={orders} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
