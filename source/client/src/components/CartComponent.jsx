import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { updateCartThunk } from "../redux/slices/homeSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import { deleteCartThunk, updateSizeThunk } from "../redux/slices/cartSlice";
import { SUCCESS } from "../constants/constants";
const CartComponent = ({ data, errorId, setErrorId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  //useSelector
  //function
  const updateCart = (e, type, id) => {
    e.stopPropagation();
    const info = {
      type: type,
      product_id: id,
    };
    dispatch(updateCartThunk(info));
  };
  const handleChange = (event) => {
    const info = {
      product_id: data?.product?._id,
      size: event.target?.value,
    };
    dispatch(updateSizeThunk(info)).then((data) => {
      console.log(data.payload.data._id, errorId);
      if (data.payload.type === SUCCESS) {
        for (const val of data.payload?.data?.list) {
          if (val?.product_id === errorId) {
            setErrorId("");
          }
        }
      }
    });
  };
  const deleteCart = () => {
    const info = {
      product_id: data?.product?._id,
    };
    dispatch(deleteCartThunk(info));
  };
  return (
    <Box
      sx={{
        height: "11rem",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
        border: "solid 1px grey",
        padding: "0rem 1rem",
        [theme.breakpoints.down("xl")]: {
          height: "9rem",
        },
        [theme.breakpoints.down("lg")]: {
          height: "8rem",
        },
        [theme.breakpoints.down("sm")]: {
          height: "8rem",
        },
      }}
    >
      <img
        className="cart-img"
        src={data?.product?.image?.[0]}
        alt=""
        style={{
          height: "100%",
          width: "20%",
          borderRight: "solid 1px grey",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.8rem",
            },
          }}
        >
          {data?.product?.title.slice(0, 20)}...
        </Typography>
        <FormControl
          variant="standard"
          sx={{ minWidth: 120 }}
          error={errorId === data?.product_id}
        >
          <InputLabel
            id={
              errorId === data?.product_id
                ? "demo-simple-select-error-label"
                : "demo-simple-select-standard-label"
            }
          >
            Select size
          </InputLabel>
          <Select
            labelId={
              errorId === data?.product_id
                ? "demo-simple-select-error-label"
                : "demo-simple-select-standard-label"
            }
            id={
              errorId === data?.product_id
                ? "demo-simple-select-error"
                : "demo-simple-select-standard"
            }
            value={data?.size}
            onChange={(e) => handleChange(e)}
            label="Select size"
          >
            {data?.product?.size?.map((ele) => {
              return <MenuItem value={ele}>{ele}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>QTY:</Typography>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={(e) => updateCart(e, "increment", data?.product?._id)}
          >
            <AddBoxOutlinedIcon />
          </IconButton>{" "}
          {data?.count}
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={(e) => updateCart(e, "decrement", data?.product?._id)}
          >
            <IndeterminateCheckBoxOutlinedIcon />
          </IconButton>{" "}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
          }}
        >
          Rs.{data?.product?.price}
        </Typography>
        <Typography
          color="primary"
          onClick={() => deleteCart()}
          sx={{ cursor: "pointer" }}
        >
          Delete
        </Typography>
      </Box>
    </Box>
  );
};

export default CartComponent;
