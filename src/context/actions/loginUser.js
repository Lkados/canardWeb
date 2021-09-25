import {
  LOGIN_FAIL,
  //LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../constants/actionsTypes/index';
import axiosInstance from '../../helpers/axiosInstance';
import Cookies from 'js-cookie'




const loginUser = (props) => (dispatch) => {
  axiosInstance
    .post('login', {
        email: props.user.username, // variable des champs de form
        password: props.user.password // variable des champs de form
    })
    .then((res) => {
      const cookie = Cookies.get('token');
      console.log(cookie)
      Cookies.set('loading', false);
      Cookies.set('isLoggedIn', true);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    });
};

export default loginUser;
