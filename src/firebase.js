import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBhRbVtEmSgS-OXzy_m3CT2shW8cTudnSA",
  authDomain: "instagram-clone-8d684.firebaseapp.com",
  databaseURL: "https://instagram-clone-8d684.firebaseio.com",
  projectId: "instagram-clone-8d684",
  storageBucket: "instagram-clone-8d684.appspot.com",
  messagingSenderId: "813651013464",
  appId: "1:813651013464:web:8f95d7b84643c6d165bf2d",
  measurementId: "G-HXPXR7NSVZ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
