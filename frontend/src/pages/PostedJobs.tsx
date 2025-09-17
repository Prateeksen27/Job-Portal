import { Button, Divider } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PostedJob from '../PostedJobs/PostedJob'
import PostedJobDesc from '../PostedJobs/PostedJobDesc'

const PostedJobs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]'>
        <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />
        <Button my="xs" variant='light' onClick={() => { navigate(-1) }} leftSection={<IconArrowLeft />} className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Back</Button>
        <Divider size="xs" />
        <div className='flex gap-5'>
             <PostedJob />
             <PostedJobDesc />
        </div>
      </div>
    </div>
  )
}

export default PostedJobs