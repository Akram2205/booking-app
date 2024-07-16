import { RiDashboardFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaStoreAlt } from "react-icons/fa";
import { FaRegWindowRestore } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { MdNotificationsNone } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";


export default function SideBar(){
    return(
        <div>
            <div className="border-b pb-4 flex justify-center items-center">
                <Link href='/' className="text-[#6439FF] text-lg font-semibold pt-1 pl-4">Akradmin</Link>
            </div>
            <div className=" pl-3 text-gray-700">
                <h2 className="pt-4 pb-[6px] text-xs">MAIN</h2>
                <div className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <RiDashboardFill className="text-[#6439FF] text-base" />
                    <p>Dashboard</p>
                </div>
                
                <h2 className="pt-4 pb-[6px] text-xs">LISTS</h2>
                <Link href='/users' className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <FiUsers className="text-[#6439FF] text-base"/>
                    <p >Users</p>
                </Link>
                <Link href='/hotels' className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <FaStoreAlt className="text-[#6439FF] text-base"/>
                    <p>Hotels</p>
                </Link>
                <Link href='/rooms' className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <FaRegWindowRestore className="text-[#6439FF] text-base"/>
                    <p>Rooms</p>
                </Link>

                <h2 className="pt-4 pb-[6px] text-xs">USEFUL</h2>
                <div className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <ImStatsBars className="text-[#6439FF] text-base"/>
                    <p>Stats</p>
                </div>
                <div className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <MdNotificationsNone className="text-[#6439FF] text-base"/>
                    <p>Notification</p>
                </div>

                <h2 className="pt-4 pb-[6px] text-xs">Services</h2>
                <div className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <GrSystem className="text-[#6439FF] text-base"/>
                    <p>System Health</p>
                </div>
                <div className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <RiUserSettingsLine className="text-[#6439FF] text-base"/>
                    <p>Logs</p>
                </div>
                <div className="flex space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50 py-1">
                    <TbSettings className="text-[#6439FF] text-base"/>
                    <p>Settings</p>
                </div>

                <h2 className="pt-4 pb-[6px] text-xs">USER</h2>
                <div className="flex py-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <FaRegUserCircle className="text-[#6439FF] text-base"/>
                    <p>Profil</p>
                </div>
                <div className="flex ppy-1 space-x-2 items-center pl-2 text-sm hover:bg-deep-purple-50">
                    <IoIosLogOut className="text-[#6439FF] text-base"/>
                    <p>Logout</p>
                </div>
                <div className="pt-3 pl-2 flex space-x-2">
                    <div className="h-6 w-6 bg-black rounded-md border border-violet-500"></div>
                    <div className="h-6 w-6 bg-white rounded-md border border-violet-500"></div>
                </div>
            </div>
        </div>
    )
}