import * as React from "react";
import { Box, Image, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import Slider from "react-slick";
import SliderNextButton from "./SliderNextButton";
import SliderPrevButton from "./SliderPrevButton";
import { AppContext } from "../common/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const { state } = React.useContext(AppContext);

  const products = state.products.filter(
    (product) => product.category.name === "showcase"
  );

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextButton />,
    prevArrow: <SliderPrevButton />,
  };

  return (
    <Box
      className="hero-slider"
      flexGrow={1}
      overflow="hidden"
      borderRadius="md"
      bg="transparent"
    >
      <Slider {...settings}>
        {products.map((product) => (
          <Link
            as={RouteLink}
            to={`/products/${product.category.name}/${product._id}`}
            key={product._id}
            pb="60.125%"
            position="relative"
          >
            <Image
              top="0"
              left="0"
              borderRadius="md"
              position="absolute"
              alt=""
              src={product.img}
            />
          </Link>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;
