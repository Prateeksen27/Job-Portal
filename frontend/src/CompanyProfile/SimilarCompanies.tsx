import { useState, useEffect } from 'react'
import CompanyCard from './CompanyCard'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const SimilarCompanies = () => {
    const [companies, setCompanies] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${API_URL}/profiles/companies`)
                const data = await response.json()
                if (response.ok) {
                    const companyNames = data.companies || []
                    setCompanies(companyNames.slice(0, 4).map((name: string) => ({ name, employees: 0 })))
                }
            } catch (err) {
                console.error('Failed to fetch companies')
            } finally {
                setLoading(false)
            }
        }
        fetchCompanies()
    }, [])

    return (
        <div className="p-4 mx-auto">
            {/* Title */}
            <div className="text-xl font-semibold mb-5">Similar Companies</div>

            {/* Show only first 3 */}
            <div className="flex flex-col gap-6">
                {loading ? (
                    <p>Loading...</p>
                ) : companies.length === 0 ? (
                    <p>No similar companies found</p>
                ) : (
                    companies.map((simi, index) => (
                        <div key={index} className="w-full">
                            <CompanyCard data={simi} cardKey={index} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default SimilarCompanies