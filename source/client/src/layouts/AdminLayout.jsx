import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/adminComponents/AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
