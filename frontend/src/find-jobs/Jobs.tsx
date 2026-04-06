import { useState, useEffect } from 'react'
import { Sort } from './Sort'
import { Divider } from '@mantine/core'
import JobCard from './JobCard'
import { axiosInstance } from '../lib/axios'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/jobs')
        if (response.data && response.data.jobs) {
          setJobs(response.data.jobs)
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="md:text-2xl sm:text-lg font-semibold">Recommended Jobs</h2>
        <Sort />
      </div>
      <Divider size="xs" color="mine-shaft.7" className="mb-8" />

      {/* Jobs Flexbox */}
      <div className="w-full flex flex-wrap gap-6 flex-1 p-6 justify-center md:justify-start">
        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job: any, index: number) => (
            <JobCard list={job} key={job._id || index} />
          ))
        )}
      </div>
    </div>
  )
}

export default Jobs
