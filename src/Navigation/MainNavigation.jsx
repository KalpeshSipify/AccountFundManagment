import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute/PrivateRoute"; // Importing PrivateRoute component
import { getAuthenticatedUser } from "../../CognitoServices/GetCurrentAuthenticatUser"; // Importing function for fetching authenticated user
import { IsAuthenticateContext } from "../../Context/IsAuthenticateContext"; // Importing IsAuthenticateContext
import { ReCallContext } from "../../Context/ReCallContext"; // Importing ReCallContext
import FundTabel from "../Components/FundTable/FundTabel";
import Spinner from "../Components/Spinner/Spinner";

// Lazily loaded components
const LoginPage = lazy(() => import("../Components/LoginPage/LoginPage"));
const VerifyOpt = lazy(() => import("../Routes/VerfyOpt/VerifyOpt"));
const Dashboard = lazy(() => import("../Routes/DashBoard/Dashboard"));

const MainNavigation = () => {
  const navigate = useNavigate(); // Using the useNavigate hook to handle navigation

  // state for spinner loader
  const [Loader, setLoader] = React.useState(true);

  // Context  - - - - - - - - - - - - - - - - - - - -- - - - - - - - - --
  const { setIsAuth } = React.useContext(IsAuthenticateContext); // Accessing setIsAuth function from IsAuthenticateContext
  const { reCall } = React.useContext(ReCallContext); // Accessing reCall function from ReCallContext

  // Function to get current authenticated user
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetUser = async () => {
    const result = await getAuthenticatedUser(); // Fetching authenticated user details
    const { success } = result; // Destructuring success from the result
    if (success) {
      setLoader(false); // setting loader to false
      setIsAuth(true); // Setting isAuthenticated to true if user is authenticated
      navigate("/User/Dashboard"); // Navigating to the Dashboard upon successful authentication
    } else {
      setLoader(false); // setting loader to false
    }
  };

  // Triggering GetUser function when reCall changes
  useEffect(() => {
    GetUser();
  }, [reCall]);

  if (Loader) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
        <Spinner />
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Setting default route to redirect to login */}
        <Route path="/" element={<Navigate to="/Auth/login" replace />} />
        {/* Route for Login page */}
        <Route path="/Auth/login" element={<LoginPage />} />
        {/* Route for OTP verification */}
        <Route path="/Auth/VerifyOpt" element={<VerifyOpt />} />
        {/* Private route for user dashboard */}
        <Route path="/User" element={<PrivateRoute />}>
          {/* Route for the User Dashboard */}
          <Route path="/User/Dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MainNavigation;
