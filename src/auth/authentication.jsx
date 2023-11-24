import { auth} from "./firebase";
import { signInWithEmailAndPassword, signInWithCredential, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

export const LoginAccount = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

export const LogoutAccount = () =>
    auth.signOut()
    
export const LoginFederate = (credential) =>
    signInWithCredential(auth, GoogleAuthProvider.credential(credential))

export const ResetPassword = (email) =>
    sendPasswordResetEmail(auth, email)