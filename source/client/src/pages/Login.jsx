import React from "react";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";
import { getNumberThunk } from "../redux/slices/UserInfoSlice";

const Login = ({ loginOpen, setLoginOpen }) => {
  const dispatch = useDispatch();
  //useSelector
  const loading = useSelector(
    (state) => state.rootReducer.UserInfoSlice.data.loading
  );
  //schema
  const schema = yup.object().shape({
    number: yup
      .number()
      .required("phone number is required")
      .min(1000000000, "phone number must be at least 10 digits")
      .max(9999999999, "phone number cannot exceed 10 digits")
      .typeError("phone number is required"),
  });

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValidating },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      number: "",
    },
  });

  const sendLog = ({ number }) => {
    dispatch(getNumberThunk({ phone: number.toString() }));
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={210} height={60} />
      ) : (
        <Dialog
          open={loginOpen}
          onClose={() => {
            setLoginOpen(false);
          }}
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let's start by entering your 10-Digit mobile number.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              name="number"
              type="number"
              fullWidth
              variant="filled"
              {...register("number")}
              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SmartphoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ height: "1.5rem" }}>
              <ErrorMessage
                errors={errors}
                name="number"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              type="submit"
              disabled={!isDirty || isValidating}
              onClick={handleSubmit(sendLog)}
            >
              confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Login;
