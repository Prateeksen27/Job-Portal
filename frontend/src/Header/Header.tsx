import { Avatar } from '@mantine/core'
import { IconAnchor, IconBell, IconSettings, IconLogout } from '@tabler/icons-react'
import boy from '../assets/avatar.png'
import React from 'react'
import NavLinks from './NavLinks'
import { useAuthStore } from '../store/useAuthStore'

const Header = () => {
  const {logout,user} = useAuthStore()
  return (
    <div className="w-full h-28 bg-mine-shaft-950 text-white flex justify-between items-center px-10 shadow-md border-b border-white/10">

      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <IconAnchor className="w-10 h-10 text-bright-sun-400 drop-shadow-lg" stroke={2.6} />
        <span className="text-bright-sun-400 text-3xl font-extrabold tracking-wide">TalentBridge</span>
      </div>

      <NavLinks />

      {/* User Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-mine-shaft-900/50 border border-mine-shaft-700 cursor-pointer hover:border-bright-sun-400 transition">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden" src={boy} alt="it's me" />
          <span className="text-mine-shaft-300 hover:text-white transition font-medium">{user.username}</span>
        </div>

        {/* Fixed Notification Bell with Indicator */}
        <div className="p-2 rounded-full cursor-pointer hover:bg-mine-shaft-800/70 transition">
          <IconBell stroke={1.5} />
        </div>

        <div className="p-2 rounded-full cursor-pointer hover:bg-mine-shaft-800/70 transition">
          <IconSettings stroke={1.5} />
        </div>

        {/* Logout Button */}
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium shadow-md transition">
          <IconLogout size={18} stroke={2} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
