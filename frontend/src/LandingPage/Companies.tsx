import React from 'react'
import Marquee from 'react-fast-marquee'
import amazon from '../assets/Companies/Amazon.png'
import google from '../assets/Companies/Google.png'
import microsoft from '../assets/Companies/Microsoft.png'
import meta from '../assets/Companies/Meta.png'
import netflix from '../assets/Companies/Netflix.png'
import figma from '../assets/Companies/Figma.png'
import oracle from '../assets/Companies/Oracle.png'
import pinterest from '../assets/Companies/Pinterest.png'
import slack from '../assets/Companies/Slack.png'
import walmart from '../assets/Companies/Walmart.png'


const Companies = () => {
  const logosRow1 = [google, microsoft, meta, oracle, netflix]
  const logosRow2 = [amazon, figma, pinterest, slack, walmart]

  return (
    <div className="mt-20 px-6">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-mine-shaft-100">
          Trusted By Over <span className="text-bright-sun-400">1000+</span> Companies
        </h2>
        <p className="mt-2 text-mine-shaft-400 text-lg">
          From startups to tech giants, professionals around the world trust us.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {/* First Row */}
        <Marquee speed={50} gradient={false} pauseOnHover className="flex items-center">
          {logosRow1.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Company ${idx}`}
              className="mx-6 h-14 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
            />
          ))}
        </Marquee>

        {/* Second Row (reverse) */}
        <Marquee speed={60} gradient={false} pauseOnHover direction="right" className="flex items-center">
          {logosRow2.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Company ${idx}`}
              className="mx-6 h-14 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
            />
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default Companies
