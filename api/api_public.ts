import axios from "axios";

export const apiPublic = axios.create({
  baseURL: 'http://10.0.2.2:8080/',
});