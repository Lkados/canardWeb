import Cookies from 'js-cookie'

const authStates = {
    isLoggedIn: Cookies.get('isLoggedIn') || false,
    data: Cookies.get('token') || {},
    error: null,
    loading: Cookies.get('isLoggedIn') || false,
};

export default authStates;
