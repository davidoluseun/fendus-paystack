import * as React from "react";
import { Flex, Link, Box, Icon } from "@chakra-ui/react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { MdKitchen, MdComputer, MdPhoneAndroid } from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { RiHandbagLine, RiWomenLine, RiMenLine } from "react-icons/ri";
import { IoMdFitness, IoIosAirplane } from "react-icons/io";
import { AppContext } from "./AppContext";

type CategoriesProps = {
  setSideNavIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isSideNav?: boolean;
};

const Categories = ({ setSideNavIsOpen, isSideNav }: CategoriesProps) => {
  const { state } = React.useContext(AppContext);
  const location = useLocation();

  const handleCloseSideNav = (to: string) => {
    if (setSideNavIsOpen) {
      if (to !== location.pathname) setSideNavIsOpen(false);
    }
  };

  const icons = [
    { category: "household", icon: BsHouseDoor },
    { category: "fitness", icon: IoMdFitness },
    { category: "kitchen", icon: MdKitchen },
    { category: "bags", icon: RiHandbagLine },
    { category: "women", icon: RiWomenLine },
    { category: "computers", icon: MdComputer },
    { category: "phones", icon: MdPhoneAndroid },
    { category: "men", icon: RiMenLine },
  ];

  const getIcon = (category: string) => {
    for (let i = 0; i < icons.length; i++)
      if (category === icons[i].category) return icons[i].icon;
  };

  const categories = state.categories.filter(
    (category) => category.name !== "showcase"
  );

  return (
    <>
      {categories.map((category) => (
        <Link
          py={!isSideNav ? "2" : "10px"}
          px="4"
          mx="-4"
          key={category._id}
          as={RouteLink}
          to={`/products/${category.name}`}
          onClick={
            setSideNavIsOpen
              ? () => handleCloseSideNav(`/products/${category.name}`)
              : undefined
          }
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={getIcon(category.name)} boxSize="20px" mr="3" />
            <Box as="span" textTransform="capitalize">
              {category.name}
            </Box>
          </Flex>
        </Link>
      ))}
    </>
  );
};

export default Categories;
