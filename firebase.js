// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC21kfbX-YY1LfOUg2vMCVypvuY12mce-M",

  authDomain: "dpm2-867ec.firebaseapp.com",

  projectId: "dpm2-867ec",

  storageBucket: "dpm2-867ec.appspot.com",

  messagingSenderId: "804537901578",

  appId: "1:804537901578:web:610b8ea2c1244cd7b975f3"



};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
export { auth, firestore, storage };
