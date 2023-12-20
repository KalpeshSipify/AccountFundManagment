import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Components/LoginPage/LoginPage";
import VerifyOpt from "../Routes/VerfyOpt/VerifyOpt";

const MainNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/VerifyOpt" element={<VerifyOpt />} />
    </Routes>
  );
};

export default MainNavigation;
