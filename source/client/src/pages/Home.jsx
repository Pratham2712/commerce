import React from "react";
import Box from "@mui/material/Box";
import Typenav from "../components/Typenav";
import Products from "../components/Products";
import FilterComponent from "../components/FilterComponent";
import { Grid, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Box sx={{ padding: "10rem 0rem" }}>
      <Typenav />
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto",
          [theme.breakpoints?.down("lg")]: {
            maxWidth: "80%",
          },
          [theme.breakpoints?.down("md")]: {
            maxWidth: "90%",
          },
          [theme.breakpoints?.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>
          {searchParams.get("type") ? (
            <Grid lg={2.5} md={3.5} sm={3}>
              <FilterComponent />
            </Grid>
          ) : (
            <></>
          )}
          <Grid lg={9.5} md={8.5} sm={9}>
            <Products />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
