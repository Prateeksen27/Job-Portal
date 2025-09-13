import { Button, Divider } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Profile from '../TalentProfile/Profile'
import RecommenedTalent from '../TalentProfile/RecommenedTalent'

const TalentProfile = () => {
    return (
        <div className='w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]'>
            <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
            <Link to={`/find-talent`} className='my-4 ml-4 inline-block'>
                <Button variant='light' leftSection={<IconArrowLeft />} className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Back</Button>
            </Link>
            <div className='flex justify-between'>
                <Profile />
                <div className="hidden lg:flex w-1/3 justify-center">
                    <RecommenedTalent />
                </div>

            </div>
        </div>
    )
}

export default TalentProfile