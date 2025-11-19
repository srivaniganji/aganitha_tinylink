import axios from "axios";
import { API } from "../config.js";
//const API = "http://localhost:5000/api/links";

export const getAllLinks = () => axios.get(API);
export const createLink = (data) => axios.post(API, data);
export const deleteLink = (code) => axios.delete(`${API}/${code}`);
export const getStats = (code) => axios.get(`${API}/${code}`);
