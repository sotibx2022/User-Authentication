import React from 'react'
interface ProfileIdPageProps{
    params:{
        profileId:string,
    }
}
const ProfileIdPage:React.FC<ProfileIdPageProps>= (props) => {
    const profileId = props.params.profileId;
    
  return (
    <div>ProfileIdPage
        <h1>My profile Id is {profileId} </h1>
    </div>
  )
}

export default ProfileIdPage