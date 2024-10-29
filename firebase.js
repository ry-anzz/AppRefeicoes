import {initializeApp} from "firebase/app";
import{getFirestore}from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB4MyNTO9CIQWBJDGpeBy6DC16te3pzuf8",
  authDomain: "apprefeicao.firebaseapp.com",
  projectId: "apprefeicao",
  storageBucket: "apprefeicao.appspot.com",
  messagingSenderId: "23934145516",
  appId: "1:23934145516:web:8ba12623dd8826dbc666c9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const firestore = getFirestore(app);