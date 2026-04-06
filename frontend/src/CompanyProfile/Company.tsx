import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Tabs } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import banner from './../assets/image.png'
import avtar from './../assets/avatar1.png'
import google from './../assets/Icons/Google.png'
import AboutCompany from './AboutCompany'
import CompanyJobs from './CompanyJobs'
import CompanyEmployee from './CompanyEmployee'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const Company = () => {
  const { companyName } = useParams<{ companyName: string }>()
  const [company, setCompany] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyName) return
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/profiles/company/${encodeURIComponent(companyName)}`)
        const data = await response.json()
        if (response.ok) {
          setCompany(data.company)
          setJobs(data.jobs || [])
        } else {
          setError(data.message || 'Failed to fetch company')
        }
      } catch (err) {
        setError('Failed to connect to server')
      } finally {
        setLoading(false)
      }
    }
    fetchCompany()
  }, [companyName])

  if (loading) {
    return <div className="p-5">Loading...</div>
  }

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>
  }

  if (!company) {
    return <div className="p-5">Company not found</div>
  }

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
          src={company.logo || google}
          alt="Profile Avatar"
        />
      </div>

      {/* Profile Header */}
      <div className="px-4 sm:px-6 mt-12 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            {company.name}
          </h1>
          <Avatar.Group>
            <Avatar src={avtar} />
            <Avatar src={avtar} />
            <Avatar src={avtar} />
            <Avatar>+{jobs.length * 100}</Avatar>
          </Avatar.Group>
        </div>
        <div className="flex gap-2 text-sm sm:text-md items-center mt-1 text-mine-shaft-300 flex-wrap">
          <IconMapPin className="h-5 w-5 text-bright-sun-400" /> {company.headquarters || 'Not specified'}
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
            <AboutCompany company={company} />
          </Tabs.Panel>
          <Tabs.Panel value="jobs">
            <CompanyJobs jobs={jobs} />
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