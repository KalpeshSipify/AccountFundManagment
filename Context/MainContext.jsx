import { MemoizedAppUpiFundFormDataProvider } from "./AppUpiFundFormDataContext";
import { MemoizedCognitoUserProvider } from "./CognitoUserContext";
import { MemoizedCognitoUserIdProvider } from "./CognitoUserIdContext";
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
          <MemoizedReCallProvider>
            {/* Provider for Cognito user id ConText */}
            <MemoizedCognitoUserIdProvider>
              {/* provider for addupifundforminpoutdata  context */}
              <MemoizedAppUpiFundFormDataProvider>
                {children}
              </MemoizedAppUpiFundFormDataProvider>
            </MemoizedCognitoUserIdProvider>
          </MemoizedReCallProvider>
        </MemoizedIsAuthenticateProvider>
      </MemoizedCognitoUserProvider>
    </MemoizedInputProvider>
  );
};
