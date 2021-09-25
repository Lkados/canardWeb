import React from 'react';
import AppNavContainer from "./navigation";
import GlobalProvider from "./context/Provider";

console.log('papapap')
export default function App() {
    return (
        <GlobalProvider>
                <AppNavContainer/>
        </GlobalProvider>
    );
}
