import React from 'react'
import dm from '../assets/Category/Digital Marketing.png'
import dd from '../assets/Category/Arts & Design.png'
const Card = (props : any) => {
  return (
    <div className="bg-mine-shaft-800 rounded-2xl p-6 w-72 text-center shadow-lg hover:scale-105 transition-transform">
          <div className="p-3 bg-bright-sun-300 rounded-full w-fit mx-auto">
            
            <img className="h-10 w-10" src={dm} alt="Digital Marketing" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-white">{props.title}</h3>
          <p className="mt-2 text-sm text-mine-shaft-300">
           {props.description}
          </p>
          <p className="mt-3 text-bright-sun-400 font-semibold">{props.jobs}+ Jobs Posted</p>
        </div>
  )
}

export default Card