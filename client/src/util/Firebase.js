import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDR60DEacc2LyalXSgd9kHZA6MMGlrSZgE",
    authDomain: "boots-da11f.firebaseapp.com",
    databaseURL: "https://boots-da11f-default-rtdb.firebaseio.com",
    projectId: "boots-da11f",
    storageBucket: "boots-da11f.appspot.com",
    messagingSenderId: "84237747459",
    appId: "1:84237747459:web:8d7a3ad06cb089296ed536",
    measurementId: "G-8L6SB885RB"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  const result = await auth.signInWithPopup(provider).then(result => {      
      return result
  });
  return result
};

export const signOut = () => {
    auth.signOut().then(() => {
        console.log('Signed Out')
        console.log(auth.currentUser)
    }).catch((error) => {
        console.log('Sign Out Error')
    })
}

export const updateUser = (trips) => {
    // firestore.settings({
    //     timestampsInSnapshots: true
    // })
    firestore.collection("users").add({
        email: 'helo',
        trips: trips
    })
}