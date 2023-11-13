import * as firebase from 'firebase/auth'
import firebaseApp from "./firebase";
import { signInWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

export const LoginAccount = (email, password) =>
    signInWithEmailAndPassword(firebase.getAuth(firebaseApp), email, password)

export const LogoutAccount = () =>
    firebase.getAuth(firebaseApp).signOut()
    
export const LoginFederate = (credential) =>
    signInWithCredential(firebase.getAuth(), GoogleAuthProvider.credential(credential))
