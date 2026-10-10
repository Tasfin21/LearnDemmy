import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";


function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await apiInstance.get(`user/password-reset/${email}/`)
      alert("Password reset email sent. Please check your inbox.")
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="
    min-h-screen 
    flex 
    items-center 
    justify-center 
    bg-gray-50 
    px-4
    ">
      <div className="
      w-full 
      max-w-md 
      bg-white 
      rounded-2xl 
      shadow-sm 
      border 
      border-gray-100 
      p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">learndemmy</h1>
        </div>

        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot password?
          </h2>
          <p className="text-gray-500 text-sm">
            Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>

        
        <form onSubmit={handleEmailSubmit} className="space-y-5">
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
              className="
              w-full 
              px-4 
              py-2.5 
              rounded-lg 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="
            w-full 
            bg-blue-600 
            hover:bg-blue-700 
            disabled:bg-blue-400 
            text-white 
            font-medium 
            py-2.5 
            rounded-lg 
            transition 
            flex 
            items-center 
            justify-center 
            gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>

        
        <p className="mt-8 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/Login/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword;