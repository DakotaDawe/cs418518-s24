import ChangePassword from "@/components/changePassword";
import LogOutBox from "@/components/logOutBox";

import { UserContext } from "@/lib/context";
import { useContext, useEffect } from "react";

const UserHome = () => {
	const { user, userData } = useContext(UserContext);

	useEffect(() => {
		console.error("Is Admin: " + userData.isAdmin);
	}, [userData]);

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="space-y-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{
						user ?
							<>
								<p><span>Email: </span>{String(user.email).toLowerCase()}</p>
								<p><span>Is Admin: </span>{String(userData.isAdmin).toLowerCase()}</p>
								<p><span>Is Verified: </span>{String(userData.isVerified).toLowerCase()}</p>
							</>
							:
							<></>
					}
				</div>
				<LogOutBox />
			</div>

			<ChangePassword />
		</>
	);
}


export default UserHome;