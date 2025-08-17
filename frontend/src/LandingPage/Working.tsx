import React from 'react'
import girl from '../assets/Working/Girl.png'
import img2 from '../assets/Working/Build your resume.png'
import img3 from '../assets/Working/Apply for job.png'
import img4 from '../assets/Working/Get hired.png'

const steps = [
    {
        img: img2,
        title: "Build Your Resume",
        desc: "Create a professional profile to showcase your skills and experience."
    },
    {
        img: img3, // replace with actual images for other steps
        title: "Apply Effortlessly",
        desc: "Submit applications and track your progress easily."
    },
    {
        img: img4, // replace with actual images for other steps
        title: "Land Your Dream Job",
        desc: "Get noticed by recruiters and secure your ideal role."
    }
]

const Working = () => {
    return (
        <div className="text-center mt-20 px-6 w-full">
            <h1 className="text-3xl md:text-6xl font-semibold text-white leading-tight">
                How It <span className="text-bright-sun-400">Works</span>
            </h1>
            <p className="text-lg text-mine-shaft-300 mt-4 max-w-xl mx-auto">
                Effortlessly navigate through the process and land your dream job.
            </p>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12">
                <img src={girl} alt="Working girl" className="w-full md:w-[30rem] rounded-xl shadow-lg" />

                <div className="flex flex-col w-full max-w-xl mx-auto relative">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-6 m-2 bg-gradient-to-r from-mine-shaft-700 via-mine-shaft-800 to-mine-shaft-700 p-6 rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-500 relative">

                            <div className="relative flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bright-sun-500 to-bright-sun-300 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <img src={step.img} alt={step.title} className="w-12 h-12 object-contain" />
                                </div>
                               
                            </div>

                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                <p className="text-mine-shaft-300 mt-2 text-lg">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Working
