"use client"

import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { token, logout } = useAuth();

  useEffect(() => {
    if(!token){
        return;
    }
  },[])
  
  const handleClick = () => {
    logout();
    console.log('AA');
    
  };
  return (
    <div className="min-h-screen min-w-screen bg-amber-500 text-black flex justify-center items-center">
      <div className="h-50 w-50">
        <button className="rounded-lg p-5 bg-white cursor-pointer" onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
}
