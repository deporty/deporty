import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyD7o9ylz719_5yNonHvoFWQhMJ1ZOoNH5c',
  authDomain: 'sports-tournament-13ff7.firebaseapp.com',
  projectId: 'sports-tournament-13ff7',
  storageBucket: 'sports-tournament-13ff7.appspot.com',
  messagingSenderId: '762903484984',
  appId: '1:762903484984:web:c6b87a2820d05ba41464cd',
  measurementId: 'G-JMZ3ERQHMX',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export function init(): Promise<any> {
  return new Promise((resolve, reject) => {
    // Do some asynchronous stuff
    resolve(true);
  });
}


async function getCities(db: Firestore) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
