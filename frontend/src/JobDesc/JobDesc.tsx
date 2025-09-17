import { IconAdjustments, IconArrowUp, IconExternalLink, IconHeart, IconMapPin } from '@tabler/icons-react'
import React from 'react'
import microsoft from '../assets/Icons/Microsoft.png'
import { ActionIcon, Button, Divider } from '@mantine/core'
import { Link } from 'react-router-dom'
import { card, desc, skills } from '../assets/Data/JobDescData'
import DOMPurify from 'dompurify';
const JobDesc = (props: any) => {
    const clean = DOMPurify.sanitize(desc);
    return (
        <div id='hello' className="w-full lg:w-2/3  p-6">
            {/* Header Row */}
            <div className="flex justify-between items-start">
                {/* Left: Logo + Title */}
                <div className="flex gap-4">
                    {/* Company Logo */}
                    <div className="p-4 bg-mine-shaft-800 rounded-xl flex items-center justify-center">
                        <img
                            src={microsoft}
                            className="h-14 w-14 object-contain"
                            alt="Company logo"
                        />
                    </div>

                    {/* Job Info */}
                    <div>
                        <div className="font-semibold text-2xl text-white">
                            Software Engineer
                        </div>
                        <div className="text-sm text-mine-shaft-300 mt-1">
                            Google • <span className="text-bright-sun-400">120 Applicants</span>
                        </div>
                    </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex flex-col items-center gap-3">
                    {
                        props.edit ?<div className='flex items-center gap-2 [&_button]:w-32'> <Button
                            color="bright-sun.4"
                            variant="light"
                        >
                            Edit
                        </Button> <Button
                            color="red"
                            variant="outline"
                        >
                            Delete
                        </Button></div>: <><Link to={"/apply-job"} >
                            <Button
                                color="bright-sun.4"
                                variant="light"
                            >
                                Apply Now
                            </Button>
                        </Link>
                            <button className="p-2 rounded-full border border-mine-shaft-700 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 transition">
                                <IconHeart size={20} />
                            </button>
                        </>
                    }

                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div className='flex justify-between'>
                {
                    card.map((c, index) => {
                        return (
                            <div className='flex flex-col items-center gap-1' key={index}>
                                <ActionIcon variant="light" color="bright-sun.4" className='!h-12 !w-12' radius="xl" aria-label="Settings">
                                    <c.icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                                <div className='text-mine-shaft-300 text-sm'>
                                    {c.name}
                                </div>
                                <div className='font-semibold'>
                                    {c.value}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <Divider size="xs" my="xl" />
            <div>
                <div className='text-xl font-semibold mb-5'>Required Skills</div>
                <div className='flex flex-wrap gap-3'>
                    {
                        skills.map((s, index) => {
                            return (
                                <ActionIcon key={index} p="xs" variant="light" color="bright-sun.4" className='!h-fit !w-fit font-medium' radius="xl" aria-label="Settings">
                                    {s}
                                </ActionIcon>
                            )
                        })
                    }

                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div>
                <div className='text-xl font-semibold mb-5'>Job Description</div>
                <div className='text-mine-shaft-300 leading-7'>
                    <div
                        className="[&_*]:text-mine-shaft-300 [&_li]:mb-1 [&_li]:marker:text-bright-sun-400 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:my-3 [&_h4]:text-mine-shaft-200 [&_p]:text-justify "
                        dangerouslySetInnerHTML={{ __html: clean }}
                    />
                </div>
            </div>
            <Divider size="xs" my="xl" />
            <div>

                <div>
                    <div className="text-xl font-semibold mb-5">Who we are ?</div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-mine-shaft-900 p-6 rounded-2xl shadow-lg">
                        {/* Left: Logo + Title */}
                        <div className="flex flex-col sm:flex-row gap-5 w-full md:w-2/3">
                            {/* Company Logo */}
                            <div className="p-5 h-fit w-fit bg-mine-shaft-800 rounded-2xl shadow-md flex-shrink-0">
                                <img
                                    src={microsoft}
                                    className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                                    alt="Company logo"
                                />
                            </div>

                            {/* Job Info */}
                            <div className="flex flex-col gap-2">
                                <div className="font-semibold text-xl sm:text-2xl text-white">
                                    Microsoft
                                </div>
                                <div className="text-sm text-mine-shaft-300">10K+ Employees</div>
                                <div className="text-sm text-mine-shaft-300 flex items-center gap-1">
                                    <IconMapPin size={16} className="text-bright-sun-400" /> Hyderabad,
                                    India
                                </div>
                                <p className="text-sm text-mine-shaft-300 leading-relaxed mt-2">
                                    <span className="font-semibold text-white">About Us:</span> Microsoft
                                    is a global technology company that develops, licenses, and supports a
                                    wide range of software products, services, and devices. Founded in
                                    1975 by Bill Gates and Paul Allen, Microsoft is known for its Windows
                                    operating system, Office productivity suite, and Azure cloud computing
                                    platform. The company is committed to innovation and empowering
                                    individuals and organizations worldwide through technology.
                                </p>
                            </div>
                        </div>

                        {/* Right: Action Button */}
                        <div className="w-full md:w-auto flex md:justify-end">
                            <Link to={"/company-profile"} className="w-full md:w-auto">
                                <Button
                                    fullWidth
                                    color="bright-sun.4"
                                    variant="light"
                                    className="px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition"
                                >
                                    <IconExternalLink size={16} className="mr-2" />
                                    Visit Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default JobDesc
