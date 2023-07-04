import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk } from "../redux/slices/homeSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Pagination, Stack } from "@mui/material";
import { createSearchParams, useSearchParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  //useSelector
  const product = useSelector(
    (state) => state.rootReducer.homeSlice.data.products
  );
  console.log(product);
  const total = useSelector((state) => state.rootReducer.homeSlice.data.total);
  //Function
  const pageParams = (page, pageSize) => {
    const params = Object.fromEntries(searchParams);
    params["page"] = page;
    params["pagesize"] = pageSize;
    setSearchParams(createSearchParams(params));
  };
  //useEffect
  useEffect(() => {
    pageParams(
      searchParams.get("page") || 1,
      searchParams.get("pagesize") || 4
    );
    const data = {
      page: searchParams.get("page") - 1,
      pagesize: searchParams.get("pagesize"),
    };
    dispatch(getProductThunk(data));
  }, [
    searchParams.get("page"),
    searchParams.get("pagesize"),
    searchParams.get("type"),
    searchParams.get("subcategory"),
  ]);
  console.log(searchParams.get("page"), searchParams.get("pagesize"));

  // useEffect(() => {
  //   const data = {
  //     page: searchParams.get("page") - 1,
  //     pagesize: searchParams.get("pagesize"),
  //   };
  //   dispatch(getProductThunk(data));
  // }, [searchParams.get("page"), searchParams.get("pagesize")]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={total}
            onChange={(e, value) => {
              pageParams(parseInt(value), 4);
            }}
            color="primary"
            page={parseInt(searchParams.get("page"))}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Products;
