// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/admin-api",
  withCredentials: true
});

export default api;
