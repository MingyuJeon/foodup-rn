import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    projectId: 'kr-foodmenu',
    storageBucket: 'kr-foodmenu.appspot.com'
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage().ref();
