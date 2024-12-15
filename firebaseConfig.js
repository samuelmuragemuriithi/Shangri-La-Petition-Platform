// firebaseConfig.js
const firebase = require('firebase');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBawIyliYl00OKhkKUvJxh_dmQMZ-Epvc0",
    authDomain: "shangri-la-petition-pla-ii0iv7.firebaseapp.com",
    projectId: "shangri-la-petition-pla-ii0iv7",
    storageBucket: "shangri-la-petition-pla-ii0iv7.firebasestorage.app",
    messagingSenderId: "72111944540",
    appId: "1:72111944540:web:76dbca0b71191fe90a0799"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

module.exports = db;
