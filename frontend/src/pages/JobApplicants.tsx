import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Divider, Loader, Text, Badge, Paper, Group, Stack, Avatar, TextInput, Select, ActionIcon, Menu } from '@mantine/core'
import { IconArrowLeft, IconSearch, IconDownload, IconExternalLink, IconDots } from '@tabler/icons-react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const STATUS_OPTIONS = ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'HIRED']

const STATUS_COLORS: Record<string, string> = {
  APPLIED: 'blue',
  SHORTLISTED: 'violet',
  INTERVIEW: 'orange',
  OFFERED: 'green',
  REJECTED: 'red',
  HIRED: 'teal'
}

const JobApplicants = () => {
  const { id: jobId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingApps, setLoadingApps] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    if (jobId) {
      fetchJob()
      fetchApplications()
    }
  }, [jobId])

  const fetchJob = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/jobs/${jobId}`)
      if (response.data && response.data.job) {
        setJob(response.data.job)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load job')
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      setLoadingApps(true)
      const response = await axiosInstance.get(`/jobs/${jobId}/applicants`)
      if (response.data && response.data.applications) {
        setApplications(response.data.applications)
      }
    } catch (err) {
      console.error('Failed to fetch applicants:', err)
    } finally {
      setLoadingApps(false)
    }
  }

  const handleUpdateStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(applicationId)
      await axiosInstance.put(`/applications/status/${applicationId}`, { status: newStatus })
      toast.success('Status updated successfully')
      setApplications(prev => prev.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ))
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

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.candidateId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.candidateId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] bg-mine-shaft-950 flex items-center justify-center">
        <Loader color="bright-sun" />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="w-full min-h-[100vh] bg-mine-shaft-950 p-6">
        <Button variant="light" onClick={() => navigate(-1)} leftSection={<IconArrowLeft />} className="mb-4">
          Back
        </Button>
        <Text c="red">{error || 'Job not found'}</Text>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
      <Divider size="sm" orientation="horizontal" />
      <div className="p-6">
        <Button variant="light" onClick={() => navigate(-1)} leftSection={<IconArrowLeft />} className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700">
          Back to Job
        </Button>
      </div>

      <div className="px-6 pb-6">
        {/* Job Header */}
        <Paper className="bg-mine-shaft-900 p-6 rounded-2xl mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Text size="xl" fw={600} className="text-white">{job.title}</Text>
              <Text c="dimmed">{job.company?.name} • {job.location}</Text>
            </div>
            <Badge size="lg" color="bright-sun.4">{applications.length} Applicants</Badge>
          </div>
        </Paper>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TextInput
            placeholder="Search by name or email"
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
            data={[
              { value: 'APPLIED', label: 'Applied' },
              { value: 'SHORTLISTED', label: 'Shortlisted' },
              { value: 'INTERVIEW', label: 'Interview' },
              { value: 'OFFERED', label: 'Offered' },
              { value: 'REJECTED', label: 'Rejected' },
              { value: 'HIRED', label: 'Hired' }
            ]}
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
        </div>

        {/* Applicants List */}
        {loadingApps ? (
          <Loader color="bright-sun" />
        ) : filteredApplications.length === 0 ? (
          <Paper className="bg-mine-shaft-900 p-6 rounded-2xl">
            <Text c="dimmed" ta="center">No applicants found</Text>
          </Paper>
        ) : (
          <Stack gap="md">
            {filteredApplications.map((app: any) => (
              <Paper key={app._id} className="bg-mine-shaft-900 p-6 rounded-2xl">
                <Group justify="space-between" align="flex-start">
                  <Group gap="md">
                    <Avatar color="bright-sun" radius="xl" size="lg">
                      {app.candidateId?.username?.charAt(0) || '?'}
                    </Avatar>
                    <div>
                      <Text fw={600} className="text-white">{app.candidateId?.username || 'Candidate'}</Text>
                      <Text size="sm" c="dimmed">{app.candidateId?.email}</Text>
                      {app.candidateId?.profile?.skills && (
                        <Group gap="xs" mt={4}>
                          {app.candidateId.profile.skills.slice(0, 5).map((skill: string, idx: number) => (
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
                        <ActionIcon variant="subtle" size="lg">
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Change Status</Menu.Label>
                        {STATUS_OPTIONS.map(status => (
                          <Menu.Item 
                            key={status} 
                            onClick={() => handleUpdateStatus(app._id, status)}
                            disabled={updatingStatus === app._id || app.status === status}
                          >
                            {status}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Group>

                <Divider my="md" />

                <Group justify="space-between">
                  <Group gap="md">
                    {app.candidateId?.profile?.headline && (
                      <Text size="sm" c="dimmed">{app.candidateId.profile.headline}</Text>
                    )}
                    <Text size="xs" c="dimmed">
                      Applied on {formatDate(app.appliedAt)}
                    </Text>
                  </Group>
                  <Group gap="sm">
                    {app.resume?.url && (
                      <Button
                        variant="light"
                        size="xs"
                        leftSection={<IconDownload size={14} />}
                        onClick={() => handleDownloadResume(app.resume.url)}
                        className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700"
                      >
                        Resume
                      </Button>
                    )}
                    <Button
                      variant="light"
                      size="xs"
                      leftSection={<IconExternalLink size={14} />}
                      component={Link}
                      to={`/talent-profile/${app.candidateId?._id}`}
                      target="_blank"
                      className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700"
                    >
                      View Profile
                    </Button>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </div>
    </div>
  )
}

export default JobApplicants