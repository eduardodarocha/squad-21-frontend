import axios from "axios";
import { getUserLocalStorage } from "../providers/AuthProvider/utils";

export const Api = axios.create({
    baseURL: "http://localhost:3333/",
});

Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)