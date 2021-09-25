import {LOGOUT_USER} from "../../constants/actionsTypes";
import Cookies from "js-cookie";
import axiosInstance from "../../helpers/axiosInstance";

const Logout = () => (dispatch) => {
    axiosInstance.get('logout').then((res) => {
        Cookies.remove('loading');
        Cookies.remove('isLoggedIn');
        console.log('res')
        dispatch({
            type: LOGOUT_USER,
        })
    })
}


export default Logout;