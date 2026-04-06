import { useState, useEffect } from 'react'
import { SelectInput } from './SelectInput'
import { fields } from '../assets/Data/PostJob'
import { Button, TagsInput, TextInput, NumberInput, Paper, Text, Stack, Alert, Loader } from '@mantine/core'
import { RichTextEditors } from './RichTextEditors'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface JobFormData {
  title: string
  location: string
  jobType: string
  experience: string
  salary: { min?: number; max?: number }
  company: { name: string; logo?: string }
  skills: string[]
  description: string
  requirements: string
  responsibilities: string
  deadline: string
}

const PostJob = () => {
  const select = fields
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: '',
    jobType: '',
    experience: '',
    salary: {},
    company: { name: '' },
    skills: [],
    description: '',
    requirements: '',
    responsibilities: '',
    deadline: ''
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => {
        const parentObj = prev[parent as keyof JobFormData] as Record<string, any>
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        }
      })
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handlePublish = async () => {
    if (!formData.title || !formData.location || !formData.jobType || !formData.experience) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      setError('')

      const jobData = {
        title: formData.title,
        location: formData.location,
        jobType: formData.jobType,
        experience: formData.experience,
        salary: formData.salary,
        company: formData.company,
        skills: formData.skills,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        deadline: formData.deadline || null,
        status: 'open'
      }

      const response = await axiosInstance.post('/jobs/create', jobData)
      
      if (response.data) {
        toast.success('Job posted successfully!')
        navigate('/posted-jobs')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    try {
      setLoading(true)
      setError('')

      const jobData = {
        title: formData.title || 'Untitled Job',
        location: formData.location || '',
        jobType: formData.jobType || '',
        experience: formData.experience || '',
        salary: formData.salary,
        company: formData.company,
        skills: formData.skills,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        deadline: formData.deadline || null,
        status: 'closed'
      }

      const response = await axiosInstance.post('/jobs/create', jobData)
      
      if (response.data) {
        toast.success('Job saved as draft!')
        navigate('/posted-jobs')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 px-3 sm:px-6">
      <div className="text-xl sm:text-2xl font-semibold mb-5 text-white">
        Post Job
      </div>

      {error && (
        <Alert color="red" onClose={() => setError('')} withCloseButton className="mb-4">
          {error}
        </Alert>
      )}

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextInput
            label={select[0].label}
            placeholder={select[0].placeholder}
            required
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
          <TextInput
            label={select[1].label}
            placeholder={select[1].placeholder}
            required
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectInput 
            {...select[2]} 
            value={formData.jobType}
            onChange={(val: string) => handleInputChange('jobType', val)}
          />
          <SelectInput 
            {...select[3]} 
            value={formData.experience}
            onChange={(val: string) => handleInputChange('experience', val)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NumberInput
            label="Minimum Salary"
            placeholder="Enter min salary"
            value={formData.salary.min}
            onChange={(val: number | string) => handleInputChange('salary.min', val)}
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
          <NumberInput
            label="Maximum Salary"
            placeholder="Enter max salary"
            value={formData.salary.max}
            onChange={(val: number | string) => handleInputChange('salary.max', val)}
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            required
            value={formData.company.name}
            onChange={(e) => handleInputChange('company.name', e.target.value)}
            classNames={{ input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700' }}
          />
        </div>

        <TagsInput
          splitChars={[',', ' ', '|']}
          acceptValueOnBlur
          clearable
          label="Skills"
          placeholder="Enter required Skills"
          value={formData.skills}
          onChange={(val) => handleInputChange('skills', val)}
        />

        <div className='[&_button[data-active="true"]]:!text-bright-sun-400 [&_button[data-active="true"]]:!bg-bright-sun-400/20'>
          <div className="text-sm font-medium mb-1 text-white">Job Description</div>
          <RichTextEditors 
            value={formData.description}
            onChange={(val) => handleInputChange('description', val)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mb-10 mt-5">
          <Button
            onClick={handlePublish}
            loading={loading}
            variant="light"
            className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300"
          >
            Publish
          </Button>
          <Button
            onClick={handleSaveDraft}
            loading={loading}
            variant="outline"
            className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostJob
