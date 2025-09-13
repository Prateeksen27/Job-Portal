import React from 'react'
import { Divider, Text } from '@mantine/core'

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

const ExperienceCard = ({ data }: ExperienceProps) => {
    return (
        <div className="flex flex-col gap-2 pb-6">
            {/* Header */}
            <div className="flex gap-3 items-start">
                <div className="p-2 bg-mine-shaft-800 rounded-lg">
                    <img
                        src={data.logo || '/assets/company-placeholder.png'}
                        className="h-10 w-10 object-contain"
                        alt="Company logo"
                    />
                </div>
                <div>
                    <div className="font-semibold text-base text-white">{data.title}</div>
                    <div className="text-sm text-mine-shaft-300">
                        {data.company} • Full-time
                    </div>
                    <div className="text-xs text-mine-shaft-400">
                        {data.startDate} – {data.endDate} • {data.location}
                    </div>
                </div>
            </div>

            {/* Description */}
            <Text lineClamp={2}>
                {data.description}</Text>

            {/* Divider */}
            <Divider size="xs" color="mine-shaft.7" className="mt-4" />
        </div>
    )
}

export default ExperienceCard
