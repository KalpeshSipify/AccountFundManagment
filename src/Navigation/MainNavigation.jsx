import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute/PrivateRoute"; // Importing PrivateRoute component
import { getAuthenticatedUser } from "../../CognitoServices/GetCurrentAuthenticatUser"; // Importing function for fetching authenticated user
import { IsAuthenticateContext } from "../../Context/IsAuthenticateContext"; // Importing IsAuthenticateContext
import { ReCallContext } from "../../Context/ReCallContext"; // Importing ReCallContext
import { CognitoUserIdContext } from "../../Context/CognitoUserIdContext";
import MemoizedSpinner from "../Components/Spinner/Spinner";

// Lazily loaded components
const LoginPage = lazy(() => import("../Routes/Login/Login"));
const VerifyOpt = lazy(() => import("../Routes/VerfyOpt/VerifyOpt"));
const Dashboard = lazy(() => import("../Routes/DashBoard/Dashboard"));

const MainNavigation = () => {
  const navigate = useNavigate(); // Using the useNavigate hook to handle navigation

  // state for spinner loader
  const [Loader, setLoader] = React.useState(true);

  // Context  - - - - - - - - - - - - - - - - - - - -- - - - - - - - - --
  const { setIsAuth } = React.useContext(IsAuthenticateContext); // Accessing setIsAuth function from IsAuthenticateContext

  const { reCall } = React.useContext(ReCallContext); // Accessing reCall function from ReCallContext

  const { setcognitoUserId } = React.useContext(CognitoUserIdContext); // Accessing setconitouserid fucntion from context of cognitouseridcontext

  // Function to get current authenticated user
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetUser = async () => {
    try {
      const result = await getAuthenticatedUser(); // Fetching authenticated user details
      const { success, Data } = result; // Destructuring success from the result

      if (Data) {
        const { sub } = Data.attributes; // Destructuring sub from the data.attributes
        setcognitoUserId(sub); // Setting cognito user id
      }

      if (success) {
        setIsAuth(true); // Setting isAuthenticated to true if user is authenticated
        navigate("/User/Dashboard"); // Navigating to the Dashboard upon successful authentication
      }
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
      // You might want to perform additional error handling or logging here
    } finally {
      setLoader(false); // Setting loader to false after try-catch block execution
    }
  };

  // Triggering GetUser function when reCall changes
  useEffect(() => {
    GetUser();
  }, [reCall]);

  if (Loader) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
        <MemoizedSpinner />
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

const MemoizedMainNavigation = React.memo(MainNavigation);
export default MemoizedMainNavigation;
