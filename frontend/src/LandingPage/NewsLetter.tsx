import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <div className="bg-mine-shaft-800 py-16 px-6 text-center rounded-3xl shadow-2xl mt-20 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold text-white">
        Never Miss the <span className="text-bright-sun-400">Job Updates!</span>
      </h2>
      <p className="text-mine-shaft-300 mt-4 max-w-xl mx-auto text-lg">
        Stay updated with the latest news, features, and special offers. Never miss an update!
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:w-80 px-4 py-3 rounded-full bg-mine-shaft-700 text-white placeholder-mine-shaft-300 focus:outline-none focus:ring-2 focus:ring-bright-sun-400 transition-all duration-300"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-bright-sun-400 text-mine-shaft-900 font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
