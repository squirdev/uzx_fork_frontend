import axiosApi from "../../../utils/axios";

export const createEarnTask = async ({ percent, duration, amount, token }) => {
  try {
    const response = await axiosApi.post("/create-earn-task", {
      percent: percent,
      duration: duration,
      amount: amount,
      token: token,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getEarns = async () => {
  try {
    const response = await axiosApi.get("/earns");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getEarnTaskList = async () => {
  try {
    const response = await axiosApi.get("/earn-tasks");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const cancelEarnTask = async ({ earnTaskId }) => {
  try {
    const response = await axiosApi.post("/cancel-earn-task", {
      earnTaskId: earnTaskId,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
