const Login = () => {
  return (
    <>
      <div className="mx-auto max-w-6xl p-12">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="md:text-4xl text-xl font-black uppercase">
              Fund Account Management Unleashed!
            </div>
            <div className="text-xl mt-4">
              Transform team finance with powerful AccountManagement tool.
            </div>
          </div>
          <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full md:w-1/2">
            <div className="shadow-md flex-auto max-w-sm p-10 pb-20">
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Email
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  <input
                    placeholder="Enter Email.."
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />
                </div>
              </div>
              <div className="mt-6 relative">
                <div className="shadow-md font-medium py-2 px-4 text-green-100 cursor-pointer bg-teal-600 rounded text-lg tr-mt absolute text-center w-full">
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
