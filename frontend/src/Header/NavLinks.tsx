import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const NavLinks = ({ mobile = false, onClick = () => {} }) => {
  const location = useLocation()
  const role = useAuthStore((state) => state.role)

  const jobSeekerLinks = [
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Job History', path: '/history' },
  ]

  const recruiterLinks = [
    { name: 'Find Talent', path: '/find-talent' },
    { name: 'Post Job', path: '/post-job' },
    { name: 'Posted Jobs', path: '/posted-jobs' },
  ]

  const links = role === 'RECRUITER' ? recruiterLinks : jobSeekerLinks

  return (
    <>
      {!mobile && (
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          {links.map((link, index) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={index}
                to={link.path}
                className={`relative pb-1 transition-all duration-300 ${
                  isActive
                    ? 'text-bright-sun-400'
                    : 'text-gray-300 hover:text-bright-sun-300'
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 
                    ${
                      isActive
                        ? 'bg-bright-sun-400'
                        : 'bg-transparent group-hover:bg-bright-sun-300'
                    }`}
                ></span>
              </Link>
            )
          })}
        </div>
      )}

      {mobile && (
        <div className="flex flex-col gap-4 text-lg font-medium">
          {links.map((link, index) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={index}
                to={link.path}
                onClick={onClick}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-bright-sun-400'
                    : 'text-gray-300 hover:text-bright-sun-300'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default NavLinks