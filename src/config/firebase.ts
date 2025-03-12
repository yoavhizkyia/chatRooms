import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBFZL-6zzwqFyL130xL_hpsH0c3AMvX2oI",
    authDomain: "chatrooms-8adc2.firebaseapp.com",
    projectId: "chatrooms-8adc2",
    storageBucket: "chatrooms-8adc2.firebasestorage.app",
    messagingSenderId: "258281593458",
    appId: "1:258281593458:web:37e6975a15ec03c03d40eb",
    measurementId: "G-0YGM0N535Z"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
