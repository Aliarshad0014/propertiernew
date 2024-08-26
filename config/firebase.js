// import firebase from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// bleaum.json
const firebaseConfig = {
  apiKey: "AIzaSyB5aymyrfobnLDusSVYw0Lqaqu7_KTEKkA",
  authDomain: "propertier-6291b.firebaseapp.com",
  projectId: "propertier-6291b",
  storageBucket: "propertier-6291b.appspot.com",
  messagingSenderId: "390128912429",
  appId: "1:390128912429:web:d24b100dce64e580c3d0a4",
  measurementId: "G-WD5M6GZGTH",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
// var storage = firebase.storage();

export { firebase, storage };
