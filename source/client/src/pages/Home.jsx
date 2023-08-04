import React from "react";
import Box from "@mui/material/Box";
import Typenav from "../components/Typenav";
import Products from "../components/Products";
import FilterComponent from "../components/FilterComponent";
import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Box sx={{ padding: "10rem 0rem" }}>
      <Typenav />
      <Box sx={{ maxWidth: "70%", margin: "0 auto" }}>
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>
          {searchParams.get("type") ? (
            <Grid lg={2.5} md={2}>
              <FilterComponent />
            </Grid>
          ) : (
            <></>
          )}
          <Grid lg={9.5} md={10}>
            <Products />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
