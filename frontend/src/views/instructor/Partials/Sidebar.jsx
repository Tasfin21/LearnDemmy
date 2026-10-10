import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  Star,
  GraduationCap,
  DollarSign,
  Tag,
  Bell,
  ShoppingCart,
  Mail,
  Edit,
  Lock,
  LogOut,
  Menu,
  X,
} from "lucide-react"

function Sidebar() {
  return (
    <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="
      bg-white 
      border 
      border-gray-200 
      rounded-2xl 
      shadow-sm 
      overflow-hidden 
      md:sticky 
      md:top-6">

        {/* mobile menu button here --> */}
        <div className="
        flex 
        items-center 
        justify-between 
        p-4 
        md:hidden">
          <span className="font-semibold text-gray-900">
            Instructor Menu
          </span>

          <button
            type="button"
            className="
            flex 
            items-center 
            justify-center 
            w-10 
            h-10 
            rounded-lg 
            bg-indigo-600 
            text-white 
            hover:bg-indigo-700 
            transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* sidebar content here --> */}
        <nav className="p-4">
          {/* Main Navigation */}
          <ul className="space-y-1">

            <li>
              <Link
                to="/instructor/dashboard/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/courses/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <BookOpen size={18} />
                <span>My Courses</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/create-course/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <Plus size={18} />
                <span>Create Course</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/reviews/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <Star size={18} />
                <span>Review</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/students/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <GraduationCap size={18} />
                <span>Students</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/earning/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <DollarSign size={18} />
                <span>Earning</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/coupon/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <Tag size={18} />
                <span>Coupons</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/notifications/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <Bell size={18} />
                <span>Notifications</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/orders/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <ShoppingCart size={18} />
                <span>Orders</span>
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/question-answer/"
                className="
                flex 
                items-center 
                gap-3 
                px-3 
                py-2.5 
                rounded-lg 
                text-sm 
                font-medium 
                text-gray-700 
                hover:bg-indigo-50 
                hover:text-indigo-600 
                transition-all 
                duration-200"
              >
                <Mail size={18} />
                <span>Q/A</span>
              </Link>
            </li>
          </ul>

          {/* divider funtion here --> */}
          <div className="my-5 border-t border-gray-200" />

          {/* account settings here --> */}
          <div>
            <h3 className="
            px-3 
            mb-3 
            text-xs 
            font-semibold 
            uppercase 
            tracking-wider 
            text-gray-400">
              Account Settings
            </h3>

            <ul className="space-y-1">
              <li>
                <Link
                  to="/instructor/profile/"
                  className="
                  flex 
                  items-center 
                  gap-3 
                  px-3 
                  py-2.5 
                  rounded-lg 
                  text-sm 
                  font-medium 
                  text-gray-700 
                  hover:bg-indigo-50 
                  hover:text-indigo-600 
                  transition-all 
                  duration-200"
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/instructor/change-password/"
                  className="
                  flex 
                  items-center 
                  gap-3 
                  px-3 
                  py-2.5 
                  rounded-lg 
                  text-sm 
                  font-medium 
                  text-gray-700 
                  hover:bg-indigo-50 
                  hover:text-indigo-600 
                  transition-all 
                  duration-200"
                >
                  <Lock size={18} />
                  <span>Change Password</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/login/"
                  className="
                  flex 
                  items-center 
                  gap-3 
                  px-3 
                  py-2.5 
                  rounded-lg 
                  text-sm 
                  font-medium 
                  text-red-600 
                  hover:bg-red-50 
                  
                  transition-all 
                  duration-200"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;