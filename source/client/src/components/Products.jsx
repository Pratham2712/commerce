import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartThunk, getProductThunk } from "../redux/slices/homeSlice";

import { Pagination, Stack } from "@mui/material";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { product_page } from "../constants/links";
import Login from "../pages/Login";
import ProductCard from "./ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  //useSelector
  const product = useSelector(
    (state) => state.rootReducer.homeSlice.data.products
  );
  const total = useSelector((state) => state.rootReducer.homeSlice.data.total);
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const updateDone = useSelector(
    (state) => state.rootReducer.homeSlice.updateDone
  );
  const cartList = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.list
  );
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
      type: searchParams.get("type"),
      sub: searchParams.get("subcategory"),
    };
    dispatch(getProductThunk(data));
  }, [
    searchParams.get("page"),
    searchParams.get("pagesize"),
    searchParams.get("type"),
    searchParams.get("subcategory"),
  ]);

  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [updateDone, isLogin]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {product.map((data) => {
        return (
          <ProductCard
            data={data}
            loginOpen={loginOpen}
            setLoginOpen={setLoginOpen}
            flag={flag}
          />
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
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen}></Login>
    </Box>
  );
};

export default Products;
