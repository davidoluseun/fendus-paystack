import * as React from "react";
import { Box } from "@chakra-ui/react";
import Hero from "../hero/Hero";
import { AppContext } from "../common/AppContext";
import ProductLayout01 from "../products/ProductLayout01";
import ProductLayout02 from "../products/ProductLayout02";

const Home = () => {
  const { state } = React.useContext(AppContext);
  const products = state.products;

  const women = products.filter((p) => p.category.name === "women");
  const bags = products.filter((p) => p.category.name === "bags");
  const fitness = products.filter((p) => p.category.name === "fitness");
  const household = products.filter((p) => p.category.name === "household");
  const kitchen = products.filter((p) => p.category.name === "kitchen");
  const phones = products.filter((p) => p.category.name === "phones");
  const men = products.filter((p) => p.category.name === "men");
  const computers = products.filter((p) => p.category.name === "computers");

  return (
    <Box
      as="main"
      mt="4"
      px={{ base: "4", md: "6" }}
      marginX="auto"
      maxW="1200px"
    >
      <Hero />
      <ProductLayout01
        title="Phones"
        hasHeading={true}
        hasMore={true}
        path="products/phones"
        products={phones.slice(0, 6)}
      />

      <ProductLayout02
        title="Computers"
        hasHeading={true}
        hasMore={true}
        path="products/computers"
        products={computers.slice(0, 4)}
      />

      <ProductLayout01
        title="Women"
        hasHeading={true}
        hasMore={true}
        path="products/women"
        products={women.slice(0, 6)}
      />

      <ProductLayout02
        title="Kitchen"
        hasHeading={true}
        hasMore={true}
        path="products/kitchen"
        products={kitchen.slice(0, 4)}
      />

      <ProductLayout01
        title="Household"
        hasHeading={true}
        hasMore={true}
        path="products/household"
        products={household.slice(0, 6)}
      />

      <ProductLayout02
        title="Fitness"
        hasHeading={true}
        hasMore={true}
        path="products/fitness"
        products={fitness.slice(0, 4)}
      />

      <ProductLayout01
        title="Bags"
        hasHeading={true}
        hasMore={true}
        path="products/bags"
        products={bags.slice(0, 6)}
      />

      <ProductLayout02
        title="Men"
        hasHeading={true}
        hasMore={true}
        path="products/men"
        products={men.slice(0, 4)}
      />
    </Box>
  );
};

export default Home;
