import React from "react";

// Creating the context
export const AppUpiFundFormDataContext = React.createContext({
  UpiFundFrominputData: {},
  setUpiFundFrominputData: () => {},
  handleOnTextChange: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const AppUpiFundFormDataProvider = ({ children }) => {
  // State to hold input data and validation errors
  const [UpiFundFrominputData, setUpiFundFrominputData] = React.useState({
    AccountName: "",
    Vpa: "",
    Default: "",
    UserId: "",
  });

  // Function to handle text changes with validation
  const handleOnTextChange = React.useCallback(
    ({ target: { name, value } }) => {
      setUpiFundFrominputData((prevInputData) => ({
        ...prevInputData,
        [name]: value,
      }));
    },
    []
  );

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      UpiFundFrominputData,
      setUpiFundFrominputData,
      handleOnTextChange,
    }),
    [UpiFundFrominputData, setUpiFundFrominputData, handleOnTextChange]
  );

  // Providing context value to children
  return (
    <AppUpiFundFormDataContext.Provider value={value}>
      {children}
    </AppUpiFundFormDataContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedAppUpiFundFormDataProvider = React.memo(
  AppUpiFundFormDataProvider
);
