'use client'
import {   LineChart,Line ,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart(){
    const data = [
        {
            name: "january" , total: 1200
        },
        {
            name: "february" , total: 2100
        },
        {
            name: "march" , total: 900
        },
        {
            name: "april" , total: 1600
        },
        {
            name: "may" , total: 1300
        },
        {
            name: "june" , total: 1000
        },
      ];
    return(
        <div className="rounded-lg shadow-xl p-6 w-[69%]">
            <h1 className='text-gray-400 pb-4'>Last 6 Months (Revenue)</h1>
            <LineChart width={650} height={330} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke= '#6439FF'
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </div>
    )
}