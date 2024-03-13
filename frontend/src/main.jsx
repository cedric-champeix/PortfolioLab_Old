import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";
import Cookies from "js-cookie";
import {NotificationServiceProvider} from "./context/NotificationService.jsx";

//Modify to search into local storage in case of remember me checked

const token = Cookies.get("jwt_token")

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <AuthProvider token={token}>
            <BrowserRouter>
                <NotificationServiceProvider>
                    <App className="app"/>
                </NotificationServiceProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
)
