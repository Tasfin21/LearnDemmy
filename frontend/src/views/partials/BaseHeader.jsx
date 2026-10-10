import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../plugin/Context";
import { useAuthStore } from "../../store/auth";

function BaseHeader() {
const [cartCount] = useContext(CartContext);
const [searchQuery, setSearchQuery] = useState("");
const [mobileOpen, setMobileOpen] = useState(false);
const [instructorOpen, setInstructorOpen] = useState(false);
const [studentOpen, setStudentOpen] = useState(false);

const navigate = useNavigate();

const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
const allUserData = useAuthStore((state) => state.allUserData);

const loggedIn = isLoggedIn();
const isTeacher = loggedIn && !!allUserData?.teacher_id;
const isStudent = loggedIn && !allUserData?.teacher_id;

const handleSearchSubmit = (event) => {
event.preventDefault();


if (searchQuery.trim()) {
  navigate(`/search/?search=${encodeURIComponent(searchQuery.trim())}`);
  setMobileOpen(false);
  setSearchQuery("");
}


};

const closeMenus = () => {
setMobileOpen(false);
setInstructorOpen(false);
setStudentOpen(false);
};

const instructorLinks = [
{ to: "/instructor/dashboard/", label: "Dashboard", icon: "◈" },
{ to: "/instructor/courses/", label: "My Courses", icon: "▤" },
{ to: "/instructor/create-course/", label: "Create Course", icon: "+" },
{ to: "/instructor/reviews/", label: "Reviews", icon: "☆" },
{ to: "/instructor/question-answer/", label: "Q/A", icon: "?" },
{ to: "/instructor/students/", label: "Students", icon: "♧" },
{ to: "/instructor/earning/", label: "Earnings", icon: "↗" },
{ to: "/instructor/profile/", label: "Settings & Profile", icon: "⚙" },
];

const studentLinks = [
{ to: "/student/dashboard/", label: "Dashboard", icon: "◈" },
{ to: "/student/courses/", label: "My Courses", icon: "▤" },
{ to: "/student/wishlist/", label: "Wishlist", icon: "♡" },
{ to: "/student/question-answer/", label: "Q/A", icon: "?" },
{ to: "/student/profile/", label: "Profile & Settings", icon: "⚙" },
];

const navLinkClass =
"relative rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700";

const dropdownLinkClass =
"group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700";

const authButtonClass =
"inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0";

const renderDropdown = (links) =>
links.map((link) => ( <Link
     key={link.to}
     to={link.to}
     onClick={closeMenus}
     className={dropdownLinkClass}
   > <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-base text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
{link.icon} </span>

    <span>{link.label}</span>

    <span className="ml-auto translate-x-[-4px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
      →
    </span>
  </Link>
));


return (
<motion.header
initial={{ y: -24, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.45, ease: "easeOut" }}
className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_4px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl"
>
{/* Subtle gradient accent */} <div className="h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />


  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-[76px] items-center justify-between gap-4">
      {/* Logo */}
      <Link
        to="/"
        onClick={closeMenus}
        className="group flex shrink-0 items-center gap-2.5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
          L
        </span>

        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          learn<span className="text-blue-600">demmy</span>
          <span className="ml-0.5 text-blue-600">.</span>
        </span>
      </Link>

      {/* Desktop navigation */}
      <nav className="hidden items-center gap-1 lg:flex">
        <Link to="/pages/about-us/" className={navLinkClass}>
          About
        </Link>

        <Link to="/pages/contact-us/" className={navLinkClass}>
          Contact
        </Link>

        {/* Instructor dropdown */}
        {isTeacher && (
          <div
            className="relative"
            onMouseEnter={() => setInstructorOpen(true)}
            onMouseLeave={() => setInstructorOpen(false)}
          >
            <button
              type="button"
              aria-expanded={instructorOpen}
              onClick={() => setInstructorOpen((open) => !open)}
              className={`${navLinkClass} inline-flex items-center gap-2`}
            >
              Instructor
              <motion.span
                animate={{ rotate: instructorOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs"
              >
                ▾
              </motion.span>
            </button>

            <AnimatePresence>
              {instructorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full z-50 mt-3 w-64 rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl"
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Instructor workspace
                    </p>
                  </div>

                  {renderDropdown(instructorLinks)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Student dropdown */}
        {isStudent && (
          <div
            className="relative"
            onMouseEnter={() => setStudentOpen(true)}
            onMouseLeave={() => setStudentOpen(false)}
          >
            <button
              type="button"
              aria-expanded={studentOpen}
              onClick={() => setStudentOpen((open) => !open)}
              className={`${navLinkClass} inline-flex items-center gap-2`}
            >
              Student
              <motion.span
                animate={{ rotate: studentOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs"
              >
                ▾
              </motion.span>
            </button>

            <AnimatePresence>
              {studentOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full z-50 mt-3 w-64 rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl"
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Your learning space
                    </p>
                  </div>

                  {renderDropdown(studentLinks)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </nav>

      {/* Desktop search and actions */}
      <div className="hidden items-center gap-3 lg:flex">
        <form
          onSubmit={handleSearchSubmit}
          className="group relative"
        >
          <input
            type="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search courses"
            className="w-44 rounded-xl border border-slate-200/80 bg-slate-50/80 py-2.5 pl-4 pr-10 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:w-60 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 xl:w-52 xl:focus:w-64"
          />

          <button
            type="submit"
            aria-label="Submit course search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </button>
        </form>

        {/* Cart */}
        {loggedIn && (
          <Link
            to="/cart/"
            className="group relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 transition-transform group-hover:-rotate-6"
            >
              <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>

            Cart

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-1 text-[10px] font-bold text-white ring-2 ring-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        )}

        {/* Authentication actions */}
        {loggedIn ? (
          <Link
            to="/logout/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>
            Logout
          </Link>
        ) : (
          <>
            <Link
              to="/login/"
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Login
            </Link>

            <Link to="/register/" className={authButtonClass}>
              Get Started
              <span className="ml-1 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 lg:hidden"
      >
        <motion.span
          key={mobileOpen ? "close" : "menu"}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="text-xl"
        >
          {mobileOpen ? "✕" : "☰"}
        </motion.span>
      </button>
    </div>
  </div>

  {/* Mobile navigation */}
  <AnimatePresence initial={false}>
    {mobileOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
      >
        <motion.div
          initial={{ y: -8 }}
          animate={{ y: 0 }}
          exit={{ y: -4 }}
          className="space-y-5 px-4 py-5 sm:px-6"
        >
          {/* Mobile search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative"
          >
            <input
              type="search"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search courses"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="submit"
              aria-label="Submit course search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
            </button>
          </form>

          {/* Main links */}
          <nav className="space-y-1">
            <Link
              to="/pages/about-us/"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              About
            </Link>

            <Link
              to="/pages/contact-us/"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Contact
            </Link>
          </nav>

          {/* Instructor links */}
          {isTeacher && (
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Instructor workspace
              </p>

              <div className="space-y-1">
                {renderDropdown(instructorLinks)}
              </div>
            </div>
          )}

          {/* Student links */}
          {isStudent && (
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Your learning space
              </p>

              <div className="space-y-1">
                {renderDropdown(studentLinks)}
              </div>
            </div>
          )}

          {/* Mobile account actions */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            {loggedIn && (
              <Link
                to="/cart/"
                onClick={closeMenus}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <span className="flex items-center gap-3">
                  <span>🛒</span>
                  My Cart
                </span>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                  {cartCount}
                </span>
              </Link>
            )}

            {loggedIn ? (
              <Link
                to="/logout/"
                onClick={closeMenus}
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login/"
                  onClick={closeMenus}
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>

                <Link
                  to="/register/"
                  onClick={closeMenus}
                  className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:shadow-lg"
                >
                  Get Started →
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>

);
}

export default BaseHeader;
