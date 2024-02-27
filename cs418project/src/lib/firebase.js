import { initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCC0KtBVDkpse57ecaB2aE6ZxoqBnS-LKU",
    authDomain: "cs418project.firebaseapp.com",
    projectId: "cs418project",
    storageBucket: "cs418project.appspot.com",
    messagingSenderId: "858279594459",
    appId: "1:858279594459:web:46b45951f3bc12eeadfffe"
  };

function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
  }
  
  // const firebaseApp = initializeApp(firebaseConfig);
  const firebaseApp = createFirebaseApp(firebaseConfig);
  

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);