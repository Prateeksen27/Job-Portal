import React, { useState } from 'react'
import { Button, Divider, Text } from '@mantine/core'
import ExpInput from './ExpInput'

interface ExperienceProps {
    data: {
        title: string
        company: string
        location: string
        startDate: string
        endDate: string
        description: string
        logo?: string
    }
}

const ExperienceCard = (props: any) => {
    console.log(props);
    const [edit, setEdit] = useState(false)
    return (
        <>
            {!edit ? (<div className="flex flex-col gap-2 pb-6">
                {/* Header */}
                <div className="flex gap-3 items-start">
                    <div className="p-2 bg-mine-shaft-800 rounded-lg">
                        <img
                            src={props.logo || '/assets/company-placeholder.png'}
                            className="h-10 w-10 object-contain"
                            alt="Company logo"
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-base text-white">{props.title}</div>
                        <div className="text-sm text-mine-shaft-300">
                            {props.company} • Full-time
                        </div>
                        <div className="text-xs text-mine-shaft-400">
                            {props.startDate} – {props.endDate} • {props.location}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <Text lineClamp={2}>
                    {props.description}</Text>

                {props.isEdit && <div>
                    <Button variant="filled" onClick={(e)=>setEdit(true)}>Edit</Button>
                    <Button variant="outline" className="ml-2" color="red">Delete</Button>
                </div>}
                <Divider size="xs" color="mine-shaft.7" className="mt-4" />
            </div>) : <ExpInput />}
        </>
    )
}

export default ExperienceCard
