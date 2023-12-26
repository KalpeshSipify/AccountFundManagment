import React from "react";
import { InputContext } from "../../../Context/InputContext";
import { CognitoUserContext } from "../../../Context/CognitoUserContext";
import { VerifyOptHandler } from "../../../CognitoServices/VeryOtp";
import loginImg from "../../assets/LoginImg.png";
import Spinner from "../../Components/Spinner/Spinner";
import { ReCallContext } from "../../../Context/ReCallContext";
import { useNavigate } from "react-router-dom";

const VerifyOpt = () => {
  // Hook for navigation
  const navigate = useNavigate();
  // State section
  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);
  //sate for Login Attempt
  const [Attempt, setAttempt] = React.useState(0);
  // State for button disable or enable
  const [isButtonDisabled, setbisButtonDisabled] = React.useState(false);

  // State for timer (180 seconds = 3 minutes)
  const [time, setTime] = React.useState(180);

  // state for email not registered to cognito
  const [isValidOtp, setisValidOtp] = React.useState(true);

  // Timer starts automatically
  const [isActive, setIsActive] = React.useState(true);

  // Context section
  // Context for accessing 'setreCall' function from ReCallContext
  const { setreCall } = React.useContext(ReCallContext);

  // Context for accessing 'inputData' and 'handleOnTextChange' from InputContext
  const { inputData, handleOnTextChange, validationErrors } =
    React.useContext(InputContext);

  // Context for accessing 'cognitoUser' from CognitoUserContext
  const { cognitoUser } = React.useContext(CognitoUserContext);

  // Triggering the useeffects on isactive or time changes
  // Timer logic
  React.useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // setting button to false state
      setbisButtonDisabled(true);
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // Memoized function to format time
  const formatTime = React.useMemo(
    () => (sec) => {
      if (sec <= 0) {
        return "Time Out";
      }

      const minutes = Math.floor(sec / 60);
      const seconds = sec % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
    []
  );

  // Handler for VeriyOpt
  const HandleVerifyOpt = React.useCallback(async () => {
    setAttempt((prevAttempt) => prevAttempt + 1);
    // if attempt is less than or equal to 3
    if (Attempt <= 1) {
      console.log("fire...");
      try {
        setLoader(true); // Activate loader before verification

        const { answer } = inputData; // Destructure the input data

        const verifyOptResult = await VerifyOptHandler(cognitoUser, answer);
        const { success, message } = verifyOptResult;

        if (success) {
          setreCall((prev) => !prev); // Toggle the recall flag for re-call

          setTimeout(() => {
            navigate("/User/Dashboard"); // Navigate after a delay upon successful verification
            setLoader(false); // Deactivate loader after navigation
          }, 1500); // Reduced delay for responsiveness

          console.log(message); // Log verification success message
        } else if (!success) {
          setisValidOtp(false); // setting the isValidOtp  to false
          // dealy for 1.5s
          setTimeout(() => {
            setisValidOtp(true); // setting the isValidOtp to true
          }, 1500);
          console.log("Internal Server Error!");
        }
      } catch (error) {
        console.error(error); // Handle specific errors or log to a service
      } finally {
        setLoader(false); // Deactivate the loader after verification
      }
    } else {
      // setting button to false state
      setbisButtonDisabled(true);
    }
  }, [Attempt, inputData, cognitoUser, setreCall, navigate]);

  return (
    <>
      {/* Loader component */}
      {Loader && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <Spinner />
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
                  Enter Login OTP sent to your e-mail
                </p>
              </div>
              {/* OTP input */}
              <div className="w-5/6 flex items-center mt-8">
                <p className="text-sm text-black">OTP</p>
              </div>
              {/* OTP input field */}
              <div className="w-5/6 flex flex-col items-center mt-2">
                <input
                  name="answer"
                  type="text"
                  placeholder="Enter Otp"
                  onChange={handleOnTextChange}
                  className="w-full h-12 border-2 border-indigo-700 rounded text-center focus:outline-none text-sm"
                />
                {/* Validation errors */}
                <div className="text-red-500 text-sm">
                  {validationErrors.answer && <p>{validationErrors.answer}</p>}
                  {!isValidOtp && <p>Inavlid Opt.</p>}
                </div>
              </div>
              {/* Login button */}
              <div className="w-5/6 flex items-center mt-6 justify-center">
                <button
                  onClick={HandleVerifyOpt}
                  disabled={isButtonDisabled}
                  className={`w-full lg:w-5/6 h-10 border-indigo-700 font-semibold text-white rounded-full ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-800 hover:bg-indigo-900"
                  } focus:outline-none`}
                >
                  Login
                </button>
              </div>
              {/* Attempted login count */}
              <div className="w-5/6 flex items-center justify-center mt-10">
                <p className="font-semibold text-1xl text-black-700">
                  Attempted: {Attempt === 3 ? "Limit Exceeded" : Attempt}
                </p>
              </div>
              {/* Time left */}
              <div className="w-5/6 flex items-center justify-center mt-2">
                <p className="font-semibold text-2xl text-black-700">
                  Time Left: {formatTime(time)}
                </p>
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

export default VerifyOpt;
