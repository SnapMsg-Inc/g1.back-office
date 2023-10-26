import React, { useContext, useState } from "react";
import styles from '../styles/pages/login.module.css'
import { AuthenticationContext } from "../auth/context/authenticationContext";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";


export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { onLogin, isLoading } = useContext(AuthenticationContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.email, formData.password)
        console.log(`email: ${formData.email} password: ${formData.password}`)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign In</h2>
            <form onSubmit={handleSubmit}>
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
                </div>
                <div className={styles.inputForm}>
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                </div>
                    <div className={styles.onSubmit}>
                        {isLoading ? 
                            <Spinner color="#1ed760" size={10} speed={1} animating={true} /> 
                            :    
                            <button className={styles.buttonSubmit} type="submit">Sign In</button>
                        }
                    </div>
            </form>
        </div>
    );
}