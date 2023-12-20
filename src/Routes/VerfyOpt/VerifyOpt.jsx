import React from "react";

const VerifyOpt = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl p-4 sm:p-8 bg-gray-800 ">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-full lg:max-w-2xl flex justify-start md:justify-center w-full md:w-full">
            <div className="shadow-md flex-auto max-w-sm p-10 pb-20 bg-white">
              <div className="font-sans flex items-center justify-center mb-10">
                <h1 className="font-roboto font-bold text-2xl ">Verfication</h1>
              </div>

              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Enter OTP
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  <input
                    name="otp"
                    placeholder="Enter OTP.."
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />
                </div>
              </div>
              <div className="mt-6 relative">
                <div className="shadow-md font-medium py-2 px-4 text-green-100 cursor-pointer bg-orange-500 rounded text-lg tr-mt absolute text-center w-full">
                  Verify
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOpt;
