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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {
        talents.map((talent,index)=>{
            return <TalentCard key={index} data={talent}  cardKey={index}/>
        })
       }
      </div>
    </div>
  )
}

export default Talents