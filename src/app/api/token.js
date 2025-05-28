import axiosApi from "../../../utils/axios";

export const getTokenProfit = async (curCurrency) => {
  try {
    const response = await axiosApi.post("/token-by-name", {
      name: curCurrency,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getTokenList = async () => {
  try {
    const response = await axiosApi.post("/tokens");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getDepositHistory = async () => {
  try {
    const response = await axiosApi.post("/deposits");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getWithdrawHistory = async () => {
  try {
    const response = await axiosApi.post("/withdraws");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getSwapHistory = async () => {
  try {
    const response = await axiosApi.post("/swap-history");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getTradingHistory = async (token) => {
  try {
    const response = await axiosApi.post("/swap-history-token", {
      token: token,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const withdraw = async (token, amount, network, address) => {
  try {
    const response = await axiosApi.post("/withdraw", {
      token: token,
      amount: amount,
      network: network,
      address: address,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
