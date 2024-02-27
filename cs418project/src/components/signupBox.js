import { useState, useContext } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { UserContext } from "@/lib/context";
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const SignupBox = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const addUserToDatabase = async () => {
		try {
			console.log("addUserToDatabase: " + auth.currentUser.uid);
			const db = firestore;
			const docRef = doc(db, "users", auth.currentUser.email);
			await setDoc(docRef, {
				uid: auth.currentUser.uid,
				email: email,
				isAdmin: false,
				isVerified: false
			}).then(() => {
				auth.currentUser.disa
				signOut(auth);
				console.log("AddedUserToDB");
			});
		} catch (err) {
			console.error("addUserToDatabase: " + err);
		}
	}

	const submit = async () => {
		await createUserWithEmailAndPassword(auth, email, password).then(() => {
			console.log("createUserWithEmailAndPassword: " + auth.currentUser.uid);
			toast.success('Account Creation Successful');
			addUserToDatabase();
			setEmail("");
			setPassword("");
		}).catch((error) => {
			switch (error.code) {
				case 'auth/weak-password':
					toast.error('Weak Password, ensure length is atleast 6 characters');
					break;
				case 'auth/email-already-in-use':
					toast.error('Email already in use');
					setEmail("");
					setPassword("");
					break;
				default: toast.error(error.code);
			}
			console.error("submit: " + error);
		});
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign Up
				</h2>
			</div>

			<div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div>
					<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							value={email}
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
								placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
							Password
						</label>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							value={password}
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
								placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
				</div>

				<div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={submit}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignupBox;