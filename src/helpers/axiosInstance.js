import axios from 'axios';
import Cookies from "js-cookie";


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
            axiosInstance.get('logout').then((res) => {
                Cookies.remove('loading');
                Cookies.remove('isLoggedIn');
                console.log('res')
            })
            //RefreshUser();
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    },
);

export default axiosInstance;