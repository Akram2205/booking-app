'use client'
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const initialAuth={
    user:JSON.parse(localStorage.getItem('users')) || null,
    loading: false,
    error: false,
}

export const AuthContext = createContext(initialAuth);

export const AuthProvider = ({children})=>{
    const [authState, dispatch] = useReducer(authReducer,initialAuth)
    useEffect(()=>{
        localStorage.setItem('users',JSON.stringify(authState.user))
    },[authState.user])

    return(
        <AuthContext.Provider value={{authState,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return(
        useContext(AuthContext)
    )
}