import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLinks = () => {
  const location = useLocation();

  const links = [
    { name: "Find Jobs", path: "/find-jobs" },
    { name: "Find Talent", path: "/find" },
    { name: "Upload Job", path: "/upload-job" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <div className="hidden md:flex items-center gap-8 text-lg font-medium">
      {links.map((link, index) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={index}
            to={link.path}
            className={`relative pb-1 transition-all duration-300
              ${isActive ? "text-bright-sun-400" : "text-gray-300 hover:text-bright-sun-300"}
            `}
          >
            {link.name}
            {/* underline animation */}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 
                ${isActive ? "bg-bright-sun-400" : "bg-transparent group-hover:bg-bright-sun-300"}
              `}
            ></span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
