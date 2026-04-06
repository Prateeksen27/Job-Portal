import { useParams } from 'react-router-dom'
import { Button, Divider, Loader } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Profile from '../TalentProfile/Profile'
import RecommenedTalent from '../TalentProfile/RecommenedTalent'
import { axiosInstance } from '../lib/axios'

const TalentProfile = () => {
    const { id: profileId } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [currentProfileId, setCurrentProfileId] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (profileId) {
            setCurrentProfileId(profileId)
        }
    }, [profileId])

    return (
        <div className='w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]'>
            <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
            <div className='my-4 ml-4 inline-block'>
                <Button variant='light' onClick={()=>navigate(-1)} leftSection={<IconArrowLeft />} className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Back</Button>
            </div>
            <div className='flex justify-between'>
                <Profile />
                <div className="hidden lg:flex w-1/3 justify-center">
                    <RecommenedTalent excludeProfileId={currentProfileId} />
                </div>

            </div>
        </div>
    )
}

export default TalentProfile
