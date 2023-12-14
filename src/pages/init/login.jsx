import React, { useContext, useEffect, useState } from "react";
import styles from '../../styles/pages/login.module.css'
import { AuthenticationContext } from "../../auth/context/authenticationContext";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { GoogleLogin } from "@react-oauth/google";
import ForgotRequest from "../../components/forgotRequest";

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { onLogin, isLoading, onLoginFederate, isAuthenticated } = useContext(AuthenticationContext)
    const [isVisible, setIsVisible] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate()

    const handleViewPassword = () => setIsVisible(!isVisible)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.email, formData.password, (path) => navigate(path))
    }

    const handleForgot = () => setOpenDialog(!openDialog) 

    useEffect(()=> {
        isAuthenticated ? navigate('/') : navigate('#')
    }, [isAuthenticated, navigate])

    return (
        <div className={styles.container}>
            {openDialog && <ForgotRequest handleModal={handleForgot}/>}
            <div className={styles.containerForm}>
                <p className={styles.title}>
                    <strong>
                        Welcome Back!!
                    </strong>
                </p>
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
                        <Icon icon="material-symbols:mail" className={styles.icon}/>
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
                        <Icon icon={isVisible ? "mdi:eye" : "mdi:eye-off"} 
                            onClick={handleViewPassword}
                            className={styles.icon}/>
                    </div>
                    <div className={styles.forgotPassword} onClick={() => handleForgot()}>
                        Forgot to password?
                    </div>
                    <div className={isLoading ? styles.spinner : styles.onSubmit}>
                        {isLoading ? 
                            <Spinner color="#1f2a40" size={10} speed={1} animating={true} /> 
                            :    
                            <button 
                            className={styles.buttonSubmit} 
                            type="submit">
                                Sign In
                            </button>
                        }
                    </div>
                    <div className={styles.federate} >
                        <GoogleLogin onSuccess={
                            (response) => {
                                console.log(response)
                                onLoginFederate(response.credential,
                                                (path) => navigate(path))
                            }
                        }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}