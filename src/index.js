import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthenticationContextProvider } from './auth/context/authenticationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId={'835956360594-0lm5nt2c4lovh9c695mmkf18jr32oc0o.apps.googleusercontent.com'}>
                <AuthenticationContextProvider>
                    <App />
                </AuthenticationContextProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

