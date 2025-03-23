import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0stBmqSgylpZQRdHLWkN45at3xrxt7gQ",
  authDomain: "library-management-ada82.firebaseapp.com",
  databaseURL: "https://library-management-ada82-default-rtdb.firebaseio.com",
  projectId: "library-management-ada82",
  storageBucket: "library-management-ada82.firebasestorage.app",
  messagingSenderId: "570786747997",
  appId: "1:570786747997:web:3b71eb29a737ee4943dfb4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth, set, ref, get, update };