/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { MdDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

export default function Register(){
    const {authState,dispatch} = useAuth()
    const {error,user}= authState

    const cloudinary = {
        cloudName: 'akramdev',
        apiKey: '139442438879676',
        apiSecret: '1tJCAUGnPwMM5uxavOfE_usXqSc'
      };

    const [img,setImg] = useState("")

    //const {users,dispatch} = useUsers()
    const router = useRouter()
    const [newUser,setNewUser] = useState({
        img:"",
        username:"",
        email:"",
        password:"",
        phone:"",
        country:""
    })


    const handleClick =async()=>{
        const data = new FormData()
            data.append('file',img)
            data.append('upload_preset','upload')
        try{
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/akramdev/image/upload',data,{
                withCredentials: false 
              }
            )
            const {url} = uploadRes.data

            const userAdd = {...newUser, img:url}
            const res = await axios.post('http://localhost:8800/auth/register',userAdd)
            dispatch({type:'login_success',payload: res.data})
            router.push('/')
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <div className="p-4 shadow-lg mt-2">
        <div className="grid grid-cols-3 p-4">
            <div className='flex flex-col items-center space-y-2'>
                <img className='rounded-full w-[150px] h-[150px]' src={img ? URL.createObjectURL(img) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s"} width={150} height={150}/>
                <label htmlFor='file' className='block pb-11'>
                    <MdDriveFolderUpload className='text-3xl cursor-pointer'/>
                </label>
                <input type='file' id='file' onChange={(e)=>{
                    setImg(e.target.files[0])
                }} style={{display:"none"}}/>
            </div>
            <div>
                

                <label className="block">username</label>
                <input className="border-b border-gray-600 mb-7" value={newUser.name} onChange={(e)=>{
                    setNewUser({...newUser,username:e.target.value})
                }}/>
                <label className="block">Phone</label>
                <input className="border-b border-gray-600 mb-7" value={newUser.phone} onChange={(e)=>{
                    setNewUser({...newUser,phone:e.target.value})
                }}/>
                <label className="block">Country</label>
                <input className="border-b border-gray-600 mb-7" value={newUser.country} onChange={(e)=>{
                    setNewUser({...newUser,country:e.target.value})
                }}/>
            </div>
            <div>
                
                <label className="block">Email</label>
                <input className="border-b border-gray-600 mb-7" value={newUser.email} onChange={(e)=>{
                    setNewUser({...newUser,email:e.target.value})
                }}/>
                <label className="block">Password</label>
                <input className="border-b border-gray-600 mb-7" value={newUser.password} onChange={(e)=>{
                   setNewUser({...newUser,password:e.target.value})
                }}/>
                
            </div>
        </div>
        <div className="flex justify-center">
                <button onClick={()=>{
                    handleClick()

                }} className="py-1 px-2 border border-deep-purple-300 text-deep-purple-300 rounded-lg">
                    send
                </button>
            </div>
    </div></>

        
    )
}