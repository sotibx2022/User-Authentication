"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const profile = () => {
  const router = useRouter()
  const handleLogout =async() =>{
let response = await axios("/api/logout");
let result = response.data;
console.log(result);
if(result.success){
  router.push("/login")
}
  }
  return (
    <>
    <div>This is profile page...</div>
    <button className='submit_Button'>Profile Details</button>
    <br></br>
    <br></br>
    <button className='submit_Button' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default profile