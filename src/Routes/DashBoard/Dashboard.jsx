import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "../../Components/Menu/Menu";
import FundTabel from "../../Components/FundTable/FundTabel";
import React from "react";
import MemoizedUpiFundForm from "../../Components/AddUpiFundForm/UpiFundForm";

// Dashboard component rendering menu and routes
const Dashboard = () => {
  return (
    <>
      {/* Main container */}
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-full h-full flex flex-col sm:flex-row">
          {/* Left sidebar */}
          <div className="w-full sm:w-1/5 bg-red">
            <div className="h-auto flex-grow flex flex-col">
              {/* Menu component */}
              <Menu />
            </div>
          </div>
          {/* Right content area */}
          <div className="w-full sm:w-4/5 bg-white flex flex-col items-center justify-center sm:items-start sm:justify-start sm:pl-10 sm:pt-10">
            {/* Routing for different paths */}
            <Routes>
              {/* Default route */}
              <Route
                path="/"
                element={
                  <Navigate to="/User/Dashboard/RecentCancellationRequest" />
                }
              />
              {/* Route for UPI Fund Account */}
              <Route path="/UpiFundAccount" element={<MemoizedUpiFundForm />} />
              {/* Route for Recent Cancellation Requests */}
              <Route
                path="/RecentCancellationRequest"
                element={<FundTabel />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

// Memoizing Dashboard component
const MemoizedDashboard = React.memo(Dashboard);

// Exporting MemoizedDashboard component
export default MemoizedDashboard;
