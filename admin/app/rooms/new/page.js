/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { MdDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import useFetch from '@/app/hooks/useFetch';

export default function New(){
    

    const {data,loading,err} = useFetch('http://localhost:8800/hotels')

    const router = useRouter()
    const [hotelId,setHotelId] = useState("") 
    const [room,setRoom] = useState({
      title:"",
      desc:"",
      price:"",
      maxPeople:"",
    })
    const [numbers,setNumbers] = useState('')

    const handleClick =async()=>{
      let numbersRooms = numbers.split(',').map((nb)=>({number:nb}))
      let newRoom ={...room,roomNumber:numbersRooms}
        try{
            await axios.post(`http://localhost:8800/rooms/${hotelId}`,newRoom)
            router.push('/rooms')
        }catch(err){
          console.log(err)
        }
    }

    return(
        <>

        <div className="shadow-lg mb-4">
            <h1 className="text-gray-400 text-2xl font-semibold p-2">Add New Room</h1>
        </div>
        <div className="p-4 shadow-lg mt-2">
            <div className="flex justify-between p-4">
                <div className='w-full'>
                    <div className='flex justify-between' >
                        <div className='w-[90%]'>
                            <label className="block">Title</label>
                            <input className="border-b w-[75%] border-gray-600 mb-7" value={room.title} onChange={(e)=>{
                                setRoom({...room,title:e.target.value})
                            }}/>
                            <label className="block">Price</label>
                            <input className="border-b w-[75%] border-gray-600 mb-7" value={room.price} onChange={(e)=>{
                                setRoom({...room,price:e.target.value})
                            }}/>
                            <label className="block">Rooms Number</label>
                            <textarea className="border-b w-[75%] border-gray-600 mb-7" value={numbers} onChange={(e)=>{
                                setNumbers(e.target.value)
                            }}/>

                        </div>
                        <div className='w-[90%]'>
                            <label className="block">Description</label>
                            <input className="border-b w-[75%] border-gray-600 mb-7" value={room.desc} onChange={(e)=>{
                                setRoom({...room,desc:e.target.value})
                            }}/>
                            
                            <label className="block">Max people</label>
                            <input className="border-b w-[75%] border-gray-600 mb-7" value={room.maxPeople} onChange={(e)=>{
                                setRoom({...room,maxPeople:e.target.value})
                            }}/>
                                                <label className="block mb-2">Choose hotel</label>
                            <select  className="border-b w-full border-gray-600" value={hotelId} onChange={(e)=>{
                              setHotelId(e.target.value)
                            }}>
                                {!data ? "loading..." : 
                                data.map((hotel)=>(
                                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                ))
                                }
                            </select>
                        </div>
                    </div>

                </div>
                
                
            </div>
        
        <div className="flex justify-center">
                <button onClick={(e)=>{
                    handleClick(e)

                }} className="py-1 px-2 border border-deep-purple-300 text-deep-purple-300 rounded-lg">
                    send
                </button>
            </div>
    </div></>

        
    )
}