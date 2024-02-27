import { useState } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, doc } from 'firebase/firestore';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { toast } from "react-hot-toast";

const SigninBox = () => {
	const { user, userData } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const canSignInResult = {
		NotVerified: 0,
		Verified: 1,
		Admin: 2
	}

	const canUserSignIn = async () => {
		try {
			const db = firestore;
			const snapshot = await getDocs(collection(db, "users"));
			const foundDocs = snapshot.docs;
			for (let i = 0; i < foundDocs.length; i++) {
				const foundDoc = foundDocs[i];
				if (foundDoc.data().email == email) {
					if (foundDoc.data().isAdmin) {
						return canSignInResult.Admin;
					}
					if (foundDoc.data().isVerified) {
						return canSignInResult.Verified;
					}
				}
			}
			return canSignInResult.NotVerified;
		} catch (err) {
			console.error("canUserSignIn: " + err);
			return canSignInResult.NotVerified;
		}
	}

	const signIn = async () => {
		try {
			const result = await canUserSignIn();
			if (result != canSignInResult.NotVerified) {
				await signInWithEmailAndPassword(auth, email, password).then(() => {
					if (result == 1) {
						toast.success('Signed in as User');
						window.location.href = "/userHome";
					} else if (result == 2) {
						toast.success('Signed in as Admin');
						window.location.href = "/adminVerifyUsers";
					}
				});
			} else {
				toast.error('Could not sign in, Not Verified or User does not exist');
				console.log("Cannot sign in, not verified: " + email);
			}
		} catch (err) {
			console.error("SignIn: " + err);
		}
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign In
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
						onClick={signIn}>
						Sign in
					</button>
				</div>
				<div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={async () => {
							if (auth.currentUser) {
								console.log("Logged In: " + auth.currentUser.email);
							} else {
								console.log("NOT LOGGED IN");
							}
						}}>
						Test Logged In
					</button>
				</div>
				<div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => { signOut(auth) }}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}

export default SigninBox;