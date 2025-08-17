import React from 'react'
import boy from '../assets/Boy.png'
import { Avatar, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import ava1 from '../assets/avatar.png'
import ava2 from '../assets/avatar1.png'
import ava3 from '../assets/avatar2.png'
import google from '../assets/Icons/Google.png'

const DreamJob = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-20">

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Your <span className="text-bright-sun-400 drop-shadow-md">Dream Job</span> Awaits 🚀
          </h1>
          <p className="text-lg text-gray-300 mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Explore opportunities that match your skills and passion.
            Let’s find a career path that excites and inspires you.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch 
                bg-mine-shaft-900/70 rounded-2xl p-4 shadow-2xl 
                backdrop-blur-lg border border-mine-shaft-800 
                hover:border-bright-sun-400/40 transition-all duration-300">

            {/* Job Search Input */}
            <div className="flex items-center flex-1 bg-mine-shaft-800/80 rounded-xl px-4 py-3 
                  border border-transparent focus-within:border-bright-sun-400 
                  focus-within:ring-2 focus-within:ring-bright-sun-300/40 
                  transition-all duration-300">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search for jobs..."
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>

            {/* Job Type Input */}
            <div className="flex items-center flex-1 bg-mine-shaft-800/80 rounded-xl px-4 py-3 
                  border border-transparent focus-within:border-bright-sun-400 
                  focus-within:ring-2 focus-within:ring-bright-sun-300/40 
                  transition-all duration-300">
              <span className="text-gray-400 mr-2">💼</span>
              <input
                type="text"
                placeholder="Full Time, Part Time, Internship"
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="flex items-center justify-center 
                     bg-bright-sun-400 text-mine-shaft-900 font-semibold 
                     px-8 py-3 rounded-xl shadow-lg 
                     hover:bg-bright-sun-300 hover:shadow-bright-sun-400/40 
                     hover:scale-105 active:scale-95 
                     transition-all duration-300">
              <IconSearch stroke={1.5} className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>

        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center relative w-full">
          {/* Glow */}
          <div className="absolute -z-10 w-96 h-96 bg-bright-sun-400/20 blur-3xl rounded-full animate-pulse"></div>

          {/* Main Image */}
          <img
            src={boy}
            alt="Dream Job"
            className="w-full max-w-md drop-shadow-2xl animate-fadeInUp"
          />

          {/* Social Proof Badge */}
          <div className="absolute bottom-6 right-4 md:right-8 bg-mine-shaft-900/80 backdrop-blur-xl border border-mine-shaft-800 shadow-2xl rounded-2xl px-5 py-3 flex flex-col items-center gap-2 w-max animate-fadeInUp md:bottom-8">
            <div className="text-white text-sm md:text-base font-semibold">
              <span className="text-bright-sun-400 font-bold">10k+</span> got their dream job
            </div>

          </div>

          {/* Floating Job Card */}
          <div className="absolute -left-3">
            <div className="flex gap-3 items-center bg-mine-shaft-900/95 border border-mine-shaft-800 rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition">
              <img src={google} alt="" className="w-12 h-12 rounded-xl object-cover shadow-md" />
              <div className="text-sm text-white">
                <div className="font-semibold">Software Engineer</div>
                <div className="text-mine-shaft-300 text-xs">Hyderabad</div>
              </div>
            </div>
            <div className="flex justify-between mt-3 text-xs text-mine-shaft-200 gap-2">
              <span className="bg-mine-shaft-800/80 px-3 py-1 rounded-lg">1 Day ago</span>
              <span className="bg-mine-shaft-800/80 px-3 py-1 rounded-lg">120+ Applicants</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default DreamJob
