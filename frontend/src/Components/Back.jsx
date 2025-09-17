import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate();
    return (
        <Button variant='light' onClick={()=>navigate(-1)} leftSection={<IconArrowLeft />} className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Back</Button>

    )
}

export default Back