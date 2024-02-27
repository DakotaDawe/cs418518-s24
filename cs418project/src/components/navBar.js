import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { useRouter } from 'next/router';
import Link from 'next/link'


const NavBar = () => {
    const { user, userData } = useContext(UserContext);
    const router = useRouter();

    return (
        <div className="flex bg-gray-400 w-screen h-20">
            <nav className="fixed self-center right-12 text-lg font-bold">
                <ul className="inline-flex space-x-12">
                    <li><Link href="/">Home</Link></li>
                    {
                        user ?
                            <>
                                {
                                    userData.isAdmin ?
                                        <>
                                            <li><Link href="/adminVerifyUsers">Admin Panel</Link></li>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                                <li><Link href="/userHome">Profile</Link></li>
                            </>
                            :
                            <>
                                <li><Link href="/signup">Sign Up</Link></li>
                                <li><Link href="/signin">Sign In</Link></li>
                            </>
                    }
                </ul>
            </nav>
        </div>
    );
}



export default NavBar;