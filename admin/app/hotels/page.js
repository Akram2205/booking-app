'use client'

import { HotelsTable } from "../components/HotelsTable";
import { useUsers } from "../context/UsersContext";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
 
 
axios.defaults.withCredentials = true

export default function Hotels() {

    //const {users,dispatch} = useUsers()

    const [list,setList] = useState()
    const {data,err,loading} = useFetch("http://localhost:8800/hotels/")
    
    useEffect(()=>{
      setList(data)
    },[data])


    const  handleDelete = async(id) =>{
        setList(list.filter((el)=>{return el._id != id}))
        try{
        await axios.delete(`http://localhost:8800/hotels/${id}`)
      }catch(err){
      }
      
    }

  return (
    <div>
      {!list ?
       "please wait.." : 
       <HotelsTable TABLE_ROWS={list} TABLE_HEAD = {["ID", "Name","type" ,"Address", "price", "action"]} handleDelete={handleDelete}/> 
      }
    </div>

          

  );
}