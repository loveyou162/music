// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Optionally import the services that you want to use
import 'firebase/auth';
import { getDatabase } from 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import { getStorage } from 'firebase/storage';
// import { getStorage, ref } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: 'music-bc1ba.firebaseapp.com',
  databaseURL: 'https://music-bc1ba-default-rtdb.firebaseio.com',
  projectId: 'music-bc1ba',
  storageBucket: 'music-bc1ba.appspot.com',
  messagingSenderId: '309369098818',
  appId: '1:309369098818:web:5bb77c5403f39ec49193db',
  measurementId: 'G-XMHDL56G1K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);
console.log(database);

export const storage = getStorage();
