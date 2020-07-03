import firebase from 'firebase/app';
import 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC3TkIMyCy7vr7FMyrqyA5sjZvUd5m_bQ",
    authDomain: "fb-crud-react-e985a.firebaseapp.com",
    databaseURL: "https://fb-crud-react-e985a.firebaseio.com",
    projectId: "fb-crud-react-e985a",
    storageBucket: "fb-crud-react-e985a.appspot.com",
    messagingSenderId: "651714507111",
    appId: "1:651714507111:web:ac4c0332c27548b098bfc2"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore()