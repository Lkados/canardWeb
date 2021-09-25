import React, {useContext} from 'react';
import Login from "../pages/Users/Actions/Login";
import Navigation from "./Navigation";
import {BrowserRouter} from "react-router-dom";
import {GlobalContext} from "../context/Provider";


export default function AppNavContainer(){
    const {
        authState:{isLoggedIn}
    } = useContext(GlobalContext)

    return(
        <BrowserRouter>
            {isLoggedIn ?
                <Navigation />
                :
                <Login />
            }
        </BrowserRouter>
    );
}


