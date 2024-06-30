"use client"
import axios from 'axios';
import React, { useEffect,useState } from 'react'

interface ProfileIdPageProps{
    params:{
        profileId:string,
    }
}
interface UserData{
    userName:string,
    email:string,
}
const ProfileIdPage:React.FC<ProfileIdPageProps>= (props) => {
    const[userName, setUserName] = useState("");
    const[email,setEmail] = useState("")
    const profileId = props.params.profileId;
    useEffect(()=>{
        getProfileData();
    },[profileId])
    const getProfileData = async () => {
        try {
            const response = await axios("/api/token");
            const result = response.data;
            
            setUserName(result.user.userName);
            setEmail(result.user.email)
        } catch (error) {
            console.error("Error fetching profile data:", error);
            throw error; // Re-throw the error to propagate it up the call stack if needed
        }
    }
  return (
    <div>ProfileIdPage
        <h1>My profile Id is {profileId} </h1>
        <h2>UserName : {userName}</h2>
        <h3>email:{email}</h3>

    </div>
  )
}

export default ProfileIdPage