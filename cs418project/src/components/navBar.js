import { useContext } from "react";
import { UserContext } from "@/lib/context";



const NavBar = () => {
    const { user, userData } = useContext(UserContext);

    return (
        <div className="flex bg-gray-400 w-screen h-20">
            <nav className="fixed self-center right-12 text-lg font-bold">
                <ul className="inline-flex space-x-12">
                    <li><a href="/">Home</a></li>
                    {
                        user ?
                            <>
                                {
                                    userData.isAdmin ?
                                        <>
                                            <p>IS ADMIN</p>
                                            <li><a href="/adminVerifyUsers">Admin Panel</a></li>
                                        </>
                                        :
                                        <>
                                            <p>NOT ADMIN</p>
                                        </>
                                }
                                <li><a href="/userHome">Profile</a></li>
                            </>
                            :
                            <>
                                <li><a href="/signup">Sign Up</a></li>
                                <li><a href="/signin">Sign In</a></li>
                            </>
                    }
                </ul>
            </nav>
        </div>
    );
}



export default NavBar;