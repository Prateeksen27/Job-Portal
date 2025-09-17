import { Badge, Tabs } from '@mantine/core'
import React from 'react'
import JobDesc from '../JobDesc/JobDesc'
import { talents } from '../assets/Data/TalentData'
import TalentCard from '../find-talent/TalentCard'

const PostedJobDesc = () => {
  return (
    <div className='mt-5 w-3/4 px-5'>
        <div className='text-2xl font-semibold mb-5 flex items-center'>Software Engineer <Badge variant='light' ml="sm" color='bright-sun.4' size="sm">Active</Badge></div>
        <div className='font-medium text-mine-shaft-300 mb-3'>
            New York, NY <span className='mx-2'>|</span> Full-time <span className='mx-2'>|</span> $80,000 - $120,000

        </div>
        <div>
            <Tabs my="md" variant="outline" radius="lg" defaultValue="overview">
                      <Tabs.List className='[&_button]:text-lg font-semibold '>
                        <Tabs.Tab value="overview" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Overview</Tabs.Tab>
                        <Tabs.Tab value="applicants" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Applicants</Tabs.Tab>
                        <Tabs.Tab value="invited" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Invited</Tabs.Tab>
                      </Tabs.List>
                      
                      <Tabs.Panel value="overview" className='[&_#hello]:w-full'>
                       <JobDesc edit />
                      </Tabs.Panel>
                      <Tabs.Panel value="applicants">
                        <div className='flex flex-wrap gap-5 mt-10 justify-around'>
                        {
                            talents.map((talent,index)=>{
                                return(
                                    index<6 && <TalentCard key={index} data={talent} posted />
                                )
                            })
                        }
                        </div>
                      </Tabs.Panel>
                      <Tabs.Panel value="invited">
                        <div className='flex flex-wrap gap-5 mt-10 justify-around'>
                        {
                            talents.map((talent,index)=>{
                                return(
                                    index<6 && <TalentCard key={index} data={talent} invited />
                                )
                            })
                        }
                        </div>
                      </Tabs.Panel>
                      
                    </Tabs>
        </div>
    </div>
  )
}

export default PostedJobDesc