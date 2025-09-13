import React from 'react'
import banner from './../assets/Profile/banner.jpg'
import avtar from './../assets/avatar1.png'
import { IconBriefcase2, IconMapPin } from '@tabler/icons-react'
import { Button, Divider } from '@mantine/core'
import ExperienceCard from './ExperienceCard'
import CertificationCard from './CertificationCard'
import { useParams } from 'react-router-dom'
import { profile } from '../assets/Data/TalentData'

const Profile = () => {
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

  return (
    <div className="w-full sm:w-5/6 lg:w-2/3 mx-auto">
      {/* Banner + Avatar */}
      <div className="relative">
        <img
          className="w-full h-48 sm:h-64 md:h-72 object-cover"
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            {name}
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
          {role} • {company}
        </div>
        <div className="flex gap-2 text-sm sm:text-md items-center mt-1 text-mine-shaft-300 flex-wrap">
          <IconMapPin className="h-5 w-5 text-bright-sun-400" /> {location}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* About */}
      <div className="px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
          About
        </h2>
        <p className="text-mine-shaft-300 text-sm sm:text-base text-justify leading-relaxed">
          {about}
        </p>
      </div>

      <Divider size="xs" my="xl" />

      {/* Skills */}
      <div className="px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="bg-bright-sun-300 text-xs sm:text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* Experience */}
      <div className="px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
          Experience
        </h2>
        <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
          {experience.map((exp, i) => (
            <ExperienceCard key={i} data={exp} />
          ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* Certifications */}
      <div className="px-4 sm:px-6 mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
          Certifications
        </h2>
        <div className="space-y-4 sm:space-y-6 bg-mine-shaft-900 rounded-xl p-4 sm:p-6">
          {certifications.map((cert, i) => (
            <CertificationCard key={i} data={cert} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
