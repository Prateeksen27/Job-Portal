import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Divider, Loader, Text, Badge, TextInput, Textarea, Select, NumberInput, TagsInput, Alert, ActionIcon, Paper, Group, Stack, Avatar } from '@mantine/core'
import { IconArrowLeft, IconEdit, IconTrash, IconUsers, IconMapPin, IconCurrencyRupee, IconBriefcase, IconClock, IconDownload, IconExternalLink } from '@tabler/icons-react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

const PostedJobDetails = () => {
  const { id: jobId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [applicants, setApplicants] = useState<any[]>([])
  const [loadingApplicants, setLoadingApplicants] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    jobType: '',
    experience: '',
    salary: { min: 0, max: 0 },
    company: { name: '' },
    skills: [] as string[],
    description: '',
    requirements: '',
    responsibilities: '',
    deadline: '',
    status: 'open'
  })

  useEffect(() => {
    if (jobId) {
      fetchJob()
    }
  }, [jobId])

  const fetchJob = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/jobs/${jobId}`)
      if (response.data && response.data.job) {
        const jobData = response.data.job
        setJob(jobData)
        setFormData({
          title: jobData.title || '',
          location: jobData.location || '',
          jobType: jobData.jobType || '',
          experience: jobData.experience || '',
          salary: { min: jobData.salary?.min || 0, max: jobData.salary?.max || 0 },
          company: { name: jobData.company?.name || '' },
          skills: jobData.skills || [],
          description: jobData.description || '',
          requirements: jobData.requirements || '',
          responsibilities: jobData.responsibilities || '',
          deadline: jobData.deadline || '',
          status: jobData.status || 'open'
        })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load job')
    } finally {
      setLoading(false)
    }
  }

  const fetchApplicants = async () => {
    try {
      setLoadingApplicants(true)
      const response = await axiosInstance.get(`/jobs/${jobId}/applicants`)
      if (response.data && response.data.applications) {
        setApplicants(response.data.applications)
      }
    } catch (err) {
      console.error('Failed to fetch applicants:', err)
    } finally {
      setLoadingApplicants(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.location || !formData.jobType) {
      setError('Please fill in all required fields')
      return
    }
    try {
      setSaving(true)
      setError('')
      await axiosInstance.put(`/jobs/${jobId}`, formData)
      toast.success('Job updated successfully!')
      setIsEditing(false)
      fetchJob()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update job')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      setDeleting(true)
      await axiosInstance.delete(`/jobs/${jobId}`)
      toast.success('Job deleted successfully!')
      navigate('/posted-jobs')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete job')
    } finally {
      setDeleting(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData((prev: typeof formData) => {
        const parentObj = prev[parent as keyof typeof prev] as Record<string, any>
        return {
          ...prev,
          [parent]: { ...parentObj, [child]: value }
        } as typeof formData
      })
    } else {
      setFormData((prev: typeof formData) => ({ ...prev, [field]: value }))
    }
  }

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

  const salaryStr = job.salary?.min && job.salary?.max
    ? `₹${job.salary.min / 100000}-${job.salary.max / 100000}LPA`
    : 'Not disclosed'
  const postedDaysAgo = job.createdAt
    ? Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
      <Divider size="sm" orientation="horizontal" />
      <div className="p-6">
        <Button variant="light" onClick={() => navigate('/posted-jobs')} leftSection={<IconArrowLeft />} className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 mb-4">
          Back to Posted Jobs
        </Button>
      </div>

      {error && (
        <Alert color="red" onClose={() => setError('')} withCloseButton className="mx-6 mb-4">
          {error}
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
        {/* Left: Job Details */}
        <div className="flex-1">
          <Paper className="bg-mine-shaft-900 p-6 rounded-2xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              {isEditing ? (
                <TextInput
                  label="Job Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="flex-1"
                  classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
                />
              ) : (
                <div>
                  <div className="text-2xl font-semibold text-white">{job.title}</div>
                  <div className="text-sm text-mine-shaft-300">{job.company?.name} • <Badge color={job.status === 'open' ? 'green' : 'red'} size="sm">{job.status}</Badge></div>
                </div>
              )}
              <Group gap="xs">
                <Button
                  variant="light"
                  leftSection={<IconEdit size={16} />}
                  onClick={() => setIsEditing(!isEditing)}
                  className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
                <Button
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  onClick={handleDelete}
                  loading={deleting}
                  className="!text-sm !text-red-400 !border-mine-shaft-700"
                >
                  Delete
                </Button>
              </Group>
            </div>

            <Divider my="md" />

            {/* Job Info Grid */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex flex-col items-center gap-1">
                <ActionIcon variant="light" color="bright-sun.4" size="lg" radius="xl">
                  <IconMapPin size={20} />
                </ActionIcon>
                <Text size="xs" c="dimmed">Location</Text>
                {isEditing ? (
                  <TextInput
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
                  />
                ) : (
                  <Text fw={500}>{job.location}</Text>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <ActionIcon variant="light" color="bright-sun.4" size="lg" radius="xl">
                  <IconCurrencyRupee size={20} />
                </ActionIcon>
                <Text size="xs" c="dimmed">Salary</Text>
                {isEditing ? (
                  <Group gap="xs">
                    <NumberInput
                      value={formData.salary.min}
                      onChange={(val) => handleInputChange('salary.min', val)}
                      placeholder="Min"
                      classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
                    />
                    <NumberInput
                      value={formData.salary.max}
                      onChange={(val) => handleInputChange('salary.max', val)}
                      placeholder="Max"
                      classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
                    />
                  </Group>
                ) : (
                  <Text fw={500}>{salaryStr}</Text>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <ActionIcon variant="light" color="bright-sun.4" size="lg" radius="xl">
                  <IconBriefcase size={20} />
                </ActionIcon>
                <Text size="xs" c="dimmed">Job Type</Text>
                {isEditing ? (
                  <Select
                    value={formData.jobType}
                    onChange={(val) => handleInputChange('jobType', val)}
                    data={[
                      { value: 'remote', label: 'Remote' },
                      { value: 'hybrid', label: 'Hybrid' },
                      { value: 'onsite', label: 'Onsite' }
                    ]}
                    classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
                  />
                ) : (
                  <Text fw={500} className="capitalize">{job.jobType}</Text>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <ActionIcon variant="light" color="bright-sun.4" size="lg" radius="xl">
                  <IconUsers size={20} />
                </ActionIcon>
                <Text size="xs" c="dimmed">Experience</Text>
                {isEditing ? (
                  <Select
                    value={formData.experience}
                    onChange={(val) => handleInputChange('experience', val)}
                    data={[
                      { value: 'fresher', label: 'Fresher' },
                      { value: '1-2 years', label: '1-2 years' },
                      { value: '3-5 years', label: '3-5 years' },
                      { value: '5-10 years', label: '5-10 years' },
                      { value: '10+ years', label: '10+ years' }
                    ]}
                    classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
                  />
                ) : (
                  <Text fw={500}>{job.experience}</Text>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <ActionIcon variant="light" color="bright-sun.4" size="lg" radius="xl">
                  <IconClock size={20} />
                </ActionIcon>
                <Text size="xs" c="dimmed">Posted</Text>
                <Text fw={500}>{postedDaysAgo} days ago</Text>
              </div>
            </div>

            {/* Skills */}
            <Divider my="md" />
            <Text fw={600} mb="sm">Required Skills</Text>
            {isEditing ? (
              <TagsInput
                value={formData.skills}
                onChange={(val) => handleInputChange('skills', val)}
                placeholder="Add skills"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {(job.skills || []).map((skill: string, idx: number) => (
                  <Badge key={idx} variant="light" color="bright-sun.4">{skill}</Badge>
                ))}
              </div>
            )}

            {/* Description */}
            <Divider my="md" />
            <Text fw={600} mb="sm">Job Description</Text>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                minRows={4}
                classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
              />
            ) : (
              <Text c="dimmed" dangerouslySetInnerHTML={{ __html: job.description || 'No description' }} />
            )}

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6">
                <Button
                  onClick={handleSave}
                  loading={saving}
                  className="!text-sm !bg-bright-sun-400 !text-black"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </Paper>
        </div>

        {/* Right: Applicants */}
        <div className="lg:w-1/3">
          <Paper className="bg-mine-shaft-900 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <IconUsers className="text-bright-sun-400" />
              <Text fw={600}>Applicants</Text>
            </div>
            <Button
              variant="light"
              fullWidth
              onClick={() => navigate(`/job-applicants/${jobId}`)}
              className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 mb-4"
            >
              View All Applicants
            </Button>
            <Divider my="md" />
            
            {loadingApplicants ? (
              <Loader color="bright-sun" size="sm" />
            ) : applicants.length === 0 ? (
              <Text c="dimmed" size="sm">No applicants yet</Text>
            ) : (
              <Stack gap="sm">
                {applicants.slice(0, 5).map((app: any) => (
                  <Paper key={app._id} p="sm" className="bg-mine-shaft-800">
                    <Group justify="space-between">
                      <Group gap="sm">
                        <Avatar color="bright-sun" radius="xl" size="sm">
                          {app.candidateId?.username?.charAt(0) || '?'}
                        </Avatar>
                        <div>
                          <Text size="sm" fw={500}>{app.candidateId?.username || 'Candidate'}</Text>
                          <Text size="xs" c="dimmed">{app.candidateId?.email}</Text>
                        </div>
                      </Group>
                      <Badge size="xs" color="blue">{app.status}</Badge>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default PostedJobDetails