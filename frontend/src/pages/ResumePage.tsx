import { useState, useEffect } from 'react'
import { Button, FileInput, Paper, Text, Badge, Group, Stack, Alert, Loader, ActionIcon, Modal } from '@mantine/core'
import { IconUpload, IconDownload, IconTrash, IconFile, IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react'
import { axiosInstance } from '../lib/axios'

const ResumePage = () => {
  const [resume, setResume] = useState<{ url: string; fileName: string; uploadedAt?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      setLoading(true)
      const stored = localStorage.getItem('auth-storage')
      if (!stored) {
        setLoading(false)
        return
      }
      const parsed = JSON.parse(stored)
      const userId = parsed.state?.user?.id
      
      if (!userId) {
        setLoading(false)
        return
      }

      const response = await axiosInstance.get(`/resume/${userId}`)
      if (response.data && response.data.resume) {
        setResume(response.data.resume)
      }
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error('Error fetching resume:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (file: File | null) => {
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    try {
      setUploading(true)
      setError('')
      setSuccess('')

      const formData = new FormData()
      formData.append('resume', file)

      const response = await axiosInstance.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data && response.data.resume) {
        setResume(response.data.resume)
        setSuccess('Resume uploaded successfully')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setError('')
      setSuccess('')
      
      await axiosInstance.delete('/resume')
      setResume(null)
      setSuccess('Resume deleted successfully')
      setDeleteModalOpen(false)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete resume')
    }
  }

  const handleDownload = () => {
    if (resume?.url) {
      window.open(resume.url, '_blank')
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-poppins px-4 pt-24 pb-10">
      <div className="max-w-3xl mx-auto">
        <Text size="xl" fw={700} className="text-white mb-6">Resume Management</Text>

        {error && (
          <Alert color="red" onClose={() => setError('')} withCloseButton className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" onClose={() => setSuccess('')} withCloseButton className="mb-4">
            {success}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader size="lg" color="bright-sun" />
          </div>
        ) : (
          <Stack gap="md">
            <Paper p="xl" radius="md" className="bg-mine-shaft-900 border border-mine-shaft-700">
              {resume ? (
                <Stack gap="md">
                  <Group justify="space-between" align="flex-start">
                    <Group gap="md">
                      <IconFile size={40} className="text-bright-sun-400" />
                      <div>
                        <Text fw={600} className="text-white">{resume.fileName}</Text>
                        <Text size="sm" c="dimmed">Uploaded on {formatDate(resume.uploadedAt)}</Text>
                      </div>
                    </Group>
                    <Badge color="green" size="lg">Uploaded</Badge>
                  </Group>

                  <Group gap="sm">
                    <Button
                      leftSection={<IconDownload size={18} />}
                      onClick={handleDownload}
                      className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400"
                      variant="outline"
                    >
                      Download
                    </Button>
                    <FileInput
                      accept=".pdf"
                      placeholder="Replace Resume"
                      leftSection={<IconUpload size={18} />}
                      onChange={handleUpload}
                      disabled={uploading}
                      classNames={{
                        input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!border-bright-sun-400'
                      }}
                    />
                    <Button
                      leftSection={<IconTrash size={18} />}
                      onClick={() => setDeleteModalOpen(true)}
                      className="!text-sm !text-red-400 !border-red-900 hover:!bg-red-900/30"
                      variant="outline"
                      color="red"
                    >
                      Delete
                    </Button>
                  </Group>
                </Stack>
              ) : (
                <Stack gap="lg" align="center">
                  <IconFile size={60} className="text-mine-shaft-500" />
                  <div className="text-center">
                    <Text fw={600} className="text-white mb-1">No Resume Uploaded</Text>
                    <Text size="sm" c="dimmed">Upload your resume to apply for jobs faster</Text>
                  </div>
                  <FileInput
                    accept=".pdf"
                    placeholder="Upload Resume (PDF only)"
                    leftSection={<IconUpload size={18} />}
                    onChange={handleUpload}
                    disabled={uploading}
                    size="md"
                    w={250}
                    classNames={{
                      input: '!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!border-bright-sun-400'
                    }}
                  />
                  {uploading && (
                    <Loader size="sm" color="bright-sun" />
                  )}
                  <Text size="xs" c="dimmed">Maximum file size: 5MB</Text>
                </Stack>
              )}
            </Paper>

            <Modal
              opened={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              title="Delete Resume"
              centered
            >
              <Stack gap="md">
                <Text>Are you sure you want to delete your resume?</Text>
                <Group justify="flex-end">
                  <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                </Group>
              </Stack>
            </Modal>
          </Stack>
        )}
      </div>
    </div>
  )
}

export default ResumePage
