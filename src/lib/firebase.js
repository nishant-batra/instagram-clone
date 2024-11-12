import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";
const config = {
  apiKey: "AIzaSyCt9WgTzuizjfhQjUJDEWq06QVP346h2ik",
  authDomain: "login-ea971.firebaseapp.com",
  projectId: "login-ea971",
  storageBucket: "login-ea971.appspot.com",
  messagingSenderId: "479314112973",
  appId: "1:479314112973:web:27d28f69fd28d7476d9484",
  measurementId: "G-7QL5V6ZR62",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase);
export { firebase, FieldValue };
