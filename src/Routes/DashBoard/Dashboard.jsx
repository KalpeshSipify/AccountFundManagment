import { Link, Outlet, Route, Routes } from "react-router-dom";
import FundTabel from "../../Components/FundTable/FundTabel";
import Menu from "../../Components/Menu/Menu";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-full h-full flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/5 bg-red">
            <div className="h-auto flex-grow flex flex-col">
              <Menu />
            </div>
          </div>
          <div className="w-full sm:w-4/5 bg-white">
            <Routes>
              <Route path="/FundTable" element={<FundTabel />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
