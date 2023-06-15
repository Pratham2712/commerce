import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const UserLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UserLayouts;