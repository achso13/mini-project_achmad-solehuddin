// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwvrfv4oWDXGyE260B7OvNtNkDR8gfYJE",
  authDomain: "portal-berita-f1bcb.firebaseapp.com",
  projectId: "portal-berita-f1bcb",
  storageBucket: "portal-berita-f1bcb.appspot.com",
  messagingSenderId: "713576264020",
  appId: "1:713576264020:web:ccd2d463a4fe704fead8c1",
  measurementId: "G-5D1E9YBH5W",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
