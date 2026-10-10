import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { 
    FiGrid, 
    FiMonitor, 
    FiCheckSquare, 
    FiAward, 
    FiSearch, 
    FiGlobe, 
    FiBarChart2, 
    FiArrowRight 
} from "react-icons/fi";

import BaseHeader from '../partials/BaseHeader'
// import BaseFooter from "../partials/BaseFooter";
import Sidebar from './partials/Sidebar'
import Header from "./partials/Header";
import useAxios from '../../utils/useAxios'
import UserData from '../plugin/UserData'

function Dashboard() {
    const axios = useAxios()
    const [courses, setCourses] = useState([])
    const [stats, setStats] = useState({})
    const [fetching, setFetching] = useState(true)

    const fetchData = async () => {
        const userId = UserData()?.user_id;
        if (!userId) {
            setFetching(false);
        return;
        }

        setFetching(true);
        try {
        const [statsRes, coursesRes] = await Promise.all([
            axios.get(`student/summary/${userId}/`),
            axios.get(`student/course-list/${userId}/`),
        ]);
        setStats(statsRes.data[0] || {});
        setCourses(coursesRes.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        console.log(query);
        if (query === "") {
            fetchData();
        } else {
            const filtered = courses.filter((c) => {
                return c.course.title.toLowerCase().includes(query);
            });
            setCourses(filtered);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <BaseHeader />

            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {/* header here --> */}
                <Header />

                <div className="
                mt-8 
                flex 
                flex-col 
                lg:flex-row 
                gap-8">
                    {/* sidebar here --> */}
                    <Sidebar />

                    {/* main content area */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="
                            text-2xl 
                            font-bold 
                            tracking-tight 
                            text-slate-900 
                            flex 
                            items-center 
                            gap-3 
                            mb-6">
                                <FiGrid className="w-6 h-6 text-slate-900" />
                                <span>Dashboard</span>
                            </h1>

                            {/* Counter Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                
                                {/* total course status */}
                                <div className="
                                bg-white 
                                p-5 
                                rounded-2xl 
                                shadow-sm 
                                border 
                                border-slate-100 
                                flex 
                                items-center 
                                gap-4 
                                transition-all 
                                duration-300 
                                hover:shadow-md">
                                    <div className="
                                    w-12 
                                    h-12 
                                    rounded-xl 
                                    bg-amber-50 
                                    text-amber-600 
                                    flex 
                                    items-center 
                                    justify-center 
                                    flex-shrink-0">
                                        <FiMonitor className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{stats.total_courses || 0}</h3>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Courses</p>
                                    </div>
                                </div>

                                {/* complete leasson status here --> */}
                                <div className="
                                bg-white 
                                p-5 
                                rounded-2xl 
                                shadow-sm 
                                border 
                                border-slate-100 
                                flex 
                                items-center 
                                gap-4 
                                transition-all 
                                duration-300 
                                hover:shadow-md">
                                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                        <FiCheckSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{stats.completed_lessons || 0}</h3>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Complete Lessons</p>
                                    </div>
                                </div>

                                {/* achieved certificates stat */}
                                <div className="
                                bg-white 
                                p-5 
                                rounded-2xl 
                                shadow-sm 
                                border 
                                border-slate-100 
                                flex 
                                items-center 
                                gap-4 
                                transition-all 
                                duration-300 
                                hover:shadow-md">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <FiAward className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{stats.achieved_certificates || 0}</h3>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Certificates</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Loading State */}
                        {fetching && (
                            <div className="
                            bg-white 
                            rounded-2xl 
                            p-12 
                            text-center 
                            shadow-sm 
                            border 
                            border-slate-100">
                                <div className="
                                inline-block 
                                w-6 
                                h-6 
                                border-2 
                                border-slate-900 
                                border-t-transparent 
                                rounded-full 
                                animate-spin 
                                mb-2"></div>
                                <p className="text-sm text-slate-500 font-medium">Loading your dashboard...</p>
                            </div>
                        )}

                        {/* course section here --> */}
                        {!fetching && (
                            <div className="
                            bg-white 
                            rounded-2xl 
                            shadow-sm 
                            border 
                            border-slate-100 
                            overflow-hidden">
                                <div className="p-6 border-b border-slate-100 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Courses</h3>
                                        <p className="text-sm text-slate-500">Start watching courses now from your dashboard page.</p>
                                    </div>
                                    
                                    {/* Search Bar here --> */}
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <FiSearch className="w-4 h-4" />
                                        </span>
                                        <input 
                                            type="search" 
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all" 
                                            placeholder="Search Your Courses..." 
                                            onChange={handleSearch} 
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                <th className="py-3.5 px-6">Courses</th>
                                                <th className="py-3.5 px-6">Date Enrolled</th>
                                                <th className="py-3.5 px-6">Lectures</th>
                                                <th className="py-3.5 px-6">Completed</th>
                                                <th className="py-3.5 px-6 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-sm">
                                            {courses?.map((c, index) => (
                                                <tr key={c.enrollment_id || index} className="hover:bg-slate-50/50 transition-colors">
                                                    
                                                    {/* course info here --> */}
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-4">
                                                            <a href="#" className="flex-shrink-0">
                                                                <img
                                                                    src={c.course.image}
                                                                    alt="course"
                                                                    className="w-[100px] h-[70px] rounded-xl object-cover shadow-sm border border-slate-100"
                                                                />
                                                            </a>
                                                            <div className="space-y-1">
                                                                <h4 className="font-semibold text-slate-900 leading-snug">
                                                                    <a href="#" className="hover:text-slate-600 transition-colors">
                                                                        {c.course.title}
                                                                    </a>
                                                                </h4>
                                                                <ul className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                                    <li className="flex items-center gap-1.5">
                                                                        <FiGlobe className="w-3.5 h-3.5 text-slate-400" />
                                                                        <span>{c.course.language}</span>
                                                                    </li>
                                                                    <li className="flex items-center gap-1.5">
                                                                        <FiBarChart2 className="w-3.5 h-3.5 text-slate-400" />
                                                                        <span>{c.course.level}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    
                                                    <td className="py-4 px-6 text-slate-600 font-medium whitespace-nowrap">
                                                        {moment(c.date).format("D MMM, YYYY")}
                                                    </td>

                                                    
                                                    <td className="py-4 px-6 text-slate-600 font-medium">
                                                        {c.lectures?.length}
                                                    </td>

                                                    
                                                    <td className="py-4 px-6 text-slate-600 font-medium">
                                                        {c.completed_lesson?.length}
                                                    </td>

                                                    
                                                    <td className="py-4 px-6 text-right whitespace-nowrap">
                                                        {c.completed_lesson?.length < 1 ? (
                                                            <Link 
                                                                to={`/student/courses/${c.enrollment_id}/`} 
                                                                className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-200"
                                                            >
                                                                <span>Start Course</span>
                                                                <FiArrowRight className="w-3.5 h-3.5" />
                                                            </Link>
                                                        ) : (
                                                            <Link 
                                                                to={`/student/courses/${c.enrollment_id}/`} 
                                                                className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-200"
                                                            >
                                                                <span>Continue Course</span>
                                                                <FiArrowRight className="w-3.5 h-3.5" />
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {courses?.length < 1 && (
                                        <div className="text-center py-12 text-slate-500 font-medium">
                                            No courses found
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* <BaseFooter /> */}
        </div>
    );
}

export default Dashboard;