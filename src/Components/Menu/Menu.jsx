import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsAuthenticateContext } from "../../../Context/IsAuthenticateContext";
import { LogOutHandler } from "../../../CognitoServices/SignOut";
import chatimg from "../../assets/chat.png";
import notificationimg from "../../assets/notification.png";
import { AppUpiFundFormDataContext } from "../../../Context/AppUpiFundFormDataContext";
import { CognitoUserIdContext } from "../../../Context/CognitoUserIdContext";
import MemoizedSpinner from "../Spinner/Spinner";

const Menu = () => {
  // using use navigate hook for navigation to another pagfe
  const navigation = useNavigate();

  //    state
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); //    state for resopnsive menu open

  const [Loader, setLoader] = React.useState(false); // State for spinner loader

  //   context
  const { setIsAuth } = React.useContext(IsAuthenticateContext); // Accessing constext of isAuthenticated user

  const { setUpiFundFrominputData, UpiFundFrominputData } = React.useContext(
    AppUpiFundFormDataContext
  ); // Accessing context of upifundAcconnt inpued data context

  const { cognitoUserId, setcognitoUserId } =
    React.useContext(CognitoUserIdContext); // Accessing context of cognitouseridcontext

  // logout hangler function for cognito
  const HandleLogout = async () => {
    setLoader(true); // Setting loader to true
    try {
      const result = await LogOutHandler();

      // Destructure directly
      const { success } = result;

      // Check if success is true
      if (success) {
        // dealy for responsive navigation for 1.5s
        setTimeout(() => {
          setcognitoUserId(null); // set cognito user id to null
          setIsAuth(false); // set is auth to false to restrict router
          navigation("/Auth/login"); // navigate to login page
          setLoader(false); // setting loader to false
        }, 1500);
      } else {
        // Handle a case where success is not true
        // Maybe show an error message or handle differently based on application logic
      }
    } catch (error) {
      setLoader(false); // setting loader to false
      // Handle any potential errors that occur during logout
      console.error("Error during logout:", error);
      // Optionally, you can show an error message or perform other error handling logic here
    }
  };

  const HandleSetUserID = () => {
    // Destructuring
    const { UserId } = UpiFundFrominputData;
    //  if userid is Not set
    if (!UserId) {
      // Update the state using the updater function to ensure the correct previous state
      setUpiFundFrominputData((prevState) => ({
        ...prevState, // maintain previous state
        UserId: cognitoUserId,
      }));
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
      <div className="h-auto lg:min-h-screen flex flex-col lg:flex-row bg-white">
        <div className="lg:w-56 bg-white overflow-hidden">
          <div className="flex items-center justify-between lg:items-center lg:h-20 shadow-md relativ ">
            <h1 className="font-semibold text-2xl text-indigo-700 px-4 lg:px-10 ">
              Dashboard
            </h1>
            <div className="flex lg:hidden">
              <button
                className="px-3 py-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-0.5 bg-black my-1"></div>
                <div className="w-6 h-0.5 bg-black my-1"></div>
                <div className="w-6 h-0.5 bg-black my-1"></div>
              </button>
            </div>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:block lg:relative lg:flex-col lg:w-full bg-white rounded-r-3xl overflow-hidden`}
          >
            <ul className="flex flex-col py-4">
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link
                      onClick={HandleSetUserID}
                      to="/User/Dashboard/UpiFundAccount"
                    >
                      Add Upi Fund Account
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link to="/User/Dashboard/Order">Order</Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link to="/User/Dashboard/RecentCancellationRequest">
                      Refund Request
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link to="/User/Dashboard/FundTable">My Account</Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link onClick={HandleLogout}>Logout</Link>
                  </span>
                </div>
              </li>

              <li>
                <div className="flex flex-row items-center h-12 text-gray-500 hover:text-gray-800 mt-4 sm:mt-8 md:mt-16 lg:mt-56">
                  <div className="flex  px-14 ">
                    <div className="flex items-center justify-center h-12 w-9  ">
                      <img
                        src={chatimg}
                        alt="First Image"
                        className="max-h-full max-w-full cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-center h-12 w-9 ml-2 ">
                      <img
                        src={notificationimg}
                        alt="Second Image"
                        className="max-h-full max-w-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12  text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <a>Help & Support</a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
