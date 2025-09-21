import React from 'react'
import { Sort } from '../find-jobs/Sort'
import { Divider } from '@mantine/core'
import { talents } from '../assets/Data/TalentData'
import TalentCard from './TalentCard'

const Talents = () => {
  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Talents</h2>
        <Sort />

      </div>
      {/* Jobs Flexbox */}
      <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />

      <div className="w-full flex flex-wrap gap-6 flex-1 p-6 justify-center md:justify-start">
        {
          talents.map((talent, index) => {
            return <TalentCard key={index} data={talent} cardKey={index} />
          })
        }
      </div>
    </div>
  )
}

export default Talents