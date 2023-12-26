import { Auth } from "aws-amplify";

// function for email login to cognito
export const EmailLoginHandler = async (email) => {
  try {
    //sendging login request
    const LoginResponse = await Auth.signIn(email);

    // return success if response is successfull
    return { success: true, ResponseData: LoginResponse };
  } catch (error) {
    // return falid
    return { success: false, ResponseData: "Faild!" };
  }
};
