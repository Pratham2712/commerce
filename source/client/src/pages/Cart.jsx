import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  //useSelector
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  useEffect(() => {
    if (isLogin) {
    }
  }, []);
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
            <Box>cart</Box>
            <Box>cart</Box>
            <Box>cart</Box>
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
