import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA70K08qV46ap3yeQX3lIEM3NxgTIco_6c',
  authDomain: 'mowglitrails-1512388008487.firebaseapp.com',
  databaseURL: 'https://mowglitrails-1512388008487.firebaseio.com',
  projectId: 'mowglitrails-1512388008487',
  storageBucket: 'mowglitrails-1512388008487.appspot.com',
  messagingSenderId: '466354595530',
};
Firebase.initializeApp(config);
export const db = Firebase.database();
export const app = Firebase;
