import { Inter } from "next/font/google";
import { UserContext } from "@/lib/context";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      
    </main>
  );
}
