import React, { useState } from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryThunk,
  clearErrorSlice,
} from "../../redux/slices/adminSlice";
import { SUCCESS } from "../../constants/constants";
import AdminCategoryTable from "../../components/adminComponents/AdminCategoryTable";

const AdminAddCategory = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const dispatch = useDispatch();

  //useSelector
  const showError = useSelector(
    (state) => state.rootReducer.adminSlice.isError
  );
  const errorMsg = useSelector(
    (state) => state.rootReducer.adminSlice.errorData.message
  );

  const message = useSelector(
    (state) => state.rootReducer.adminSlice.successData.message
  );

  //schema
  const schema = yup.object().shape({
    category: yup.string().required("Category name is required"),
  });
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
      category: "",
      type: "MALE",
    },
  });
  //Function
  const clearError = () => {
    dispatch(clearErrorSlice());
  };
  const onSubmit = ({ category, type }) => {
    const data = {
      category: category,
      type: type,
    };
    dispatch(addCategoryThunk(data)).then((data) => {
      if (data.payload.type === SUCCESS) {
        setSuccessMsg(true);
      }
    });
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
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
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginLeft: "23rem",
          paddingTop: "3rem",
        }}
      >
        <div
          style={{
            padding: "0rem 0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Box>
            <TextField
              margin="dense"
              id="category"
              label="Category name"
              name="category"
              type="text"
              variant="standard"
              {...register("category")}
              onBlur={handleBlur}
            ></TextField>
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="category"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </Box>
          <FormControl sx={{ marginTop: "1rem" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">TYPE</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="type"
              defaultValue="MALE"
              {...register("type")}
              onBlur={handleBlur}
              onChange={(e) => handleUsernameChange(e, "type")}
            >
              <FormControlLabel
                name="type"
                value="MALE"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                name="type"
                value="FEMALE"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                name="type"
                value="KIDS"
                control={<Radio />}
                label="Kids"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem" }}
            onClick={handleSubmit(onSubmit)}
          >
            {" "}
            Add Category
          </Button>
        </div>
        <AdminCategoryTable />
      </Box>
    </>
  );
};

export default AdminAddCategory;
