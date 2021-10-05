import axios from "axios";

const BASE_URL = "http://localhost:6001/api/"; //Backend api

export const ENDPOINTS = {
  TOPICS: "topics",
  LOGIN: "users/login",
  REGISTER: "users/register",
  LOGOUT: "users/logout",
};

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export const createAPIEndpoint = (endpoint) => {
  const url = BASE_URL + endpoint;
  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + "/" + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (updateRecord) => axios.put(url, updateRecord),
    // update: (id, updateRecord) => axios.put(url + id, updateRecord),
    delete: (id) => axios.delete(url + "/" + id),
  };
};
