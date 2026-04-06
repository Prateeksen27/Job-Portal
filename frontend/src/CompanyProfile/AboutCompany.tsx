const AboutCompany = ({ company }: { company?: any }) => {
    if (!company) {
        return <div className="p-4">No company data available</div>
    }

    const companyFields = [
        { key: 'industry', label: 'Industry' },
        { key: 'website', label: 'Website', isLink: true },
        { key: 'size', label: 'Size' },
        { key: 'headquarters', label: 'Headquarters' },
        { key: 'description', label: 'About' },
        { key: 'specialties', label: 'Specialties', isArray: true }
    ]

    return (
        <div className="p-4 text-mine-shaft-300">
            {companyFields.map(({ key, label, isLink, isArray }) => {
                const value = company[key]
                if (!value) return null

                return (
                    <div key={key} className="mb-4 flex flex-col gap-5">
                        <div>
                            <div className="text-xl font-semibold">{label}</div>
                            {isLink ? (
                                <a
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-justify text-bright-sun-400 hover:underline"
                                >
                                    {value}
                                </a>
                            ) : isArray ? (
                                <div className="text-justify mt-2">
                                    {Array.isArray(value) ? value.map((item: string, i: number) => (
                                        <span
                                            key={i}
                                            className="inline-block bg-bright-sun-300 text-xs sm:text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 mr-2 mb-2"
                                        >
                                            {item}
                                        </span>
                                    )) : value}
                                </div>
                            ) : (
                                <div className="text-justify mt-2">{value}</div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AboutCompany
