// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/admin-api",
  withCredentials: true
});

export default api;
