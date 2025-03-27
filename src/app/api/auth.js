import axiosApi from "../../../utils/axios";

export const getPrivateKey = async () => {
  try {
    const response = await axiosApi.get("/auth/generate-private-key");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const signUpPrivate = async (privateKey, userName) => {
  try {
    const response = await axiosApi.post("/auth/signup-private", {
      private: privateKey,
      username: userName,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const sendVerifyEmail = async (email) => {
  try {
    const response = await axiosApi.post("/auth/send-verify-email", {
      email: email,
    });
    console.log("RESPONSE:", response);
    return true;
  } catch (error) {
    console.log("ERROR:", error);
    return false;
  }
};

export const signUpEmail = async (email, verifyCode, password) => {
  if (!email || !verifyCode || !password) return false;
  try {
    const response = await axiosApi.post("/auth/signup-email", {
      email: email,
      code: verifyCode,
      password: password,
    });
    console.log("RESPONSE:", response);
    return true;
  } catch (error) {
    console.log("ERROR:", error);
    return false;
  }
};

export const signInEmail = async (email, password) => {
  if (!email || !password) return false;
  try {
    const response = await axiosApi.post("/auth/signin-email", {
      email: email,
      password: password,
    });
    let responseData = response.data;
    console.log("RESPONSE:", responseData);
    return {
      success: true,
      token: responseData.user.token,
      email: responseData.user.email,
    };
  } catch (error) {
    console.log("ERROR:", error);
    return false;
  }
};

export const signPrivateKey = async (privateKey) => {
  if (!privateKey) return false;
  try {
    const response = await axiosApi.post("/auth/signin-private", {
      private: privateKey,
    });
    let responseData = response.data;
    console.log("RESPONSE:", responseData);
    return {
      success: true,
      token: responseData.user.token,
      username: responseData.user.username,
    };
  } catch (error) {
    console.log("ERROR:", error);
    return {
      success: false,
    };
  }
};

export const resetPrivateKey = async (email, code) => {
  if (!privateKey) return false;
  try {
    const response = await axiosApi.post("/auth/reset-private", {
      email: email,
      code: code,
    });
    console.log("RESPONSE:", response);
    return true;
  } catch (error) {
    console.log("ERROR:", error);
    return false;
  }
};

export const resetPassword = async (email, code, password) => {
  if (!email || !code || !password) return false;
  try {
    const response = await axiosApi.post("/auth/reset-password", {
      email: email,
      code: code,
      password,
      password,
    });
    console.log("RESPONSE:", response);
    return true;
  } catch (error) {
    console.log("ERROR:", error);
    return false;
  }
};
