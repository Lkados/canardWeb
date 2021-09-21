import Cookies from 'js-cookie'

export default {
    isLoggedIn: Cookies.get('isLoggedIn') || false,
    data: Cookies.get('token') || {},
    error: null,
    loading: Cookies.get('isLoggedIn') || false,
};

