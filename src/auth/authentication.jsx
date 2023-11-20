import { auth} from "./firebase";
import { signInWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

export const LoginAccount = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

export const LogoutAccount = () =>
    auth.signOut()
    
export const LoginFederate = (credential) =>
    signInWithCredential(auth, GoogleAuthProvider.credential(credential))
