import { auth, firestore } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react'

export function useUserData() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        let unsubscribe;
        if (user) {
            getDoc(doc(firestore, "users", user.uid)).then((docUserData) => {
                setUserData({
                    isVerified: docUserData.data().isVerified,
                    isAdmin: docUserData.data().isAdmin,
                    email: docUserData.data().email
                });
                unsubscribe = true;
                console.log("useUserData: " + docUserData.data().email + "  isAdmin: " + userData.isAdmin);
            });
        } else {
            setUserData({
                isVerified: false,
                isAdmin: false
            });
        }

        return unsubscribe;
    }, [user]);

    return { user, userData };
}


export async function useIsAdmin() {
    if (auth.currentUser) {
        const db = firestore;
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);
        console.log("useisadmin: " + auth.currentUser.email);
        return docSnapshot.data().isAdmin;
    }
    return false;
}