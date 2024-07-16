'use client'
import { createContext,useContext, useState,useReducer, useEffect  } from "react";
import { usersReducer } from "../reducers/usersReducer";
import useFetch from "../hooks/useFetch";

const initialData =[
    {
      id:1,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      phone: "+213 467235755",
      address: "algerie, constantine",
      country: "algerie",
      status: "active",
      date: "23/04/18",
    },
    {
      id:2,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      phone: "+213 467235755",
      address: "algerie, constantine",
      country: "algerie",
      status: "passive",
      date: "23/04/18",
    },
    {
      id:3,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      phone: "+213 467235755",
      address: "algerie, constantine",
      country: "algerie",
      status: "passive",
      date: "19/09/17",
    },
    {
      id:4,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      phone: "+213 467235755",
      country: "algerie",
      status: "active",
      date: "24/12/08",
    },
    {
      id:5,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "zoro",
      email: "richard@creative-tim.com",
      phone: "+213 467235755",
      address: "algerie, constantine",
      country: "algerie",
      status: 'pending',
      date: "04/10/21",
    },
    {
      id:6,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "kilwa",
      email: "richard@creative-tim.com",
      phone: "+213 467235755",
      address: "algerie, constantine",
      country: "algerie",
      status: 'pending',
      date: "04/10/21",
    },
    {
      id:7,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "brown",
      email: "richard@creative-tim.com",
      phone: "+213 467235755",
      country: "algerie",
      status: 'pending',
      date: "04/10/21",
    },
    {
      id:8,
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "vidal",
      email: "richard@creative-tim.com",
      phone: "+213 467235755",
      address: "algerie, constantine",
      country: "algerie",
      status: 'pending',
      date: "04/10/21",
    },
];

const UsersContext = createContext([])

export const UsersProvider = ({children}) =>{

    
    const [users,dispatch] = useReducer(usersReducer,initialData)

    return(
        <UsersContext.Provider value={{users,dispatch}}>
            {children}
        </UsersContext.Provider>
    )
}


export const useUsers=()=>{
    return(
        useContext(UsersContext)
    )
}
