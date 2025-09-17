import { Button, Divider } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Company from '../CompanyProfile/Company'
import SimilarCompanies from '../CompanyProfile/SimilarCompanies'

const CompanyPage = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
            <Divider mr="xs" size="sm" orientation="horizontal" className="self-stretch" />

            <Button
                onClick={() => navigate(-1)}
                variant="light"
                leftSection={<IconArrowLeft />}
                className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300 m-2"
            >
                Back
            </Button>

            {/* Responsive container */}
            <div className="flex flex-col justify-around  lg:flex-row gap-2 px-4 lg:px-8">
                {/* Company takes more space */}
                <div className="flex-1">
                    <Company />
                </div>

                {/* Similar companies on the side / below */}
                <div className="w-fit lg:w-[30%]">
                    <SimilarCompanies />
                </div>
            </div>
        </div>
    )
}

export default CompanyPage
