import { useState } from "react";
import FundTabel from "../../Components/FundTable/FundTabel";
import Navbar from "../../Components/Nabar/Navbar";
import { Routes, Route } from "react-router-dom";
import UserAccount from "../UserAcccount/UserAccount";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  return (
    <>
      <div className="min-h-full w-full">
        <Navbar handleSelectMenuItem={handleSelectMenuItem} />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {selectedMenuItem === "dashboard"
                ? "Dashboard"
                : selectedMenuItem === "AboutUs"
                ? "About Us"
                : selectedMenuItem === "ContactUs"
                ? "Contact Us"
                : selectedMenuItem === "Reports"
                ? "Reports"
                : selectedMenuItem === "Profile"
                ? "Profile"
                : null}
            </h1>
          </div>
        </header>

        {/* Move the main element outside of the Routes component */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<FundTabel />} />
              <Route path="/Profile" element={<UserAccount />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
