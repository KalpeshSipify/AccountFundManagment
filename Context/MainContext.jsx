import { MemoizedCognitoUserProvider } from "./CognitoUserContext";
import { MemoizedInputProvider } from "./InputContext";
import { MemoizedIsAuthenticateProvider } from "./IsAuthenticateContext";
import { MemoizedReCallProvider } from "./ReCallContext";

// Main context provider
// eslint-disable-next-line react/prop-types
export const MainContextProvider = ({ children }) => {
  // proverde for IputeContext
  return (
    <MemoizedInputProvider>
      {/* Provider for EmailResponse Context */}
      <MemoizedCognitoUserProvider>
        {/* Provider for is Auth context */}
        <MemoizedIsAuthenticateProvider>
          {/* Provider for recall context */}
          <MemoizedReCallProvider>{children}</MemoizedReCallProvider>
        </MemoizedIsAuthenticateProvider>
      </MemoizedCognitoUserProvider>
    </MemoizedInputProvider>
  );
};
