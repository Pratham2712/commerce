import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  ClickAwayListener,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTypeCatThunk } from "../redux/slices/homeSlice";
import { useTheme } from "@mui/material/styles";

const Typenav = () => {
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

  //useEffect
  useEffect(() => {
    dispatch(getTypeCatThunk());
  }, []);

  return (
    <Box
      sx={{ display: "flex" }}
      onMouseLeave={() => {
        handleClose();
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          position: "fixed",
          top: 64,
          //background: "#292929",
          background: "#fff",
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
            sx={{ display: { color: "black " } }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "black" }}
                value={item}
                // onClick={(e) => {
                //   getTypeCat(e.target.value);
                //   handleMenu(e);
                // }}
                onMouseOver={(e) => {
                  //handleClose();
                  handleMenu(e);
                }}
              >
                {item}
              </Button>
            ))}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Popper
        open={anchorEl}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 10 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "1rem 1rem",
                    width: 350,
                    height: 200,
                  }}
                >
                  {category?.[0]?.data?.map((ele) => {
                    if (anchorEl?.value == ele?.type) {
                      return ele?.categories?.map((data) => {
                        return (
                          <>
                            {" "}
                            <Typography
                              sx={{ fontWeight: "bold", marginBottom: 1 }}
                            >
                              {data?.category}
                              {data?.subCategory?.map((elm) => {
                                return <MenuList>{elm}</MenuList>;
                              })}
                            </Typography>
                          </>
                        );
                      });
                    }
                  })}
                </MenuList>
                {/* <MenuList>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList> */}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {/* <Menu
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
      </Menu> */}
    </Box>
  );
};

export default Typenav;
