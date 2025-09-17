import React from 'react'
import JobCard from '../find-jobs/JobCard'
import { jobList } from '../assets/Data/JobsData'

const RecommenedJobs = () => {
  return (
    <div>
      {/* Title */}
      <div className="text-xl font-semibold mb-5">Recommened Jobs</div>

      {/* Show only first 3 */}
      <div className="flex flex-col flex-wrap gap-5 justify-between">
        {jobList.slice(0, 6).map((job, index) => (
          <div key={index} className="w-full">
            <JobCard list={job} cardKey={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommenedJobs