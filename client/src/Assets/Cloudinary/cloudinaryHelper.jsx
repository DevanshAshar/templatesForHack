import axios from "axios";
import { cloudname} from "./cloudinaryConfig";

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudname}`;

export const makeUploadRequest = async (
  { file, fieldName, progressCallback, successCallback, errorCallback },
  logic
) => {
  try {
    const url = `${baseUrl}/auto/upload`;

    const signatureResponse = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/getCloudinarySignature`
    );

    const formData = new FormData();
    formData.append(fieldName, file);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("signature", signatureResponse.data.signature);
    formData.append("timestamp", signatureResponse.data.timestamp);

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        progressCallback(total, loaded);
      },
    };

    const response = await axios.post(url, formData, config);

    const { delete_token: deleteToken } = response.data;
    logic(response.data);
    successCallback(deleteToken);
  } catch (error) {
    errorCallback(error.message);
    console.log(error);
  }
};

export const makeDeleteRequest = async (
  { token, successCallback, errorCallback },
  deleteLogic
) => {
  try {
    const url = `${baseUrl}/delete_by_token`;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      token: token,
    };

    await axios.post(url, data, config);

    deleteLogic(token);
    successCallback();
  } catch (error) {
    errorCallback(error.message);
  }
};
