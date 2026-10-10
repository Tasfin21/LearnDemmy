import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { register } from "../../utils/auth";

function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== password2) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true);

    const { error } = await register(fullName, email, password, password2)

    if (error) {
      alert(error)
      setIsLoading(false)
    } else {
      alert("Registration successful! You are now logged in.")
      navigate("/")
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex">
      
      <div className="
      w-full 
      lg:w-1/2 
      flex 
      items-center 
      justify-center 
      px-6 
      py-12 
      bg-white">
        <div className="w-full max-w-md">
          
          <div className="mb-10">
            <h1 className="
            text-2xl 
            font-bold 
            text-blue-600 
            tracking-tight">
              learndemmy
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create your account to get started.
            </p>

          </div>

          
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Create an account
          </h2>

          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full name
              </label>

              <input
                type="text"
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition"
              />
            </div>

            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address
              </label>

              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition"
              />

            </div>

            
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            
            <div>
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  type={showPassword2 ? "text" : "password"}
                  id="password2"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 text-sm"
                >
                  {showPassword2 ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                         text-white font-medium py-2.5 rounded-lg transition 
                         flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 
                         border border-gray-300 rounded-lg hover:bg-gray-50 
                         transition text-sm font-medium text-gray-700"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/Login/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

    
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1689005046800-38a1f4f47a51?q=80&w=1470&auto=format&fit=crop"
          alt="Abstract art"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </div>
  );
}

export default Register