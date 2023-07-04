import axios from "axios";
import { cloudname } from "./cloudinaryConfig";

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudname}`;

const getFileType = (file) => {
  if (
    file.type === "image/jpg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "image/jpeg"
  ) {
    return "image";
  } else {
    return "pdf";
  }
};

export const makeUploadRequest = async (
  { file, fieldName, progressCallback, successCallback, errorCallback },
  logic,
  doYouWantCustomPublicId,
  publicIdLogic
) => {
  try {
    const url = `${baseUrl}/auto/upload`;

    // const signatureResponse = await axios.get(
    //   `${import.meta.env.VITE_API_ENDPOINT}/user/getCloudinarySignature`
    // );

    const formData = new FormData();
    formData.append(fieldName, file);
    if (getFileType(file) === "image") {
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_IMAGE
      );
    } else {
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_PDF
      );
    }
    if (doYouWantCustomPublicId) {
      formData.append("public_id", `${publicIdReturningFunction}`);
    }
    // formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    // formData.append("signature", signatureResponse.data.signature);
    // formData.append("timestamp", signatureResponse.data.timestamp);

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        progressCallback(total, loaded);
      },
    };

    const response = await axios.post(url, formData, config);

    const { delete_token: deleteToken } = response.data;
    console.log(response.data);
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
