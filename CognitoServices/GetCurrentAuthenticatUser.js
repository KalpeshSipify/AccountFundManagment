import { Auth } from "aws-amplify";

// function for email login to cognito
export const getAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    // If the user is authenticated, resolve the promise with user data
    return { success: true, Data: user };
  } catch (error) {
    // if not authenticated
    return {
      success: false,
      message: "User not authenticated!",
    };
  }
};
