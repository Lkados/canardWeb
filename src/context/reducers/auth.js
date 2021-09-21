//
import {
    CLEAR_AUTH_STATE,
    LOGIN_FAIL,
    //LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_USER
} from "../../constants/actionsTypes/index";
//const token = localStorage.getItem('token');
const auth = (state, {type, payload}) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
                isLoggedIn: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                data: null,
                isLoggedIn: false,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                error: payload,
            };

        case CLEAR_AUTH_STATE:
            return {
                ...state,
                loading: false,
                data: null,
                error: null,
            };

        default:
            return state;
    }
};

export default auth;