import React from "react";

const UpiFundForm = () => {
  return (
    <>
      <div className=" w-full sm:w-1/3 bg-white bg-opacity-30 rounded-lg p-6 shadow-md flex flex-col">
        <h2 className=" font-semibold  text-2xl  mb-4 text-center">
          Add UPI Fund Account
        </h2>
        <div className="flex flex-col mb-4 mt-7">
          <label
            htmlFor="accountName"
            className="mb-1 font-small text-gray-400"
          >
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            className="w-full h-11 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
        </div>
        <div className="flex flex-col mb-4 mt-6">
          <label htmlFor="vpa" className="mb-1 font-small text-gray-400">
            VPA (Virtual Payment Address)
          </label>
          <input
            type="text"
            id="vpa"
            className="w-full h-11 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
        </div>
        <div className="flex flex-col mb-4 mt-6">
          <label
            htmlFor="makeDefault"
            className="mb-1 font-small text-gray-400"
          >
            Make this default
          </label>
          <select
            id="makeDefault"
            className="h-11 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          >
            <option value="">Select....</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <button className="w-full bg-indigo-800 text-white py-3 rounded-lg hover:bg-indigo-800 focus:outline-none mt-10 ">
          Submit
        </button>
      </div>
    </>
  );
};

export default UpiFundForm;
