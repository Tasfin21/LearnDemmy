import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Settings } from "lucide-react"
import { ProfileContext } from '../../plugin/Context'

function Header() {
  const [profile] = useContext(ProfileContext)

  return (
    <div className="w-full mb-6">
      <div className="
      bg-white 
      border 
      border-gray-200 
      rounded-2xl 
      shadow-sm 
      px-5 
      py-4 
      sm:px-6 
      sm:py-5">
        <div className="
        flex 
        flex-col 
        gap-5 
        md:flex-row 
        md:items-center 
        md:justify-between">


          <div className="flex items-center gap-4">
            <div className="relative -mt-8 flex-shrink-0">
              <img
                src={profile?.image}
                alt="Profile"
                className="
                w-[72px] 
                h-[72px] 
                rounded-full 
                object-cover 
                border-4 
                border-white 
                shadow-md 
                bg-gray-100"
              />
            </div>


            <div className="min-w-0">
              <h2 className="
              text-xl 
              sm:text-2xl 
              font-semibold 
              text-gray-900 
              truncate">
                {profile?.full_name}
              </h2>

              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {profile?.about}
              </p>
            </div>
          </div>


          <div className="hidden md:block">
            <Link
              to="/profile-edit"
              className="
              inline-flex 
              items-center 
              gap-2 
              px-4 
              py-2.5 
              rounded-lg 
              bg-indigo-600 
              text-white 
              text-sm 
              font-medium 
              hover:bg-indigo-700 
              transition-all 
              duration-200 
              shadow-sm 
              hover:shadow-md"
            >
              <span>Account Settings</span>

              <Settings
                size={16}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;