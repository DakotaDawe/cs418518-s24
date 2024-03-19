import { useContext, useState } from "react";
import { UserContext } from "@/lib/context";
import { auth, firestore } from "../lib/firebase";
import { setDoc, doc, getDocs, getDoc, collection } from 'firebase/firestore';
import { updatePassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useEffect } from "react";


const ChangeName = () => {
	const { user, userData } = useContext(UserContext);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [enteredFirstName, setEnteredFirstName] = useState("");
	const [enteredLastName, setEnteredLastName] = useState("");


	useEffect(() => {
		getCurrentName();
	}, [userData]);

	const getCurrentName = async () => {
		if (userData.IsAdmin) {
			const db = firestore;
			const docRef = doc(db, "users", user.email);
			await getDoc(docRef).then((snapshot) => {
				setFirstName(snapshot.data().FirstName);
				setLastName(snapshot.data().LastName);
				setEnteredFirstName(snapshot.data().FirstName);
				setEnteredLastName(snapshot.data().LastName);
			}).catch((error) => {
				toast.error('Failed to load: ' + error.code);
			});
		}
	};

	const onFirstNameChanged = async () => {
		if (user && enteredFirstName != "" && enteredFirstName != firstName) {
			const db = firestore;
			const docRef = doc(db, "users", user.email);
			const docSnap = await getDoc(docRef);
			var data = docSnap.data();
            data.FirstName = enteredFirstName;
			setDoc(docRef, data).then(() => {
				setFirstName(data.FirstName);
				setEnteredFirstName(data.FirstName);
				toast.success('Set First Name To: ' + enteredFirstName);
			});
		};
	}

	const onLastNameChanged = async () => {
		if (user && enteredLastName != "" && enteredLastName != lastName) {
			const db = firestore;
			const docRef = doc(db, "users", user.email);
			const docSnap = await getDoc(docRef);
			var data = docSnap.data();
            data.LastName = enteredLastName;
			setDoc(docRef, data).then(() => {
				setLastName(data.LastName);
				setEnteredLastName(data.LastName);
				toast.success('Set Last Name To: ' + enteredLastName);
			});
		};
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Change Name
				</h2>
			</div>

			<div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div>
					<label htmlFor="newFirstName" className="block text-sm font-medium leading-6 text-gray-900">
						First Name
					</label>
					<div className="mt-2">
						<input
							id="newFirstName"
							name="newFirstName"
							value={enteredFirstName}
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
								placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setEnteredFirstName(e.target.value);
							}}
						/>
					</div>
				</div>
				<div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={onFirstNameChanged}>
						Set First Name
					</button>
				</div>

				<div>
					<label htmlFor="newLastName" className="block text-sm font-medium leading-6 text-gray-900">
						Last Name
					</label>
					<div className="mt-2">
						<input
							id="newLastName"
							name="newLastName"
							value={enteredLastName}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
								placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setEnteredLastName(e.target.value);
							}}
						/>
					</div>
				</div>

				<div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={onLastNameChanged}>
						Set Last Name
					</button>
				</div>
			</div>
		</div>
	);
}




export default ChangeName;