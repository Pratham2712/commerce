import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
  alpha,
} from "@mui/material";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryThunk,
  clearErrorSlice,
  getCatbyType,
} from "../../redux/slices/adminSlice";
import { SUCCESS } from "../../constants/constants";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AdminAddProduct = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorSub, setAnchorSub] = useState(null);
  const [subData, setSubData] = useState([]);
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
    title: yup.string().required("title is required"),
    type: yup.string().required("type name is required"),
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
      title: "",
      type: "MALE",
      category: "",
      subcategory: "",
      color: "",
      brand: "",
    },
  });
  const category = watch("category");
  const subcategory = watch("subcategory");
  const color = watch("color");
  console.log(color);
  //useSelector
  const typeData = useSelector(
    (state) => state.rootReducer.adminSlice.data.categoryData
  );
  //Function
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSubClick = (event) => {
    setAnchorSub(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubClose = () => {
    setAnchorSub(null);
  };
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
  const handleChange = (event, name) => {
    setValue(name, event.target.value); // Update the value of the username field
    trigger(name); // Trigger validation when the username value changes
  };
  const handleCatChange = (event, name) => {
    setValue(name, event);
    trigger(name);
    setAnchorEl(null);
  };
  const handleSubChange = (event, name) => {
    setValue(name, event);
    trigger(name);
    setAnchorSub(null);
  };

  //useEffect
  const type = watch("type");
  useEffect(() => {
    const data = {
      type: type,
    };
    dispatch(getCatbyType(data));
  }, []);
  useEffect(() => {
    const data = {
      type: type,
    };
    dispatch(getCatbyType(data));
    setValue("category", "");
    setValue("subcategory", "");
  }, [type]);
  useEffect(() => {
    setSubData(typeData?.data?.filter((ele) => ele.category === category));
  }, [category]);

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
          marginLeft: "25rem",
          paddingTop: "3rem",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "0rem 0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 850,
          }}
        >
          <Box>
            <TextField
              margin="dense"
              id="title"
              label="Title"
              name="title"
              type="text"
              variant="standard"
              {...register("title")}
              onBlur={handleBlur}
              fullWidth
            ></TextField>
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="title"
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
              onChange={(e) => handleChange(e, "type")}
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
          <div>
            <Button
              id="demo-customized-button"
              aria-controls={anchorEl ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {category ? category : "category"}
            </Button>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={anchorEl}
              onClose={handleClose}
            >
              {typeData?.data?.map((data) => {
                return (
                  <MenuItem
                    {...register("category")}
                    onClick={() => handleCatChange(data?.category, "category")}
                    disableRipple
                  >
                    {data?.category}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <div>
            <Button
              id="demo-customized-button"
              aria-controls={anchorSub ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorSub ? "true" : undefined}
              variant="outlined"
              disableElevation
              onClick={handleSubClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {subcategory ? subcategory : "subcategory"}
            </Button>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorSub}
              open={anchorSub}
              onClose={handleSubClose}
            >
              {subData?.[0]?.subCategory?.map((ele) => {
                return (
                  <MenuItem
                    {...register("subcategory")}
                    onClick={() => handleSubChange(ele, "subcategory")}
                    disableRipple
                  >
                    {ele}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <Box>
            <label
              htmlFor="color"
              style={{ fontSize: "1.3rem", fontWeight: "lighter" }}
            >
              Select color :{" "}
            </label>
            <input {...register("color")} id="color" type="color" />
          </Box>
          <Box></Box>
          <Box>
            <TextField
              margin="dense"
              id="brand"
              label="Brand"
              name="brand"
              type="text"
              variant="standard"
              {...register("brand")}
              onBlur={handleBlur}
            ></TextField>
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="brand"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default AdminAddProduct;
