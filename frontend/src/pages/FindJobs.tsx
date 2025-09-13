import React from 'react'
import SearchBar from '../find-jobs/SearchBar'
import { Divider } from '@mantine/core'
import Jobs from '../find-jobs/Jobs'


const FindJobs = () => {
  return (
   <div className='w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]'>
    <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
   <SearchBar />
    <Jobs />
    
    </div>
  )
}

export default FindJobs