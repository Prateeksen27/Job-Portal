import { Button, Divider, Tabs } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { jobList } from '../assets/Data/JobsData'
import Card from './Card'


const JobHistory = () => {

  return (
    <div>
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <div>
        <Tabs my="md" variant="outline" radius="lg" defaultValue="Applied">
          <Tabs.List className='[&_button]:text-lg font-semibold '>
            <Tabs.Tab value="Applied" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Applied</Tabs.Tab>
            <Tabs.Tab value="Saved" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Saved</Tabs.Tab>
            <Tabs.Tab value="offered" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Offered</Tabs.Tab>
            <Tabs.Tab value="interviewing" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Interviewing</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Applied">
            <div className="flex flex-wrap items-center p-8 justify-start gap-8">
              {jobList.slice(0, 6).map((list, index) => (
                <Card list={list} key={index} applied />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Saved">
            <div className="flex flex-wrap items-center p-8 justify-start gap-8">
              {jobList.slice(0, 6).map((list, index) => (
                <Card list={list} key={index}  />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered">
            <div className="flex flex-wrap items-center p-8 justify-start gap-8">
              {jobList.slice(0, 6).map((list, index) => (
                <Card list={list} key={index}  />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="interviewing">
             <div className="flex flex-wrap items-center p-8 justify-start gap-8">
              {jobList.slice(0, 6).map((list, index) => (
                <Card list={list} key={index}  />
              ))}
            </div>
          </Tabs.Panel>

        </Tabs>
      </div>
    </div>
  )
}

export default JobHistory