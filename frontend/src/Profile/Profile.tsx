import { useState, useEffect } from 'react'
import banner from './../assets/Profile/banner.jpg'
import avtar from './../assets/avatar.png'
import { IconBriefcase2, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus, IconTrash, IconEye, IconEyeOff } from '@tabler/icons-react'
import { ActionIcon, Divider, TagsInput, Textarea, TextInput, Modal, Button, Text, Badge, Tooltip, Switch, Group, Stack, NumberInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'

interface Experience {
    _id?: string
    title: string
    company: string
    location?: string
    startDate: string
    endDate?: string
    current: boolean
    description?: string
}

interface Education {
    _id?: string
    institution: string
    degree: string
    field?: string
    startYear?: number
    endYear?: number
    description?: string
}

interface Project {
    _id?: string
    title: string
    description?: string
    technologies: string[]
    link?: string
    githubRepo?: string
}

interface Certification {
    _id?: string
    name: string
    organization: string
    issueDate?: string
    credentialUrl?: string
}

interface ProfileData {
    _id?: string
    headline?: string
    summary?: string
    location?: { city?: string, country?: string }
    phone?: string
    website?: string
    portfolio?: string
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
    experience?: Experience[]
    education?: Education[]
    projects?: Project[]
    certifications?: Certification[]
    resume?: { url: string, fileName: string, uploadedAt?: string }
    isPublic?: boolean
    userId?: { username: string, email: string, avatar?: string }
}

const Profile = () => {
    const { user } = useAuthStore()
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState({
        basic: false,
        about: false,
        skills: false
    })
    const [skillsData, setSkillsData] = useState<string[]>([])
    const [isPublic, setIsPublic] = useState(true)
    
    // Modal states
    const [experienceModalOpened, { open: openExperienceModal, close: closeExperienceModal }] = useDisclosure(false)
    const [educationModalOpened, { open: openEducationModal, close: closeEducationModal }] = useDisclosure(false)
    const [projectModalOpened, { open: openProjectModal, close: closeProjectModal }] = useDisclosure(false)
    const [certificationModalOpened, { open: openCertificationModal, close: closeCertificationModal }] = useDisclosure(false)
    
    // Editing item states
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
    const [editingEducation, setEditingEducation] = useState<Education | null>(null)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [editingCertification, setEditingCertification] = useState<Certification | null>(null)

    // Form states
    const [basicInfo, setBasicInfo] = useState({
        headline: '',
        currentCompany: '',
        currentRole: '',
        location: '',
        phone: '',
        website: '',
        linkedin: '',
        github: ''
    })
    const [aboutInfo, setAboutInfo] = useState('')
    const [experienceForm, setExperienceForm] = useState<Experience>({
        title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: ''
    })
    const [educationForm, setEducationForm] = useState<Education>({
        institution: '', degree: '', field: '', startYear: undefined, endYear: undefined, description: ''
    })
    const [projectForm, setProjectForm] = useState<Project>({
        title: '', description: '', technologies: [], link: '', githubRepo: ''
    })
    const [certificationForm, setCertificationForm] = useState<Certification>({
        name: '', organization: '', issueDate: '', credentialUrl: ''
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/profiles/me')
            if (response.data.profile) {
                setProfile(response.data.profile)
                setSkillsData(response.data.profile.skills || [])
                setIsPublic(response.data.profile.isPublic !== false)
                setBasicInfo({
                    headline: response.data.profile.headline || '',
                    currentCompany: response.data.profile.currentCompany || '',
                    currentRole: response.data.profile.currentRole || '',
                    location: response.data.profile.location?.city ? `${response.data.profile.location.city}, ${response.data.profile.location.country}` : '',
                    phone: response.data.profile.phone || '',
                    website: response.data.profile.website || '',
                    linkedin: response.data.profile.linkedin || '',
                    github: response.data.profile.github || ''
                })
                setAboutInfo(response.data.profile.summary || '')
            }
        } catch (error: any) {
            console.error('Error fetching profile:', error)
            if (error.response?.status !== 404) {
                toast.error('Failed to load profile')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (section: 'basic' | 'about' | 'skills') => {
        setEdit(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const saveBasicInfo = async () => {
        try {
            const [city, ...countryParts] = basicInfo.location.split(', ')
            const payload = {
                headline: basicInfo.headline,
                currentCompany: basicInfo.currentCompany,
                currentRole: basicInfo.currentRole,
                location: { city, country: countryParts.join(', ') },
                phone: basicInfo.phone,
                website: basicInfo.website,
                linkedin: basicInfo.linkedin,
                github: basicInfo.github
            }
            await axiosInstance.put('/profiles/me', payload)
            toast.success('Profile updated')
            handleEdit('basic')
            fetchProfile()
        } catch (error) {
            toast.error('Failed to update profile')
        }
    }

    const saveAbout = async () => {
        try {
            await axiosInstance.put('/profiles/me', { summary: aboutInfo })
            toast.success('About section updated')
            handleEdit('about')
            fetchProfile()
        } catch (error) {
            toast.error('Failed to update about section')
        }
    }

    const saveSkills = async () => {
        try {
            await axiosInstance.put('/profiles/skills', { skills: skillsData })
            toast.success('Skills updated')
            handleEdit('skills')
        } catch (error) {
            toast.error('Failed to update skills')
        }
    }

    const toggleVisibility = async () => {
        try {
            const newVisibility = !isPublic
            await axiosInstance.put('/profiles/visibility', { isPublic: newVisibility })
            setIsPublic(newVisibility)
            toast.success(newVisibility ? 'Profile is now public' : 'Profile is now private')
        } catch (error) {
            toast.error('Failed to update visibility')
        }
    }

    // Experience handlers
    const openAddExperience = () => {
        setEditingExperience(null)
        setExperienceForm({ title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })
        openExperienceModal()
    }

    const openEditExperience = (exp: Experience) => {
        setEditingExperience(exp)
        setExperienceForm(exp)
        openExperienceModal()
    }

    const saveExperience = async () => {
        try {
            if (editingExperience?._id) {
                await axiosInstance.put(`/profiles/experience/${editingExperience._id}`, experienceForm)
                toast.success('Experience updated')
            } else {
                await axiosInstance.post('/profiles/experience', experienceForm)
                toast.success('Experience added')
            }
            closeExperienceModal()
            fetchProfile()
        } catch (error) {
            toast.error('Failed to save experience')
        }
    }

    const deleteExperience = async (id: string) => {
        try {
            await axiosInstance.delete(`/profiles/experience/${id}`)
            toast.success('Experience deleted')
            fetchProfile()
        } catch (error) {
            toast.error('Failed to delete experience')
        }
    }

    // Education handlers
    const openAddEducation = () => {
        setEditingEducation(null)
        setEducationForm({ institution: '', degree: '', field: '', startYear: undefined, endYear: undefined, description: '' })
        openEducationModal()
    }

    const openEditEducation = (edu: Education) => {
        setEditingEducation(edu)
        setEducationForm(edu)
        openEducationModal()
    }

    const saveEducation = async () => {
        try {
            if (editingEducation?._id) {
                await axiosInstance.put(`/profiles/education/${editingEducation._id}`, educationForm)
                toast.success('Education updated')
            } else {
                await axiosInstance.post('/profiles/education', educationForm)
                toast.success('Education added')
            }
            closeEducationModal()
            fetchProfile()
        } catch (error) {
            toast.error('Failed to save education')
        }
    }

    const deleteEducation = async (id: string) => {
        try {
            await axiosInstance.delete(`/profiles/education/${id}`)
            toast.success('Education deleted')
            fetchProfile()
        } catch (error) {
            toast.error('Failed to delete education')
        }
    }

    // Project handlers
    const openAddProject = () => {
        setEditingProject(null)
        setProjectForm({ title: '', description: '', technologies: [], link: '', githubRepo: '' })
        openProjectModal()
    }

    const openEditProject = (proj: Project) => {
        setEditingProject(proj)
        setProjectForm(proj)
        openProjectModal()
    }

    const saveProject = async () => {
        try {
            if (editingProject?._id) {
                await axiosInstance.put(`/profiles/projects/${editingProject._id}`, projectForm)
                toast.success('Project updated')
            } else {
                await axiosInstance.post('/profiles/projects', projectForm)
                toast.success('Project added')
            }
            closeProjectModal()
            fetchProfile()
        } catch (error) {
            toast.error('Failed to save project')
        }
    }

    const deleteProject = async (id: string) => {
        try {
            await axiosInstance.delete(`/profiles/projects/${id}`)
            toast.success('Project deleted')
            fetchProfile()
        } catch (error) {
            toast.error('Failed to delete project')
        }
    }

    // Certification handlers
    const openAddCertification = () => {
        setEditingCertification(null)
        setCertificationForm({ name: '', organization: '', issueDate: '', credentialUrl: '' })
        openCertificationModal()
    }

    const openEditCertification = (cert: Certification) => {
        setEditingCertification(cert)
        setCertificationForm(cert)
        openCertificationModal()
    }

    const saveCertification = async () => {
        try {
            if (editingCertification?._id) {
                await axiosInstance.put(`/profiles/certifications/${editingCertification._id}`, certificationForm)
                toast.success('Certification updated')
            } else {
                await axiosInstance.post('/profiles/certifications', certificationForm)
                toast.success('Certification added')
            }
            closeCertificationModal()
            fetchProfile()
        } catch (error) {
            toast.error('Failed to save certification')
        }
    }

    const deleteCertification = async (id: string) => {
        try {
            await axiosInstance.delete(`/profiles/certifications/${id}`)
            toast.success('Certification deleted')
            fetchProfile()
        } catch (error) {
            toast.error('Failed to delete certification')
        }
    }

    if (loading) {
        return <div className="p-10 text-center text-white">Loading profile...</div>
    }

    const userName = profile?.userId?.username || user?.username || 'User'
    const userEmail = profile?.userId?.email || user?.email || ''

    return (
        <div className="w-4/5 mx-auto">
            {/* Banner + Avatar */}
            <div className="relative">
                <img
                    className="w-full rounded-t-lg h-48 sm:h-64 md:h-72 object-cover"
                    src={profile?.coverImage || banner}
                    alt="Banner"
                />
                <img
                    className="w-28 h-28 sm:w-36 sm:h-36 absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6 border-4 sm:border-8 border-mine-shaft-950 rounded-full object-cover"
                    src={profile?.userId?.avatar || avtar}
                    alt="Profile Avatar"
                />
                {/* Visibility Toggle */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-mine-shaft-900/80 px-3 py-2 rounded-lg">
                    <Switch
                        checked={isPublic}
                        onChange={toggleVisibility}
                        size="md"
                        color="bright-sun"
                        label={
                            <div className="flex items-center gap-2 text-white text-sm">
                                {isPublic ? <IconEye size={18} /> : <IconEyeOff size={18} />}
                                {isPublic ? 'Public' : 'Private'}
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Profile Header */}
            <div className="px-4 sm:px-6 mt-16 sm:mt-20">
                <div className="flex justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                            {userName}
                        </h1>
                        <div className="text-sm text-mine-shaft-300 mt-1">{userEmail}</div>
                    </div>
                    <Tooltip label={edit.basic ? "Save" : "Edit Profile"} withArrow position="top">
                        <ActionIcon onClick={() => edit.basic ? saveBasicInfo() : handleEdit('basic')} size="lg" variant="subtle" aria-label="Edit">
                            {edit.basic ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </div>
                {edit.basic ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                        <TextInput
                            label="Professional Title"
                            placeholder="e.g. Software Engineer"
                            value={basicInfo.headline}
                            onChange={(e) => setBasicInfo({ ...basicInfo, headline: e.target.value })}
                        />
                        <TextInput
                            label="Current Company"
                            placeholder="Company name"
                            value={basicInfo.currentCompany}
                            onChange={(e) => setBasicInfo({ ...basicInfo, currentCompany: e.target.value })}
                        />
                        <TextInput
                            label="Current Role"
                            placeholder="Your role"
                            value={basicInfo.currentRole}
                            onChange={(e) => setBasicInfo({ ...basicInfo, currentRole: e.target.value })}
                        />
                        <TextInput
                            label="Location"
                            placeholder="City, Country"
                            value={basicInfo.location}
                            onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
                        />
                        <TextInput
                            label="Phone"
                            placeholder="Phone number"
                            value={basicInfo.phone}
                            onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                        />
                        <TextInput
                            label="Website"
                            placeholder="https://..."
                            value={basicInfo.website}
                            onChange={(e) => setBasicInfo({ ...basicInfo, website: e.target.value })}
                        />
                        <TextInput
                            label="LinkedIn"
                            placeholder="LinkedIn URL"
                            value={basicInfo.linkedin}
                            onChange={(e) => setBasicInfo({ ...basicInfo, linkedin: e.target.value })}
                        />
                        <TextInput
                            label="GitHub"
                            placeholder="GitHub URL"
                            value={basicInfo.github}
                            onChange={(e) => setBasicInfo({ ...basicInfo, github: e.target.value })}
                        />
                    </div>
                ) : (
                    <>
                        <div className="text-base sm:text-lg flex gap-2 items-center mt-2 flex-wrap">
                            <IconBriefcase2 className="h-5 w-5 text-bright-sun-400" />
                            {profile?.headline || 'Add your title'} {profile?.currentCompany && `• ${profile.currentCompany}`}
                        </div>
                        <div className="flex gap-2 text-sm sm:text-md items-center mt-1 text-mine-shaft-300 flex-wrap">
                            <IconMapPin className="h-5 w-5 text-bright-sun-400" /> {profile?.location?.city ? `${profile.location.city}, ${profile.location.country}` : 'Add location'}
                        </div>
                    </>
                )}
            </div>

            <Divider size="xs" my="xl" />

            {/* About */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    About
                    <Tooltip label={edit.about ? "Save" : "Edit About"} withArrow position="top">
                        <ActionIcon onClick={() => edit.about ? saveAbout() : handleEdit('about')} size="lg" variant="subtle" aria-label="Edit">
                            {edit.about ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </h2>
                {edit.about ? (
                    <Textarea
                        placeholder="Tell us about yourself..."
                        autosize
                        value={aboutInfo}
                        onChange={(e) => setAboutInfo(e.target.value)}
                        minRows={4}
                        className="mt-2"
                    />
                ) : (
                    <p className="text-mine-shaft-300 text-sm sm:text-base text-justify leading-relaxed">
                        {profile?.summary || 'Add a summary about yourself...'}
                    </p>
                )}
            </div>

            <Divider size="xs" my="xl" />

            {/* Skills */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Skills
                    <Tooltip label={edit.skills ? "Save" : "Edit Skills"} withArrow position="top">
                        <ActionIcon onClick={() => edit.skills ? saveSkills() : handleEdit('skills')} size="lg" variant="subtle" aria-label="Edit">
                            {edit.skills ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {edit.skills ? (
                        <TagsInput
                            className='py-3 w-full'
                            placeholder="Add skill and press enter"
                            clearable
                            value={skillsData}
                            onChange={setSkillsData}
                        />
                    ) : (
                        skillsData.length > 0 ? skillsData.map((skill, i) => (
                            <div
                                key={i}
                                className="bg-bright-sun-300 text-xs sm:text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
                            >
                                {skill}
                            </div>
                        )) : (
                            <p className="text-mine-shaft-400 text-sm">Add your skills...</p>
                        )
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Experience */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Experience
                    <ActionIcon onClick={openAddExperience} size="lg" variant="subtle" aria-label="Add">
                        <IconPlus className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {profile?.experience?.map((exp, i) => (
                        <div key={exp._id || i} className="flex justify-between items-start border-b border-mine-shaft-700 pb-4 last:border-0">
                            <div className="flex-1">
                                <Text className="text-white font-semibold">{exp.title}</Text>
                                <Text className="text-bright-sun-400 text-sm">{exp.company}</Text>
                                <Text className="text-mine-shaft-400 text-xs mt-1">
                                    {exp.startDate && new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString())}
                                </Text>
                                {exp.description && <Text className="text-mine-shaft-300 text-sm mt-2">{exp.description}</Text>}
                            </div>
                            <Group gap="xs">
                                <ActionIcon variant="subtle" onClick={() => openEditExperience(exp)}>
                                    <IconPencil size={16} className="text-mine-shaft-400" />
                                </ActionIcon>
                                <ActionIcon variant="subtle" onClick={() => exp._id && deleteExperience(exp._id)}>
                                    <IconTrash size={16} className="text-red-500" />
                                </ActionIcon>
                            </Group>
                        </div>
                    ))}
                    {(!profile?.experience || profile.experience.length === 0) && (
                        <Text className="text-mine-shaft-400 text-sm">No experience added yet...</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Education */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Education
                    <ActionIcon onClick={openAddEducation} size="lg" variant="subtle" aria-label="Add">
                        <IconPlus className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {profile?.education?.map((edu, i) => (
                        <div key={edu._id || i} className="flex justify-between items-start border-b border-mine-shaft-700 pb-4 last:border-0">
                            <div className="flex-1">
                                <Text className="text-white font-semibold">{edu.degree}</Text>
                                <Text className="text-bright-sun-400 text-sm">{edu.institution}</Text>
                                {edu.startYear && (
                                    <Text className="text-mine-shaft-400 text-xs mt-1">
                                        {edu.startYear} - {edu.endYear || 'Present'}
                                    </Text>
                                )}
                            </div>
                            <Group gap="xs">
                                <ActionIcon variant="subtle" onClick={() => openEditEducation(edu)}>
                                    <IconPencil size={16} className="text-mine-shaft-400" />
                                </ActionIcon>
                                <ActionIcon variant="subtle" onClick={() => edu._id && deleteEducation(edu._id)}>
                                    <IconTrash size={16} className="text-red-500" />
                                </ActionIcon>
                            </Group>
                        </div>
                    ))}
                    {(!profile?.education || profile.education.length === 0) && (
                        <Text className="text-mine-shaft-400 text-sm">No education added yet...</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Projects */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Projects
                    <ActionIcon onClick={openAddProject} size="lg" variant="subtle" aria-label="Add">
                        <IconPlus className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {profile?.projects?.map((proj, i) => (
                        <div key={proj._id || i} className="flex justify-between items-start border-b border-mine-shaft-700 pb-4 last:border-0">
                            <div className="flex-1">
                                <Text className="text-white font-semibold">{proj.title}</Text>
                                {proj.description && <Text className="text-mine-shaft-300 text-sm mt-1">{proj.description}</Text>}
                                {proj.technologies && proj.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {proj.technologies.map((tech, idx) => (
                                            <Badge key={idx} size="sm" color="bright-sun" variant="outline">{tech}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Group gap="xs">
                                <ActionIcon variant="subtle" onClick={() => openEditProject(proj)}>
                                    <IconPencil size={16} className="text-mine-shaft-400" />
                                </ActionIcon>
                                <ActionIcon variant="subtle" onClick={() => proj._id && deleteProject(proj._id)}>
                                    <IconTrash size={16} className="text-red-500" />
                                </ActionIcon>
                            </Group>
                        </div>
                    ))}
                    {(!profile?.projects || profile.projects.length === 0) && (
                        <Text className="text-mine-shaft-400 text-sm">No projects added yet...</Text>
                    )}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Certifications */}
            <div className="px-4 sm:px-6 mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Certifications
                    <ActionIcon onClick={openAddCertification} size="lg" variant="subtle" aria-label="Add">
                        <IconPlus className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {profile?.certifications?.map((cert, i) => (
                        <div key={cert._id || i} className="flex justify-between items-start border-b border-mine-shaft-700 pb-4 last:border-0">
                            <div className="flex-1">
                                <Text className="text-white font-semibold">{cert.name}</Text>
                                <Text className="text-bright-sun-400 text-sm">{cert.organization}</Text>
                            </div>
                            <Group gap="xs">
                                <ActionIcon variant="subtle" onClick={() => openEditCertification(cert)}>
                                    <IconPencil size={16} className="text-mine-shaft-400" />
                                </ActionIcon>
                                <ActionIcon variant="subtle" onClick={() => cert._id && deleteCertification(cert._id)}>
                                    <IconTrash size={16} className="text-red-500" />
                                </ActionIcon>
                            </Group>
                        </div>
                    ))}
                    {(!profile?.certifications || profile.certifications.length === 0) && (
                        <Text className="text-mine-shaft-400 text-sm">No certifications added yet...</Text>
                    )}
                </div>
            </div>

            {/* Experience Modal */}
            <Modal opened={experienceModalOpened} onClose={closeExperienceModal} title="Experience" centered>
                <Stack>
                    <TextInput label="Job Title" required value={experienceForm.title} onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })} />
                    <TextInput label="Company" required value={experienceForm.company} onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })} />
                    <TextInput label="Location" value={experienceForm.location} onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })} />
                    <TextInput label="Start Date" type="date" required value={experienceForm.startDate} onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })} />
                    <TextInput label="End Date" type="date" disabled={experienceForm.current} value={experienceForm.endDate} onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })} />
                    <Switch label="Currently working here" checked={experienceForm.current} onChange={(e) => setExperienceForm({ ...experienceForm, current: e.target.checked })} />
                    <Textarea label="Description" value={experienceForm.description} onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })} />
                    <Button onClick={saveExperience}>Save</Button>
                </Stack>
            </Modal>

            {/* Education Modal */}
            <Modal opened={educationModalOpened} onClose={closeEducationModal} title="Education" centered>
                <Stack>
                    <TextInput label="Institution" required value={educationForm.institution} onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })} />
                    <TextInput label="Degree" required value={educationForm.degree} onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })} />
                    <TextInput label="Field of Study" value={educationForm.field} onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })} />
                    <NumberInput label="Start Year" value={educationForm.startYear} onChange={(val) => setEducationForm({ ...educationForm, startYear: val as number })} />
                    <NumberInput label="End Year" value={educationForm.endYear} onChange={(val) => setEducationForm({ ...educationForm, endYear: val as number })} />
                    <Textarea label="Description" value={educationForm.description} onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })} />
                    <Button onClick={saveEducation}>Save</Button>
                </Stack>
            </Modal>

            {/* Project Modal */}
            <Modal opened={projectModalOpened} onClose={closeProjectModal} title="Project" centered>
                <Stack>
                    <TextInput label="Project Title" required value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                    <Textarea label="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
                    <TagsInput label="Technologies" placeholder="Add technology" value={projectForm.technologies} onChange={(val) => setProjectForm({ ...projectForm, technologies: val })} />
                    <TextInput label="Project Link" value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} />
                    <TextInput label="GitHub Repository" value={projectForm.githubRepo} onChange={(e) => setProjectForm({ ...projectForm, githubRepo: e.target.value })} />
                    <Button onClick={saveProject}>Save</Button>
                </Stack>
            </Modal>

            {/* Certification Modal */}
            <Modal opened={certificationModalOpened} onClose={closeCertificationModal} title="Certification" centered>
                <Stack>
                    <TextInput label="Certificate Name" required value={certificationForm.name} onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })} />
                    <TextInput label="Organization" required value={certificationForm.organization} onChange={(e) => setCertificationForm({ ...certificationForm, organization: e.target.value })} />
                    <TextInput label="Issue Date" type="date" value={certificationForm.issueDate} onChange={(e) => setCertificationForm({ ...certificationForm, issueDate: e.target.value })} />
                    <TextInput label="Credential URL" value={certificationForm.credentialUrl} onChange={(e) => setCertificationForm({ ...certificationForm, credentialUrl: e.target.value })} />
                    <Button onClick={saveCertification}>Save</Button>
                </Stack>
            </Modal>
        </div>
    )
}

export default Profile
