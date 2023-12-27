import { Auth } from "aws-amplify";

// function for email login to cognito
export const LogOutHandler = async () => {
  try {
    //sendging logout request
    const Data = await Auth.signOut();

    // return success if response is successfull
    return { success: true, ResponseData: Data };
  } catch (error) {
    // return falid
    return { success: false, ResponseData: "Faild!" };
  }
};
