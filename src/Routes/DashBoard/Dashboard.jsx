import { Route, Routes } from "react-router-dom";
import Menu from "../../Components/Menu/Menu";
import UpiFundForm from "../../Components/AddUpiFundForm/UpiFundForm";
import FundTabel from "../../Components/FundTable/FundTabel";

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
          <div className="w-full sm:w-4/5 bg-white flex flex-col items-center justify-center sm:items-start sm:justify-start sm:pl-10 sm:pt-10">
            <Routes>
              <Route path="/Order" element={<UpiFundForm />} />
              <Route path="/FundTable" element={<FundTabel />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
