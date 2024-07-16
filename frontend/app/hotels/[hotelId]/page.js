/* eslint-disable @next/next/no-img-element */
'use client'
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { FaLocationDot } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MailSection from "@/components/mailSection/MailSection";
import Footer from "@/components/footer/Footer";
import useFetch from "@/app/hooks/useFetch";
import { useSearch } from "@/app/contexts/SearchContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Reservation from "@/components/reservation/Reservation";

export default function Hotel(props){
    const id = props.params.hotelId
    const {data,loading,error} = useFetch(`http://localhost:8800/hotels/${id}`)
    
    const [openModel,setOpenModel] = useState(false)

    const {searchState} = useSearch()
    const {authState} = useAuth()
    const {user} = authState

    const date1= searchState.date[0].startDate
    const date2= searchState.date[0].endDate
    const nbRoom = searchState.numbers.nbRoom

    const router = useRouter()

    function dateDifference(date1, date2) {

        // Get the time values in milliseconds
        const time1 = date1.getTime();
        const time2 = date2.getTime();
    
        // Calculate the difference in milliseconds
        const timeDifference = Math.abs(time1 - time2);
    
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return dayDifference;
    }

    const days = dateDifference(date1,date2)

    const handleClick =()=>{
        if(!user){
            router.push('/login')
        }else{
            setOpenModel(!openModel)
        }
    }
    
    return(
        <div>
            <div className="container mx-auto px-6">
                {loading ? 'please wait...' :
                    <div className="pt-4">
                    <div className="flex items-start py-6 justify-between">
                        <div>
                            <h1 className="text-2xl font-bold pb-2">{data.name}</h1>
                            <div className="flex items-center space-x-2 text-gray-700 pb-3 text-sm">
                                <span><FaLocationDot /></span>
                                <p>{data.adress},{data.city}</p>
                            </div>
                            <p className="text-blue-500 font-semibold pb-2">Excellent location-{data.distance}</p>
                            <p className="text-green-700">{`Book a stay over ${data.cheapestPrice}$ at this property and get a free airport taxi`}</p>
                            </div>
                        <button onClick={handleClick} className="cursor-pointer text-sm bg-blue-600 rounded-lg text-white py-2 px-3 ">Reserve or book now</button>
                    </div>

                    <div className="mb-6">
                        <Swiper
                            modules={[Navigation,Pagination ,Scrollbar, A11y]}
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            
                            >
                            {data.photos.map((el)=>(
                                <SwiperSlide key={el} className="w-full h-[220]">
                                    <img className="w-full" src={el} width={250} height={210} alt="photo"  />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className=" grid grid-cols-3 gap-x-3 pt-6 pb-12">
                        <div className="col-span-2">
                            <h1 className="text-2xl font-semibold pb-3">Stay in the heart of City</h1>
                            <p className="text-sm">
                                {data.desc}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-100">
                            <p className="font-semibold text-lg pb-4 text-gray-700">{`Perfect for a ${days}-night stay!`}</p>
                            <p className="text-sm text-gray-800 pb-4">Located in the real heart of Krakow, this property has an excellent location score of 9.8</p>
                            <div className="flex items-center pb-4">
                                <h1 className="text-2xl font-bold ">{data.cheapestPrice * days * nbRoom}$</h1>
                                <span className="text-2xl text-gray-800">{`(${days} nights)`}</span>
                            </div>
                            <button onClick={handleClick} className="block mx-auto w-full cursor-pointer text-sm bg-blue-600 rounded-lg text-white py-2 px-3 ">Reserve or book now</button>
                        </div>
                    </div>
                </div>}
            </div>
            <MailSection/>
            <Footer/>
            {openModel && <Reservation setOpen={setOpenModel} hotelId={id}/>}
        </div>
    )
}