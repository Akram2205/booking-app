/* eslint-disable @next/next/no-img-element */
'use client'
import { useUsers } from "@/app/context/UsersContext"
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function UserId(props){
    const id = props.params.userId
    const {users,dispatch} = useUsers()
    const router = useRouter()

    let i = users.findIndex((user)=>{
        return user.id == id
    });

    const [user,setUser] = useState(users[i])

    const [edit, setEdit] = useState(true)

    return(
        <div className="px-6 py-4">
            <div className="shadow-xl p-4">
                <div className="flex justify-between pb-5 items-center">
                    <h1 className="text-gray-400 pl-6">Information</h1>
                    <button onClick={()=>{
                        setEdit(false)
                    }} className="py-1 px-2 border border-deep-purple-300 text-deep-purple-300 rounded-lg">Edit</button>
                </div>
                <div className="flex space-x-32 items-start">
                    <img className="rounded-full" src={user.img} alt="photo" width={150} height={150}/>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-700 pb-4">{user.name}</h1>
                        <div className="mb-3 flex space-x-4 items-center">
                            <label className=" text-gray-600 font-semibold text-lg">Name:</label>
                            <input className="p-2 w-72" disabled={edit} value={user.name} onChange={(e)=>{
                                setUser({...user, name:e.target.value})
                            }}/>
                        </div>

                        <div className="mb-3 flex space-x-5 items-center">
                            <label className=" text-gray-600 font-semibold text-lg">email:</label>
                            <input className="p-2 w-72" disabled={edit} value={user.email} onChange={(e)=>{
                                setUser({...user, email:e.target.value})
                            }}/>
                        </div>

                        <div className="mb-3 flex space-x-4 items-center">
                            <label className=" text-gray-600 font-semibold text-lg">Phone:</label>
                            <input className="p-2 w-72" disabled={edit} value={user.phone} onChange={(e)=>{
                                setUser({...user, phone:e.target.value})
                            }}/>
                        </div>
                        <div className="mb-3 flex space-x-4 items-center">
                            <label className=" text-gray-600 font-semibold text-lg">Address:</label>
                            <input className="p-2 w-72" disabled={edit} value={user.address} onChange={(e)=>{
                                setUser({...user, address:e.target.value})
                            }}/>
                        </div>
                        <div className="mb-3 flex space-x-4 items-center">
                            <label className=" text-gray-600 font-semibold text-lg">Country:</label>
                            <input className="p-2 w-72" disabled={edit} value={user.country} onChange={(e)=>{
                                setUser({...user, country:e.target.value})
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button onClick={()=>{
                        setEdit(true);
                        dispatch({type:"edit",payload:{userEdited: user}})
                        router.push('/')
                    }    
                    }
                         className="py-1 px-2 border border-deep-purple-300 text-deep-purple-300 rounded-lg">Save</button>
                </div>
                
            </div>

        </div>
    )
}