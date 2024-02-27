import { useState } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, doc } from 'firebase/firestore';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';

const SigninBox = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const canSignInResult = {
		InvalidEntry: -1,
		NotVerified: 0,
		Verified: 1,
		Admin: 2
	}

	const canUserSignIn = async () => {
		try {
			const db = firestore;
			const snapshot = await getDocs(collection(db, "users"));
			const foundDocs = snapshot.docs;
			let foundEntry = false;
			for (let i = 0; i < foundDocs.length; i++) {
				const foundDoc = foundDocs[i];
				if (foundDoc.data().email == email) {
					foundEntry = true;
					if (foundDoc.data().isAdmin) {
						return canSignInResult.Admin;
					}
					if (foundDoc.data().isVerified) {
						return canSignInResult.Verified;
					}
				}
			}

			return foundEntry ? canSignInResult.NotVerified : canSignInResult.InvalidEntry;
		} catch (err) {
			console.error("canUserSignIn: " + err);
			return canSignInResult.NotVerified;
		}
	}

	const signIn = async () => {
		const result = await canUserSignIn();
		setEmail("");
		setPassword("");
		switch (result) {
			case canSignInResult.NotVerified: toast.error('Could not sign in, Not Verified'); console.log("Cannot sign in, not verified: " + email); return;
			case canSignInResult.InvalidEntry: toast.error('Could not sign in, Invalid Email or Password'); console.log("Cannot sign in, Invalid Email/Password: " + email); return;
		}

		await signInWithEmailAndPassword(auth, email, password).then(() => {
			if (result == canSignInResult.Verified) {
				toast.success('Signed in as User');
				setTimeout(() => {
					router.push('/userHome');
				}, 1500);
			} else if (result == canSignInResult.Admin) {
				toast.success('Signed in as Admin');
				setTimeout(() => {
					router.push('/adminVerifyUsers');
				}, 1500);
			}
		}).catch((error) => {
			switch (error.code) {
				case "auth/invalid-credential": toast.error('Could not sign in, Invalid Email or Password'); break;
			}
			console.error("SignIn: " + error);
		});
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
							value={email}
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
							value={password}
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
			</div>
		</div>
	);
}

export default SigninBox;