import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyD9MHW6DpKDkYiLdu3Ru_8AjIcWzP_wlzM",
  authDomain: "tarefabasedados.firebaseapp.com",
  projectId: "tarefabasedados",
  storageBucket: "tarefabasedados.appspot.com",
  messagingSenderId: "127574847668",
  appId: "1:127574847668:web:d4d2f39bf2b4f38a0a67e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const db = getDatabase(app)

export {db}