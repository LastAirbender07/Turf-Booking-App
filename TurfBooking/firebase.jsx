// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxxxxxx',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db};
