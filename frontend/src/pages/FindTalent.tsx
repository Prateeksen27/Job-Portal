import { Divider } from '@mantine/core'
import React from 'react'
import SearchBar from '../find-talent/SearchBar'
import Talents from '../find-talent/Talents'

const FindTalent = () => {

     return (
       <div className='w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]'>
        <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
        <SearchBar />
        <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
        <Talents />
        </div>
      )
  
}

export default FindTalent