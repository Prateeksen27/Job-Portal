import { Avatar, Button, Divider, Tabs } from '@mantine/core'
import { IconBriefcase2, IconMapPin } from '@tabler/icons-react'
import React from 'react'
import banner from './../assets/image.png'
import avtar from './../assets/avatar1.png'
import google from './../assets/Icons/Google.png'
import AboutCompany from './AboutCompany'
import CompanyJobs from './CompanyJobs'
import CompanyEmployee from './CompanyEmployee'
const Company = () => {
  
  return (
    <div className='w-full'>
      <div className="relative">
        <img
          className="w-full rounded-t-xl h-48 sm:h-64 md:h-72 object-cover"
          src={banner}
          alt="Banner"
        />
        <img
          className="w-36 h-36 sm:w-36 sm:h-36 absolute lef-5 -bottom-1/4 sm:-bottom-16 left-4 sm:left-6 border-4 sm:border-8 border-mine-shaft-950 rounded-full bg-mine-shaft-950 p-2 object-cover"
          src={google}
          alt="Profile Avatar"
        />
      </div>

      {/* Profile Header */}
      <div className="px-4 sm:px-6 mt-12 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Google
          </h1>
          <Avatar.Group>
            <Avatar src={avtar} />
            <Avatar src={avtar} />
            <Avatar src={avtar} />
            <Avatar>+10K</Avatar>
          </Avatar.Group>
        </div>
        <div className="flex gap-2 text-sm sm:text-md items-center mt-1 text-mine-shaft-300 flex-wrap">
          <IconMapPin className="h-5 w-5 text-bright-sun-400" /> New York, USA
        </div>
      </div>
      <div>
        <Tabs my="md" variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className='[&_button]:text-lg font-semibold '>
            <Tabs.Tab value="about" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>About</Tabs.Tab>
            <Tabs.Tab value="jobs" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Jobs</Tabs.Tab>
            <Tabs.Tab value="employees" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Employees</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value="about">
            <AboutCompany />
          </Tabs.Panel>
          <Tabs.Panel value="jobs">
            <CompanyJobs />
          </Tabs.Panel>
          <Tabs.Panel value="employees">
            <CompanyEmployee />
          </Tabs.Panel>
          
        </Tabs>
      </div>
    </div>
  )
}

export default Company