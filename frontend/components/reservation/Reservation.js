'use client'

import useFetch from "@/app/hooks/useFetch";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSearch } from "@/app/contexts/SearchContext";
import { useRouter } from 'next/navigation'


import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
 
export default function Reservation({setOpen,hotelId}){
    const router = useRouter()
    const [roomSelected, setRoomSelected] = useState([])
    const {data, loading,err} = useFetch('http://localhost:8800/hotels/room/6630cdd666f57c0fa7e7b604')

    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value

        setRoomSelected(
            checked ? [...roomSelected , value] :
            roomSelected.filter((item)=>{
                return item !== value
            })
        )
    }

    const {searchState} = useSearch()
    const date1= searchState.date[0].startDate
    const date2= searchState.date[0].endDate

    const getDatesInRange = (startDate,endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())

        let list =[]
        while(date <= end){
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1)
        }
        return list
    }

    const allDates = getDatesInRange(date1,date2)

    const isAvailable = (roomNumber) =>{
        const isFound = roomNumber.unavailableDate.some((date)=>(
            allDates.includes(new Date(date).getTime())
        ))

        return !isFound
    }

    const handleClick = async()=>{
        try{
            await Promise.all(roomSelected.map(roomId =>{
                const res = axios.put(`http://localhost:8800/rooms/availability/${roomId}`,{
                    dates: allDates
                })
                return res.data
            }))
            setOpen(false)
            router.push('/')
        }catch(err){

        }
    }
    return(
        <Dialog open={open} handler={()=>{setOpen(!open)}}>
            <DialogHeader>
            <div className="flex space-x-4 items-center">
                <IoClose onClick={()=>{setOpen(false)}}/>
                <span>Select your rooms:</span>
            </div>
            </DialogHeader>

            <DialogBody>
            {!data ? <div>please wait...</div> :<div>
                {data.map((item)=>(
                    // eslint-disable-next-line react/jsx-key
                    <div className="flex py-4 items-center space-x-10">
                        <div>
                            <div className="text-lg font-semibold text-black">{item.title}</div>
                            <div>{item.desc}</div>
                            <div>
                                max people: <b>{item.maxPeople}</b>
                            </div>
                            <div>Price: {item.price} </div>
                        </div>
                        <div>
                            {item.roomNumber.map((room)=>(
                                // eslint-disable-next-line react/jsx-key
                                <div>
                                    <label>{room.number}</label>
                                    <input type="checkbox" value={room._id} onChange={handleSelect} disabled={!isAvailable(room)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>}
            </DialogBody>
            
            
            <DialogFooter>
                <Button color="blue" onClick={handleClick}>Reserve now</Button>
            </DialogFooter>
        </Dialog>
  );
}