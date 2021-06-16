import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCL1IS7Lzwa19QzN9BrCBySy4-ahEVcOr0",
  authDomain: "amzon-12.firebaseapp.com",
  projectId: "amzon-12",
  storageBucket: "amzon-12.appspot.com",
  messagingSenderId: "496171443977",
  appId: "1:496171443977:web:d4037816c94a3f586615d8",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
