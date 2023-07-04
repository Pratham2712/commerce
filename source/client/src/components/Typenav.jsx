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
  MenuList,
  Paper,
  Popper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk, getTypeCatThunk } from "../redux/slices/homeSlice";
import { useTheme } from "@mui/material/styles";
import { createSearchParams, useSearchParams } from "react-router-dom";

const Typenav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navItems = ["MALE", "FEMALE", "KIDS"];
  const dispatch = useDispatch();
  const theme = useTheme();

  //useSelector
  const category = useSelector(
    (state) => state.rootReducer.homeSlice.data.category
  );
  const loading = useSelector((state) => state.rootReducer.homeSlice.loading);
  //Functions
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const subcatParam = (type, subcategory) => {
    const params = Object.fromEntries(searchParams);
    params["type"] = type;
    params["subcategory"] = subcategory;
    setSearchParams(createSearchParams(params));
    handleClose();
  };

  //useEffect
  useEffect(() => {
    dispatch(getTypeCatThunk());
  }, []);

  useEffect(() => {
    const data = {
      type: searchParams.get("type"),
      sub: searchParams.get("subcategory"),
    };
    dispatch(getProductThunk(data));
  }, [searchParams.get("type"), searchParams.get("subcategory")]);

  return (
    <Box
      sx={{ display: "flex", position: "relative" }}
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
        //anchorEl={anchorEl}
        role={undefined}
        placement="center"
        transition
        disablePortal
        sx={{
          zIndex: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "105px",
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            {loading ? (
              <Skeleton variant="rounded" width={350} height={200} />
            ) : (
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      padding: "1rem 0rem 1rem 3rem",
                    }}
                  >
                    {category?.[0]?.data?.map((ele) => {
                      if (anchorEl?.value === ele?.type) {
                        return ele?.categories?.map((data) => {
                          return (
                            <>
                              {" "}
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  marginBottom: 1,
                                  marginRight: "3rem",
                                }}
                              >
                                {data?.category}
                                {data?.subCategory?.map((elm) => {
                                  return (
                                    <Typography
                                      sx={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        "&:hover": {
                                          textDecoration: "underline",
                                        },
                                      }}
                                      onClick={() =>
                                        subcatParam(anchorEl?.value, elm)
                                      }
                                    >
                                      {elm}
                                    </Typography>
                                  );
                                })}
                              </Typography>
                            </>
                          );
                        });
                      }
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            )}
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default Typenav;
