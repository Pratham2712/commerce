import "./App.css";
import {BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routess from "./Routess";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routess/>
      </BrowserRouter>
    </>
  );
}

export default App;