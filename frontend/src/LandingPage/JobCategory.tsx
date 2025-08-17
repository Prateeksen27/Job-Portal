import React from 'react'
import Card from '../Components/Card'
import { Carousel } from '@mantine/carousel'
import { jobCategory } from '../assets/Data/Data'

const JobCategory = () => {
  return (
    <div className="text-center mt-20 px-6 w-full">
      <h1 className="text-3xl md:text-6xl font-semibold text-white leading-tight">
        Browse <span className="text-bright-sun-400">100+ </span> Job Categories
      </h1>
      <p className="text-lg text-mine-shaft-300 mt-4 max-w-xl mx-auto">
        Explore a wide range of job categories tailored to your skills and interests.
      </p>

      {/* Full-width Category Carousel */}
      <div className="mt-12 w-full">
        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '25%' }} // 4 cards per row on desktop
          height="auto"
          slideGap="lg"
          controlSize={35}
          withControls
          withIndicators={false}
          className="w-full" // removed max-w constraint
          emblaOptions={{
            loop: true,
            dragFree: true,
            align: 'start'
          }}
        >
          {jobCategory.map((job, index) => (
            <Carousel.Slide key={index} className="flex justify-center hover:cursor-pointer">
              <Card
                title={job.name}
                description={job.desc}
                jobs={job.jobs}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
export default JobCategory