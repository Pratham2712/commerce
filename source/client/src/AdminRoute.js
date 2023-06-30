import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Admin_AddProduct,
  Admin_Category,
  Admin_root,
} from "./constants/links";
import AdminLayout from "./layouts/AdminLayout";
import AdminAddCategory from "./pages/adminPages/AdminAddCategory";
import AdminAddProduct from "./pages/adminPages/AdminAddProduct";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path={Admin_root} element={<AdminLayout />}>
        <Route path={Admin_Category} element={<AdminAddCategory />}></Route>
        <Route path={Admin_AddProduct} element={<AdminAddProduct />}></Route>
      </Route>
    </Routes>
  );
};

export default AdminRoute;
