import "@/styles/globals.css";

import NavBar from "../components/navBar";
import { UserContext } from "@/lib/context";
import { auth, firestore } from "@/lib/firebase";
import { useUserData } from "@/lib/hooks";
import { Toaster } from "react-hot-toast";
import { Suspense } from 'react'
import { NavigationEvents } from "@/components/navigationEvents";

export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Suspense fallback={null}>
        <NavigationEvents />
          <NavBar />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Component {...pageProps} />
          </div>
          <Toaster />
      </Suspense>
    </UserContext.Provider>
  );
}
