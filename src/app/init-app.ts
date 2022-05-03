import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCmfXDNcDTHtWgc8DnieEk0MS6KUogR-Rc",
  authDomain: "deporty-app.firebaseapp.com",
  projectId: "deporty-app",
  storageBucket: "deporty-app.appspot.com",
  messagingSenderId: "861456172435",
  appId: "1:861456172435:web:edaf5251b6866e8fe8d466",
  measurementId: "G-NLEM82Z201"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);

export function init(): Promise<any> {
  return new Promise((resolve, reject) => {
    // Do some asynchronous stuff
    resolve(true);
  });
}

