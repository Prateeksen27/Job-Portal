import { useState, useEffect } from 'react'
import { Text, Loader } from '@mantine/core'
import TalentCard from '../find-talent/TalentCard'
import { axiosInstance } from '../lib/axios'

interface RecommendedTalentProps {
    excludeProfileId?: string
}

const RecommenedTalent = ({ excludeProfileId }: RecommendedTalentProps) => {
    const [talents, setTalents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchRecommendedTalents()
    }, [excludeProfileId])

    const fetchRecommendedTalents = async () => {
        try {
            setLoading(true)
            
            // Build query params to exclude current profile
            const params = new URLSearchParams()
            if (excludeProfileId) {
                params.append('exclude', excludeProfileId)
            }
            params.append('limit', '5')
            
            const response = await axiosInstance.get(`/profiles/recommended?${params.toString()}`)
            setTalents(response.data.profiles || [])
        } catch (err: any) {
            console.error('Error fetching recommended talents:', err)
            setError('Failed to load recommendations')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="p-4">
                <div className="text-xl font-semibold mb-5">Recommended Talent</div>
                <div className="flex justify-center py-10">
                    <Loader color="bright-sun" size="sm" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="text-xl font-semibold mb-5">Recommended Talent</div>
                <Text c="dimmed" size="sm">{error}</Text>
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="text-xl font-semibold mb-5">Recommended Talent</div>

            {talents.length === 0 ? (
                <Text c="dimmed" size="sm">No recommended talents found</Text>
            ) : (
                <div className="flex flex-col gap-6">
                    {talents.map((talent: any, index: number) => (
                        <div key={talent._id || index} className="w-full">
                            <TalentCard data={talent} cardKey={index} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecommenedTalent
