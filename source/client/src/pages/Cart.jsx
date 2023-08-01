import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartPageThunk } from "../redux/slices/cartSlice";

import { getAllCartThunk } from "../redux/slices/homeSlice";
import CartComponent from "../components/CartComponent";
import { useTheme } from "@mui/material";
import { createSearchParams, useSearchParams } from "react-router-dom";
import DeliveryDetails from "../components/DeliveryDetails";
import { SUCCESS } from "../constants/constants";
import { createOrderThunk } from "../redux/slices/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const steps = ["Checkout cart", "Delivery details", "Payment"];
  const [errorId, setErrorId] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  //useSelector
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const updateDone = useSelector(
    (state) => state.rootReducer.homeSlice.updateDone
  );

  const cart = useSelector((state) => state.rootReducer.cartSlice.data.cart);

  const totalPrice = useSelector(
    (state) => state.rootReducer.cartSlice.data.totalPrice
  );
  const updateDoneCart = useSelector(
    (state) => state.rootReducer.cartSlice.updateDone
  );
  const cart_id = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.id
  );
  //function
  const checkSize = () => {
    for (const val of cart) {
      if (!val?.size) {
        setErrorId(val?.product_id);
        setSizeError(true);
        return false;
      }
    }
    return true;
  };
  const nextPageDetails = () => {
    if (checkSize()) {
      const data = {
        amount: totalPrice,
        cart_id: cart_id,
      };
      dispatch(createOrderThunk(data)).then((data) => {
        if (data.payload?.type === SUCCESS) {
          const params = Object.fromEntries(searchParams);
          params["process"] = 1;
          setSearchParams(createSearchParams(params));
        }
      });
    }
  };
  const clearSizeError = () => {
    setSizeError(false);
  };
  //useEffect
  useEffect(() => {
    dispatch(getCartPageThunk());
    dispatch(getAllCartThunk());
  }, [isLogin, updateDoneCart, updateDone]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["process"] = searchParams.get("process") || 0;
    setSearchParams(createSearchParams(params));
  }, []);

  return (
    <>
      <Snackbar
        open={sizeError}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        onClose={clearSizeError}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={clearSizeError}
          sx={{ width: "100%" }}
        >
          Select Size
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: "100%",
          padding: "6.5rem 0rem 0rem 0rem",
          maxWidth: "70rem",
          margin: "0 auto",
        }}
      >
        <Stepper
          activeStep={parseInt(searchParams.get("process"))}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel color="secondary">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 0rem 0rem 0rem",
          flexGrow: 1,
          maxWidth: "70rem",
          margin: "0 auto",
          [theme.breakpoints?.down("md")]: {
            width: "100%",
          },
          [theme.breakpoints?.down("sm")]: {
            width: "100%",
            padding: "1rem 0rem 0rem 0rem",
          },
          overflowX: "hidden",
        }}
      >
        {!isLogin ? (
          <Typography variant="h5">Please Login</Typography>
        ) : (
          <>
            {parseInt(searchParams.get("process")) === 0 && (
              <Grid container spacing={0} sx={{ justifyContent: "center" }}>
                <Grid lg={8} md={9} sm={10} sx={{ width: "100%" }}>
                  {cart?.map((data) => {
                    return (
                      <CartComponent
                        data={data}
                        errorId={errorId}
                        setErrorId={setErrorId}
                      />
                    );
                  })}
                </Grid>
                <Grid lg={4} md={5} sx={{ width: "100%" }}>
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
                    <Box
                      sx={{ border: "solid 1px grey", padding: "1rem 0.5rem" }}
                    >
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
                            <Typography
                              sx={{ fontSize: "0.8rem", width: "70%" }}
                            >
                              {data?.product?.title}
                            </Typography>

                            <Typography sx={{ fontSize: "0.8rem" }}>
                              x{data?.count}
                            </Typography>
                            <Typography sx={{ fontSize: "0.8rem" }}>
                              ₹{data?.product?.price * data?.count}
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
                        <Typography>₹{totalPrice || 0}</Typography>
                      </div>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        sx={{
                          width: "70%",
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={() => nextPageDetails()}
                      >
                        proceed to shipping
                      </Button>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            )}
            {parseInt(searchParams.get("process")) === 1 && <DeliveryDetails />}
            {parseInt(searchParams.get("process")) === 2 && <div>Payment</div>}
          </>
        )}
      </Box>
    </>
  );
};

export default Cart;
