import { useContext, useState } from "react";
import { UserContext } from "@/lib/context";
import { updatePassword } from "firebase/auth";
import { toast } from "react-hot-toast";

const UserHome = () => {
	const { user, userData } = useContext(UserContext);

	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const onChangePassword = () => {
		if (user) {
			if (newPassword == confirmNewPassword) {
				console.log("onChangePassword: PASSWORDS ARE EQUAL");
				updatePassword(user, newPassword).then(() => {
					// Update successful.
				}).catch((error) => {
					switch (error.code) {
						case 'auth/requires-recent-login':
							toast('Login must be recent to change password. Login again');
							window.location.href = "/signin";
							break;
					}
					console.error("onChangePassword: " + error.code);
				});
			} else {
				console.log("onChangePassword: PASSWORDS ARE NOT EQUAL");
			}
		}
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Change Password
				</h2>
			</div>

			<div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div>
					<label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
						New Password
					</label>
					<div className="mt-2">
						<input
							id="newPassword"
							name="newPassword"
							type="newPassword"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
								placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setNewPassword(e.target.value);
							}}
						/>
					</div>
				</div>
				<div>
					<label htmlFor="confirmNewPassword" className="block text-sm font-medium leading-6 text-gray-900">
						Confirm New Password
					</label>
					<div className="mt-2">
						<input
							id="confirmNewPassword"
							name="confirmNewPassword"
							type="confirmNewPassword"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
								placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setConfirmNewPassword(e.target.value);
							}}
						/>
					</div>
				</div>

				<div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
				text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={onChangePassword}>
						Set New Password
					</button>
				</div>
			</div>
		</div>
	);
}



export default UserHome;