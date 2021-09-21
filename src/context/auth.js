import React, {createContext, useContext, useState} from 'react';
const AuthContext = createContext();

export function AuthProvider({children}) {
    const tokenTimer = () => {
        const currentTime = new Date().getTime();
        const expiresTime = localStorage.getItem('expiresTime');

        if (currentTime > expiresTime) {
            return logout();
        }

        setTimeout(() => {
            return logout();
        }, expiresTime - currentTime ); 
    }

    const isAuth = () => {
        const token = localStorage.getItem('token');
        const expiresTime = localStorage.getItem('expiresTime');
        if (!token || !expiresTime) {
            return false;
        } else {
            tokenTimer();
            return true;
        }
    }
    const [isUserAuth, setIsUserAuth] = useState(isAuth);

    const login = (access_token) => {
        localStorage.setItem('token', access_token);
        localStorage.setItem('expiresTime', new Date().getTime() + 1800000); // stockage dans le local storage
        setIsUserAuth(true); // passe le state d'identification à false
        tokenTimer(); 
    }

    const logout = () => {   
        localStorage.removeItem('token'); // supprime variable du local storage
        localStorage.removeItem('expiresTime');
        setIsUserAuth(false); // passe le state d'identification à false
    }


    return (
        <AuthContext.Provider value={{isUserAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);
}
