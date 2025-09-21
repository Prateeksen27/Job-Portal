import { Button, Divider } from '@mantine/core'
import React from 'react'
import JobHistory from '../JobHistory/JobHistory'
import { useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'

const JobHistoryPage = () => {
   const navigate =  useNavigate()
  return (
    <div className='min-h-[90vh] bg-mine-shaft-950 font-["poppins"] px-4'>
      <Divider size="xs" />
      <div className='my-4 ml-4 inline-block'>
        <Button variant='light' onClick={() => navigate(-1)} leftSection={<IconArrowLeft />} className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Back</Button>
      </div>
      <div className='my-5'>
        <JobHistory />
      </div>
    </div>
  )
}

export default JobHistoryPage