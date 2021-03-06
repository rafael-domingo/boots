import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
require('dotenv').config();

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "boots-da11f.firebaseapp.com",
    databaseURL: "https://boots-da11f-default-rtdb.firebaseio.com",
    projectId: "boots-da11f",
    storageBucket: "boots-da11f.appspot.com",
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
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

export const signInWithPhone = async (phoneNumber, appVerifier) => {
    await auth.signInWithPhoneNumber(phoneNumber, appVerifier).then(result => {
        // let code = prompt('enter the otp', '');
        // if (code === null) {
        //     console.log(result)
        // } 
        // result.confirm(code).then(result => {
        //     console.log(result)
        // })
        // pass result object to window to be accessible by other functions
        window.result = result
    }).catch((error) => {
        console.log(error)
        console.log('Phone Sign In Error')
    })
}
  
export const signOut = async () => {
    await auth.signOut().then(() => {
        console.log('Signed Out')
        console.log(auth.currentUser)
        return auth.currentUser
    }).catch((error) => {   
        console.log('Sign Out Error')
    })
}

export const updateUser = (name, email, uid, trips) => {
    // firestore.settings({
    //     timestampsInSnapshots: true
    // })
    firestore.collection("users").doc(auth.currentUser.uid).set({
        name: name,
        email: email,
        trips: trips
    }).catch((error) => {
        console.log('Update Error')
    })
}

export const getUser = async () => {
    const result = await firestore.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
        if (doc.exists) {
            console.log('doc exists')
            return doc.data()
        } else {
            return 'New User'
        }
        
    })
    return result
}
  
export const deleteUser = () => {
    firestore.collection("users").doc(auth.currentUser.uid).delete().then(() => {
        console.log('User delete successfully')
        return auth.currentUser
    }).catch((error) => {
        console.log('Error in deleting user')
    })
}