import React from "react";

// Creating the context
export const CognitoUserIdContext = React.createContext({
  cognitoUserId: null,
  setcognitoUserId: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const CogUserId = ({ children }) => {
  // State for to hold email responses
  const [cognitoUserId, setcognitoUserId] = React.useState(null);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      cognitoUserId,
      setcognitoUserId,
    }),
    [cognitoUserId, setcognitoUserId]
  );

  // Providing context value to children
  return (
    <CognitoUserIdContext.Provider value={value}>
      {children}
    </CognitoUserIdContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedCognitoUserIdProvider = React.memo(CogUserId);
