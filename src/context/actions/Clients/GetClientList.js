//requette axioss
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component} from 'react';
import {
    LOGIN_FAIL,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
  } from '../../constants/actionsTypes/index';
import axiosInstance from '../../helpers/axiosInstance';

export default (values) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    axiosInstance
        .get('client')
        .then((res) => {
            AsyncStorage.setItem('clientList', JSON.stringify(res.data.clientList));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
};