'use client'
import useFetch from "@/app/hooks/useFetch"
import Image from "next/image"


export default function GuestLoves(){
    let {data,loading,error} = useFetch('http://localhost:8800/hotels?featured=true&limit=4')

    return(
        <div className="container mx-auto px-6 pb-20">
            <h1 className="text-2xl font-bold pb-5 pt-14">Homes guests love</h1>
                {loading ? 'please wait...':
                    <div className="grid grid-cols-4 gap-5">
                    {
                        data.map((el)=>{
                            return(
                                <div key={el._id} className="">
                                    <Image className="w-full h-[250px] pb-1" src={el.photos[0]} width={200} height={200} alt="photo" />
                                    <h1 className="font-semibold pt-2 pb-1">{el.name}</h1>
                                    <p className="text-gray-600 pb-1 ">{el.city}</p>
                                    <span className="px-2 py-[1px] mr-2 bg-blue-900 text-white">{el.rating * 2}</span>
                                    <span>{el.note}</span>
                                    <h2 className="pb-1">starting from: {el.cheapestPrice+'$'}</h2>
                                </div>
                            )
                        })
                    }
                </div>}
        </div>
    )
}