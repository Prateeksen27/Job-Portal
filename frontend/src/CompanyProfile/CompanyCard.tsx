import React from 'react'
import { IconExternalLink, IconHeart } from '@tabler/icons-react'
import microsoft from '../assets/Icons/Microsoft.png'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
interface CompanyProps {
    name: string
    employees: number
    website?: string
    logo?: string
}

const CompanyCard = (props: any) => {
    const data = props.data
    return (
        <div className="bg-mine-shaft-900 p-4 w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-lg">
                        <img
                            src={microsoft} // fallback if no logo
                            className="h-8 w-8 object-contain"
                            alt={`${data.name} logo`}
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-sm">{data.name}</div>
                        <div className="text-xs text-mine-shaft-300">
                            {data.employees} Employees
                        </div>
                    </div>
                </div>
                <button className="p-1 hover:text-red-500 hover:cursor-pointer transition-colors">
                    <IconHeart size={18} />
                </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-4">
                <Link to={"/company-profile"} className="w-full md:w-auto">
                    <Button
                        fullWidth
                        color="bright-sun.4"
                        variant="light"
                        className="px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition"
                    >
                        <IconExternalLink size={16} className="mr-2" />
                        Visit
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CompanyCard
