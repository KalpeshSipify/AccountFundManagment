import { createContext, useState } from "react";

export const InputContext = createContext({
  inputData: {},
  setinputData: () => [],
});

// eslint-disable-next-line react/prop-types
export const InputProvider = ({ children }) => {
  const [inputData, setinputData] = useState({
    email: "",
  });
  const value = {
    inputData,
    setinputData,
  };
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};
