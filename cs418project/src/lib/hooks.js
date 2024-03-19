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
            getDoc(doc(firestore, "users", user.email)).then((docUserData) => {
                setUserData({
                    IsVerified: docUserData.data().IsVerified,
                    IsAdmin: docUserData.data().IsAdmin,
                    Email: docUserData.data().email,
                    FirstName: docUserData.data().FirstName,
                    LastName: docUserData.data().LastName
                });
                unsubscribe = true;
                console.log("useUserData: " + docUserData.data().email + "  isAdmin: " + docUserData.data().IsAdmin);
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
        return docSnapshot.data().IsAdmin;
    }
    return false;
}