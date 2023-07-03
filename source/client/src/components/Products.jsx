import React, { useDeferredValue, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk } from "../redux/slices/homeSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();

  //useSelector
  const product = useSelector(
    (state) => state.rootReducer.homeSlice.data.products
  );
  //useEffect
  useEffect(() => {
    const data = {};
    dispatch(getProductThunk(data));
  }, []);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {product.map((data) => {
        return (
          <Card
            sx={{
              width: 250,
              maxHeight: 350,
              padding: "0.5rem 0.5rem",
              borderRadius: "0.3rem",
              margin: "0.2rem",
              marginBottom: "3rem",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              position: "relative",
            }}
          >
            {/* <CardMedia
              sx={{ minHeight: 200 }}
              image={data?.image?.[0]}
              title="green iguana"
            /> */}
            <img
              src={data?.image?.[0]}
              alt=""
              style={{
                maxHeight: "200px",
                width: "100%",
                objectFit: "contain",
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                sx={{ lineHeight: 1.1, fontSize: "1rem", height: "1rem" }}
              >
                {data?.title.slice(0, 25)}...
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: " 0.5rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="add to favorites"
                sx={{ position: "absolute", top: 5, left: 2 }}
              >
                <FavoriteIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                ₹{data?.price}
              </Typography>
              <Button variant="contained">Add to cart</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default Products;
