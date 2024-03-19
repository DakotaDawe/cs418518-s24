import { auth, firestore } from "../lib/firebase";
import { useState, useContext, useEffect } from "react";
import { setDoc, doc, getDocs, getDoc, collection } from 'firebase/firestore';
import { useIsAdmin } from "@/lib/hooks";
import { UserContext } from "@/lib/context";
import { toast } from "react-hot-toast";

const AdminVerifyUsers = () => {

    const { user, userData } = useContext(UserContext);
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);

    useEffect(() => {
        if (userData.IsAdmin) {
            console.log("USER IS ADMIN SHOWING VERIFIED USERS");
            getUnverifiedUsers();
        }
    }, [userData]);

    const getUnverifiedUsers = async () => {
        if (userData.IsAdmin) {
            const db = firestore;
            await getDocs(collection(db, "users")).then((snapshot) => {
                var allUnverifiedUsers = [];
                snapshot.forEach((doc) => {
                    if (!doc.data().IsVerified) {
                        allUnverifiedUsers.push({ uid: doc.id, data: doc.data() });
                        console.log("User Added: ID: " + doc.id + " Data: " + doc.data());
                    }
                })
                setUnverifiedUsers(allUnverifiedUsers);
                toast.success('Loaded all Unverified Users');
            }).catch((error) => {
                toast.error('Failed to load: ' + error.code);
                console.error("USER IS NOT ADMIN NOT SHOWING VERIFIED USERS");
            });
        }
    };


    const verifyUser = async (uid) => {
        try {
            const db = firestore;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            data.IsVerified = true;
            await setDoc(docRef, data).then(() => {
                getUnverifiedUsers();
                console.log("Verifying: " + uid + " data: " + JSON.stringify(data));
            });
        } catch (err) {
            console.error("verifyUser: " + err);
        }
    }

    return (
        <div>
            {unverifiedUsers.map(unverifiedUser =>
                <div key={unverifiedUser.uid} className="bg-gray-200 flex space-x-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => verifyUser(unverifiedUser.uid)}>Verify
                    </button>
                    <p>{unverifiedUser.data.email}</p>
                </div>
            )}
            <button
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                    getUnverifiedUsers();
                }}>
                Refresh
            </button>
        </div>
    );
}

export default AdminVerifyUsers;