import React, { useState } from "react";
import { IconAnchor, IconEye, IconEyeOff } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { em } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUserName] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const {signUp} = useAuthStore()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !username) {
            toast.error("Fill all fields!");
        } else {
          signUp(username,email,password)
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Form Side */}
            <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-20 bg-white">
                <h1 className="text-3xl font-bold mb-2 text-mine-shaft-900">
                    Sign Up
                </h1>
                <p className="text-mine-shaft-500 mb-8">
                    Get Job ready with us!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                     <div>
                        <label className="block text-mine-shaft-700 mb-1">UserName *</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full rounded-lg border border-mine-shaft-300 p-3 focus:outline-none focus:ring-2 focus:ring-bright-sun-400"
                        />
                    </div>
                    <div>
                        <label className="block text-mine-shaft-700 mb-1">Email *</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-mine-shaft-300 p-3 focus:outline-none focus:ring-2 focus:ring-bright-sun-400"
                        />
                    </div>

                    <div>
                        <label className="block text-mine-shaft-700 mb-1">Password *</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-mine-shaft-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-bright-sun-400"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-mine-shaft-500"
                            >
                                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-bright-sun-400 hover:bg-bright-sun-500 text-mine-shaft-900 font-semibold py-3 rounded-lg transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-mine-shaft-500 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-bright-sun-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>

            {/* Right Branding Side */}
            <div className="hidden md:flex w-1/2 bg-mine-shaft-900 relative items-center justify-center">
                <div className="text-center px-8">
                    <div className="flex items-center gap-2">
                        <IconAnchor className="w-10 h-10 text-bright-sun-400 drop-shadow-lg" stroke={2.6} />
                        <h1 className="text-white font-bold text-3xl">Welcome to <span className="text-bright-sun-400 text-3xl font-extrabold tracking-wide">DreamJob</span></h1>
                    </div>
                    <p className="text-mine-shaft-300">
                        Find your dream job with us
                    </p>
                </div>
            </div>
        </div>
    );
}
