import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const apiPrivate = axios.create({
  baseURL: 'http://10.0.2.2:8080/',
});

apiPrivate.interceptors.request.use((config) => {
  const token = SecureStore.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});