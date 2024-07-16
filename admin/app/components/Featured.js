'use client'
import { IoMdMore } from "react-icons/io";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Featured(){
    const percentage = 66;
    return(
        <div className="rounded-lg shadow-xl p-4 w-[29%]">
            <div className="flex items-center justify-between">
                <h1 className="text-gray-400">Total Revenue</h1>
                <IoMdMore  className="text-xl text-gray-400"/>
            </div>
            <div className="w-24 flex mx-auto pt-5 pb-4">           
                <CircularProgressbar  value={70} text={`70%`} />
            </div>
            <div className="text-center">
                <p className="text-gray-400">Total sales made today</p>
                <h1 className="text-3xl py-4">420$</h1>
                <p className="text-gray-400 text-xs">Previous transactions processing. Last payments may not be included</p>
                <div className="flex justify-between pt-6 pb-3 text-gray-400">
                    <div>
                        <p className="pb-2">Target</p>
                        <p className="text-red-600">12.4k$</p>
                    </div>
                    <div>
                        <p className="pb-2">last week</p>
                        <p className="text-green-600">12.4k$</p>
                    </div>
                    <div>
                        <p className="pb-2">last month</p>
                        <p className="text-green-600">12.4k$</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}