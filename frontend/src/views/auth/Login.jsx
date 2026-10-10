import { useState } from "react";
import apiInstance from '../../utils/axios'

import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth" // update path if needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await login(email, password);

    setIsLoading(false);

    if (error) {
      alert(error);
      return;
    }

    // success
    if (isTeacher) {
      navigate("/instructor/dashboard/");
    } else {
      navigate("/student/dashboard/");
    }
  };

  
  return (
    <div className="min-h-screen flex">
      {/* left side login form --> */}
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
              Welcome back! Please enter your details.
            </p>
          </div>

          
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sign in to your account
          </h2>

          
          <form onSubmit={handleSubmit} className="space-y-5">
            
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
                  transition 
                  pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                  absolute 
                  right-3 
                  top-1/2 -translate-y-1/2 
                  text-gray-400 
                  hover:text-gray-600 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="
            flex 
            items-center 
            justify-between 
            text-sm">
              <label className="
              flex 
              items-center 
              gap-2 
              cursor-pointer">

                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 
                             focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>

              <Link
                to="/forgot-password/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* submit button here --> */}
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
                  Signing in...
                </>
              ) : (
                "Sign in"
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
            Don’t have an account?{" "}
            <Link
              to="/register/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
          alt="Abstract art"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="
        absolute 
        inset-0 
        bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </div>
  );
}

export default Login;