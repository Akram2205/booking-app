'use client'
import Stats from "./components/Stats";
import Chart from "./components/Chart";
import Featured from "./components/Featured";
import Table from "./components/UsersTable";
import Login from "./login/page";
import { useAuth } from "./context/AuthContext";

export default function Home() {

  const {authState,dispatch} = useAuth()

  const {user}= authState

  return (
    <div>
       { 
       user ?
       <div className="px-6">
        <Stats/>
        <div className="flex justify-between mb-6">
          <Featured/>
          <Chart/>
        </div>
       </div>:
        <Login/>}
    </div>
        
  );
}
