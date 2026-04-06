import { useState, useEffect } from 'react'
import { Divider } from '@mantine/core'
import TalentCard from './TalentCard'
import { axiosInstance } from '../lib/axios'
import { TalentFilters } from './SearchBar'

const Talents = ({ filters }: { filters?: TalentFilters }) => {
  const [talents, setTalents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchTalents = async () => {
      try {
        setLoading(true)
        setError('')
        
        const params = new URLSearchParams()
        
        if (filters) {
          if (filters.search) params.append('search', filters.search)
          if (filters.jobTitle) params.append('jobTitle', filters.jobTitle)
          if (filters.location) params.append('location', filters.location)
          if (filters.skills) params.append('skills', filters.skills)
          if (filters.salaryMin && filters.salaryMin > 0) params.append('salaryMin', filters.salaryMin.toString())
          if (filters.salaryMax && filters.salaryMax < 200000) params.append('salaryMax', filters.salaryMax.toString())
          if (filters.sortBy && filters.sortBy !== 'relevance') params.append('sortBy', filters.sortBy)
        }
        
        const queryString = params.toString()
        const url = `/profiles/talents${queryString ? `?${queryString}` : ''}`
        
        const response = await axiosInstance.get(url)
        
        if (mounted && response.status === 200) {
          setTalents(response.data.profiles || [])
        }
      } catch (err: any) {
        if (mounted) {
          console.error('Error fetching talents:', err)
          setError(err.response?.data?.message || 'Failed to connect to server')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchTalents()

    return () => {
      mounted = false
    }
  }, [filters])

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Talents</h2>
      </div>
      <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />

      <div className="w-full flex flex-wrap gap-6 flex-1 p-6 justify-center md:justify-start">
        {loading ? (
          <p>Loading talents...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : talents.length === 0 ? (
          <p>No talents found</p>
        ) : (
          talents.map((profile: any, index: number) => (
            <TalentCard key={profile._id || index} data={profile} cardKey={index} />
          ))
        )}
      </div>
    </div>
  )
}

export default Talents
