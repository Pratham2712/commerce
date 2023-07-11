import React from "react";
import {
  addToCartThunk,
  addWishlistThunk,
  updateCartThunk,
} from "../redux/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { product_page } from "../constants/links";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data, loginOpen, setLoginOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
  );
  const wish = useSelector(
    (state) => state.rootReducer.homeSlice.data.wishlist
  );
  const loading = useSelector((state) => state.rootReducer.homeSlice.loading);
  const addToCart = (e, id) => {
    e.stopPropagation();
    if (!isLogin) {
      return setLoginOpen(!loginOpen);
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
      product_id: data?._id,
    };
    dispatch(updateCartThunk(info));
  };

  const addWishlist = (e, id) => {
    e.stopPropagation();
    if (!isLogin) {
      return;
    }

    const data = {
      product_id: id,
    };
    dispatch(addWishlistThunk(data));
  };
  return (
    <Card
      sx={{
        width: 250,
        maxHeight: 350,
        padding: "0.5rem 0.5rem",
        borderRadius: "0.3rem",
        margin: "0.2rem",
        marginBottom: "3rem",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.stopPropagation();
        navigate(product_page(data?._id));
      }}
    >
      {loading ? (
        <Skeleton width={233} height={200} />
      ) : (
        <img
          src={data?.image?.[0]}
          alt=""
          style={{
            maxHeight: "200px",
            width: "100%",
            objectFit: "contain",
          }}
        />
      )}
      {loading ? (
        <Skeleton width={234} height={54} />
      ) : (
        <CardContent>
          <Typography
            gutterBottom
            sx={{ lineHeight: 1.1, fontSize: "1rem", height: "1rem" }}
          >
            {data?.title?.slice(0, 25)}...
          </Typography>
        </CardContent>
      )}
      {loading ? (
        <Skeleton width={234} height={52.5} />
      ) : (
        <CardActions
          sx={{
            padding: " 0.5rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="add to favorites"
            color={wish?.list?.[data?._id] === 1 ? "secondary" : "default"}
            sx={{ position: "absolute", top: 5, left: 2 }}
            onClick={(e) => addWishlist(e, data?._id)}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            ₹{data?.price}
          </Typography>
          {}
          {!cartList[data?._id] ? (
            <Button
              variant="contained"
              onClick={(e) => addToCart(e, data?._id)}
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
                <AddBoxOutlinedIcon />
              </IconButton>{" "}
              {cartList[data?._id]}
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={(e) => updateCart(e, "decrement")}
              >
                <IndeterminateCheckBoxOutlinedIcon />
              </IconButton>{" "}
            </Box>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default ProductCard;
