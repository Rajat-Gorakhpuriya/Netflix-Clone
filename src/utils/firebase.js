// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgbKy77Z4Lp9hGqTEWKRAyWgSUjPekPw8",
    authDomain: "netflix-clone-1a621.firebaseapp.com",
    projectId: "netflix-clone-1a621",
    storageBucket: "netflix-clone-1a621.appspot.com",
    messagingSenderId: "546809967171",
    appId: "1:546809967171:web:c97e6bcea224939fed9af6",
    measurementId: "G-LN0MFE3YDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();