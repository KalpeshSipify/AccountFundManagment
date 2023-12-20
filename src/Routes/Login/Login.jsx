import { useContext } from "react";
import { InputContext } from "../../../Context/InputContext";
import { Auth } from "aws-amplify";
import { useNavigation } from "react-router-dom";

const Login = () => {
  const { inputData, setinputData } = useContext(InputContext);
  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setinputData({ ...inputData, [name]: value });
  };
  // const navigation = useNavigation();
  const signIn = async () => {
    const { email } = inputData;
    try {
      const response = await Auth.signIn(email);
      // navigation.navigate("/VerifyOpt");
      console.log(response);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-6xl p-12 bg-gray-800">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="md:text-4xl text-xl font-black uppercase text-white">
              Fund Account Management Unleashed!
            </div>
            <div className="text-xl mt-4 text-white">
              Transform team finance with powerful AccountManagement tool.
            </div>
          </div>
          <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full md:w-1/2 bg-white">
            <div className="shadow-md flex-auto max-w-sm p-10 pb-20">
              <div className="font-sans flex items-center justify-center mb-10">
                <h1 className="font-roboto font-bold text-2xl ">Login</h1>
              </div>

              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Email
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  <input
                    name="email"
                    placeholder="Enter Email.."
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    onChange={HandleOnChange}
                    value={inputData.email}
                  />
                </div>
              </div>
              <div className="mt-6 relative">
                <div
                  onClick={signIn}
                  className="shadow-md font-medium py-2 px-4 text-green-100 cursor-pointer bg-orange-500	 rounded text-lg tr-mt absolute text-center w-full"
                >
                  Get OTP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
