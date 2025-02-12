import axios from "axios";

const api = axios.create({
  baseURL: "https://67aa228265ab088ea7e5c491.mockapi.io/api",
});

export const getOKRs = () => api.get("/okrs");
export const getResultKeys = () => api.get("/resultKeys");
export const createOKR = (data) => api.post("/okrs", data);
export const createResultKey = (data) => api.post("/resultKeys", data);
export const updateOKR = (id, data) => api.put(`/okrs/${id}`, data);
export const updateResultKey = (id, data) => api.put(`/resultKeys/${id}`, data);
export const deleteOKR = (id) => api.delete(`/okrs/${id}`);
export const deleteResultKey = (id) => api.delete(`/resultKeys/${id}`);
