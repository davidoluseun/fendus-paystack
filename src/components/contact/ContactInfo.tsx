import { Box, Heading, Icon, Link, Grid } from "@chakra-ui/react";
import { SiGooglemaps } from "react-icons/si";
import { IoMdMail } from "react-icons/io";
import { MdPhoneIphone } from "react-icons/md";

const ContactInfo = () => {
  return (
    <Grid
      templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      justifyItems="center"
      gridGap="7"
    >
      <Box textAlign="center">
        <Icon my="4" boxSize="45px" color="primary" as={SiGooglemaps} />

        <Heading as="h2" mb="2" fontSize="20px">
          Store location
        </Heading>

        <Box as="address">
          Shop D001 Ogba Multipurpose <br />
          Shopping Complex,
          <br />
          Ogba, Lagos.
        </Box>
      </Box>

      <Box textAlign="center">
        <Icon my="4" boxSize="45px" color="primary" as={MdPhoneIphone} />
        <Heading as="h2" mb="2" fontSize="20px">
          Call on
        </Heading>
        <Link href="tel:+2348068623394" mb="1" display="inline-block">
          +2348068623394
        </Link>
        <br />
        <Link href="tel:+2349133368559">+2349133368559</Link>
      </Box>

      <Box textAlign="center" gridColumn={{ sm: "1 / 3", md: "initial" }}>
        <Icon my="4" boxSize="45px" color="primary" as={IoMdMail} />
        <Heading as="h2" mb="2" fontSize="20px">
          Email at
        </Heading>
        <Link
          mb="1"
          target="_blank"
          rel="noreferrer"
          display="inline-block"
          href="mailto:info@fendus.com"
        >
          info@fendus.com
        </Link>
        <br />
        <Link target="_blank" rel="noreferrer" href="mailto:support@fendus.com">
          support@fendus.com
        </Link>
      </Box>
    </Grid>
  );
};

export default ContactInfo;
