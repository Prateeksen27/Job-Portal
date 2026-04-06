import JobCard from '../find-jobs/JobCard'

const CompanyJobs = ({ jobs }: { jobs?: any[] }) => {
  const jobList = jobs || []
  
  return (
    <div className="w-full p-4 flex flex-wrap gap-3 justify-center md:justify-start">
         {jobList.length === 0 ? (
           <p>No jobs available</p>
         ) : (
           jobList.slice(0, 6).map((list: any, index: number) => (
             <JobCard list={list} key={list._id || index} />
           ))
         )}
    </div>
  )
}

export default CompanyJobs