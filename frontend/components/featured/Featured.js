'use client'

import useFetch from "@/app/hooks/useFetch"
import Image from "next/image"



const destinations=[
        {
            key: 0,
            title: 'barcelon',
            img:'/images/barcelone.jpg'
        },
        {
            key: 1,
            title: 'montereal',
            img:'/images/montereal.jpg'
        },
        {
            key: 2,
            title: 'paris',
            img:'/images/paris.jpg'
        },
]


export default function Featured(){
    const {data,error,loading} = useFetch("http://localhost:8800/hotels/count/countByCity?cities=barcelon,montereal,paris")
    return(
        <div className="pt-20">
            <div className="container mx-auto px-6">
                <h1 className="text-2xl font-bold pb-5">Popular destinations</h1>
                {loading ? "please wait..." :                
                <div className="grid grid-cols-3 gap-5">
                    {
                        destinations.map((el)=>{
                            return(
                                <div key={el.key} className="relative -z-[10]">
                                    <Image className="w-full rounded-lg h-72" src={el.img} width={400} height={400} alt="photo" />
                                    <h1 className="text-white text-3xl absolute bottom-12 left-5">{el.title}</h1>
                                    <p className=" text-xl text-white absolute bottom-5 left-5">{data[el.key] +' properties'}</p>
                                </div>
                            )
                        })
                    }
                </div>}
            </div>
        </div>
    )
} 