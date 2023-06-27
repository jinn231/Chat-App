import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAO4Ew339_ucK0jgzafRhsi99T63AWDE7o",
  authDomain: "oauth2-83d17.firebaseapp.com",
  projectId: "oauth2-83d17",
  storageBucket: "oauth2-83d17.appspot.com",
  messagingSenderId: "559260614507",
  appId: "1:559260614507:web:87c841d1ab05783dc7562e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;