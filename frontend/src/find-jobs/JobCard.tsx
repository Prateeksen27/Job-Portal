import React from 'react'
import microsoft from './../assets/Icons/Microsoft.png'
import {
  IconClock,
  IconCurrencyRupee,
  IconHeart,
} from '@tabler/icons-react'
import { Divider, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const JobCard = (props: any) => {
  const l = props.list

  return (
    <Link to="/jobs">
      <div
        key={props.key}
        className="bg-mine-shaft-900 p-4 w-72 h-60 gap-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
      >
        {/* Top Section */}
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-lg">
                <img
                  src={microsoft}
                  className="h-8 w-8 object-contain"
                  alt="Company logo"
                />
              </div>
              <div>
                <div className="font-semibold text-sm">{l.jobTitle}</div>
                <div className="text-xs text-mine-shaft-300">
                  {l.company} • {l.applicants} Applicants
                </div>
              </div>
            </div>
            <button className="p-1 hover:text-red-500 hover:cursor-pointer transition-colors">
              <IconHeart size={18} />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            <span className="py-1 px-3 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
              {l.experience}
            </span>
            <span className="py-1 px-3 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
              {l.jobType}
            </span>
            <span className="py-1 px-3 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
              {l.location}
            </span>
          </div>

          {/* Description */}
          <Text
            lineClamp={2}
            className="!text-sm !text-mine-shaft-300 mb-3"
          >
            {l.description}
          </Text>
        </div>

        {/* Footer */}
        <div>
          <Divider size="xs" color="mine-shaft.7" />
          <div className="flex justify-between items-center mt-3 text-xs text-mine-shaft-300">
            <div className="flex items-center gap-1">
              <IconCurrencyRupee size={16} />
              <span className="font-medium text-white">{l.package}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconClock size={16} />
              <span>{l.postedDaysAgo} Days ago</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
