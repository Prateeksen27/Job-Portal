import  { useRef, useState, useEffect } from 'react'
import {
  IconCurrencyRupee,
  IconHeart,
  IconMapPin,
  IconCalendar,
  IconCalendarWeek,
  IconSend
} from '@tabler/icons-react'
import { Avatar, Button, Divider, Modal, Text, Textarea, Stack, Select, Loader } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { DateInput, TimeInput } from '@mantine/dates'
import dayjs from 'dayjs'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'

const TalentCard = ({ data, cardKey, posted,invited }: any) => {
  const t = data
  const userId = t.userId || {}
  const name = t.name || userId?.username || 'Unknown'
  const role = t.role || t.headline || 'Job Seeker'
  const company = t.company || (t.experience && t.experience[0]?.company) || 'Not specified'
  const topSkills = t.topSkills || t.skills || []
  const about = t.about || t.summary || 'No summary available'
  const expectedCtc = t.expectedCtc || (t.expectedSalary ? `${t.expectedSalary.min / 100000}-${t.expectedSalary.max / 100000}LPA` : 'Not disclosed')
  const location = t.location || 'Not specified'
  const image = t.image || userId?.avatar || null
  const profileId = t._id || userId?._id || cardKey
  const userIdString = userId?._id || userId?.id || profileId

  const { role: currentRole } = useAuthStore()
  
  const [opened, { open, close }] = useDisclosure(false);
  const [inviteOpened, { open: openInvite, close: closeInvite }] = useDisclosure(false);
  const [value, setValue] = useState<string | null>(null);
  const [inviteMessage, setInviteMessage] = useState('')
  const [inviting, setInviting] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [jobs, setJobs] = useState<{value: string, label: string}[]>([])
  const [loadingJobs, setLoadingJobs] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (currentRole === 'RECRUITER') {
      fetchJobs()
    }
  }, [currentRole])

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true)
      const response = await axiosInstance.get('/jobs/my-jobs')
      if (response.data.jobs) {
        const jobOptions = response.data.jobs.map((job: any) => ({
          value: job._id,
          label: `${job.title} - ${job.company?.name || job.location}`
        }))
        setJobs(jobOptions)
      }
    } catch (err) {
      console.error('Error fetching jobs:', err)
    } finally {
      setLoadingJobs(false)
    }
  }

  const handleInvite = async () => {
    if (!selectedJob) {
      toast.error('Please select a job to invite this candidate')
      return
    }
    try {
      setInviting(true)
      await axiosInstance.post('/invitations/send', {
        candidateId: userIdString,
        jobId: selectedJob,
        message: inviteMessage
      })
      toast.success('Invitation sent successfully')
      closeInvite()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send invitation')
    } finally {
      setInviting(false)
    }
  }
  return (
    <div className="bg-mine-shaft-900 p-4 md:w-80 sm:w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              src={image}
              className="h-8 w-8 object-contain rounded-full"
              alt="Talent avatar"
            />
          </div>
          <div>
            <div className="font-semibold text-sm">{name}</div>
            <div className="text-xs text-mine-shaft-300">
              {role} • {company}
            </div>
          </div>
        </div>
        <button className="p-1 hover:text-red-500 hover:cursor-pointer transition-colors">
          <IconHeart size={18} />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        {(topSkills || []).map((skill: string, idx: number) => (
          <span
            key={idx}
            className="py-1 px-3 bg-mine-shaft-800 text-bright-sun-400 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* About */}
      <Text lineClamp={2} className="!text-sm !text-mine-shaft-300 mb-3">
        {about}
      </Text>

      <Divider size="xs" color="mine-shaft.7" />
        {
          invited?<div className='flex gap-1 mt-3 text-mine-shaft-200 text-sm items-center'>
            <IconCalendar />Interview: August 27,2025 10:00 AM
          </div>:<>
        
      {/* Footer */}
      <div className="flex justify-between items-center mt-3 mb-3 text-xs text-mine-shaft-300">
        <div className="flex items-center gap-1">
          <IconCurrencyRupee size={16} />
          <span className="font-medium text-white">{expectedCtc}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconMapPin size={16} />
          <span>{typeof location === 'object' ? `${location?.city || ''}, ${location?.country || ''}` : location}</span>
        </div>
      </div>
      <Divider size="xs" color='mine-shaft.7' className="self-stretch" />
      <div className='flex gap-3 mt-1'>
        <Link to={`/talent-profile/${profileId}`}>
          <Button fullWidth variant='outline' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>View Profile</Button>
        </Link>
        {currentRole === 'RECRUITER' && (
          <Button 
            fullWidth 
            onClick={openInvite} 
            leftSection={<IconSend size={16} />} 
            variant='light' 
            className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'
          >
            Invite
          </Button>
        )}
        {currentRole !== 'RECRUITER' && (
          <>
            {posted ?
              <Button fullWidth onClick={open} leftSection={<IconCalendarWeek className='w-5 h-5' />} variant='light' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Schedule</Button> :
              <Button fullWidth variant='light' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Message</Button>
            }
          </>
        )}
      </div>
      </>
}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-3 '>
          <DateInput minDate={new Date()} maxDate={dayjs(new Date()).add(1, 'month').toDate()} value={value} onChange={setValue} label="Date Input" placeholder='Select your interview date' />
          <TimeInput label="Select Time slot" ref={ref} onClick={() => ref.current?.showPicker()} />

          <Button fullWidth variant='light' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Schedule</Button>

        </div>
      </Modal>

      <Modal opened={inviteOpened} onClose={closeInvite} title="Invite Candidate" centered>
        <Stack gap="md">
          <Text size="sm" c="dimmed">Send an invitation to {name} for your job posting.</Text>
          <Select
            label="Select Job"
            placeholder={loadingJobs ? "Loading jobs..." : "Choose a job to invite for"}
            data={jobs}
            value={selectedJob}
            onChange={setSelectedJob}
            disabled={loadingJobs || jobs.length === 0}
          />
          <Textarea
            label="Message (optional)"
            placeholder="Add a message for the candidate"
            value={inviteMessage}
            onChange={(e) => setInviteMessage(e.target.value)}
            rows={3}
          />
          <Button 
            fullWidth 
            onClick={handleInvite} 
            loading={inviting}
            leftSection={<IconSend size={16} />}
            disabled={!selectedJob}
            className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400'
          >
            Send Invitation
          </Button>
        </Stack>
      </Modal>
    </div>
  )
}

export default TalentCard
