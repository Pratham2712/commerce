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
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { deleteCartThunk, updateSizeThunk } from "../redux/slices/cartSlice";
const CartComponent = ({ data }) => {
  const [size, setSize] = React.useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  //useSelector
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
  );
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
      product_id: data?.product_id?._id,
      size: event.target.value,
    };
    dispatch(updateSizeThunk(info));
    setSize(event.target.value);
  };
  const deleteCart = () => {
    const info = {
      product_id: data?.product_id?._id,
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
        [theme.breakpoints.down("sm")]: {
          height: "8rem",
        },
      }}
    >
      <img
        className="cart-img"
        src={data?.product_id?.image?.[0]}
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
          {data?.product_id?.title.slice(0, 20)}...
        </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select size
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={data?.size}
            onChange={(e) => handleChange(e)}
            label="Select size"
          >
            {data?.product_id?.size?.map((ele) => {
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
            onClick={(e) => updateCart(e, "increment", data?.product_id?._id)}
          >
            <AddBoxOutlinedIcon />
          </IconButton>{" "}
          {cartList[data?.product_id?._id]}
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={(e) => updateCart(e, "decrement", data?.product_id?._id)}
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
          Rs.{data?.product_id?.price}
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
