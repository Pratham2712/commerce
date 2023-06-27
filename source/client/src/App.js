import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routess from "./Routess";
import AdminRoute from "./AdminRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routess />
        <AdminRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
