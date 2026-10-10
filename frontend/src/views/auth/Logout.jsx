import { useEffect } from "react";
import { logout } from "../../utils/auth";
import { Link } from "react-router-dom";


function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="
    min-h-screen 
    flex 
    items-center 
    justify-center 
    bg-gray-50 px-4">
      <div className="
      w-full 
      max-w-md 
      bg-white 
      rounded-2xl 
      shadow-sm border 
      border-gray-100 
      p-8 
      text-center">
        
        <h1 className="text-2xl font-bold text-blue-600 mb-6">learndemmy</h1>

        
        <div className="
        w-16 
        h-16 
        bg-blue-50 
        text-blue-600 
        rounded-full 
        flex 
        items-center 
        justify-center 
        mx-auto 
        mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          You have been logged out
        </h2>

        <p className="text-gray-500 mb-8">
          Thanks for visiting. Come back anytime!
        </p>

        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/Login/"
            className="
            flex-1 
            bg-blue-600 
            hover:bg-blue-700 
            text-white 
            font-medium 
            py-2.5 
            rounded-lg 
            transition 
            text-center"
          >
            Sign in
          </Link>
          <Link
            to="/Register/"
            className="
            flex-1 
            border 
            border-gray-300 
            hover:bg-gray-50 
            text-gray-700 
            font-medium 
            py-2.5 
            rounded-lg 
            transition 
            text-center"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;