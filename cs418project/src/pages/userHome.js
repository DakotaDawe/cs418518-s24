import ChangePassword from "@/components/changePassword";
import ChangeName from "@/components/changeName";
import LogOutBox from "@/components/logOutBox";

import { UserContext } from "@/lib/context";
import { useContext, useEffect } from "react";
import { useRouter } from 'next/router';

const UserHome = () => {
	const { user, userData } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		console.error("Is Admin: " + userData.IsAdmin);
	}, [userData]);

	const goToChangeUserInformation = () => {
		router.push('/changeUserInformation')
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="space-y-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{
						user ?
							<>
								<p><span>Email: </span>{String(user.email).toLowerCase()}</p>
								<p><span>First Name: </span>{String(userData.FirstName).toLowerCase()}</p>
								<p><span>Last Name: </span>{String(userData.LastName).toLowerCase()}</p>
								<p><span>Is Admin: </span>{String(userData.IsAdmin).toLowerCase()}</p>
								<p><span>Is Verified: </span>{String(userData.IsVerified).toLowerCase()}</p>
							</>
							:
							<></>
					}
				</div>
				<div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={goToChangeUserInformation}>
						Change User Information
					</button>
				</div>
				<LogOutBox />
			</div>
		</>
	);
}


export default UserHome;