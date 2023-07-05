import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailThunk } from "../redux/slices/homeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Lazy,
  Autoplay,
  Pagination,
  Navigation,
  Zoom,
  Thumbs,
  FreeMode,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  //useSelector
  const product = useSelector(
    (state) => state.rootReducer.homeSlice.data.productDetail
  );
  //useEffect
  useEffect(() => {
    const data = {
      product_id: id,
    };
    dispatch(getProductDetailThunk(data));
  }, []);
  return (
    <Box sx={{ padding: "7rem 0rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "0rem 18rem",
        }}
      >
        <div
          className="carousel"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            width: "fit-content",
          }}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{
              width: "30rem",
              height: "5.5rem",
              marginTop: "2rem",
              cursor: "pointer",
            }}
          >
            {product?.image?.map((data) => {
              return (
                <SwiperSlide>
                  <div className="swiper-zoom-container">
                    <img
                      src={data}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            zoom={true}
            lazy={true}
            modules={[Autoplay, Pagination, Navigation, Zoom, Thumbs]}
            style={{
              width: "30rem",
              height: "35rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {product?.image?.map((data) => {
              return (
                <SwiperSlide>
                  <div className="swiper-zoom-container">
                    <img
                      src={data}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ float: "left" }}>
            Brand : {product?.brand}
          </Typography>
          <Typography sx={{ fontSize: "2rem" }}>{product?.title}</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {product?.color && (
              <>
                <Typography>color : </Typography>
                <Chip
                  label="B"
                  variant="filled"
                  sx={{
                    backgroundColor: `${product?.color}`,
                    color: `${product?.color}`,
                    marginLeft: "1rem",
                    border: "solid 1px grey",
                  }}
                />
              </>
            )}
          </div>
          <Box>
            <Typography sx={{ textAlign: "center" }}> select size </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {product?.size?.map((data) => {
                return (
                  <Chip
                    label={data}
                    variant="outlined"
                    sx={{ marginRight: "1rem" }}
                  />
                );
              })}
            </div>
          </Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ₹{product?.price}
          </Typography>
          <div
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button variant="contained">Add to cart</Button>
            <Button variant="outlined">Add to wishlist</Button>
          </div>
          <div>{product?.description}</div>
        </div>
      </Box>
    </Box>
  );
};

export default ProductPage;
