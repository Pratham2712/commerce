import "./App.css";
import { USER_Root, User_Home } from "./constants/links";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLayouts from "./layouts/UserLayouts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={USER_Root} element={<UserLayouts />}></Route>
          <Route path={User_Home} element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;