import { Avatar, Rating } from '@mantine/core'
import React from 'react'
import Marquee from 'react-fast-marquee'
import boy from '../assets/avatar1.png'

const testimonials = [
  {
    name: "Sahiti Moningi",
    img: boy,
    rating: 4.5,
    text: "This platform helped me land my dream job effortlessly. The process is smooth and intuitive!"
  },
  {
    name: "Rahul Sharma",
    img: boy,
    rating: 5,
    text: "Amazing experience! The support team is responsive and the interface is so easy to use."
  },
  {
    name: "Ananya Singh",
    img: boy,
    rating: 4,
    text: "Highly recommend to anyone looking for career growth. The workflow is extremely user-friendly."
  },
    {
    name: "Rahul Sharma",
    img: boy,
    rating: 5,
    text: "Amazing experience! The support team is responsive and the interface is so easy to use."
  },
  {
    name: "Ananya Singh",
    img: boy,
    rating: 4,
    text: "Highly recommend to anyone looking for career growth. The workflow is extremely user-friendly."
  }
]

const Testimonials = () => {
  return (
    <div className="text-center mt-20 px-6 w-full">
      <h1 className="text-3xl md:text-6xl font-semibold text-white leading-tight">
        What Users <span className="text-bright-sun-400">Say</span> About Us
      </h1>
      <p className="text-lg text-mine-shaft-300 mt-4 max-w-xl mx-auto">
        We are proud of our customers who have been with us for years.
      </p>

      <div className="mt-12">
        <Marquee speed={50} gradient={false} pauseOnHover>
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-mine-shaft-700 p-4 rounded-2xl shadow-xl mx-3 flex flex-col items-center w-[20rem] transform hover:scale-105 transition-transform duration-300"
            >
                <div className='flex gap-2 justify-start items-start'>
              <div className="p-1 rounded-full bg-gradient-to-br from-bright-sun-500 to-bright-sun-300 shadow-lg mb-3">
                <Avatar src={t.img} radius="xl" size="md" />
              </div>
              <div className='flex flex-col'>
              <h3 className="text-white text-lg font-semibold">{t.name}</h3>
              <Rating value={t.rating} fractions={2} readOnly className="my-1" />
              </div>
              </div>
              <p className="text-mine-shaft-300 text-center mt-1 text-sm">{t.text}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default Testimonials
