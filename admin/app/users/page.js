'use client'

import { useUsers } from "../context/UsersContext";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import UsersTable from "../components/UsersTable";
 
 
axios.defaults.withCredentials = true

export default function Users() {

    const [list,setList] = useState()
    const {data,err,loading} = useFetch("http://localhost:8800/users/")
    
   useEffect(()=>{
      setList(data)
    },[data])

    
    const  handleDelete = async(id) =>{
      setList(list.filter((el)=>{return el._id !== id}))
      try{
        await axios.delete(`http://localhost:8800/users/${id}`)
      }catch(err){
      }
      
    }

  return (
    <div>    
      {!list ?
       'please wait ..':
       <UsersTable TABLE_HEAD={["ID", "Member", "Email", "Country", "Employed", "action"]} TABLE_ROWS={list} handleDelete={handleDelete}/>
    }</div>

      
  );
}