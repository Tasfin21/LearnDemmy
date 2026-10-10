import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiGrid, 
    FiBookOpen, 
    FiHeart, 
    FiEdit, 
    FiLock, 
    FiLogOut, 
    FiMenu, 
    FiX 
} from 'react-icons/fi';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // helper to check if the current link is open 
    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-full lg:w-72 flex-shrink-0">
            <div className="
            bg-white 
            rounded-2xl 
            shadow-sm 
            border 
            border-slate-100 
            overflow-hidden 
            transition-all 
            duration-300">
                
                {/* mobile header toggle bar here --> */}
                <div className="
                flex 
                items-center 
                justify-between 
                p-4 
                md:hidden 
                border-b 
                border-slate-100">
                    <span className="font-bold text-slate-900 tracking-tight">Menu</span>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                        p-2 
                        text-slate-600 
                        hover:text-slate-900 
                        focus:outline-none 
                        rounded-xl 
                        hover:bg-slate-50 
                        transition-colors"
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                    </button>
                </div>

                
                <div className={`${isOpen ? 'block' : 'hidden'} md:block p-4 sm:p-6 space-y-6`}>
                    
                    {/* main menu link here --> */}
                    <div className="space-y-1">
                        <Link 
                            to="/student/dashboard/" 
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/student/dashboard/') 
                                    ? 'bg-slate-900 text-white shadow-sm' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <FiGrid className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>

                        <Link 
                            to="/student/courses/" 
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/student/courses/') 
                                    ? 'bg-slate-900 text-white shadow-sm' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <FiBookOpen className="w-4 h-4" />
                            <span>My Courses</span>
                        </Link>

                        <Link 
                            to="/student/wishlist/" 
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/student/wishlist/') 
                                    ? 'bg-slate-900 text-white shadow-sm' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <FiHeart className="w-4 h-4" />
                            <span>Wishlist</span>
                        </Link>
                    </div>

                    {/* divider */}
                    <hr className="border-slate-100" />

                    {/* account settings section here --> */}
                    <div className="space-y-3">
                        <span className="
                        px-3.5 
                        text-xs 
                        font-semibold 
                        tracking-wider 
                        uppercase 
                        text-slate-400 
                        block">
                            Account Settings
                        </span>
                        
                        <div className="space-y-1">
                            <Link 
                                to="/student/profile/" 
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive('/student/profile/') 
                                        ? 'bg-slate-900 text-white shadow-sm' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <FiEdit className="w-4 h-4" />
                               <span>Edit Profile</span>
                            </Link>

                            <Link 
                                to="/student/change-password/" 
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive('/student/change-password/') 
                                        ? 'bg-slate-900 text-white shadow-sm' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <FiLock className="w-4 h-4" />
                                <span>Change Password</span>
                            </Link>

                            <Link 
                                to="/login/" 
                                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200"
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// exports = Sidebar; // keep standard export style
export default Sidebar;