import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export interface Message {
    id: string;
    text: string;
    createdAt: firebase.firestore.Timestamp;
    userName: string;
    photoURL?: string;
}