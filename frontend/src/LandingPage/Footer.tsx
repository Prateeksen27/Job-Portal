import { IconAnchor, IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & Brand */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <IconAnchor className="w-6 h-6 text-bright-sun-400 drop-shadow-lg" stroke={2.6} />
            <span className="text-bright-sun-400 text-2xl font-extrabold tracking-wide">TalentBridge</span>
          </div>
          <p className="text-mine-shaft-300 max-w-xs">
            Your one-stop platform to land your dream job effortlessly. Stay connected and grow with us.
          </p>
          <div className="flex gap-4 mt-2">
            <IconBrandFacebook className="w-6 h-6 text-bright-sun-400 hover:text-yellow-400 transition-colors" />
            <IconBrandTwitter className="w-6 h-6 text-bright-sun-400 hover:text-yellow-400 transition-colors" />
            <IconBrandInstagram className="w-6 h-6 text-bright-sun-400 hover:text-yellow-400 transition-colors" />
            <IconBrandLinkedin className="w-6 h-6 text-bright-sun-400 hover:text-yellow-400 transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-bright-sun-400 text-lg font-semibold">Quick Links</h3>
          <a href="#" className="text-mine-shaft-300 hover:text-bright-sun-400 transition-colors">Home</a>
          <a href="#" className="text-mine-shaft-300 hover:text-bright-sun-400 transition-colors">Jobs</a>
          <a href="#" className="text-mine-shaft-300 hover:text-bright-sun-400 transition-colors">About Us</a>
          <a href="#" className="text-mine-shaft-300 hover:text-bright-sun-400 transition-colors">Contact</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="text-bright-sun-400 text-lg font-semibold">Contact</h3>
          <p className="text-mine-shaft-300">Email: support@dreamjob.com</p>
          <p className="text-mine-shaft-300">Phone: +91 12345 67890</p>
          <p className="text-mine-shaft-300">Address: 123 Dream St, India</p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-mine-shaft-700 py-4 text-center text-mine-shaft-400 text-sm">
        &copy; 2025 DreamJob. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
