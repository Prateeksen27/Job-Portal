
import { Link } from 'react-router-dom'

const PostedJobCard = (props: any) => {
  const jobId = props._id || props.id
  const jobTitle = props.jobTitle || props.title || 'Untitled Job'
  const location = props.location || 'Not specified'
  const posted = props.posted || (props.createdAt ? `${Math.floor((Date.now() - new Date(props.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago` : 'Unknown')
  const jobStatus = props.status || 'open'

  return (
    <Link to={`/posted-jobs/${jobId}`} className='block'>
      <div className='flex flex-col gap-1 rounded-lg p-4 bg-mine-shaft-900 border-l-2 border-l-bright-sun-400 hover:shadow-lg hover:shadow-bright-sun-400/20 transition-all cursor-pointer'> 
        <div className=' text-mine-shaft-300 font-semibold text-xl'>{jobTitle}</div>
        <div className='text-xs text-mine-shaft-300'>{location}</div>
        <div className='text-xs text-mine-shaft-300'>{posted}</div>
      </div>
    </Link>
  )
}

export default PostedJobCard
