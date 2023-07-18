import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PasswordIcon from "@mui/icons-material/Password";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../constants/constants";
import { clearErrorSlice, signupThunk } from "../redux/slices/UserInfoSlice";

const Signup = ({ signup, setSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const dispatch = useDispatch();

  //useSelector
  const loading = useSelector(
    (state) => state.rootReducer.UserInfoSlice.data.loading
  );

  const showError = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isError
  );
  const errorMsg = useSelector(
    (state) => state.rootReducer.UserInfoSlice.errorData.message
  );
  //schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(3, "password must contain 3 letters")
      .max(16, "password cannot exceed 16 letters")
      .required("Password is required"),
    username: yup.string().required("Username is required"),
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
      password: "",
      username: "",
    },
  });
  //function
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = ({ username, password }) => {
    const detail = {
      username: username,
      password: password,
    };
    dispatch(signupThunk(detail)).then((data) => {
      if (data?.payload?.type === SUCCESS) {
        setSuccessMsg(true);
        setSignup(false);
      }
    });
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };

  const clearError = () => {
    dispatch(clearErrorSlice());
  };
  const handleUsernameChange = (event, name) => {
    setValue(name, event.target.value); // Update the value of the username field
    trigger(name); // Trigger validation when the username value changes
  };
  return (
    <>
      <Snackbar
        open={showError}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={clearError}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={clearError}
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successMsg}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
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
          Logged in successfully
        </Alert>
      </Snackbar>
      {loading ? (
        <Skeleton variant="rounded" width={210} height={60} />
      ) : (
        <Dialog
          open={signup}
          onClose={() => {
            setSignup(false);
          }}
        >
          <DialogTitle>Signup</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Enter username"
              name="username"
              type="text"
              fullWidth
              variant="filled"
              {...register("username")}
              onBlur={handleBlur}
              onChange={(e) => handleUsernameChange(e, "username")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="username"
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
              onChange={(e) => handleUsernameChange(e, "password")}
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
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="password"
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
              onClick={handleSubmit(onSubmit)}
            >
              Signup
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Signup;
