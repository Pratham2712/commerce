import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { USER_Root, User_Home, product_page } from "./constants/links";
import Home from "./pages/Home";
import UserLayout from "./layouts/UserLayout";
import ProductPage from "./pages/ProductPage";

const Routess = () => {
  return (
    <Routes>
      <Route path={USER_Root} element={<UserLayout />}>
        <Route path={USER_Root} element={<Navigate to={"/home"} />}></Route>
        <Route path={User_Home} element={<Home />}></Route>
        <Route path={product_page(":id")} element={<ProductPage />}></Route>
      </Route>
    </Routes>
  );
};

export default Routess;
