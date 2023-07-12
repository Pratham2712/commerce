import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartPageThunk } from "../redux/slices/cartSlice";

import { getAllCartThunk } from "../redux/slices/homeSlice";
import CartComponent from "../components/CartComponent";
import { useTheme } from "@mui/material";
import { SUCCESS } from "../constants/constants";

const Cart = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const theme = useTheme();
  //useSelector
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const updateDone = useSelector(
    (state) => state.rootReducer.homeSlice.updateDone
  );
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
  );
  const cart = useSelector((state) => state.rootReducer.cartSlice.data.cart);

  // let tot = 0;
  // for (const val of cart) {
  //   //setTotal(total + val?.product_id?.price * cartList[val?.product_id?._id]);
  //   tot = tot + val?.product_id?.price * cartList[val?.product_id?._id];
  // }
  // setTotal(tot);
  useEffect(() => {
    dispatch(getCartPageThunk());
  }, [isLogin]);

  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [updateDone, isLogin]);

  useEffect(() => {
    console.log("called");
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
        [theme.breakpoints?.down("md")]: {
          width: "100%",
        },
        [theme.breakpoints?.down("sm")]: {
          width: "100%",
          padding: "7rem 0rem 0rem 0rem",
        },
        overflowX: "hidden",
      }}
    >
      {!isLogin ? (
        <Typography variant="h5">Please Login</Typography>
      ) : (
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>
          <Grid lg={8} md={9} sm={10}>
            {cart?.map((data) => {
              return <CartComponent data={data} />;
            })}
          </Grid>
          <Grid lg={4} md={5}>
            <Box
              sx={{
                marginTop: "0.7rem",
                marginLeft: "0.3rem",
                [theme.breakpoints?.down("sm")]: {
                  marginLeft: "0rem",
                },
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {" "}
                Order Details
              </Typography>
              <Box sx={{ border: "solid 1px grey", padding: "1rem 0.5rem" }}>
                {cart?.map((data) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        borderBottom: "solid 1px grey",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem", width: "70%" }}>
                        {data?.product_id?.title}
                      </Typography>

                      <Typography sx={{ fontSize: "0.8rem" }}>
                        x{cartList[data?.product_id?._id]}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        ₹
                        {data?.product_id?.price *
                          cartList[data?.product_id?._id]}
                      </Typography>
                    </div>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Cart Total </Typography>
                  <Typography>{total}</Typography>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
