import axios from "axios";
import { baseUrl } from "../BaseUrl/BaseUrl";

// AddUpiFundData function
export const AddUpiFundDataPostService = async (AddData) => {
  try {
    // making post request
    const response = await axios.post(`${baseUrl}/AddUpiFundAccount`, AddData);
    // if successfull post
    return { success: true, Data: response };
  } catch (error) {
    // if faiid
    return { success: false, Message: "Faild to Add Data in db" };
  }
};
