// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://blogtech-application.onrender.com/admin-api",
  withCredentials: true
});

export default api;
