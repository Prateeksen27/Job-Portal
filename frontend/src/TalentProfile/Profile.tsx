import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import banner from './../assets/Profile/banner.jpg'
import avtar from './../assets/avatar.png'
import { IconBriefcase2, IconMapPin, IconCurrencyRupee, IconWorld, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'
import { Button, Divider, Text, Badge, Stack, Group, Loader } from '@mantine/core'
import { axiosInstance } from '../lib/axios'
import ExperienceCard from './ExperienceCard'
import CertificationCard from './CertificationCard'

interface ProfileData {
    _id?: string
    headline?: string
    summary?: string
    location?: { city?: string, country?: string }
    phone?: string
    website?: string
    linkedin?: string
    github?: string
    coverImage?: string
    skills?: string[]
    yearsOfExperience?: number
    currentCompany?: string
    currentRole?: string
    expectedSalary?: { min?: number, max?: number, currency?: string }
    availability?: string
    preferredJobType?: string
    experience?: any[]
    education?: any[]
    projects?: any[]
    certifications?: any[]
    resume?: { url: string, fileName: string }
    isPublic?: boolean
    userId?: { username: string, email: string, avatar?: string }
}

const Profile = () => {
    const { id: profileId } = useParams<{ id: string }>()
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (profileId) {
            fetchProfile(profileId)
        }
    }, [profileId])

    const fetchProfile = async (id: string) => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/profiles/${id}`)
            setProfile(response.data.profile)
        } catch (err: any) {
            console.error('Error fetching profile:', err)
            setError(err.response?.data?.message || 'Failed to load profile')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="w-full sm:w-5/6 lg:w-2/3 mx-auto flex justify-center items-center min-h-[50vh]">
                <Loader color="bright-sun" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full sm:w-5/6 lg:w-2/3 mx-auto p-10 text-center">
                <Text c="red">{error}</Text>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="w-full sm:w-5/6 lg:w-2/3 mx-auto p-10 text-center">
                <Text c="dimmed">Profile not found</Text>
            </div>
        )
    }

    const userName = profile.userId?.username || 'Unknown'
    const userAvatar = profile.userId?.avatar || avtar

    // Format location
    const locationStr = profile.location?.city 
        ? `${profile.location.city}${profile.location.country ? ', ' + profile.location.country : ''}` 
        : 'Location not specified'

    // Format salary
    const salaryStr = profile.expectedSalary?.min && profile.expectedSalary?.max
        ? `${profile.expectedSalary.currency || '₹'}${profile.expectedSalary.min / 100000}-${profile.expectedSalary.max / 100000}LPA`
        : 'Not disclosed'

    return (
        <div className="w-full sm:w-5/6 lg:w-2/3 mx-auto">
            {/* Banner + Avatar */}
            <div className="relative">
                <img
                    className="w-full rounded-t-lg h-48 sm:h-64 md:h-72 object-cover"
                    src={profile.coverImage || banner}
                    alt="Banner"
                />
                <img
                    className="w-28 h-28 sm:w-36 sm:h-36 absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6 border-4 sm:border-8 border-mine-shaft-950 rounded-full object-cover"
                    src={userAvatar}
                    alt="Profile Avatar"
                />
            </div>

            {/* Profile Header */}
            <div className="px-4 sm:px-6 mt-16 sm:mt-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                        {userName}
                    </h1>
                    <Button
                        variant="light"
                        className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300"
                    >
                        Message
                    </Button>
                </div>
                <div className="text-base sm:text-lg flex gap-2 items-center mt-2 flex-wrap">
                    <IconBriefcase2 className="h-5 w-5 text-bright-sun-400" />
                    {profile.headline || 'No headline'} {profile.currentCompany && `• ${profile.currentCompany}`}
                </div>
                <div className="flex gap-2 text-sm sm:text-md items-center mt-1 text-mine-shaft-300 flex-wrap">
                    <IconMapPin className="h-5 w-5 text-bright-sun-400" /> {locationStr}
                </div>
                
                {/* Quick info row */}
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-mine-shaft-400">
                    {profile.expectedSalary?.min && (
                        <div className="flex items-center gap-1">
                            <IconCurrencyRupee size={16} />
                            <span>{salaryStr}</span>
                        </div>
                    )}
                    {profile.availability && (
                        <Badge color="bright-sun" variant="light">
                            {profile.availability === 'immediate' ? 'Available' : profile.availability}
                        </Badge>
                    )}
                    {profile.preferredJobType && profile.preferredJobType !== 'any' && (
                        <Badge color="blue" variant="light">
                            {profile.preferredJobType}
                        </Badge>
                    )}
                </div>

                {/* Social Links */}
                {(profile.website || profile.linkedin || profile.github) && (
                    <div className="flex gap-3 mt-3">
                        {profile.website && (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-bright-sun-400 hover:text-bright-sun-300">
                                <IconWorld size={20} />
                            </a>
                        )}
                        {profile.linkedin && (
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-bright-sun-400 hover:text-bright-sun-300">
                                <IconBrandLinkedin size={20} />
                            </a>
                        )}
                        {profile.github && (
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-bright-sun-400 hover:text-bright-sun-300">
                                <IconBrandGithub size={20} />
                            </a>
                        )}
                    </div>
                )}
            </div>

            <Divider size="xs" my="xl" />

            {/* About */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    About
                </h2>
                <p className="text-mine-shaft-300 text-sm sm:text-base text-justify leading-relaxed">
                    {profile.summary || 'No summary added yet.'}
                </p>
            </div>

            <Divider size="xs" my="xl" />

            {/* Skills */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                    {(profile.skills && profile.skills.length > 0) ? (
                        profile.skills.map((skill, i) => (
                            <div
                                key={i}
                                className="bg-bright-sun-300 text-xs sm:text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
                            >
                                {skill}
                            </div>
                        ))
                    ) : (
                        <Text c="dimmed" size="sm">No skills added yet.</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Experience */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    Experience
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {(profile.experience && profile.experience.length > 0) ? (
                        profile.experience.map((exp: any, i: number) => (
                            <ExperienceCard key={exp._id || i} data={exp} />
                        ))
                    ) : (
                        <Text c="dimmed" size="sm">No experience added yet.</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Education */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    Education
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {(profile.education && profile.education.length > 0) ? (
                        profile.education.map((edu: any, i: number) => (
                            <div key={edu._id || i} className="border-b border-mine-shaft-700 pb-4 last:border-0">
                                <Text className="text-white font-semibold">{edu.degree}</Text>
                                <Text className="text-bright-sun-400 text-sm">{edu.institution}</Text>
                                {edu.startYear && (
                                    <Text className="text-mine-shaft-400 text-xs mt-1">
                                        {edu.startYear} - {edu.endYear || 'Present'}
                                    </Text>
                                )}
                                {edu.description && (
                                    <Text className="text-mine-shaft-300 text-sm mt-2">{edu.description}</Text>
                                )}
                            </div>
                        ))
                    ) : (
                        <Text c="dimmed" size="sm">No education added yet.</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Projects */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    Projects
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {(profile.projects && profile.projects.length > 0) ? (
                        profile.projects.map((proj: any, i: number) => (
                            <div key={proj._id || i} className="border-b border-mine-shaft-700 pb-4 last:border-0">
                                <Text className="text-white font-semibold">{proj.title}</Text>
                                {proj.description && (
                                    <Text className="text-mine-shaft-300 text-sm mt-1">{proj.description}</Text>
                                )}
                                {proj.technologies && proj.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {proj.technologies.map((tech: string, idx: number) => (
                                            <Badge key={idx} size="sm" color="bright-sun" variant="outline">{tech}</Badge>
                                        ))}
                                    </div>
                                )}
                                <Group gap="md" mt="xs">
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-bright-sun-400 text-sm hover:underline">
                                            Live Demo
                                        </a>
                                    )}
                                    {proj.githubRepo && (
                                        <a href={proj.githubRepo} target="_blank" rel="noopener noreferrer" className="text-bright-sun-400 text-sm hover:underline">
                                            GitHub
                                        </a>
                                    )}
                                </Group>
                            </div>
                        ))
                    ) : (
                        <Text c="dimmed" size="sm">No projects added yet.</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Certifications */}
            <div className="px-4 sm:px-6 mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    Certifications
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {(profile.certifications && profile.certifications.length > 0) ? (
                        profile.certifications.map((cert: any, i: number) => (
                            <CertificationCard key={cert._id || i} data={cert} />
                        ))
                    ) : (
                        <Text c="dimmed" size="sm">No certifications added yet.</Text>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
