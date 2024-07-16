import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BiDollarCircle } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";


export default function Widjet({type}){

    let el;
    const amount = 100;
    const dif = 20;
    switch (type) {
        case "users":
            el={
                isMoney: false,
                title:'USERS',
                link: {
                    label: 'see all users',
                    href: '#'
                },
                icon: <LuUsers className="bg-red-100 text-red-800 w-7 h-7 p-1 "/>,
            }
            break;
        case "order":
            el={
                isMoney: false,
                title:'ORDERS',
                link: {
                    label: 'see all users',
                    href: '#'
                },
                icon:<MdOutlineLocalGroceryStore className="bg-yellow-100 text-yellow-700 w-7 h-7 p-1 "/> ,
            }
            break;
        case "earning":
            el ={
                isMoney: true,
                title:'EARNING',
                link: {
                    label: 'see all users',
                    href: '#'
                },
                icon:<BiDollarCircle className="bg-green-100 text-green-800 w-7 h-7 p-1 "/> ,
            }
            
            break;
        case "balance":
            el ={
                isMoney: true,
                title:'BALANCE',
                link: {
                    label: 'see all users',
                    href: '#'
                },
                icon:<MdOutlineAccountBalanceWallet className="bg-violet-100 text-violet-800 w-7 h-7 p-1 "/> ,
            }
            break;
        default:
            break;
    }

    return(
        <div key={el.id} className="rounded-lg shadow-xl p-4">
        <div className="flex pb-2 justify-between items-center">
            <h2 className="text-gray-400 font-semibold">{el.title}</h2>
            <p className="text-green-600">{dif}%</p>
        </div>
        <h1 className="text-3xl font-light pb-2">{amount} {el.isMoney && '$'}</h1>
        <div className="flex justify-between items-center">
            <Link className="text-xs underline decoration-solid" href={el.link.href}>{el.link.label}</Link>
            {el.icon}
        </div>
    </div>
    )
}