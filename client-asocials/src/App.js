import React from "react";
import Home from "./Components/Home";
import "./index.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import MyProfile from "./Components/Pages/MyProfile";
import PrivateRoute from "./PrivateRoute.jsx";

const App = () => {
  const loggedIn = JSON.parse(localStorage.getItem("Profile"))
  console.log(loggedIn);
  


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/auth" element={<PrivateRoute />}>
            <Route path="" element={<Home />}></Route>
            <Route path="profile/:username" element={<MyProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
