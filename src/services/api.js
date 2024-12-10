import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const login = (credentials) => API.post("/api/v1/auth/login", credentials);
