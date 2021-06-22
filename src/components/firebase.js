import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyD2oDrHKvspWHhRKLNZirawTtTE41GRpaM",
  authDomain: "chatio-74511.firebaseapp.com",
  projectId: "chatio-74511",
  storageBucket: "chatio-74511.appspot.com",
  messagingSenderId: "986429639244",
  appId: "1:986429639244:web:4a2802eab614c283b342e9",
  measurementId: "G-2HG8LE3GP5"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage()
export {db,storage};

