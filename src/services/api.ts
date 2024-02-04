import axios from "axios";
import { getUserLocalStorage } from "../providers/AuthProvider/utils";

export const Api = axios.create({
    baseURL: "https://api.eduardorocha.dev/",
    headers: {
        "Content-Type": "application/json",
      },
});

Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = `Bearer ${user?.token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)