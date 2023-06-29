import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { getTypeCatThunk } from "../redux/slices/homeSlice";

const Home = () => {
  const navItems = ["MALE", "FEMALE", "KIDS"];
  const dispatch = useDispatch();

  const getTypeCat = (type) => {
    const data = {
      type: type,
    };
    dispatch(getTypeCatThunk(data));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          position: "absolute",
          top: 64,
          background: "#292929",
          height: "2.5rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ display: { xs: "none", sm: "block", color: "white" } }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                value={item}
                onMouseOver={(e) => getTypeCat(e.target.value)}
              >
                {item}
              </Button>
            ))}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Home;
