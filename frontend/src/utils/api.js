import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const registerUser = (data) => API.post("/auth/", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchExpenses = () => API.get("/api");
export const addExpense = (data) => API.post("/api/", data);
export const filterExpenses = (status, type) => 
  API.get(`/api/filter?status=${status}&type=${type}`);
