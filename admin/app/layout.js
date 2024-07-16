import SideBar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { UsersProvider } from "./context/UsersContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <UsersProvider>
         <AuthProvider>
          <div className="flex">
          <div className="w-[180px] border-r">
            <SideBar/>
          </div>
          <div className="w-full">
            <Navbar/>
            {children}
          </div>
          </div>
          </AuthProvider>
        </UsersProvider>        
      </body>
    </html>
  );
}
