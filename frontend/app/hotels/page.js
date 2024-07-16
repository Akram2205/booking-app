/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange} from 'react-date-range';
import { format,parse } from "date-fns";
import Image from "next/image";
import useFetch from "../hooks/useFetch";
import Link from "next/link";



export default function Hotels({searchParams}){


    const [infoSearch,setInfoSearch] = useState({
        place: searchParams.distance,
        nbAdult: searchParams.nbAdult,
        nbChildren: searchParams.nbChildren,
        nbRoom: searchParams.nbRoom,
        date:{
          startDate: parse(searchParams.startDate, 'dd/MM/yyyy', new Date()),
          endDate: parse(searchParams.endDate, 'dd/MM/yyyy', new Date()),
          key: 'selection'
        },
        minPrice:'',
        maxPrice:'',
    });


    let {data,loading,error,refetchData} = useFetch(`http://localhost:8800/hotels?${infoSearch.place?'city='+infoSearch.place:''}&min=${infoSearch.minPrice || 1}&max=${infoSearch.maxPrice || 999}`)
    
console.log(`http://localhost:8800/hotels?${infoSearch.place?'city='+infoSearch.place:''}&min=${infoSearch.minPrice ? infoSearch.min :''}&max=${infoSearch.maxPrice}`)
    function handleSearch(){
        refetchData()
    }

    const [showDate,setShowDate ] = useState(false)
    //handeler
    const handleSelect = (ranges) =>{

        setInfoSearch(
            {...infoSearch,
                date: ranges.selection
            }
        )
    }

    
    return(
        <div className="py-5">
           <div className="container mx-auto px-6">
            <div className="flex items-start space-x-8">
                <div className="bg-yellow-500 w-fit p-2  rounded-lg text-sm">
                    <h1 className="text-xl text-gray-700 pb-2">Search</h1>
                    <p>Destination</p>
                    <input className="p-2 pr-32 mb-2 w-full" value={infoSearch.place} onChange={(e)=>{
                        setInfoSearch({...infoSearch,place:e.target.value})
                    }}/>
                    <div >
                        <p>Check-in Date</p>
                        <p onClick={()=>{setShowDate(!showDate)}} className="p-2 bg-white mb-2 w-full">{`${format(infoSearch.date.startDate,'dd/MM/yyyy')} to ${format(infoSearch.date.endDate,'dd/MM/yyyy')}`}</p>
                        <div className={`${showDate? '': 'hidden'}`}>
                            <DateRange 
                            ranges={[infoSearch.date]}
                            onChange={(ranges)=>{handleSelect(ranges)}}
                            />
                        </div>
                    </div>
                    <p className="pb-2 text-lg">options</p>
                    <div className="flex justify-between pb-2">
                        <label className="pr-10">Max price per night</label>
                        <input className="p-1 w-16" value={infoSearch.maxPrice} onChange={(e)=>{
                            setInfoSearch({...infoSearch,maxPrice:e.target.value})
                        }}/>
                    </div>
                    <div className="flex justify-between pb-2">
                        <label>Min price per night</label>
                        <input className="p-1 w-16" value={infoSearch.minPrice} onChange={(e)=>{
                            setInfoSearch({...infoSearch,minPrice:e.target.value})
                        }}/>
                    </div>
                    <div className="flex justify-between pb-2">
                        <label>Adult</label>
                        <input type="number" min={1} className="p-1 w-16" value={infoSearch.nbAdult} onChange={(e)=>{
                            setInfoSearch({...infoSearch,nbAdult:e.target.value})
                        }}/>
                    </div>
                    <div className="flex justify-between pb-2">
                        <label>Children</label>
                        <input type="number" min={0} className="p-1 w-16" value={infoSearch.nbChildren} onChange={(e)=>{
                            setInfoSearch({...infoSearch,nbChildren:e.target.value})
                        }}/>
                    </div>
                    <div className="flex justify-between pb-2">
                        <label>Room</label>
                        <input type="number" min={1} className="p-1 w-16" value={infoSearch.nbRoom} onChange={(e)=>{
                            setInfoSearch({...infoSearch,nbRoom:e.target.value})
                        }}/>
                    </div>
                    <button onClick={handleSearch} className="block mt-4 w-full mx-auto  py-2 bg-blue-600 text-white">Search</button>
                </div>

                {loading ? 'please wait ...':
                    <div className="w-full">
                    {data.map((el)=>{
                        return(
                            <Link href={`/hotels/${el._id}`} 
                                className="mb-4 p-2 border flex space-x-4" key={el._id}>
                                <img src={el.photos[0]} alt="img" width={220} height={220} />
                                <div className="w-full flex">
                                    <div className="w-[70%]">
                                        <h1 className="text-xl pb-3 font-bold text-blue-500">{el.name}</h1>
                                        <p className="text-sm pb-1">{el.distance}</p> 
                                        <span className="text-sm bg-green-700 rounded-md p-[2px] text-white"> free airport transport</span>      
                                        <p className="text-sm py-1 font-semibold">{el.name}</p> 
                                        <p className="text-sm py-1 text-gray-700">{el.desc}</p> 
                                        <p className="text-sm py-1 font-semibold text-green-700">Free cancellation</p> 
                                        <p className="text-sm py-1 text-green-600">You can cancel later, so lock in this great price today</p> 
                                    </div>  
                                    <div className="w-[30%] flex flex-col justify-between">
                                        <div className="flex justify-end space-x-2 items-center">
                                            <p>{el.note}</p>
                                            <span className="bg-blue-600 text-white px-1">{el.rating}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <h1 className="text-3xl pb-1">{el.cheapestPrice}$</h1>
                                            <p className="text-sm pb-1 text-gray-600">Includes taxes and fees</p>
                                            <button className="py-2 w-full rounded-lg bg-blue-600 text-white">see availability</button>
                                        </div>
                                    </div>    
             
                                </div>
                            </Link>
                        )
                    })}
                </div>}
            </div>
           </div>
        </div>
    )
}