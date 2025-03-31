import axiosApi from "../../../utils/axios";
import axios from "axios";

export const getProfile = async () => {
  try {
    const response = await axiosApi.get("/user/profile");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getBalanceDetail = async () => {
  try {
    const response = await axiosApi.get("/user/balance");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getOTP = async () => {
  try {
    const response = await axiosApi.get("/user/get-otp");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const verifyOTP = async (otp, secret) => {
  try {
    const response = await axiosApi.post("/user/verify-otp", {
      otp: otp,
      secret: secret,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const swapToken = async (from, to, amount) => {
  try {
    const response = await axiosApi.post("/user/swap", {
      from: from,
      to: to,
      amount: amount,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updatePassword = async (code, password, newPassword) => {
  try {
    const response = await axiosApi.post("/user/update-password", {
      code: code,
      password: password,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const setInitFundPassword = async (password) => {
  try {
    const response = await axiosApi.post("/user/fund-update-password", {
      new_fund_password: password,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateFundPassword = async (newPassword, confirmPassword) => {
  try {
    const response = await axiosApi.post("/user/fund-update-password", {
      fund_password: newPassword,
      new_fund_password: confirmPassword,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createDocument = async (formData) => {
  try {
    const response = await axiosApi.post("/user/create-document", formData);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getExchangeRate = async (base, quote) => {
  try {
    let APIKEY = process.env.NEXT_PUBLIC_COINAPI_KEY;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://rest.coinapi.io/v1/exchangerate/${base}/${quote}`,
      headers: {
        Accept: "text/plain",
        "X-CoinAPI-Key": APIKEY,
      },
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data; // 确保返回数据
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null; // 出错时返回 null
  }
};
