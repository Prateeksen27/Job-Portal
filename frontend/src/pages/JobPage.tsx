import { Button, Divider, Loader } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import JobDesc from '../JobDesc/JobDesc'
import RecommenedJobs from '../JobDesc/RecommenedJobs'
import { axiosInstance } from '../lib/axios'

export const JobPage = () => {
    const navigate = useNavigate()
    const { id: jobId } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (jobId) {
            setLoading(false)
        }
    }, [jobId])

    return (
        <div className='w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]'>
            <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
            <div className='my-4 ml-4 inline-block'>
                <Button variant='light' onClick={()=>navigate(-1)} leftSection={<IconArrowLeft />} className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Back</Button>
            </div>
            <div className='flex gap-5 justify-around'>
               <JobDesc />
              <div className='hidden lg:flex w-1/3 justify-center'>
               <RecommenedJobs />
              </div>
            
            </div>
        </div>
    )
}

export default JobPage
