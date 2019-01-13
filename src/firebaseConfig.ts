import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDFsxxgDYDcFGDl9bB2umXxVwHsY1eCr0U",
    authDomain: "ryanrasmussen.firebaseapp.com",
    databaseURL: "https://ryanrasmussen.firebaseio.com",
    projectId: "firebase-ryanrasmussen",
    storageBucket: "firebase-ryanrasmussen.appspot.com",
    messagingSenderId: "450714895505"
};

firebase.initializeApp(config);