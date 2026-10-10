import { useState, useEffect } from "react"
import apiInstance from "../../utils/axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
// import { useNavigate, useSearchParams } from "react-router-dom"
import Toast from '../plugin/Toast'

function CreateNewPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const otp = searchParams.get("otp")
  const uuidb64 = searchParams.get("uuidb64")
  const refresh_token = searchParams.get("refresh_token")

  const handleCreatePassword = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      Toast().fire({
        icon: "warning",
        title: "Passwords do not match",
      });
      return
    }

    if (password.length < 6) {
      Toast().fire({
        icon: "warning",
        title: "Password must be at least 6 characters",
      })
      return
    }

    setIsLoading(true)

    const formdata = new FormData()
    formdata.append("password", password)
    formdata.append("otp", otp)
    formdata.append("uuidb64", uuidb64)
    formdata.append("refresh_token", refresh_token)

    try {
      const res = await apiInstance.post(`user/password-change/`, formdata);

      Toast().fire({
        icon: "success",
        title: res.data.message || "Password changed successfully",
      });

      navigate("/login/");
    } catch (error) {
      console.error(error);
      Toast().fire({
        icon: "error",
        title: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="
    min-h-screen 
    flex 
    items-center 
    justify-center 
    bg-gray-50 
    px-4">
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
            Create new password
          </h2>
          <p className="text-gray-500 text-sm">
            Choose a strong password for your account.
          </p>
        </div>

        
        <form onSubmit={handleCreatePassword} className="space-y-5">
          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              New password
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
              htmlFor="confirmPassword"
              className="
              block 
              text-sm 
              font-medium 
              text-gray-700 
              mb-1.5"
            >
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                           hover:text-gray-600 text-sm"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                       text-white font-medium py-2.5 rounded-lg transition 
                       flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "Save new password"
            )}
          </button>
        </form>

        
        <p className="mt-8 text-center text-sm text-gray-600">
          <Link
            to="/Login/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateNewPassword