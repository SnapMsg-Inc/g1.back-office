import { Icon } from "@iconify/react";
import { useState } from "react";
import { Spinner } from "react-activity";
import styles from '../styles/components/forgot.module.css'
import { ResetPassword } from "../auth/authentication";

export default function ForgotRequest({handleModal}) {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSubmit = () => {
        setIsLoading(true)
        console.log('pruebva')
        ResetPassword(email)
        .then(() => {
            handleModal()
            alert('Password reset link sent! Check your email')
            setIsLoading(false)
        })
        .catch((error) => {
            alert('User not found!')
            setIsLoading(false)
        })
    }
    
    return (
        <dialog className={styles.container} open>
            <Icon className={styles.close} icon="mdi:close-circle-outline"
                onClick={() => handleModal()}/>
            <p className={styles.title}><strong>Forgot to Password?</strong></p>
            <div className={styles.form}>
                <p className={styles.text}>Enter your email to reset your password</p>
                <div className={styles.inputForm}>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="name"
                    />
                    <Icon icon="material-symbols:mail" className={styles.icon}/>
                </div>
                <div className={isLoading ? styles.spinner : styles.onSubmit}>
                    {isLoading ? 
                        <Spinner color="#1f2a40" size={10} speed={1} animating={true} /> 
                        :    
                        <button 
                            className={styles.buttonSubmit} 
                            onClick={handleSubmit}>
                            Reset Password
                        </button>
                    }
                </div>
            </div>
        </dialog>
    )

}
