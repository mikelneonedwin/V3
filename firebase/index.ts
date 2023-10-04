import { initializeApp } from 'firebase/app';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectDatabaseEmulator, getDatabase, ref } from 'firebase/database';

const app = initializeApp({
    databaseURL: process.env.FIREBASE_DATABASEURL,
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
})

export const storage = getStorage(app);
export const db = getDatabase(app);
if(process.env.NODE_ENV == "development"){
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    connectDatabaseEmulator(db, '127.0.0.1', 9000);
}

export const dbRef = ref(db);