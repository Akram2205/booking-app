'use client'

import Image from "next/image";
import useFetch from "@/app/hooks/useFetch";


const properties= [
    {
        key: 0,
        title: 'hotel',
        img:'/images/hotel.jpeg'
    },
    {
        key: 1,
        title: 'appartemant',
        img:'/images/appartemant.jpeg'
    },
    {
        key: 2,
        title: 'villa',
        img:'/images/villas.jpeg'
    },
    {
        key: 3,
        title: 'cabin',
        img:'/images/cabin.jpg'
    },
];

export default function PropertyList(){
    const {data,loading,error} = useFetch("http://localhost:8800/hotels/count/countByType")
    return(
        <div className="container mx-auto px-6">
            <h1 className="text-2xl font-bold pb-5 pt-14">Browse by property type</h1>
                {loading ? "please wait..." :
                    <div className="grid grid-cols-4 gap-5">
                    {
                        properties.map((el)=>{
                            return(
                                <div key={el.key}>
                                    <Image className="w-full rounded-lg h-44" src={el.img} width={200} height={200} alt="photo" />
                                    <h1 className="font-semibold pt-2">{el.title}</h1>
                                    <p className="text-sm text-gray-800">{data[el.key].count+' '+data[el.key].type}</p>
                                </div>
                            )
                        })
                    }
                </div>}
        </div>
    )
}