import React, { useContext } from "react";
import { ProfileContext } from "../../plugin/Context";
import { FiSettings } from "react-icons/fi"

function Header() {
    const [profile, setProfile] = useContext(ProfileContext)

    return (
        <div className="w-full">
            <div className="
            bg-white 
            rounded-2xl 
            shadow-sm 
            border 
            border-slate-100 
            px-6 
            pt-4 
            pb-6 
            transition-all 
            duration-300 
            hover:shadow-md">
                <div className="
                flex 
                flex-col 
                sm:flex-row 
                sm:items-end 
                justify-between 
                gap-4">
                    
                    {/* left section here --> */}
                    <div className="flex items-center gap-4">
                        {profile.image && (
                            <div className="relative -mt-10 flex-shrink-0">
                                <img
                                    src={profile.image}
                                    className="
                                    w-[70px] 
                                    h-[70px] 
                                    rounded-full 
                                    object-cover 
                                    ring-4 
                                    ring-white 
                                    shadow-md 
                                    transition-transform 
                                    duration-300 
                                    hover:scale-105"
                                    alt="Profile image"
                                />
                            </div>
                        )}
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                {profile.full_name}
                            </h2>
                            <p className="text-sm font-medium text-slate-500">
                                {profile.about}
                            </p>
                        </div>
                    </div>

                    {/* right section: account settings here --> */}
                    <div>
                        <a 
                            href="profile-edit.html" 
                            className="
                            hidden 
                            md:inline-flex 
                            items-center 
                            gap-2 
                            px-4 
                            py-2 
                            text-xs 
                            font-semibold 
                            uppercase 
                            tracking-wider 
                            text-white 
                            bg-slate-900 
                            rounded-xl 
                            shadow-sm 
                            hover:bg-slate-800 
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-slate-900/20 
                            transition-all 
                            duration-200 
                            group"
                        >
                            <span>Account Setting</span>
                            <FiSettings className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header;