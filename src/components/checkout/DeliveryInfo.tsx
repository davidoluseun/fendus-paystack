import { Box, Heading, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";
import { FaPenFancy } from "react-icons/fa";

type DeliveryInfoProps = {
  onUpdate: () => void;
  deliveryInfo: DeliveryTypes;
};

const DeliveryInfo = ({ onUpdate, deliveryInfo }: DeliveryInfoProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box as="section">
      <Box
        p="4"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Flex justify="space-between">
          <Heading as="h1" mb="4" fontSize="20px">
            Delivery Details
          </Heading>

          <IconButton
            borderRadius="full"
            aria-label="Update delivery info."
            onClick={onUpdate}
            data-tip="Edit"
            data-for="edit"
            icon={<FaPenFancy size="20px" />}
            bg={colorMode === "light" ? "bg" : "rgba(255, 255, 255, .08)"}
            _hover={{
              bg: `${
                colorMode === "light" ? "bg" : "rgba(255, 255, 255, .08)"
              }`,
            }}
            _active={{
              bg: `${
                colorMode === "light" ? "bg" : "rgba(255, 255, 255, .08)"
              }`,
            }}
          />
          <ReactTooltip
            id="edit"
            effect="solid"
            backgroundColor={colorMode === "light" ? "#000" : "#fff"}
            textColor={colorMode === "light" ? "#f5f6f7" : "#000"}
          />
        </Flex>

        <Flex mb="2" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Full name:
          </Box>
          <Box as="span" flexBasis="70%">
            {deliveryInfo?.name}
          </Box>
        </Flex>

        <Flex mb="2" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Phone number:
          </Box>
          <Box as="span" flexBasis="70%">
            {deliveryInfo?.phone}
          </Box>
        </Flex>

        <Flex mb="2" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            LGA
          </Box>
          <Box as="span" flexBasis="70%">
            {deliveryInfo?.lga}
          </Box>
        </Flex>

        <Flex mb="2" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            State:
          </Box>
          <Box as="span" flexBasis="70%">
            {deliveryInfo?.state}
          </Box>
        </Flex>

        <Flex mb="2" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Nearest Bus Stop:
          </Box>
          <Box as="span" flexBasis="70%">
            {deliveryInfo?.busStop}
          </Box>
        </Flex>

        <Flex mb="2" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Address:
          </Box>
          <Box as="span" flexBasis="70%">
            {deliveryInfo?.address}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DeliveryInfo;
