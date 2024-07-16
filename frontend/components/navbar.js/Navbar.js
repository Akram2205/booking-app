'use client'
import Link from "next/link";
import { FaBed } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { LiaTaxiSolid } from "react-icons/lia";
import { useAuth } from "@/app/contexts/AuthContext";

const navbarContent = {
    featusred:[
        {
            key:1,
            logo:<FaBed />,
            label:"Stays", 
        },
        {
            key:2,
            logo: <MdFlight/>,
            label:"Flights", 
        },
        {
            key:3,
            logo:<FaCar/>,
            label:"Car rentals", 
        },
        {
            key:4,
            logo:<FaBed/>,
            label:"Attraction", 
        },
        {
            key:5,
            logo:<LiaTaxiSolid/>,
            label:"Airport taxis", 
        },
    ],
}


export default function Navbar(){

    const {authState} = useAuth()
    const {user} = authState

    return(
        <div className="bg-blue-900 ">
            <div className="container mx-auto px-10">
                <div className=" text-sm flex justify-between items-center pt-4 pb-6">
                    <Link href='/' className="text-white">BOOKING LOGO</Link>
                    {user ? <p className="text-white">{user.username}</p> :<div className="flex space-x-3 items-center">
                        <Link href="../register" className="p-2 bg-white text-blue-900 ">Register</Link>
                        <Link href="../login" className="p-2 bg-white text-blue-900 ">Sign in</Link>
                    </div>}
                </div>
                <ul className="flex space-x-10 text-base pb-8">
                    {navbarContent.featusred.map((el)=>(
                        <li key={el.key}  className={`cursor-pointer flex space-x-1 p-2 items-center active:border rounded-lg`}>
                            <p className="text-white">{el.logo}</p>
                            <p className="text-white">{el.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}