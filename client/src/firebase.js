import firebase from 'firebase/compat/app';
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "netflix-cf10e.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

export default firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
