import React from 'react'
import { jobList } from '../assets/Data/JobsData'
import JobCard from '../find-jobs/JobCard'

const CompanyJobs = () => {
  return (
    <div className="w-full p-4 flex flex-wrap gap-3 justify-center md:justify-start">
         {jobList.slice(0,6).map((list, index) => (
          <JobCard list={list} key={index} />
        ))}
    </div>
  )
}

export default CompanyJobs