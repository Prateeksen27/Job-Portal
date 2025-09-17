import React from 'react'

const PostedJobCard = (props:any) => {
  return (
    <div className='flex flex-col gap-1 rounded-lg p-4 bg-mine-shaft-900 border-l-2 border-l-bright-sun-400'> 
        <div className=' text-mine-shaft-300 font-semibold text-xl'>{props.jobTitle}</div>
        <div className='text-xs text-mine-shaft-300'>{props.location}</div>
        <div className='text-xs text-mine-shaft-300'>{props.posted}</div>
    </div>
  )
}

export default PostedJobCard
