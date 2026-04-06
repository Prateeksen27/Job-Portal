import { useState, useEffect } from 'react'
import { Button, Paper, Text, Badge, Group, Stack, Alert, Loader, Card, Avatar } from '@mantine/core'
import { IconBriefcase, IconUser, IconCheck, IconX, IconClock } from '@tabler/icons-react'
import { axiosInstance } from '../lib/axios'

interface Invitation {
  _id: string
  jobId: {
    _id: string
    title: string
    location: string
    jobType?: string
    salary?: { min?: number; max?: number }
  }
  recruiterId: {
    _id: string
    username: string
    email?: string
    company?: string
  }
  message?: string
  status: string
  createdAt: string
  expiresAt?: string
}

const InvitationsPage = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchInvitations()
  }, [])

  const fetchInvitations = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/invitations/user')
      if (response.data && response.data.invitations) {
        setInvitations(response.data.invitations)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch invitations')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (id: string) => {
    try {
      setActionLoading(id)
      setError('')
      setSuccess('')

      const response = await axiosInstance.put(`/invitations/accept/${id}`)
      if (response.data) {
        setSuccess('Invitation accepted successfully')
        setInvitations(prev => prev.map(inv => 
          inv._id === id ? { ...inv, status: 'accepted' } : inv
        ))
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to accept invitation')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    try {
      setActionLoading(id)
      setError('')
      setSuccess('')

      const response = await axiosInstance.put(`/invitations/reject/${id}`)
      if (response.data) {
        setSuccess('Invitation rejected successfully')
        setInvitations(prev => prev.map(inv => 
          inv._id === id ? { ...inv, status: 'declined' } : inv
        ))
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reject invitation')
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge color="blue" leftSection={<IconClock size={14} />}>Pending</Badge>
      case 'accepted':
        return <Badge color="green" leftSection={<IconCheck size={14} />}>Accepted</Badge>
      case 'declined':
        return <Badge color="red" leftSection={<IconX size={14} />}>Declined</Badge>
      case 'expired':
        return <Badge color="gray">Expired</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending')
  const respondedInvitations = invitations.filter(inv => inv.status !== 'pending')

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-poppins px-4 pt-24 pb-10">
      <div className="max-w-4xl mx-auto">
        <Text size="xl" fw={700} className="text-white mb-6">Job Invitations</Text>

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
        ) : invitations.length === 0 ? (
          <Paper p="xl" radius="md" className="bg-mine-shaft-900 border border-mine-shaft-700 text-center">
            <IconBriefcase size={50} className="text-mine-shaft-500 mx-auto mb-3" />
            <Text fw={600} className="text-white mb-1">No Invitations Yet</Text>
            <Text size="sm" c="dimmed">You haven't received any job invitations</Text>
          </Paper>
        ) : (
          <Stack gap="lg">
            {pendingInvitations.length > 0 && (
              <div>
                <Text fw={600} className="text-white mb-3">Pending Invitations ({pendingInvitations.length})</Text>
                <Stack gap="md">
                  {pendingInvitations.map((invitation) => (
                    <Paper key={invitation._id} p="lg" radius="md" className="bg-mine-shaft-900 border border-mine-shaft-700">
                      <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                          <Group gap="md">
                            <Avatar color="bright-sun" radius="xl">
                              <IconBriefcase size={20} />
                            </Avatar>
                            <div>
                              <Text fw={600} className="text-white">{invitation.jobId?.title || 'Job Title'}</Text>
                              <Text size="sm" c="dimmed">
                                {invitation.jobId?.location && `${invitation.jobId.location} • `}
                                {invitation.jobId?.jobType || ''}
                              </Text>
                            </div>
                          </Group>
                          {getStatusBadge(invitation.status)}
                        </Group>

                        {invitation.recruiterId && (
                          <Group gap="xs">
                            <IconUser size={16} className="text-mine-shaft-400" />
                            <Text size="sm" c="dimmed">
                              Invited by {invitation.recruiterId.username}
                              {invitation.recruiterId.company && ` from ${invitation.recruiterId.company}`}
                            </Text>
                          </Group>
                        )}

                        {invitation.message && (
                          <Paper p="md" radius="sm" className="bg-mine-shaft-950">
                            <Text size="sm" className="text-mine-shaft-300">"{invitation.message}"</Text>
                          </Paper>
                        )}

                        <Group justify="space-between" align="center">
                          <Text size="xs" c="dimmed">
                            Sent on {formatDate(invitation.createdAt)}
                            {invitation.expiresAt && ` • Expires ${formatDate(invitation.expiresAt)}`}
                          </Text>
                          <Group gap="sm">
                            <Button
                              size="xs"
                              leftSection={<IconCheck size={14} />}
                              onClick={() => handleAccept(invitation._id)}
                              loading={actionLoading === invitation._id}
                              className="!text-sm !text-green-400 !border-green-700 hover:!bg-green-900/30"
                              variant="outline"
                            >
                              Accept
                            </Button>
                            <Button
                              size="xs"
                              leftSection={<IconX size={14} />}
                              onClick={() => handleReject(invitation._id)}
                              loading={actionLoading === invitation._id}
                              className="!text-sm !text-red-400 !border-red-700 hover:!bg-red-900/30"
                              variant="outline"
                              color="red"
                            >
                              Reject
                            </Button>
                          </Group>
                        </Group>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </div>
            )}

            {respondedInvitations.length > 0 && (
              <div>
                <Text fw={600} className="text-white mb-3">Response History ({respondedInvitations.length})</Text>
                <Stack gap="md">
                  {respondedInvitations.map((invitation) => (
                    <Paper key={invitation._id} p="lg" radius="md" className="bg-mine-shaft-900 border border-mine-shaft-700 opacity-75">
                      <Group justify="space-between" align="flex-start">
                        <Group gap="md">
                          <Avatar color="bright-sun" radius="xl">
                            <IconBriefcase size={20} />
                          </Avatar>
                          <div>
                            <Text fw={600} className="text-white">{invitation.jobId?.title || 'Job Title'}</Text>
                            <Text size="sm" c="dimmed">
                              {invitation.jobId?.location && `${invitation.jobId.location} • `}
                              {invitation.jobId?.jobType || ''}
                            </Text>
                          </div>
                        </Group>
                        {getStatusBadge(invitation.status)}
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </div>
            )}
          </Stack>
        )}
      </div>
    </div>
  )
}

export default InvitationsPage
