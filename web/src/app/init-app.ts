import { InjectionToken } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import { environment } from 'src/environments/environment';

const firebaseConfig = environment.firebaseConfig;

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage();

export const RESOURCES_PERMISSIONS_IT = new InjectionToken(
  'Injection TOken for resources permissions'
);
export const RESOURCES_PERMISSIONS: string[] = [];

export function init(): Promise<any> {
  return new Promise((resolve, reject) => {
    getAuth(app).onAuthStateChanged((user) => {
      let resources: string[] = [];
      if (user) {
        resources = [
          'players:create-player:ui',
          'teams:create-team:ui',
          'tournaments:create-group:ui',
          'tournaments:add-team-to-group:ui',
          'tournaments:add-match:ui',
          'tournaments:add-team:ui',
          'tournaments:edit-match:ui',
          'teams:add-player-to-team:ui',
          'tournaments:delete-team:ui',
        ];
      }
      RESOURCES_PERMISSIONS.splice(0, RESOURCES_PERMISSIONS.length);
      RESOURCES_PERMISSIONS.push(...resources);
      resolve(true);
    });
  });
}
