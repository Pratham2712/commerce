import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { USER_Root, User_Home } from "./constants/links";
import Home from "./pages/Home";

const Routess = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate("/home", { replace: true });
  }, [Navigate]);
  return (
    <Routes>
      <Route path="/" />
      <Route path={User_Home} element={<Home />}></Route>
    </Routes>
  );
};

export default Routess;
