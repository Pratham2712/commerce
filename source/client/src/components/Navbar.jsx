import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";

import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserLoginThunk,
  logoutThunk,
} from "../redux/slices/UserInfoSlice";
import { User_Cart, User_Home } from "../constants/links";
import { Link, NavLink } from "react-router-dom";
import { getResultThunk } from "../redux/slices/homeSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));
const StyledAppbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState();
  const open = Boolean(anchorEl2);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const userName = useSelector(
    (state) => state.rootReducer.UserInfoSlice.data.userInfo.username
  );

  const totalCart = useSelector(
    (state) => state.rootReducer.homeSlice.data.cart.totalCart
  );

  const searchResult = useSelector(
    (state) => state.rootReducer.homeSlice.data.searchResult
  );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  //function
  const getResult = (data) => {
    const info = {
      word: data.value,
    };
    dispatch(getResultThunk(info));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {isLogin ? (
        <MenuItem
          onClick={() => {
            dispatch(logoutThunk());
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      ) : (
        <></>
      )}
    </Menu>
  );
  useEffect(() => {
    dispatch(checkUserLoginThunk());
  }, []);
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink
          to={User_Cart}
          style={{
            width: "100%",
            textDecoration: "none",
            color: "inherit",
          }}
          onClick={handleMobileMenuClose}
        >
          {({ isActive, isPending }) => (
            <div style={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={totalCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <p>cart</p>
            </div>
          )}
        </NavLink>
      </MenuItem>
      <MenuItem>
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "black" }}
          onClick={() => {
            //!isLogin ? setLoginOpen(!loginOpen) : "";
            if (!isLogin) {
              setLoginOpen(!loginOpen);
            }
            handleMobileMenuClose();
          }}
        >
          {isLogin ? userName : "Login/Signup"}
        </Button>
      </MenuItem>

      <MenuItem
        onClick={(e) => {
          handleProfileMenuOpen(e);
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="fixed">
          <StyledAppbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Link
                to={User_Home}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Fashion
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 0.13 }} />
            <Search ref={setAnchorEl2} sx={{ position: "relative" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => getResult(e.target)}
              />
            </Search>

            <Box
              sx={{
                position: "absolute",
                background: "white",
                borderRadius: "6px",
                top: "85%",
                color: "black",
                left: "28%",
                minWidth: "30rem",
                width: "30rem",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                padding: "1rem 1rem",
              }}
            >
              {searchResult && (
                <Box>
                  <Box>
                    {searchResult?.map((ele) => {
                      return <Typography>{ele?.title}</Typography>;
                    })}
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{ flexGrow: 0.13 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={() => (!isLogin ? setLoginOpen(!loginOpen) : "")}
              >
                {isLogin ? userName : "Login/Signup"}
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0.13 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <NavLink
                to={User_Cart}
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {({ isActive, isPending }) => (
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={totalCart} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                )}
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 0.13 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                ari44a-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
            {renderMobileMenu}
            {renderMenu}
          </StyledAppbar>
        </AppBar>
        <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      </Box>
    </>
  );
};

export default Navbar;
