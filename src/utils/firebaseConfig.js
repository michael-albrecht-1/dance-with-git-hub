import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAFX7gR1XsuiagScI4EPjCCCSDSwAo9vUM',
  authDomain: 'dance-width-git-hub.firebaseapp.com',
  projectId: 'dance-width-git-hub',
  storageBucket: 'dance-width-git-hub.appspot.com',
  messagingSenderId: '1014397593513',
  appId: '1:1014397593513:web:167ae374d2ae2bf1d106b8',
  measurementId: 'G-6TS89W0Z5G',
};

firebase.initializeApp(config);
export const auth = firebase.auth();

export default firebase;
