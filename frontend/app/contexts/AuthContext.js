'use client'

import { createContext, useContext, useEffect, useReducer,useState } from "react";
import { authReducer } from "../reducers/authReducer";

const initialAuth={
    user: null,
    loading: false,
    error: false,
}

const AuthContext = createContext(initialAuth);

export const AuthProvider = ({children})=>{
    const [authState, dispatch] = useReducer(authReducer,initialAuth)
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = JSON.parse(localStorage.getItem('users'));
            if (storedUser) {
                dispatch({ type: 'INITIALIZE_USER', payload: storedUser });
            }
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('users', JSON.stringify(authState.user));
        }
    }, [authState.user, isInitialized]);

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