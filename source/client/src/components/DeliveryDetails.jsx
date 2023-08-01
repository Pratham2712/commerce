import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import BusinessIcon from "@mui/icons-material/Business";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsThunk } from "../redux/slices/cartSlice";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { SUCCESS } from "../constants/constants";
import {
  createRazorOrderThunk,
  updateOrderThunk,
} from "../redux/slices/orderSlice";

const DeliveryDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [proceed, setProceed] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  //useSelector
  const totalPrice = useSelector(
    (state) => state.rootReducer.cartSlice.data.totalPrice
  );

  const order_id = useSelector(
    (state) => state.rootReducer.orderSlice.data.currentOrder
  );
  const user = useSelector((state) => state.rootReducer.cartSlice.data.user);
  const cart_id = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.id
  );
  ///schema
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email address"),
    phone: yup
      .number()
      .typeError("phone number is required")
      .min(1000000000, "phone number must be 10 digits")
      .max(9999999999, "phone number must be 10 digits")
      .required("phone number is required"),
    address: yup
      .string()
      .min(5, "delivery address is too short")
      .required("delivery address is required"),
    pincode: yup
      .string()
      .typeError("pincode is required")
      .required("pincode is required")
      .matches(/^\d{6}$/, "Invalid pincode"),
  });
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: "",
      email: "",
      address: "",
      pincode: "",
    },
  });
  //function
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const createOrder = (values) => {
    const data = {
      phone: values.phone,
      email: values.email,
      address: values.address,
      pincode: values.pincode,
      amount: totalPrice,
      cart_id: cart_id,
      order_id: order_id?._id,
    };

    if (
      user[0].phone != values.phone ||
      user[0].pincode != values.pincode ||
      user[0].address != values.address ||
      user[0].email != values.email
    ) {
      dispatch(updateOrderThunk(data)).then((data) => {
        if (data.payload.type === SUCCESS) {
          setSuccessMsg(true);
          setProceed(true);
        }
      });
    } else {
      setSuccessMsg(true);
      setProceed(true);
    }
  };
  const createRazorOrder = () => {
    const params = Object.fromEntries(searchParams);
    params["process"] = 2;
    setSearchParams(createSearchParams(params));
    dispatch(createRazorOrderThunk({ order_id: order_id?._id }))
      .unwrap()
      .then((data) => {
        if (data.type == SUCCESS) {
          razorpayPopup(data.data).open();
        }
      });
  };
  const razorpayPopup = (data) => {
    let options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      // this does not work everything is done in order id
      // amount: data.orderPrice + deliveryCharges * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Fashion",
      description: "Fashion all yours",
      image: "Fashion",
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        console.log(response);
        //verifyPayment(response, data.extensionNumber);
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      theme: {
        color: "#9C27B0",
        backdrop_color: "transparent",
      },
    };
    const rzp = window.Razorpay(options);
    return rzp;
  };
  const goBack = () => {
    const params = Object.fromEntries(searchParams);
    params["process"] = 0;
    setSearchParams(createSearchParams(params));
  };
  //useEffect
  useEffect(() => {
    dispatch(getUserDetailsThunk());
  }, []);
  useEffect(() => {
    if (user && user[0]) {
      const { phone, email, address, pincode } = user[0];
      setValue("phone", phone || "");
      setValue("email", email || "");
      setValue("address", address || "");
      setValue("pincode", pincode || "");
    }
  }, [user]);
  return (
    <>
      {!order_id?._id ? goBack() : <></>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem 0rem 0rem 0rem",
          flexGrow: 1,
          maxWidth: "30rem",
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
        <Snackbar
          open={successMsg}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={2000}
          onClose={() => {
            setSuccessMsg(false);
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => {
              setSuccessMsg(false);
            }}
            sx={{ width: "100%" }}
          >
            Delivery Details Confirmed
          </Alert>
        </Snackbar>
        <TextField
          margin="dense"
          id="phone"
          label="Phone number"
          name="phone"
          type="number"
          fullWidth
          variant="filled"
          {...register("phone")}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SmartphoneOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <span style={{ color: "maroon" }}>{message}</span>
            )}
          />
        </Typography>
        <TextField
          margin="dense"
          id="email"
          label="Email"
          name="email"
          type="text"
          fullWidth
          variant="filled"
          {...register("email")}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginTop: "1rem" }}
        />
        <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <span style={{ color: "maroon" }}>{message}</span>
            )}
          />
        </Typography>
        <TextField
          id="filled-multiline-static"
          label="Delivery address"
          multiline
          rows={4}
          variant="filled"
          name="address"
          {...register("address")}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon sx={{ marginTop: "-88px" }} />
              </InputAdornment>
            ),
          }}
          sx={{ marginTop: "1rem" }}
        />
        <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => (
              <span style={{ color: "maroon" }}>{message}</span>
            )}
          />
        </Typography>
        <TextField
          margin="dense"
          id="pincode"
          label="Pincode"
          name="pincode"
          type="number"
          fullWidth
          variant="filled"
          {...register("pincode")}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginTop: "1rem" }}
        />
        <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
          <ErrorMessage
            errors={errors}
            name="pincode"
            render={({ message }) => (
              <span style={{ color: "maroon" }}>{message}</span>
            )}
          />
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "0rem",
          }}
        >
          <Button
            sx={{
              width: "40%",
            }}
            variant="outlined"
            color="primary"
            onClick={handleSubmit(createOrder)}
          >
            Confirm Details
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          <Button
            sx={{
              width: "40%",
            }}
            variant="contained"
            disabled={proceed ? "" : "true"}
            color="secondary"
            onClick={() => {
              createRazorOrder();
            }}
          >
            place order <br />₹{totalPrice || 0}
          </Button>
          <Button variant="outlined" onClick={() => goBack()}>
            back
          </Button>
        </div>
        <div style={{ marginTop: "2rem" }}></div>
      </Box>
    </>
  );
};

export default DeliveryDetails;
