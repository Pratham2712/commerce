import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import CategoryIcon from "@mui/icons-material/Category";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { NavLink } from "react-router-dom";
import { Admin_Category } from "../../constants/links";

const AdminNavbar = () => {
  const [open, setOpen] = useState(true);
  const drawerWidth = 300;
  return (
    <div style={{ position: "absolute", zIndex: "100" }}>
      <Button
        sx={{
          marginLeft: open ? "18rem" : "0rem",
          transition: " 0.3s all ease",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? (
          <KeyboardDoubleArrowLeftRoundedIcon
            sx={{ height: "3rem", width: "3rem" }}
          />
        ) : (
          <KeyboardDoubleArrowRightRoundedIcon
            sx={{ height: "3rem", width: "3rem" }}
          />
        )}
      </Button>
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <List
          sx={{
            marginTop: "0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <NavLink
            to={Admin_Category}
            style={{ width: "100%", textDecoration: "none", color: "inherit" }}
          >
            {({ isActive, isPending }) => (
              <ListItem
                disablePadding
                sx={{
                  background: isActive ? "#ededed" : "",
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add category"} />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Add products"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default AdminNavbar;
