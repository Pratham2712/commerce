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
import Link from "@mui/material/Link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";

import {
  checkUsernameThunk,
  clearErrorSlice,
  loginThunk,
} from "../redux/slices/UserInfoSlice";
import { SUCCESS } from "../constants/constants";
import Signup from "./Signup";

const Login = ({ loginOpen, setLoginOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false);

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

  // const isUsername = useSelector(
  //   (state) => state.rootReducer.UserInfoSlice.data.userExist
  // );
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
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    username: yup.string().required("Username is required"),
    // .test("isUsernameTaken", "Username is already taken", (value) => {
    //   console.log(exist);
    //   if (exist) {
    //     return false;
    //   }
    //   return true; // Validation passes when isUsername is false
    // }),
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
      //email: "",
      password: "",
      confrim: "",
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
    dispatch(checkUsernameThunk({ data: username.trim() })).then((data) => {
      if (data.payload.data === false) {
        dispatch(loginThunk(detail)).then((data) => {
          if (data.payload.type === SUCCESS) {
            setSuccessMsg(true);
          }
        });
        setLoginOpen(false);
      } else {
        setError("username", {
          type: "manual",
          message: "Username is already taken",
        });
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
            <TextField
              margin="dense"
              id="confirm"
              label="Confirm password"
              name="confirm"
              type="password"
              fullWidth
              variant="filled"
              {...register("confirm")}
              onChange={(e) => handleUsernameChange(e, "confirm")}
              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="confirm"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link
              underline="hover"
              sx={{
                paddingLeft: "1rem",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
              onClick={() => {
                setSignup(true);
                setLoginOpen(false);
              }}
            >
              {" "}
              Already have account? Signup
            </Link>
            <Button
              variant="outlined"
              type="submit"
              // onClick={() => {
              //   if (!!errors && errors.username?.type === "manual") {
              //     return; // Do not submit the form when a manual error is present
              //   }
              //   handleSubmit(onSubmit);
              // }}
              onClick={handleSubmit(onSubmit)}
            >
              confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Signup signup={signup} setSignup={setSignup} />
    </>
  );
};

export default Login;
