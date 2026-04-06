import { useState, useEffect } from 'react'
import { Tabs } from "@mantine/core"
import PostedJobCard from "./PostedJobCard"
import { axiosInstance } from '../lib/axios'

const PostedJob = () => {
    const [activeJobs, setActiveJobs] = useState<any[]>([])
    const [draftJobs, setDraftJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/jobs/my-jobs')
                if (response.data && response.data.jobs) {
                    setActiveJobs(response.data.jobs.filter((j: any) => j.status === 'open'))
                    setDraftJobs(response.data.jobs.filter((j: any) => j.status === 'closed'))
                }
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch jobs')
            } finally {
                setLoading(false)
            }
        }
        fetchMyJobs()
    }, [])

    return (
        <div className="w-full sm:w-1/3 lg:w-1/5 mt-5 px-3 sm:px-4">
            {/* Title */}
            <div className="text-xl sm:text-2xl font-semibold mb-5 text-white">
                Posted Job
            </div>

            {/* Tabs */}
            <Tabs autoContrast variant="pills" defaultValue="active" className="w-full">
                <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
                    <Tabs.Tab value="active" className="!text-sm sm:!text-base">
                        Active
                    </Tabs.Tab>
                    <Tabs.Tab value="draft" className="!text-sm sm:!text-base ">
                        Draft
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="active" className="mt-4">
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : activeJobs.length === 0 ? (
                            <p>No active jobs</p>
                        ) : (
                            activeJobs.map((job: any, index: number) => (
                                <PostedJobCard key={job._id || index} {...job} />
                            ))
                        )}
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="draft" className="mt-4">
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : draftJobs.length === 0 ? (
                            <p>No draft jobs</p>
                        ) : (
                            draftJobs.map((job: any, index: number) => (
                                <PostedJobCard key={job._id || index} {...job} />
                            ))
                        )}
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

export default PostedJob
