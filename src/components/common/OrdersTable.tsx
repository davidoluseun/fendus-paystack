import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type OrdersTableTypes = {
  orders: OrderTypes[];
  isAdmin?: boolean;
};

const OrdersTable = ({ orders, isAdmin }: OrdersTableTypes) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleClick = (id: string) => {
    if (isAdmin) navigate(`/admin/orders/${id}`);
    else navigate(`/orders/${id}`);
  };

  return (
    <Table style={{ borderCollapse: "separate", borderSpacing: "0 24px" }}>
      <Thead>
        <Tr>
          <Th
            py="0"
            border="none"
            fontWeight="semibold"
            fontSize="14px"
            color={colorMode === "light" ? "#4a5568" : "#a4a9af"}
          >
            Payment ID
          </Th>
          <Th
            py="0"
            border="none"
            fontWeight="semibold"
            fontSize="14px"
            color={colorMode === "light" ? "#4a5568" : "#a4a9af"}
          >
            Status
          </Th>
          <Th
            py="0"
            border="none"
            fontWeight="semibold"
            fontSize="14px"
            color={colorMode === "light" ? "#4a5568" : "#a4a9af"}
          >
            Date purchased
          </Th>
          <Th
            py="0"
            border="none"
            fontWeight="semibold"
            fontSize="14px"
            color={colorMode === "light" ? "#4a5568" : "#a4a9af"}
          >
            Total
          </Th>
          <Th py="0" border="none"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr
            cursor="pointer"
            borderRadius="md"
            key={order._id}
            boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
            onClick={() => handleClick(order._id)}
            bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
          >
            <Td
              px="4"
              border="none"
              borderLeftRadius="md"
              fontWeight="semibold"
            >
              {order.paymentId}
            </Td>
            <Td px="4" border="none" fontSize="14px">
              <Box
                py="1"
                px="4"
                fontSize="14px"
                borderRadius="full"
                display="inline-flex"
                className={order.status}
              >
                {order.status}
              </Box>
            </Td>
            <Td px="4" border="none">
              {format(Number(order.paymentId), "dd/MM/yyyy")}
            </Td>

            <CurrencyFormat
              renderText={(value: number) => <Td border="none">{value}</Td>}
              decimalScale={2}
              value={order?.total}
              displayType={"text"}
              thousandSeparator={true}
              prefix="&#8358;"
            />

            <Td px="4" border="none" borderRightRadius="md">
              <Icon boxSize="20px" as={MdKeyboardArrowRight} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrdersTable;
