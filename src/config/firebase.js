
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
 
}

const firebaseImpl  = firebase.initializeApp(firebaseConfig);
const firebaseDatabase = firebaseImpl.database();
export {
    firebaseConfig,
    firebaseDatabase,
    firebaseImpl
}

 