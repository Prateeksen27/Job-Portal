import React, { useState } from 'react'
import banner from './../assets/Profile/banner.jpg'
import avtar from './../assets/avatar1.png'
import { IconBriefcase2, IconDeviceFloppy, IconMapPin, IconPencil } from '@tabler/icons-react'
import { ActionIcon, Button, Divider, TagsInput, Textarea, Tooltip } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { profile } from '../assets/Data/TalentData'
import ExperienceCard from './ExperienceCard'
import CertificationCard from './CertificationCard'
import { SelectInput } from './SelectInput'
import fields from '../assets/Data/Profile'


const Profile = () => {
    const select = fields
    const {
        name,
        role,
        company,
        location,
        about,
        experience,
        certifications,
        skills,
    } = profile
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [skillsData, setSkillsData] = useState<string[]>(skills);
    const handleEdit = (i: any) => {
        const newEdit = [...edit];
        newEdit[i] = !newEdit[i];
        setEdit(newEdit);
    }

    return (
        <div className="w-4/5  mx-auto">
            {/* Banner + Avatar */}
            <div className="relative">
                <img
                    className="w-full rounded-t-lg h-48 sm:h-64 md:h-72 object-cover"
                    src={banner}
                    alt="Banner"
                />
                <img
                    className="w-28 h-28 sm:w-36 sm:h-36 absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6 border-4 sm:border-8 border-mine-shaft-950 rounded-full object-cover"
                    src={avtar}
                    alt="Profile Avatar"
                />
            </div>

            {/* Profile Header */}
            <div className="px-4 sm:px-6 mt-16 sm:mt-20">
                <div className="flex justify-between  gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                        {name}
                    </h1>
                    <Tooltip label="Edit Profile" withArrow position="top">
                        <ActionIcon onClick={() => handleEdit(0)} size="lg" variant="subtle" aria-label="Settings">
                            {edit[0] ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>

                </div>
                {edit[0] && <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectInput {...select[0]} />
                    <SelectInput {...select[1]} />
                    <SelectInput {...select[2]} />
                </div>}
                {!edit[0] &&
                    <><div className="text-base sm:text-lg flex gap-2 items-center mt-2 flex-wrap">
                        <IconBriefcase2 className="h-5 w-5 text-bright-sun-400" />
                        {role} • {company}
                    </div>
                        <div className="flex gap-2 text-sm sm:text-md items-center mt-1 text-mine-shaft-300 flex-wrap">
                            <IconMapPin className="h-5 w-5 text-bright-sun-400" /> {location}
                        </div>
                    </>}
            </div>

            <Divider size="xs" my="xl" />

            {/* About */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    About
                    <Tooltip label="Edit About" withArrow position="top">
                        <ActionIcon onClick={() => handleEdit(1)} size="lg" variant="subtle" aria-label="Settings">
                            {edit[1] ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </h2>
                <p className="text-mine-shaft-300 text-sm sm:text-base text-justify leading-relaxed">
                    {!edit[1] && about}
                    {edit[1] &&
                        <Textarea
                            placeholder="Your bio"
                            autosize
                            value={about}
                            className='text-justify p-3'
                            minRows={2}
                        />}
                </p>
            </div>

            <Divider size="xs" my="xl" />

            {/* Skills */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Skills
                    <Tooltip label="Edit Skills" withArrow position="top">
                        <ActionIcon onClick={() => handleEdit(2)} size="lg" variant="subtle" aria-label="Settings">
                            {edit[2] ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {!edit[2] ? skillsData.map((skill, i) => (
                        <div
                            key={i}
                            className="bg-bright-sun-300 text-xs sm:text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
                        >
                            {skill}
                        </div>
                    )) : <TagsInput
                        className='py-3 max-w-1/2'
                        placeholder="Enter tag"
                        defaultValue={skills}
                        clearable
                        value={skillsData}
                        onChange={setSkillsData}
                    />}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Experience */}
            <div className="px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Experience
                    <Tooltip label="Edit Experience" withArrow position="top">
                        <ActionIcon onClick={() => handleEdit(3)} size="lg" variant="subtle" aria-label="Settings">
                            {edit[3] ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                   {experience.map((exp, i) => (
                        <ExperienceCard key={i} {...exp} isEdit={edit[3]}  />
                    ))}
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Certifications */}
            <div className="px-4 sm:px-6 mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex justify-between">
                    Certifications
                    <Tooltip label="Edit Certification" withArrow position="top">
                        <ActionIcon onClick={() => handleEdit(4)} size="lg" variant="subtle" aria-label="Settings">
                            {edit[4] ? <IconDeviceFloppy className='h-4/5 w-4/5' stroke={1.5} /> : <IconPencil className='h-4/5 w-4/5' stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </h2>
                <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
                    {!edit[4] && certifications.map((cert, i) => (
                        <CertificationCard key={i} data={cert} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
