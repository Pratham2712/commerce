import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addToCartThunk,
  addWishlistThunk,
  getAllCartThunk,
  getProductDetailThunk,
  getWishlistThunk,
  updateCartThunk,
} from "../redux/slices/homeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";
import {
  Lazy,
  Autoplay,
  Pagination,
  Navigation,
  Zoom,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

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
  const theme = useTheme();
  //useSelector
  const wishUpdate = useSelector(
    (state) => state.rootReducer.homeSlice.wishUpdate
  );
  const wish = useSelector(
    (state) => state.rootReducer.homeSlice.data.wishlist
  );
  const updateDone = useSelector(
    (state) => state.rootReducer.homeSlice.updateDone
  );
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const product = useSelector(
    (state) => state.rootReducer.homeSlice.data.productDetail
  );
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
  );
  //function
  const addToCart = (e, id) => {
    e.stopPropagation();
    if (!isLogin) {
      return;
    }
    const data = {
      product_id: id,
    };
    dispatch(addToCartThunk(data));
  };

  const updateCart = (e, type) => {
    e.stopPropagation();
    const info = {
      type: type,
      product_id: id,
    };
    dispatch(updateCartThunk(info));
  };

  const addWishlist = (id) => {
    if (!isLogin) {
      return;
    }
    const data = {
      product_id: id,
    };
    dispatch(addWishlistThunk(data));
  };
  //useEffect
  useEffect(() => {
    const data = {
      product_id: id,
    };
    dispatch(getProductDetailThunk(data));
  }, []);
  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [updateDone, isLogin]);

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [wishUpdate, isLogin]);
  return (
    <Box
      sx={{
        padding: "7rem 0rem 0rem 0rem",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "0rem 18rem",
          [theme.breakpoints.down("lg")]: {
            padding: "0rem 3rem",
            flexDirection: "column",
          },
          [theme.breakpoints.down("md")]: {
            padding: "0rem 3rem",
            flexDirection: "column",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "0rem 0.1rem",
          },
        }}
      >
        <div
          className="carousel"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
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
            className="swiper"
          >
            {product?.image?.map((data) => {
              return (
                <SwiperSlide>
                  <Box
                    className="swiper-zoom-container"
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      src={data}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            //marginLeft: "1rem",
            minHeight: "32rem",
            padding: "2rem 0rem",
          }}
        >
          <Typography variant="h6" sx={{ float: "left" }}>
            Brand : {product?.brand}
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",

              [theme.breakpoints.down("sm")]: {
                fontSize: "1.5rem",
              },
            }}
          >
            {product?.title}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product?.color && (
              <>
                <Typography variant="h6">color : </Typography>
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
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {" "}
              select size{" "}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.5rem",
              }}
            >
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {!cartList[id] ? (
              <Button
                variant="contained"
                sx={{ marginRight: "2rem" }}
                onClick={(e) => addToCart(e, id)}
              >
                Add to cart
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={(e) => updateCart(e, "increment")}
                >
                  <AddBoxOutlinedIcon sx={{ fontSize: "2rem" }} />
                </IconButton>{" "}
                {cartList[id]}
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={(e) => updateCart(e, "decrement")}
                >
                  <IndeterminateCheckBoxOutlinedIcon
                    sx={{ fontSize: "2rem", marginRight: "2rem" }}
                  />
                </IconButton>{" "}
              </Box>
            )}
            <Button
              variant={wish?.list?.[id] === 1 ? "contained" : "outlined"}
              onClick={() => addWishlist(id)}
            >
              {wish?.list?.[id] === 1
                ? "Remove from wishlist"
                : "save to wishlist"}
            </Button>
          </div>
          <div>{product?.description}</div>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
