import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsKvEmlEAj-EcJY26NK9ibd-CUnJmun7E",
    authDomain: "computer-bazar.firebaseapp.com",
    projectId: "computer-bazar",
    storageBucket: "computer-bazar.appspot.com",
    messagingSenderId: "569780452971",
    appId: "1:569780452971:web:67ccea1131d10e94f83b2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;