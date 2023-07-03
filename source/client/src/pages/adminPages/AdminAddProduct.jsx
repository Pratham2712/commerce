import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  FormControlLabel,
  FormLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
  hexToRgb,
} from "@mui/material";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryThunk,
  addProductThunk,
  clearErrorSlice,
  clearSuccessMsg,
  getCatbyType,
} from "../../redux/slices/adminSlice";
import { SUCCESS } from "../../constants/constants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import styled from "@emotion/styled";

const StyledDiv = styled("div")(({ theme }) => ({
  marginTop: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 850,
}));
const AdminAddProduct = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorSub, setAnchorSub] = useState(null);
  const [subData, setSubData] = useState([]);
  const [imageurl, setImageurl] = useState([]);
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

  const isSuccess = useSelector(
    (state) => state.rootReducer.adminSlice.successData.isSuccess
  );

  const message = useSelector(
    (state) => state.rootReducer.adminSlice.successData.message
  );

  //schema
  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    type: yup.string().required("type is required"),
    category: yup.string().required("Category  is required"),
    subcategory: yup.string().required("Subcategory is required"),
    price: yup
      .number()
      .min(0, "Price must be at least zero")
      .typeError("Price is required")
      .required("Price is required"),
    desc: yup.string().required("description is required"),
    size: yup.string().required("sizes are required"),
    imageurl: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValidating },
    trigger,
    watch,
    setValue,
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      type: "MALE",
      category: "",
      subcategory: "",
      color: "",
      brand: "",
      price: "",
      desc: "",
      imageurl: "",
      size: "",
    },
  });
  const category = watch("category");
  const subcategory = watch("subcategory");
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
  const clearSuccess = () => {
    dispatch(clearSuccessMsg());
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

  const addImage = () => {
    const img = watch("imageurl").toString();
    if (imageurl.length <= 4 && img) {
      setImageurl([...imageurl, img]);
    } else {
      setError("imageurl", {
        type: "manual",
        message: "minimum 1 and maximum 5 images are allowed",
      });
    }
    setValue("imageurl", "");
  };

  const deleteImg = (img) => {
    const image = img.toString();
    const index = imageurl.indexOf(image);
    if (index > -1) {
      const arr = [...imageurl];
      arr.splice(index, 1);
      setImageurl(arr);
    }
  };

  const onSubmit = ({
    brand,
    title,
    category,
    subcategory,
    type,
    color,
    price,
    desc,
    size,
  }) => {
    const data = {
      title: title,
      image: imageurl,
      type: type,
      color: color,
      size: size.toUpperCase().split(","),
      description: desc,
      price: price,
      brand: brand,
      category: category,
      subCategory: subcategory,
    };
    if (imageurl.length > 0) {
      dispatch(addProductThunk(data)).then((data) => {
        console.log(data);
        if (data.payload.type === SUCCESS) {
          reset();
          setImageurl([]);
        }
      });
    } else {
      setError("imageurl", {
        type: "manual",
        message: "minimum 1 and maximum 5 images are allowed",
      });
    }
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
    setSubData(typeData?.filter((ele) => ele.category === category));
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
        open={isSuccess}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={clearSuccess}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={clearSuccess}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginLeft: "25rem",
          paddingTop: "3rem",
        }}
      >
        <StyledDiv>
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
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
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
              {typeData?.map((data) => {
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
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="category"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
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
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="subcategory"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </div>
        </StyledDiv>
        <StyledDiv>
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
          <Box>
            <TextField
              margin="dense"
              id="price"
              label="Price"
              name="price"
              type="number"
              variant="standard"
              {...register("price")}
              onBlur={handleBlur}
            ></TextField>
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="price"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </Box>
          <Box>
            <TextField
              margin="dense"
              id="standard-multiline-static"
              label="Description"
              name="desc"
              multiline
              maxRows={4}
              variant="standard"
              {...register("desc")}
              onBlur={handleBlur}
            ></TextField>
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="desc"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </Box>
        </StyledDiv>
        <div style={{ width: 850 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <TextField
                margin="dense"
                id="image"
                label="Image url"
                name="image"
                variant="outlined"
                {...register("imageurl")}
                onBlur={handleBlur}
                sx={{ width: 800 }}
              ></TextField>
              <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
                <ErrorMessage
                  errors={errors}
                  name="imageurl"
                  render={({ message }) => (
                    <span style={{ color: "maroon" }}>{message}</span>
                  )}
                />
              </Typography>
            </Box>
            <AddAPhotoIcon
              sx={{ fontSize: 44, marginTop: 1, cursor: "pointer" }}
              onClick={(e) => addImage(e)}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              width: "850",
              height: 250,
              justifyContent: "space-between",
              padding: "0.5rem 0.5rem",
              overflowX: "scroll",
            }}
          >
            {imageurl?.map((data) => {
              return (
                <div style={{ position: "relative" }}>
                  <img src={data} alt="" style={{ width: 150, height: 200 }} />
                  <HighlightOffRoundedIcon
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -7,
                      cursor: "pointer",
                    }}
                    onClick={() => deleteImg(data)}
                  />
                </div>
              );
            })}
          </Box>
        </div>
        <StyledDiv>
          <Box>
            <TextField
              margin="dense"
              id="size"
              label="Sizes e.g:- S,M,L"
              name="size"
              variant="outlined"
              {...register("size")}
              onBlur={handleBlur}
            ></TextField>
            <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
              <ErrorMessage
                errors={errors}
                name="size"
                render={({ message }) => (
                  <span style={{ color: "maroon" }}>{message}</span>
                )}
              />
            </Typography>
          </Box>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            sx={{ padding: "1rem 1rem" }}
          >
            Add product
          </Button>
        </StyledDiv>
      </Box>
    </>
  );
};

export default AdminAddProduct;
