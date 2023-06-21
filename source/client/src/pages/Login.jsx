import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { getNumberThunk, loginThunk } from "../redux/slices/UserInfoSlice";

const Login = ({ loginOpen, setLoginOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  //useSelector
  const loading = useSelector(
    (state) => state.rootReducer.UserInfoSlice.data.loading
  );
  //schema
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email address"),
    password: yup
      .string()
      .min(3, "password must contain 3 letters")
      .max(16, "password cannot exceed 16 letters")
      .required("Password is required"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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
      email: "",
      password: "",
      confrim: "",
    },
  });

  //function
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const sendLog = ({ email, password }) => {
    dispatch(loginThunk({ email: email, password: password }));
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
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
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
            />
            <Typography sx={{ height: "1.5rem" }}>
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
            <TextField
              margin="dense"
              id="password"
              label="Enter password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="filled"
              {...register("password")}
              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ height: "1.5rem" }}>
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
            <TextField
              margin="dense"
              id="confirm"
              label="Confirm password"
              name="confirm"
              type="password"
              fullWidth
              variant="filled"
              {...register("confirm")}
              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ height: "1.5rem" }}>
              <ErrorMessage
                errors={errors}
                name="confirm"
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
