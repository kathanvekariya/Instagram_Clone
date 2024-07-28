import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCupuxIWZwkrF5t0OmWXeA_iiYOpGPo_o",
  authDomain: "rn-instagram-clone-9d4d9.firebaseapp.com",
  projectId: "rn-instagram-clone-9d4d9",
  storageBucket: "rn-instagram-clone-9d4d9.appspot.com",
  messagingSenderId: "880257939602",
  appId: "1:880257939602:web:bcb58a6b7bf45ae77a8e4b",
  measurementId: "G-XJNP8TMXF3"
}


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()


export  {firebase , db}