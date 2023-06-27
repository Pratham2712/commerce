import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Admin_root } from "./constants/links";
import AdminLayout from "./layouts/AdminLayout";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path={Admin_root} element={<AdminLayout />}></Route>
    </Routes>
  );
};

export default AdminRoute;
