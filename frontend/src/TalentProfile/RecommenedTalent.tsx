import React from 'react'
import { talents } from '../assets/Data/TalentData'
import TalentCard from '../find-talent/TalentCard'

const RecommenedTalent = () => {
  return (
    <div className="p-4">
      {/* Title */}
      <div className="text-xl font-semibold mb-5">Recommened Talent</div>

      {/* Show only first 3 */}
      <div className="flex flex-col gap-6">
        {talents.slice(0, 3).map((talent, index) => (
          <div key={index} className="w-full">
            <TalentCard data={talent} cardKey={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommenedTalent
