import React from 'react';
import {LOGOUT_USER} from "../../constants/actionsTypes";
import Cookies from "js-cookie";
import axiosInstance from "../../helpers/axiosInstance";

export default () => (dispatch) => {
    axiosInstance.get('logout').then((res) => {
        Cookies.remove('loading');
        Cookies.remove('isLoggedIn');
        console.log('res')
        dispatch({
            type: LOGOUT_USER,
        })
    })
}


