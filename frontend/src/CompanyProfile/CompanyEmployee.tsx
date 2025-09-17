import React from 'react'
import { talents } from '../assets/Data/TalentData'
import TalentCard from '../find-talent/TalentCard'

const CompanyEmployee = () => {
  return (
    <div  className="w-full p-4 flex flex-wrap gap-3 justify-center md:justify-start">
         {
        talents.slice(0,6).map((talent,index)=>{
            return <TalentCard key={index} data={talent}  cardKey={index}/>
        })
       }
    </div>
  )
}

export default CompanyEmployee