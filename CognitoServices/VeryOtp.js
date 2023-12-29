import { Auth } from "aws-amplify";

// function for verify opt to cognito
export const VerifyOptHandler = async (cognitoUser, answer) => {
  try {
    //sendging login request
    const response = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);
    // This will throw an error if the user is not yet authenticated:
    await Auth.currentSession();
    // return success if response is successfull
    return { success: true, Data: response };
  } catch (error) {
    // return falid
    return {
      success: false,
      message: "Invalid OTP",
    };
  }
};
