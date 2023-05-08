// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "hello-sms-40419.firebaseapp.com",
    projectId: "hello-sms-40419",
    storageBucket: "hello-sms-40419.appspot.com",
    messagingSenderId: "588855045201",
    appId: "1:588855045201:web:bba6d1ec763613304b1c70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
