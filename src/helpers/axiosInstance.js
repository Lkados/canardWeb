import React, {useContext} from "react";
import axios from 'axios';
import RefreshUser from "../context/actions/refreshUser";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosInstance.defaults.withCredentials = true;

/*
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('tokene');
        //const {token} = useContext(GlobalContext)
        //const token = GetToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.withCredentials = true;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
*/

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 403) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }else if (error.response.status === 401) {
            console.log('test');
            //RefreshUser();
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    },
);

export default axiosInstance;