import { Divider } from '@mantine/core'
import React from 'react'
import Profile from '../Profile/Profile'

const ProfilePage = () => {
  return (
       <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
        <Divider mx="md" mb="xl" className="w-1/3 my-4 bg-bright-sun-400" />
         <Profile />
         </div>
  )
}

export default ProfilePage