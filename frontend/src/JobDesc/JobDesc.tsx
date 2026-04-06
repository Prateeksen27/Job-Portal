import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { IconArrowLeft, IconExternalLink, IconHeart, IconMapPin, IconCurrencyRupee, IconBriefcase, IconUsers, IconClock } from '@tabler/icons-react'
import { ActionIcon, Button, Divider, Loader, Text, Badge } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

const JobDesc = () => {
    const { id: jobId } = useParams<{ id: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [job, setJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [applying, setApplying] = useState(false)
    const [alreadyApplied, setAlreadyApplied] = useState(false)

    useEffect(() => {
        if (jobId) {
            fetchJob(jobId)
            checkApplication()
        }
    }, [jobId])

    const fetchJob = async (id: string) => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/jobs/${id}`)
            setJob(response.data.job)
        } catch (err: any) {
            console.error('Error fetching job:', err)
            setError(err.response?.data?.message || 'Failed to load job')
        } finally {
            setLoading(false)
        }
    }

    const checkApplication = async () => {
        try {
            const response = await axiosInstance.get('/applications/user')
            if (response.data && response.data.applications) {
                const hasApplied = response.data.applications.some(
                    (app: any) => app.jobId?._id === jobId || app.jobId === jobId
                )
                setAlreadyApplied(hasApplied)
            }
        } catch (err) {
            console.error('Error checking application:', err)
        }
    }

    const handleApply = async () => {
        if (!jobId) return
        
        try {
            setApplying(true)
            const response = await axiosInstance.post('/applications/apply', {
                jobId: jobId
            })
            toast.success('Application submitted successfully!')
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to apply')
        } finally {
            setApplying(false)
        }
    }

    if (loading) {
        return (
            <div className="w-full lg:w-2/3 p-6 flex justify-center items-center min-h-[50vh]">
                <Loader color="bright-sun" />
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className="w-full lg:w-2/3 p-6">
                <Text c="red">{error || 'Job not found'}</Text>
            </div>
        )
    }

    const salaryStr = job.salary?.min && job.salary?.max 
        ? `${job.salary.currency || '₹'}${job.salary.min / 100000}-${job.salary.max / 100000}LPA`
        : 'Not disclosed'

    const postedDaysAgo = job.createdAt 
        ? Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        : 0

    return (
        <div id='hello' className="w-full lg:w-2/3  p-6">
            {/* Header Row */}
            <div className="flex justify-between items-start">
                {/* Left: Logo + Title */}
                <div className="flex gap-4">
                    <div className="p-4 bg-mine-shaft-800 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-bright-sun-400">
                            {job.company?.name?.charAt(0) || 'C'}
                        </span>
                    </div>

                    <div>
                        <div className="font-semibold text-2xl text-white">
                            {job.title}
                        </div>
                        <div className="text-sm text-mine-shaft-300 mt-1">
                            {job.company?.name || 'Company'} • <span className="text-bright-sun-400">{job.applicants || 0} Applicants</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <Button
                        color={alreadyApplied ? 'gray' : 'bright-sun.4'}
                        variant="light"
                        onClick={handleApply}
                        loading={applying}
                        disabled={alreadyApplied}
                    >
                        {alreadyApplied ? 'Applied' : 'Apply Now'}
                    </Button>
                    {!alreadyApplied && (
                        <button className="p-2 rounded-full border border-mine-shaft-700 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 transition">
                            <IconHeart size={20} />
                        </button>
                    )}
                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div className='flex justify-between flex-wrap gap-4'>
                <div className='flex flex-col items-center gap-1'>
                    <ActionIcon variant="light" color="bright-sun.4" className='!h-12 !w-12' radius="xl">
                        <IconMapPin style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <div className='text-mine-shaft-300 text-sm'>Location</div>
                    <div className='font-semibold'>{job.location || 'N/A'}</div>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <ActionIcon variant="light" color="bright-sun.4" className='!h-12 !w-12' radius="xl">
                        <IconCurrencyRupee style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <div className='text-mine-shaft-300 text-sm'>Salary</div>
                    <div className='font-semibold'>{salaryStr}</div>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <ActionIcon variant="light" color="bright-sun.4" className='!h-12 !w-12' radius="xl">
                        <IconBriefcase style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <div className='text-mine-shaft-300 text-sm'>Job Type</div>
                    <div className='font-semibold capitalize'>{job.jobType || 'N/A'}</div>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <ActionIcon variant="light" color="bright-sun.4" className='!h-12 !w-12' radius="xl">
                        <IconUsers style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <div className='text-mine-shaft-300 text-sm'>Experience</div>
                    <div className='font-semibold'>{job.experience || 'N/A'}</div>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <ActionIcon variant="light" color="bright-sun.4" className='!h-12 !w-12' radius="xl">
                        <IconClock style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <div className='text-mine-shaft-300 text-sm'>Posted</div>
                    <div className='font-semibold'>{postedDaysAgo} days ago</div>
                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div>
                <div className='text-xl font-semibold mb-5'>Required Skills</div>
                <div className='flex flex-wrap gap-3'>
                    {(job.skills || []).map((skill: string, index: number) => (
                        <ActionIcon key={index} p="xs" variant="light" color="bright-sun.4" className='!h-fit !w-fit font-medium' radius="xl">
                            {skill}
                        </ActionIcon>
                    ))}
                    {(!job.skills || job.skills.length === 0) && (
                        <Text c="dimmed">No skills specified</Text>
                    )}
                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div>
                <div className='text-xl font-semibold mb-5'>Job Description</div>
                <div className='text-mine-shaft-300 leading-7'>
                    <div
                        className="[&_*]:text-mine-shaft-300 [&_li]:mb-1 [&_li]:marker:text-bright-sun-400 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:my-3 [&_h4]:text-mine-shaft-200 [&_p]:text-justify"
                        dangerouslySetInnerHTML={{ __html: job.description || 'No description provided' }}
                    />
                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div>
                <div>
                    <div className="text-xl font-semibold mb-5">About the Company</div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-mine-shaft-900 p-6 rounded-2xl shadow-lg">
                        <div className="flex flex-col sm:flex-row gap-5 w-full md:w-2/3">
                            <div className="p-5 h-fit w-fit bg-mine-shaft-800 rounded-2xl shadow-md flex-shrink-0">
                                <span className="text-2xl font-bold text-bright-sun-400">
                                    {job.company?.name?.charAt(0) || 'C'}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="font-semibold text-xl sm:text-2xl text-white">
                                    {job.company?.name || 'Company'}
                                </div>
                                <div className="text-sm text-mine-shaft-300 flex items-center gap-1">
                                    <IconMapPin size={16} className="text-bright-sun-400" /> {job.location || 'N/A'}
                                </div>
                                <p className="text-sm text-mine-shaft-300 leading-relaxed mt-2">
                                    {job.company?.description || 'No description available'}
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex md:justify-end">
                            {job.company?.website && (
                                <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                    <Button
                                        fullWidth
                                        color="bright-sun.4"
                                        variant="light"
                                        className="px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition"
                                    >
                                        <IconExternalLink size={16} className="mr-2" />
                                        Visit Website
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDesc
