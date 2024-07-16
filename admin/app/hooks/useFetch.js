'use client'

import { useEffect, useState } from 'react';

import axios from 'axios';

axios.defaults.withCredentials = true

const useFetch = (url)=>{
    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                const res = await axios.get(url);
                setData(res.data) 
            }catch(err){
                setError(err)
            }
            setLoading(false)
        }
        fetchData()

    },[])

    const refetchData = async()=>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data) 
        }catch(err){
            setError(err)
        }
        setLoading(false)
    }
    return {data,error,loading,refetchData};
}

export default useFetch
