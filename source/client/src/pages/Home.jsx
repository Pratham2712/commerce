import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { getTypeCatThunk } from "../redux/slices/homeSlice";
import { Menu, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = ["MALE", "FEMALE", "KIDS"];
  const dispatch = useDispatch();
  const theme = useTheme();

  //useSelector
  const category = useSelector(
    (state) => state.rootReducer.homeSlice.data.category
  );
  const loading = useSelector((state) => state.rootReducer.homeSlice.loading);
  //Functions
  const getTypeCat = (type) => {
    const data = {
      type: type,
    };
    dispatch(getTypeCatThunk(data));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          [theme.breakpoints.down("sm")]: {
            top: 55,
          },
        }}
      >
        <Toolbar>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ display: { color: "white" } }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                value={item}
                onClick={(e) => {
                  getTypeCat(e.target.value);
                  handleMenu(e);
                }}
              >
                {item}
              </Button>
            ))}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loading ? (
          <Skeleton variant="rounded" width={350} height={200} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "1rem 1rem",
              width: 350,
            }}
          >
            {category?.map((data) => {
              return (
                <Box>
                  <Typography sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    {data?.category}
                  </Typography>
                  <Typography>
                    {data?.subCategory?.map((elm) => {
                      return <Typography>{elm}</Typography>;
                    })}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default Home;
