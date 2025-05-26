import axiosApi from "../../../utils/axios";

export const uploadImage = async (formData) => {
  try {
    const response = await axiosApi.post("/file/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
