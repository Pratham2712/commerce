import React from "react";
import { addToCartThunk, updateCartThunk } from "../redux/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

const ProductCard = ({ data, loginOpen, setLoginOpen }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
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

  const updateCart = (type) => {
    console.log(type);
    const info = {
      type: type,
      product_id: data?._id,
    };
    dispatch(updateCartThunk(info));
  };
  // const arrayOfProductId = cartList?.list?.map((elm, idx) => {
  //   return elm.product_id;
  // });

  // const isCart = arrayOfProductId?.includes(data?._id);

  // useEffect(() => {
  //   if (cartList?.list) {
  //     console.log("called");
  //     for (const val of cartList?.list) {
  //       if (val?.product_id === data?._id) {
  //         //setIsCart(true);
  //         setCount({ key: data?._id, value: val?.count });
  //         break;
  //       }
  //     }
  //   }
  // }, [cartList, searchParams.get("page")]);
  // console.log("count", count);
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
        {!cartList[data?._id] ? (
          <Button variant="contained" onClick={() => addToCart(data?._id)}>
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
              onClick={() => updateCart("increment")}
            >
              <AddBoxOutlinedIcon />
            </IconButton>{" "}
            {cartList[data?._id]}
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => updateCart("decrement")}
            >
              <IndeterminateCheckBoxOutlinedIcon />
            </IconButton>{" "}
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
