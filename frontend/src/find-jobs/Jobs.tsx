import React from 'react'
import { Sort } from './Sort'
import { Divider } from '@mantine/core'
import JobCard from './JobCard'
import { jobList } from '../assets/Data/JobsData'

const Jobs = () => {
  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Recommended Jobs</h2>
        <Sort />
      </div>
      <Divider size="xs" color="mine-shaft.7" className="mb-8" />

      {/* Jobs Flexbox */}
      <div className="w-full flex flex-wrap gap-2 justify-center md:justify-start">
        {jobList.map((list, index) => (
          <JobCard list={list} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Jobs
