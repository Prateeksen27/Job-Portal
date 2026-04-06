import { useState, useEffect } from 'react'
import { Badge, Tabs, Paper, Text, Group, Stack, Loader, Avatar, Button, Menu } from '@mantine/core'
import { IconBriefcase, IconMapPin, IconDownload, IconDots, IconCheck, IconX } from '@tabler/icons-react'
import JobDesc from '../JobDesc/JobDesc'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'HIRED']

const STATUS_COLORS: Record<string, string> = {
  APPLIED: 'blue',
  SHORTLISTED: 'violet',
  INTERVIEW: 'orange',
  OFFERED: 'green',
  REJECTED: 'red',
  HIRED: 'teal'
}

const PostedJobDesc = ({ job }: { job?: any }) => {
  const [applicants, setApplicants] = useState<any[]>([])
  const [loadingApplicants, setLoadingApplicants] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    if (job?._id) {
      fetchApplicants()
    }
  }, [job?._id])

  const fetchApplicants = async () => {
    if (!job?._id) return
    try {
      setLoadingApplicants(true)
      const response = await axiosInstance.get(`/applications/job/${job._id}`)
      if (response.data && response.data.applications) {
        setApplicants(response.data.applications)
      }
    } catch (err) {
      console.error('Failed to fetch applicants:', err)
    } finally {
      setLoadingApplicants(false)
    }
  }

  const handleUpdateStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(applicationId)
      const response = await axiosInstance.put(`/applications/status/${applicationId}`, { status: newStatus })
      if (response.data) {
        toast.success('Status updated successfully')
        setApplicants(prev => prev.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        ))
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleDownloadResume = (resumeUrl?: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank')
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!job) {
    return <div className="p-5 text-mine-shaft-300">Select a job to view details</div>
  }

  const jobTitle = job.title || 'Untitled'
  const location = job.location || 'Not specified'
  const jobType = job.jobType || 'Not specified'
  const salary = job.salary ? `${job.salary.min / 100000}-${job.salary.max / 100000}LPA` : 'Not disclosed'
  const status = job.status || 'active'

  const renderApplicantCard = (app: any) => (
    <Paper key={app._id} p="md" radius="md" className="bg-mine-shaft-900 border border-mine-shaft-700 w-full">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <Group gap="md">
            <Avatar color="bright-sun" radius="xl">
              {app.candidateId?.username?.charAt(0) || '?'}
            </Avatar>
            <div>
              <Text fw={600} className="text-white">{app.candidateId?.username || 'Candidate'}</Text>
              <Text size="sm" c="dimmed">{app.candidateId?.email || ''}</Text>
              {app.candidateId?.profile?.skills && (
                <Group gap="xs" mt={4}>
                  {app.candidateId.profile.skills.slice(0, 3).map((skill: string, idx: number) => (
                    <Badge key={idx} size="xs" variant="outline">{skill}</Badge>
                  ))}
                </Group>
              )}
            </div>
          </Group>
          <Group gap="xs">
            <Badge color={STATUS_COLORS[app.status] || 'gray'} size="lg">{app.status}</Badge>
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Button variant="subtle" size="xs" p={4}>
                  <IconDots size={16} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Change Status</Menu.Label>
                {STATUS_OPTIONS.map(status => (
                  <Menu.Item 
                    key={status} 
                    onClick={() => handleUpdateStatus(app._id, status)}
                    disabled={updatingStatus === app._id}
                  >
                    {status}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        {app.resume?.url && (
          <Button
            size="xs"
            variant="outline"
            leftSection={<IconDownload size={14} />}
            onClick={() => handleDownloadResume(app.resume.url)}
            className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700"
          >
            Download Resume
          </Button>
        )}

        <Group gap="xs">
          <Text size="xs" c="dimmed">
            Applied on {formatDate(app.appliedAt)}
          </Text>
        </Group>
      </Stack>
    </Paper>
  )

  return (
    <div className='mt-5 w-3/4 px-5'>
        <div className='text-2xl font-semibold mb-5 flex items-center'>{jobTitle} <Badge variant='light' ml="sm" color='bright-sun.4' size="sm">{status}</Badge></div>
        <div className='font-medium text-mine-shaft-300 mb-3'>
            {location} <span className='mx-2'>|</span> {jobType} <span className='mx-2'>|</span> {salary}
        </div>
        <div>
            <Tabs my="md" variant="outline" radius="lg" defaultValue="overview">
                      <Tabs.List className='[&_button]:text-lg font-semibold '>
                        <Tabs.Tab value="overview" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Overview</Tabs.Tab>
                        <Tabs.Tab value="applicants" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>
                          Applicants ({applicants.length})
                        </Tabs.Tab>
                        <Tabs.Tab value="invited" className='text-mine-shaft-300 data-[active]:text-bright-sun-400 '>Invited</Tabs.Tab>
                      </Tabs.List>
                      
                      <Tabs.Panel value="overview" className='[&_#hello]:w-full'>
                       {job && (
                         <div className="text-mine-shaft-300" dangerouslySetInnerHTML={{ __html: job.description || 'No description' }} />
                       )}
                      </Tabs.Panel>
                      <Tabs.Panel value="applicants">
                        <div className='flex flex-wrap gap-5 mt-10 justify-start'>
                          {loadingApplicants ? (
                            <Loader color="bright-sun" />
                          ) : applicants.length === 0 ? (
                            <Text c="dimmed">No applicants yet</Text>
                          ) : (
                            <div className="w-full flex flex-col gap-4">
                              {applicants.map(renderApplicantCard)}
                            </div>
                          )}
                        </div>
                      </Tabs.Panel>
                      <Tabs.Panel value="invited">
                        <div className='flex flex-wrap gap-5 mt-10 justify-around'>
                          <Text c="dimmed">Invited candidates will appear here</Text>
                        </div>
                      </Tabs.Panel>
                      
            </Tabs>
        </div>
    </div>
  )
}

export default PostedJobDesc
