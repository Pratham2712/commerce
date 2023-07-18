import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import BusinessIcon from "@mui/icons-material/Business";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

const DeliveryDetails = () => {
  const theme = useTheme();
  //useSelector
  const totalPrice = useSelector(
    (state) => state.rootReducer.cartSlice.data.totalPrice
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
    address: yup.string().required("Delivery address is required"),
    pincode: yup
      .number()
      .typeError("pincode is required")
      .required("pincode is required"),
  });
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValidating },
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
    },
  });
  //function
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const addBasicDetails = () => {};
  return (
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
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Button
          sx={{
            width: "40%",
          }}
          variant="contained"
          color="secondary"
          onClick={handleSubmit(addBasicDetails)}
        >
          place order <br />₹{totalPrice || 0}
        </Button>
      </div>
    </Box>
  );
};

export default DeliveryDetails;
