import { Box, Grid, Typography, formControlLabelClasses } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartPageThunk } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  //useSelector
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const cart = useSelector((state) => state.rootReducer.cartSlice.data.cart);
  useEffect(() => {
    // if (!isLogin) {
    //   return;
    // }
    dispatch(getCartPageThunk()).then((data) => console.log(data.payload));
  }, [isLogin]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "10rem 0rem 0rem 0rem",
        flexGrow: 1,
        maxWidth: "70rem",
        margin: "0 auto",
      }}
    >
      {!isLogin ? (
        <Typography variant="h5">Please Login</Typography>
      ) : (
        <Grid container spacing={0} sx={{ width: "100%" }}>
          <Grid lg={9}>
            <Box></Box>
          </Grid>
          <Grid lg={3}>
            <Box>order details</Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
