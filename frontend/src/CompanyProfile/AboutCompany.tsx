import React from 'react'
import { companyData } from '../assets/Data/Company'

const AboutCompany = () => {
    const company: { [key: string]: any } = companyData

    return (
        <div className="p-4 text-mine-shaft-300">
            {Object.keys(company).map((key, index) => {
                if (key === 'Name') return null

                return key === 'Website' ? (
                    <div key={index} className="mb-4 flex flex-col gap-5">
                        <div>
                            <div className="text-xl font-semibold">{key}</div>
                            <a
                                href={company[key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-justify text-bright-sun-400 hover:underline"
                            >
                                {company[key]}
                            </a>
                        </div>
                    </div>
                ) : (
                    <div key={index} className="mb-4 flex flex-col gap-5">
                        <div>
                            <div className="text-xl font-semibold">{key}</div>
                            <div className="text-justify mt-2">
                                {key !== 'Specialties'
                                    ? company[key]
                                    : company[key].map((item: string, i: number) => (
                                        <span
                                            key={i}
                                            className="inline-block bg-bright-sun-300 text-xs sm:text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 mr-2 mb-2"
                                        >
                                            {item}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AboutCompany
