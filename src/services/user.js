import api from "./api";
import Cookies from "js-cookie";

export const completeUser = async (data) => {
  const getToken = Cookies.get("access_token");
  const response = await api.post("/api/v1/student", data, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  return response.data;
};
export const registerUser = async (data) => {
  const response = await api.post("/api/v1/register", data.value);
  return response.data;
};
export const getPayments = async (data) => {
  const getToken = Cookies.get("access_token");
  const response = await api.get(`/api/v1/payment/${data}`, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  return response.data;
};
export const handlePayment = async (data) => {
  const getToken = Cookies.get("access_token");
  const response = await api.post("/api/v1/payment/", data, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  return response.data;
}
export const getAppointments = async (data) => {
  const getToken = Cookies.get("access_token");
  const getUserId = JSON.parse(localStorage.getItem('user')).id
  const response = await api.get(`/api/v1/clschedule/${getUserId}`, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  return response.data;
}
