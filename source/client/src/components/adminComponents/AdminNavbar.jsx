import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        sx={{
          marginLeft: open ? "10rem" : "0rem",
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
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default AdminNavbar;
