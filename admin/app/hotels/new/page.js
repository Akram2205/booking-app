/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import { useUsers } from "@/app/context/UsersContext"
import { useState } from "react"
import { MdDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import useFetch from '@/app/hooks/useFetch';

export default function New(){
    const [imgs,setImgs] = useState('')

    const {data,loading,err} = useFetch('http://localhost:8800/rooms')

    //const {users,dispatch} = useUsers()
    const router = useRouter()
    const [hotel,setHotel] = useState({
        name:"",
        type:"",
        city:"",
        adress:"",
        distance:"",
        photos:"",
        rooms:[],
        desc:"",
        title:"",
        note:"",
        cheapestPrice:"",
        featured:false,
    })



    const handleClick =async(e)=>{
        try{
           let list = await Promise.all(Object.values(imgs).map(async(img)=>{
            const data = new FormData()
            data.append('file',img)
            data.append('upload_preset','upload')
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/akramdev/image/upload',data,{
                withCredentials: false,
            })

            const {url} = uploadRes.data;
            console.log("00000")
            return url
            
        })
        ); 
        console.log("1111111")
            const newHotel = {...hotel, photos:list}
            await axios.post('http://localhost:8800/hotels',newHotel,{
                withCredentials: false
            })
            router.push('/hotels')
        }catch(err){


        }
    }

    return(
        <>

        <div className="shadow-lg mb-4">
            <h1 className="text-gray-400 text-2xl font-semibold p-2">Add New Hotel</h1>
        </div>
        <div className="p-4 shadow-lg mt-2">
            <div className="flex justify-between p-4">
                <div className='flex flex-col items-center space-y-2'>
                    <img className='rounded-full w-[150px] h-[150px]' src={imgs ? URL.createObjectURL(imgs[0]) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s"} width={150} height={150}/>
                    <label htmlFor='file' className='block pb-11'>
                        <MdDriveFolderUpload className='text-3xl cursor-pointer'/>
                    </label>
                    <input multiple={true} type='file' id='file' onChange={(e)=>{
                        setImgs(e.target.files)
                    }} style={{display:"none"}}/>
                </div>
                <div className='w-[70%]'>
                    <div className='flex justify-between' >
                        <div className='w-[90%]'>
                            <label className="block">Type</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.type} onChange={(e)=>{
                                setHotel({...hotel,type:e.target.value})
                            }}/>
                            <label className="block">Name</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.name} onChange={(e)=>{
                                setHotel({...hotel,name:e.target.value})
                            }}/>
                            <label className="block">Title</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.title} onChange={(e)=>{
                                setHotel({...hotel,title:e.target.value})
                            }}/>
                            <label className="block">Price</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.Price} onChange={(e)=>{
                                setHotel({...hotel,cheapestPrice:e.target.value})
                            }}/>
                            <label className="block">Note</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.note} onChange={(e)=>{
                                setHotel({...hotel,note:e.target.value})
                            }}/>
                        </div>
                        <div className='w-[90%]'>
                            <label className="block">Address</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.adress} onChange={(e)=>{
                                setHotel({...hotel,adress:e.target.value})
                            }}/>
                            
                            <label className="block">City</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.city} onChange={(e)=>{
                                setHotel({...hotel,city:e.target.value})
                            }}/>
                            <label className="block">distance</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.distance} onChange={(e)=>{
                                setHotel({...hotel,distance:e.target.value})
                            }}/>
                            <label className="block">Description</label>
                            <input className="border-b border-gray-600 mb-7" value={hotel.desc} onChange={(e)=>{
                                setHotel({...hotel,desc:e.target.value})
                            }}/>
                            <label className="block">featured</label>
                            <select className="border-b border-gray-600 mb-7" value={hotel.featured} onChange={(e)=>{
                                setHotel({...hotel,featured:e.target.value})
                            }}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>
                    <label className="block mb-2">Rooms</label>
                    <select multiple={true} className="border-b w-full border-gray-600" value={hotel.rooms} onChange={(e)=>{
                        setHotel({...hotel, rooms: Array.from(e.target.selectedOptions).map((op)=>(op.value))})
                    }}>
                        {!data ? "loading..." : 
                        data.map((room)=>(
                            <option key={room._id} value={room._id}>{room.title}</option>
                        ))
                        }
                    </select>
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