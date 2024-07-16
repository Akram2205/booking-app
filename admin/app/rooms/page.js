'use client'

import { RoomsTable } from "../components/RoomsTable";
import { useUsers } from "../context/UsersContext";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
 
 
axios.defaults.withCredentials = true

export default function Users() {


    const [list,setList] = useState()
    const {data,err,loading} = useFetch("http://localhost:8800/rooms/")
    
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
       <RoomsTable TABLE_ROWS={list} TABLE_HEAD = {["ID", "Title", "Price", "Max people", "action"]} handleDelete={handleDelete}/> 
      }
    </div>

          

  );
}