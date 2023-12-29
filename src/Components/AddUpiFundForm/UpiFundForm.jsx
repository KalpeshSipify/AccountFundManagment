/* eslint-disable react/prop-types */
import React from "react";
import { AppUpiFundFormDataContext } from "../../../Context/AppUpiFundFormDataContext";
import { AddUpiFundDataPostService } from "../../../ApiGateWaySerice/AddUpiFundAccout";
import Spinner from "../Spinner/Spinner";
import InputValidationHoc from "../Hoc/InputValidationHoc";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const UpiFundForm = ({ upiFundAccountInputErrors, HandleInputUpi }) => {
  //  state
  const [Loader, setLoader] = React.useState(false); // state for spinner loader
  // context
  const { handleOnTextChange, UpiFundFrominputData, setUpiFundFrominputData } =
    React.useContext(AppUpiFundFormDataContext); // Accessing upifundforminput context

  // Destructuring
  const { AccountName, Vpa, Default } = UpiFundFrominputData;

  //   Handler fo submit form
  const HandleSubmit = async () => {
    // check if input is have valid data
    if (HandleInputUpi(UpiFundFrominputData)) {
      setLoader(true);
      try {
        // calling upi add handler services
        await AddUpiFundDataPostService(UpiFundFrominputData);
        //   success fully add data to db
        const emptyState = {
          AccountName: "",
          Vpa: "",
          Default: "",
          UserId: "",
        };

        // Update the state with the empty object
        setUpiFundFrominputData(emptyState);
        setLoader(false); // setting loader false
      } catch (error) {
        setLoader(false); // setting loader false
        console.log(error);
      }
    }
  };
  return (
    <>
      {/* Loader component */}
      {Loader && (
        /* Loader overlay */
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <Spinner />{" "}
          {/* Assuming Spinner is a component showing a loading indicator */}
        </div>
      )}

      {/* UPI Fund Account Form */}
      <div className="w-full sm:w-1/3 bg-white bg-opacity-30 rounded-lg p-12 shadow-md flex flex-col">
        <h2 className="font-sans text-2xl mb-4 text-center">
          Add UPI Fund Account
        </h2>

        {/* Account Name */}
        <div className="flex flex-col mb-4 mt-7">
          <label
            htmlFor="accountName"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            Account Name
          </label>
          <input
            value={AccountName}
            name="AccountName"
            onChange={handleOnTextChange}
            type="text"
            id="accountName"
            className="w-full h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
          <div className="text-red-500 text-xs">
            {/* Display Account Name input errors */}
            {upiFundAccountInputErrors.AccountName && (
              <p>{upiFundAccountInputErrors.AccountName}</p>
            )}
          </div>
        </div>

        {/* VPA (Virtual Payment Address) */}
        <div className="flex flex-col mb-4 mt-6">
          <label
            htmlFor="vpa"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            VPA (Virtual Payment Address)
          </label>
          <input
            value={Vpa}
            name="Vpa"
            onChange={handleOnTextChange}
            type="text"
            id="vpa"
            className="w-full h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
          <div className="text-red-500 text-xs">
            {/* Display VPA input errors */}
            {upiFundAccountInputErrors.Vpa && (
              <p>{upiFundAccountInputErrors.Vpa}</p>
            )}
          </div>
        </div>

        {/* Make Default Dropdown */}
        <div className="flex flex-col mb-4 mt-6">
          <label
            htmlFor="makeDefault"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            Make this default
          </label>
          <select
            value={Default}
            name="Default"
            onChange={handleOnTextChange}
            id="makeDefault"
            className="h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          >
            <option value="">Select....</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          <div className="text-red-500 text-xs">
            {/* Display Default dropdown errors */}
            {upiFundAccountInputErrors.Default && (
              <p>{upiFundAccountInputErrors.Default}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={HandleSubmit}
          className="w-full bg-indigo-800 text-white py-3 rounded-lg hover:bg-indigo-800 focus:outline-none mt-10"
        >
          Submit
        </button>
      </div>
    </>
  );
};

const MemoizedUpiFundForm = React.memo(InputValidationHoc(UpiFundForm));
export default MemoizedUpiFundForm;
