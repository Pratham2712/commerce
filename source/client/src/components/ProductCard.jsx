import React, { useEffect, useState } from "react";
import { addToCartThunk, getAllCartThunk } from "../redux/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCard = ({ data, loginOpen, setLoginOpen }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState([]);
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
  );

  const updateDone = useSelector(
    (state) => state.rootReducer.homeSlice.updateDone
  );

  const addToCart = (id) => {
    if (!isLogin) {
      return setLoginOpen(!loginOpen);
    }
    const data = {
      product_id: id,
    };
    dispatch(addToCartThunk(data));
  };

  const arrayOfProductId = cartList?.list?.map((elm, idx) => {
    return elm.product_id;
  });

  const isCart = arrayOfProductId?.includes(data?._id);

  useEffect(() => {
    for (let i = 0; i <= cartList?.list?.length; i++) {
      console.log(val);
      if (val?.product_id === data?._id) {
        count[i] = { key: data?._id, value: val?.count };
        setCount(updatedCount);
      }
    }
  }, [updateDone]);

  console.log(count);

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
      // onClick={() => {
      //   navigate(product_page(data?._id));
      // }}
    >
      <img
        src={data?.image?.[0]}
        alt=""
        style={{
          maxHeight: "200px",
          width: "100%",
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          sx={{ lineHeight: 1.1, fontSize: "1rem", height: "1rem" }}
        >
          {data?.title?.slice(0, 25)}...
        </Typography>
      </CardContent>
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
          sx={{ position: "absolute", top: 5, left: 2 }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          ₹{data?.price}
        </Typography>
        {}
        {!isCart ? (
          <Button variant="contained" onClick={() => addToCart(data?._id)}>
            Add to cart
          </Button>
        ) : (
          <>Already Exist in user's cart</>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
