'use client'
import { FaBed } from "react-icons/fa";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { IoManOutline } from "react-icons/io5";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { useState } from "react";
import { useSearch } from "@/app/contexts/SearchContext";
import { useAuth } from "@/app/contexts/AuthContext";

const headerContent = {
    texts:{
        header:"A lifetime of discounts? It's Genius.",
        description:"Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account"
    },
    cta:{
        href:'#',
        label:'register / sing in'
    },
}

export default function Header(){

    const [selectionRange , setSelectionRange]= useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])

    const [place, setPlace] = useState("");

    const [numbers, setNumbers] = useState(
        {
            nbAdult: 1,
            nbChildren: 0,
            nbRoom: 1,
        }
    );

    const [showCalender, setShowCalender] = useState(false)
    const [showNumbers, setShowNumbers] = useState(false)

    const handleSelect =(renges)=>{
        setSelectionRange([renges.selection])
    }

    function addAdult(){
        setNumbers({...numbers,nbAdult:numbers.nbAdult + 1})
    }
    function subAdult(){
        setNumbers({...numbers,nbAdult:numbers.nbAdult - 1})
    }
    function addChild(){
        setNumbers({...numbers,nbChildren:numbers.nbChildren + 1})
    }
    function subChild(){
        setNumbers({...numbers,nbChildren:numbers.nbChildren - 1})
    }
    function addRoom(){
        setNumbers({...numbers,nbRoom:numbers.nbRoom + 1})
    }
    function subRoom(){
        setNumbers({...numbers,nbRoom:numbers.nbRoom - 1})
    }

    const {dispatch} = useSearch();

    const handleSearch = ()=>{
        dispatch({type:'newSearch',payload:{place,date:selectionRange,numbers}})
    }

    const {authState} = useAuth()
    const {user} = authState



    return(
        <div className="bg-blue-900">
            <div className="container px-10 mx-auto ">
            <div className="pt-6 pb-16">
                <h1 className="text-3xl text-white  pb-4">{headerContent.texts.header}</h1>
                <p className="text-white pb-5">{headerContent.texts.description}</p>
                {!user && <Link href={headerContent.cta.href} className="p-2 bg-blue-700 text-white">{headerContent.cta.label}</Link>}
            </div>
            <div className="flex text-gray-400 justify-around items-center bg-white border-4 border-yellow-300 rounded-xl p-2  relative translate-y-1/2">
                <div className="flex space-x-2 items-center">
                    <FaBed />
                    <input value={place}  className="outline-none" placeholder="where are you going?" onChange={(e)=>{
                        setPlace(e.target.value)
                    }}/>
                </div>
                <div className="relative z-20">
                    <div className="flex space-x-2 items-center" onClick={()=>{setShowCalender(!showCalender)}}>
                        <LuCalendarDays />
                        <span>{`${format(selectionRange[0].startDate,"dd/MM/yyyy")} to ${format(selectionRange[0].endDate,"dd/MM/yyyy")}`}</span>
                    </div>
                    <div className={`absolute top-[155%] z-20 shadow-lg -left-16 ${showCalender ? '':'hidden'}`}>
                    <DateRange
                        ranges={selectionRange}
                        onChange={handleSelect}
                    />
                    </div>
                </div>
                <div className="relative">
                    <div className="flex space-x-2 items-center" onClick={()=>{setShowNumbers(!showNumbers)}}>
                        <IoManOutline />
                        <span>{`${numbers.nbAdult} adult . ${numbers.nbChildren} children . ${numbers.nbRoom} room`}</span>
                    </div>
                    <div className={`absolute w-52 bg-white p-4 shadow-lg left-6 top-[155%] z-20 ${!showNumbers ? 'hidden' :''}`}>
                        <div className="flex items-center justify-between">
                            <span className="">Adult</span>
                            <div className="flex items-center">
                                <button onClick={subAdult} disabled={numbers.nbAdult==1} className=" w-6 h-6 bg-white text-blue-900 border border-blue-900 disabled:cursor-not-allowed">-</button>
                                <span className="mx-3">{numbers.nbAdult}</span>
                                <button onClick={addAdult} className=" w-6 h-6 bg-white text-blue-900 border border-blue-900">+</button>
                            </div>
                        </div>
                        <div className="py-2 flex justify-between">
                            <span>Children</span>
                            <div className="flex items-center">
                                <button onClick={subChild} className=" w-6 h-6 bg-white text-blue-900 border border-blue-900">-</button>
                                <span className="mx-3">{numbers.nbChildren}</span>
                                <button onClick={addChild} className=" w-6 h-6 bg-white text-blue-900 border border-blue-900">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>Room</span>
                            <div className="flex items-center">
                                <button onClick={subRoom} disabled={numbers.nbRoom==1} className={`w-6 h-6 bg-white text-blue-900 border border-blue-900 disabled:cursor-not-allowed`}>-</button>
                                <span className="mx-3">{numbers.nbRoom}</span>
                                <button onClick={addRoom} className=" w-6 h-6 bg-white text-blue-900 border border-blue-900">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Link onClick={handleSearch} className="bg-blue-900 text-white p-2"
                  href={{
                    pathname:'/hotels',
                    query:{
                        distance: place,
                        nbAdult: numbers.nbAdult,
                        nbChildren: numbers.nbChildren,
                        nbRoom: numbers.nbRoom,
                        startDate: `${format(selectionRange[0].startDate,"dd/MM/yyyy")}`,
                        endDate: `${format(selectionRange[0].endDate,"dd/MM/yyyy")}`,
                    }
                  }}
                >
                        Search
                </Link>

            </div>
        </div>
        </div>
        
    )
}