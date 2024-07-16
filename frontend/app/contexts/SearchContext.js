'use client'
import { createContext, useContext, useReducer, useState } from "react";
import { searchReducer } from "../reducers/searchReducer";

const initialSearch = {
    place:undefined,
    date:[
        {
            startDate: new Date(),
            endDate: new Date()
        }
    ],
    numbers:{
        nbAdult: undefined,
        nbChildren: undefined,
        nbRoom: undefined,
    }
}

const SearchContext = createContext(initialSearch);

export const SearchProvider =({children})=>{

    const [searchState,dispatch] = useReducer(searchReducer,initialSearch)

    return(
        <SearchContext.Provider value={{searchState,dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch=()=>{
    return(
        useContext(SearchContext)
    )
}

