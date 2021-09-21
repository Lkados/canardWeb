import React, {useEffect} from 'react';
import axiosInstance from '../../helpers/axiosInstance';
import Cookies from "js-cookie";

export default function RefreshUser(){
        axiosInstance
            .post('refresh')
            .then((res) => {
                Cookies.set('loading', false);
                Cookies.set('isLoggedIn', true);
                console.log(res)
            })
            .catch((err) => {
                /*dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response
                        ? err.response.data
                        : {error: 'Veuillez vérifier vos identifiants'},
                });*/
            });
};
