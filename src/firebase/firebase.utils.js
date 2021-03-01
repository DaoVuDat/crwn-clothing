import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDbVs7YJrIrelAdB7M2j60RAAmVJSck_zA",
  authDomain: "crwn-db-a9117.firebaseapp.com",
  databaseURL: "https://crwn-db-a9117.firebaseio.com",
  projectId: "crwn-db-a9117",
  storageBucket: "crwn-db-a9117.appspot.com",
  messagingSenderId: "255686031288",
  appId: "1:255686031288:web:5c0cf622ea39cd7623414d",
  measurementId: "G-4VE7YNVWT9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Return DocumentReference
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // Return DocumentSnapshot
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
