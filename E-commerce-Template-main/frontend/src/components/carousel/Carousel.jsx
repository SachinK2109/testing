import React from "react";
import { Image } from "antd";
import { imageUrl } from "./constant";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Carousel.css";

// Swiper css
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Carousel = () => {
  return (
    <>
      <Swiper
        id="carousel"
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {imageUrl.map((image, i) => (
          <SwiperSlide className="image-container" key={i}>
            <Image
              preview={false}
              width={"100%"}
              height={800}
              src={image}
              alt="example"
              className="image-responsive"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
