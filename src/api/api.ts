import axios, { AxiosInstance } from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
export const api: AxiosInstance = axios.create({
    baseURL: apiUrl
});
