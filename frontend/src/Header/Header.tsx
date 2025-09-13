import { Avatar } from '@mantine/core'
import {
  IconAnchor,
  IconBell,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconX,
} from '@tabler/icons-react'
import boy from '../assets/avatar.png'
import React, { useState } from 'react'
import NavLinks from './NavLinks'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const Header = () => {
  const { logout, user } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full bg-mine-shaft-950 text-white shadow-md border-b border-white/10">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 h-20">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <IconAnchor
            className="w-8 h-8 sm:w-10 sm:h-10 text-bright-sun-400 drop-shadow-lg"
            stroke={2.6}
          />
          <span className="text-bright-sun-400 text-2xl sm:text-3xl font-extrabold tracking-wide">
            <Link to={'/'}>TalentBridge</Link>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex">
          <NavLinks mobile={false} onClick={() => setMobileOpen(false)}  />
        </div>


        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* User */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-mine-shaft-900/50 border border-mine-shaft-700 cursor-pointer hover:border-bright-sun-400 transition">
            <Avatar
              className="w-8 h-8 rounded-full overflow-hidden"
              src={boy}
              alt="it's me"
            />
            <span className="text-mine-shaft-300 hover:text-white transition font-medium">
              {user.username}
            </span>
          </div>

          {/* Notifications */}
          <div className="hidden sm:flex p-2 rounded-full cursor-pointer hover:bg-mine-shaft-800/70 transition">
            <IconBell stroke={1.5} />
          </div>

          {/* Settings */}
          <div className="hidden sm:flex p-2 rounded-full cursor-pointer hover:bg-mine-shaft-800/70 transition">
            <IconSettings stroke={1.5} />
          </div>

          {/* Logout (hidden on mobile) */}
          <button
            onClick={logout}
            className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm sm:text-base font-medium shadow-md transition"
          >
            <IconLogout size={18} stroke={2} />
            Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-mine-shaft-800/70 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden flex flex-col gap-4 px-6 py-4 bg-mine-shaft-900 border-t border-white/10
               animate-slideDown"
        >
          <NavLinks mobile={true} onClick={() => setMobileOpen(false)} />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-mine-shaft-900/50 border border-mine-shaft-700">
              <Avatar
                className="w-8 h-8 rounded-full overflow-hidden"
                src={boy}
                alt="it's me"
              />
              <span className="text-mine-shaft-300 font-medium">{user.username}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium shadow-md transition"
            >
              <IconLogout size={18} stroke={2} />
              Logout
            </button>
          </div>
        </div>
      )}

    </header>
  )
}

export default Header
