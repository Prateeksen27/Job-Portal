import { Avatar } from '@mantine/core';
import boy from '../assets/avatar.png';
import {
  IconAnchor,
  IconBell,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import NavLinks from './NavLinks';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { MenuComponent } from '../Components/Menu';

const Header = () => {
  const { logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-mine-shaft-950 text-white shadow-md border-b border-white/10 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 h-20">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <IconAnchor
            className="w-8 h-8 sm:w-10 sm:h-10 text-bright-sun-400 drop-shadow-lg"
            stroke={2.6}
          />
          <Link
            to="/"
            className="text-bright-sun-400 text-2xl sm:text-3xl font-extrabold tracking-wide"
          >
            TalentBridge
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavLinks mobile={false} onClick={() => setMobileOpen(false)} />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Menu Dropdown (User Avatar, Profile, etc.) */}
          <MenuComponent />

          {/* Notifications */}
          <button className="hidden sm:flex p-2 rounded-full hover:bg-mine-shaft-800/70 transition">
            <IconBell stroke={1.5} />
          </button>

          {/* Settings */}
          <button className="hidden sm:flex p-2 rounded-full hover:bg-mine-shaft-800/70 transition">
            <IconSettings stroke={1.5} />
          </button>

          {/* Logout (hidden on mobile) */}
          <button
            onClick={logout}
            className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm sm:text-base font-medium shadow-md transition"
          >
            <IconLogout size={18} stroke={2} />
            Logout
          </button>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              className="p-2 rounded-md hover:bg-mine-shaft-800/70 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden flex flex-col gap-4 px-6 py-4 bg-mine-shaft-900 border-t border-white/10
                     animate-slideDown"
        >
          <NavLinks mobile={true} onClick={() => setMobileOpen(false)} />
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium shadow-md transition"
          >
            <IconLogout size={18} stroke={2} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
