import { useState, useEffect } from 'react'
import { Tabs, Badge, Paper, Text, Group, Stack, Loader, Avatar } from '@mantine/core'
import { IconBriefcase, IconMapPin, IconCalendar } from '@tabler/icons-react'
import { axiosInstance } from '../lib/axios'

interface Application {
  _id: string
  jobId: {
    _id: string
    title: string
    location?: string
    company?: { name?: string; logo?: string }
  }
  status: string
  appliedAt: string
  timeline?: Array<{ status: string; updatedAt: string; note?: string }>
}

const STATUS_COLORS: Record<string, string> = {
  APPLIED: 'blue',
  SHORTLISTED: 'violet',
  INTERVIEW: 'orange',
  OFFERED: 'green',
  REJECTED: 'red',
  HIRED: 'teal'
}

const JobHistory = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/profiles/applications')
      if (response.data && response.data.applications) {
        setApplications(response.data.applications)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const color = STATUS_COLORS[status] || 'gray'
    return <Badge color={color} size="lg">{status}</Badge>
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const appliedJobs = applications.filter((a) => a.status === 'APPLIED')
  const shortlistedJobs = applications.filter((a) => a.status === 'SHORTLISTED')
  const interviewJobs = applications.filter((a) => a.status === 'INTERVIEW')
  const offeredJobs = applications.filter((a) => a.status === 'OFFERED')
  const rejectedJobs = applications.filter((a) => a.status === 'REJECTED')
  const hiredJobs = applications.filter((a) => a.status === 'HIRED')

  const renderApplicationCard = (app: Application) => (
    <Paper key={app._id} p="md" radius="md" className="bg-mine-shaft-900 border border-mine-shaft-700 w-full max-w-md">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <Group gap="md">
            <Avatar color="bright-sun" radius="xl">
              <IconBriefcase size={20} />
            </Avatar>
            <div>
              <Text fw={600} className="text-white">{app.jobId?.title || 'Job Title'}</Text>
              <Group gap="xs">
                {app.jobId?.location && (
                  <Text size="sm" c="dimmed" className="flex items-center gap-1">
                    <IconMapPin size={14} /> {app.jobId.location}
                  </Text>
                )}
              </Group>
            </div>
          </Group>
          {getStatusBadge(app.status)}
        </Group>

        <Group gap="xs">
          <IconCalendar size={14} className="text-mine-shaft-400" />
          <Text size="xs" c="dimmed">Applied on {formatDate(app.appliedAt)}</Text>
        </Group>

        {app.timeline && app.timeline.length > 1 && (
          <Paper p="sm" radius="sm" className="bg-mine-shaft-950">
            <Text size="xs" c="dimmed" mb="xs">Application Timeline</Text>
            <Stack gap="xs">
              {app.timeline.slice(0, 4).map((entry, idx) => (
                <Group key={idx} gap="xs">
                  <Badge size="xs" color={STATUS_COLORS[entry.status] || 'gray'}>{entry.status}</Badge>
                  <Text size="xs" c="dimmed">{formatDate(entry.updatedAt)}</Text>
                </Group>
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Paper>
  )

  return (
    <div>
      <div className="text-2xl font-semibold mb-5 text-white">Application History</div>
      <div>
        <Tabs my="md" variant="outline" radius="lg" defaultValue="Applied">
          <Tabs.List className='[&_button]:text-lg font-semibold '>
            <Tabs.Tab value="Applied" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
              Applied ({appliedJobs.length})
            </Tabs.Tab>
            <Tabs.Tab value="Shortlisted" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
              Shortlisted ({shortlistedJobs.length})
            </Tabs.Tab>
            <Tabs.Tab value="Interview" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
              Interview ({interviewJobs.length})
            </Tabs.Tab>
            <Tabs.Tab value="Offered" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
              Offered ({offeredJobs.length})
            </Tabs.Tab>
            <Tabs.Tab value="Rejected" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
              Rejected ({rejectedJobs.length})
            </Tabs.Tab>
            <Tabs.Tab value="Hired" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
              Hired ({hiredJobs.length})
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Applied">
            <div className="flex flex-wrap items-center p-8 justify-start gap-4">
              {loading ? (
                <Loader color="bright-sun" />
              ) : error ? (
                <Text c="red">{error}</Text>
              ) : appliedJobs.length === 0 ? (
                <Text c="dimmed">No applied applications yet</Text>
              ) : (
                appliedJobs.map(renderApplicationCard)
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Shortlisted">
            <div className="flex flex-wrap items-center p-8 justify-start gap-4">
              {shortlistedJobs.length === 0 ? (
                <Text c="dimmed">No shortlisted applications</Text>
              ) : (
                shortlistedJobs.map(renderApplicationCard)
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Interview">
             <div className="flex flex-wrap items-center p-8 justify-start gap-4">
              {interviewJobs.length === 0 ? (
                <Text c="dimmed">No interviews scheduled</Text>
              ) : (
                interviewJobs.map(renderApplicationCard)
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Offered">
            <div className="flex flex-wrap items-center p-8 justify-start gap-4">
              {offeredJobs.length === 0 ? (
                <Text c="dimmed">No job offers</Text>
              ) : (
                offeredJobs.map(renderApplicationCard)
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Rejected">
            <div className="flex flex-wrap items-center p-8 justify-start gap-4">
              {rejectedJobs.length === 0 ? (
                <Text c="dimmed">No rejected applications</Text>
              ) : (
                rejectedJobs.map(renderApplicationCard)
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Hired">
            <div className="flex flex-wrap items-center p-8 justify-start gap-4">
              {hiredJobs.length === 0 ? (
                <Text c="dimmed">No hired applications</Text>
              ) : (
                hiredJobs.map(renderApplicationCard)
              )}
            </div>
          </Tabs.Panel>

        </Tabs>
      </div>
    </div>
  )
}

export default JobHistory
