import { Heading, Box, Grid } from "@chakra-ui/react";
import ContactForm from "./ContactForm";
import LeafletMap from "../common/LeafletMap";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <Box as="section">
      <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
        <Box>
          <Heading as="h1" mb="5" fontSize="28px">
            Get In Touch
          </Heading>
          <ContactInfo />
        </Box>
        <Grid mt="10" templateColumns={{ lg: "repeat(2, 1fr)" }} gridGap="7">
          <ContactForm />
          <LeafletMap />
        </Grid>
      </Box>
    </Box>
  );
};

export default Contact;
