import { auth, firestore } from '@/lib/firebase';
import { toast } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const logOutBox = () => {
	const router = useRouter();

	const logOut = async () => {
		signOut(auth).then(() => {
			router.push('/');
		});
	}

	return (
		<div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Log Out
			</h2>
			<div>
				<button
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={logOut}>
					Log Out
				</button>
			</div>
		</div>
	);
}

export default logOutBox;