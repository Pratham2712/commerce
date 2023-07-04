import React from "react";
import Box from "@mui/material/Box";
import Typenav from "../components/Typenav";
import Products from "../components/Products";

const Home = () => {
  return (
    <Box sx={{ padding: "10rem 0rem" }}>
      <Typenav />
      <Products></Products>
    </Box>
  );
};

export default Home;
