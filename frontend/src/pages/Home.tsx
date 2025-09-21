import React from 'react'
import DreamJob from '../LandingPage/DreamJob'
import Companies from '../LandingPage/Companies'
import JobCategory from '../LandingPage/JobCategory'
import Working from '../LandingPage/Working'
import Testimonials from '../LandingPage/Testimonials'
import Newsletter from '../LandingPage/NewsLetter'
const Home = () => {  
  return (
   <div className='w-full h-auto'>
   <DreamJob />
   <Companies />
   <JobCategory />
   <Working />
   <Testimonials />
   <Newsletter />

   </div>
  )
}

export default Home