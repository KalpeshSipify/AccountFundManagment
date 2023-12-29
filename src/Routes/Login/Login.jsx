import React from "react";
import { InputContext } from "../../../Context/InputContext";
import loginImg from "../../assets/LoginImg.png";
import { useNavigate } from "react-router-dom";
import { CognitoUserContext } from "../../../Context/CognitoUserContext";
import { EmailLoginHandler } from "../../../CognitoServices/EmailLogin";
import MemoizedSpinner from "../../Components/Spinner/Spinner";

const Login = () => {
  //  state
  const [Loader, setLoader] = React.useState(false); // state for spinner loader

  const [isEmailRegister, setisEmailRegister] = React.useState(true); // state for email not registered to cognito

  // Context  - - - - - - - - - - - - - - - - - - - -- - - - - - - - - --
  const { setcognitoUser } = React.useContext(CognitoUserContext); // Getting the function ro set email response from Context

  const { inputData, handleOnTextChange, validationErrors } =
    React.useContext(InputContext); // Getting Input Context Value

  // using use navigate hook for navigation to another pagfe
  const navigation = useNavigate();

  // Handler for singin user
  const signIn = async () => {
    // setting loader to true
    setLoader(true);
    // destructuring the input data
    const { email } = inputData;
    try {
      // calling cognito email serivece for getting opt and successfull login
      const CognitoResult = await EmailLoginHandler(email);

      // Destructuring
      const { success, ResponseData } = CognitoResult;

      // if succes if true
      if (success) {
        setcognitoUser(ResponseData); // setting the email response to state
        navigation("/Auth/VerifyOpt"); // after successfull get resopnse navigate to verfy opt page
        setLoader(false); // setting the loader to false
      } else if (!success) {
        setisEmailRegister(false); // setting the is email register to false
        // dealy for 1.5s
        setTimeout(() => {
          setisEmailRegister(true); // setting the is email register to true
        }, 1500);
        console.log("Internal Server Error!");
      }
    } catch (error) {
      console.error("Error signing in", error);
    } finally {
      // setting the loader to false
      setLoader(false);
    }
  };

  return (
    <>
      {/* Loader component */}
      {Loader && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <MemoizedSpinner />
        </div>
      )}

      {/* Main content */}
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-full h-full flex flex-row flex-col sm:flex-row">
          {/* Left section */}
          <div className="w-full sm:w-2/5 h-1/2 sm:h-full bg-white flex justify-center items-center">
            {/* Login form container */}
            <div className="w-5/6 lg:w-4/5 xl:w-3/5 h-auto lg:h-96 rounded-lg bg-white flex flex-col items-center">
              {/* Title */}
              <div className="w-5/6 flex items-center">
                <p className="font-semibold text-3xl text-indigo-700">
                  Self Help Dashboard
                </p>
              </div>
              {/* Instructions */}
              <div className="w-5/6 flex items-center mt-2">
                <p className="text-sm text-black">
                  Login with your registered e-mail address
                </p>
              </div>
              {/* Email input */}
              <div className="w-5/6 flex items-center mt-8">
                <p className="text-sm text-black">Email</p>
              </div>
              {/* Email input field */}
              <div className="w-5/6 flex flex-col items-center mt-2">
                <input
                  name="email"
                  type="text"
                  placeholder="Enter Registered Email..."
                  onChange={handleOnTextChange}
                  className="w-full h-12 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
                />
                {/* Validation errors */}
                <div className="text-red-500 text-sm">
                  {validationErrors.email && <p>{validationErrors.email}</p>}
                  {!isEmailRegister && <p> Email Is Not Registered.</p>}
                </div>
              </div>
              {/* Send OTP button */}
              <div className="w-5/6 flex items-center mt-6 justify-center">
                <button
                  onClick={signIn}
                  className="w-full lg:w-5/6 h-10 border-indigo-700 font-semibold text-white rounded-full bg-indigo-800 hover:bg-indigo-900 focus:outline-none"
                >
                  Send Opt
                </button>
              </div>
            </div>
          </div>
          {/* Right section */}
          <div className="w-full h-1/2 sm:h-full sm:w-3/5 bg-white">
            <img
              src={loginImg} // Replace with your image source
              alt=""
              className="w-full h-full "
            />
          </div>
        </div>
      </div>
    </>
  );
};

const MemoizedLogin = React.memo(Login);
export default MemoizedLogin;
