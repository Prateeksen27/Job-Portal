import React from 'react'
import DreamJob from '../LandingPage/DreamJob'
import Companies from '../LandingPage/Companies'
import JobCategory from '../LandingPage/JobCategory'
import Header from '../Header/Header'
import Working from '../LandingPage/Working'
import Testimonials from '../LandingPage/Testimonials'
import Newsletter from '../LandingPage/NewsLetter'
import Footer from '../LandingPage/Footer'

const Home = () => {
  return (
   <div className='w-full h-auto bg-mine-shaft-950 font-[Poppins]'>
   <Header />
   <DreamJob />
   <Companies />
   <JobCategory />
   <Working />
   <Testimonials />
   <Newsletter />
   <Footer />
   </div>
  )
}

export default Home