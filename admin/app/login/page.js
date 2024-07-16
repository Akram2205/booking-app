
'use client'
import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'


export default function Login(){
   axios.defaults.withCredentials = true

    const [userInfo,setUserInfo] = useState({
        email: '',
        password: '',
    });
    const {authState,dispatch} = useAuth()

    const {error,user}= authState

    const router = useRouter()

    async function handleSubmit(e){
        e.preventDefault()
        dispatch({type:'login'})
        try{
            const res =await axios.post('http://localhost:8800/auth/login',userInfo)
            if(res.data.isAdmin){
                dispatch({
                    type:'login_success',
                    payload: res.data}
                )
                router.push('/')
            }else{
                dispatch({
                    type:'login_failure',
                    payload: {message:"you are not allowd"}
                })
            }
        }catch(err){
            dispatch({
                type:'login_failure',
                payload: err.response.data}
            )
        }

    }


    return(
        <div className="container mx-auto px-6">
            <div className="flex flex-col space-y-2 items-center w-[350px] mx-auto border p-3 shadow-lg mt-8">
                <input className="w-full p-2 border" value={userInfo.email} type="email" placeholder="email" onChange={(e)=>{
                    setUserInfo({...userInfo,email: e.target.value})
                }} />
                <input className="w-full p-2 border" value={userInfo.password} type="password" placeholder="password" onChange={(e)=>{
                    setUserInfo({...userInfo, password: e.target.value})
                }}/>
                <button className="bg-blue-600 text-white px-3 py-1 w-fit" onClick={handleSubmit}>
                    submit
                </button>
                {error && <span className="text-sm text-red-600">{error
                }</span>}
            </div>
        </div>
    )
}