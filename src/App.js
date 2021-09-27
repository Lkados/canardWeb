import React from 'react';
import AppNavContainer from "./navigation";
import GlobalProvider from "./context/Provider";


export default function App() {
    return (
        <GlobalProvider>
                <AppNavContainer/>
        </GlobalProvider>
    );
}
// test test