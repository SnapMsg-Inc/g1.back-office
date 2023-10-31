import React, { useContext, useState, useEffect } from "react";
import styles from '../../styles/pages/login.module.css'
import { AuthenticationContext } from "../../auth/context/authenticationContext";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { onLogin, isLoading, isAuthenticated, onLoginFederate } = useContext(AuthenticationContext)
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    const handleViewPassword = () => setIsVisible(!isVisible)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.email, formData.password)
        console.log(`email: ${formData.email} password: ${formData.password}`)
    }
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/users');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.containerForm}>
                <div className={styles.title}>
                    Welcome Back!!
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputForm}>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                        <Icon icon="material-symbols:mail" />
                    </div>
                    <div className={styles.inputForm}>
                        <input
                            className={styles.input}
                            type={isVisible ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                        <Icon icon={isVisible ? "mdi:eye" : "mdi:eye-off"} onClick={handleViewPassword}/>
                    </div>
                    <div className={styles.forgotPassword}>
                        Forgot your password?
                    </div>
                    <div className={isLoading ? styles.spinner : styles.onSubmit}>
                        {isLoading ? 
                            <Spinner color="#1ed760" size={10} speed={1} animating={true} /> 
                            :    
                            <button 
                                className={styles.buttonSubmit} 
                                type="submit">
                                Sign In
                            </button>
                        }
                    </div>
                </form>
                <div className={styles.federate} >
                    <GoogleLogin onSuccess={
                        (response) => {
                            console.log(response)
                            onLoginFederate(response.credential)
                        }
                    }/>
                </div>
            </div>
        </div>
    );
}