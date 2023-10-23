import React, { useState } from "react";
import styles from '../styles/pages/login.module.css'

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <button className={styles.buttonSubmit} type="submit">Sign In</button>
                </div>
            </form>
        </div>
    );
}