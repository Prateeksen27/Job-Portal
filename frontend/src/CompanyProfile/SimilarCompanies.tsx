import React from 'react'
import { similar } from '../assets/Data/Company'
import CompanyCard from './CompanyCard'

const SimilarCompanies = () => {
    return (
        <div className="p-4 mx-auto">
            {/* Title */}
            <div className="text-xl font-semibold mb-5">Similar Companies</div>

            {/* Show only first 3 */}
            <div className="flex flex-col gap-6">
                {similar.slice(0, 4).map((simi, index) => (
                    <div key={index} className="w-full">
                        <CompanyCard data={simi} cardKey={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SimilarCompanies