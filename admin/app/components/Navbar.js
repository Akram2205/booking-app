import { IoIosSearch } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineFullscreenExit } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import Image from "next/image";

export default function Navbar(){
    return(
        <div className="p-2 border-b flex justify-between text-gray-700 px-6">
            <div className="border flex items-center w-fit pr-1">
                <input className="p-1 focus:outline-none focus:border-none" placeholder="Search..."/>
                <IoIosSearch className="text-xl"/>
            </div>
            <div className="flex items-center space-x-6 text-xl">
                <div className="flex items-center space-x-1">
                    <MdOutlineLanguage/>
                    <p className="text-base">english</p>
                </div>
                <MdOutlineNightlight/>
                <MdOutlineFullscreenExit/>
                <div className="flex relative">
                    <MdNotificationsNone/>
                    <span className="w-4 h-4 rounded-full text-white text-xs text-center bg-red-600 absolute left-2 bottom-2">1</span>
                </div>
                <div className="flex relative">
                    <FiMessageSquare/>
                    <span className="w-4 h-4 rounded-full text-white text-xs text-center bg-red-600 absolute left-2 bottom-2">2</span>
                </div>
                <HiBars3CenterLeft/>
                <Image className="rounded-full" src='/images/png-transparent-man.png' alt="photo" width={25} height={25} />
            </div>

        </div>
    )
}