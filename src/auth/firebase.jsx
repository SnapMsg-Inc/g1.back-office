import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: "snap-msg.firebaseapp.com",
    projectId: "snap-msg",
    storageBucket: "snap-msg.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth()

setPersistence(auth, browserLocalPersistence)

