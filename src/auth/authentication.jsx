// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as firebase from 'firebase/auth'
import firebaseApp from "./firebase";
import { signInWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
// GoogleSignin.configure({
//     webClientId: provicer.env.WEB_CLIENT_ID
// });

export const LoginAccount = (email, password) =>
    signInWithEmailAndPassword(firebase.getAuth(firebaseApp), email, password)

// export const SignFederate = (currentUser) => 
//     signInWithCredential(firebase.getAuth(firebaseApp), GoogleAuthProvider.credential(currentUser.idToken));

export const LogoutAccount = () =>
    firebase.getAuth(firebaseApp).signOut()
    
export const LoginFederate = (credential) =>
    signInWithCredential(firebase.getAuth(), GoogleAuthProvider.credential(credential))

    