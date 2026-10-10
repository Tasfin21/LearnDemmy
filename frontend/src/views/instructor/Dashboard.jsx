import { useState, useEffect } from "react";
import moment from "moment";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    DollarSign,
    Search,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    Plus,
    ChevronRight,
} from "lucide-react";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";


function Dashboard() {
    const axios = useAxios(); // ✅ once at top level

    const [stats, setStats] = useState({});
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchCourseData = async () => {
        const teacherId = UserData()?.teacher_id;

        // student / no teacher profile
        if (!teacherId) {
        setIsLoading(false);
        return;
        }

        setIsLoading(true);
        try {
        const statsResponse = await axios.get(`teacher/summary/${teacherId}/`);
        setStats(statsResponse.data[0] || {});

        const coursesResponse = await axios.get(
            `teacher/course-lists/${teacherId}/`
        );
        setCourses(coursesResponse.data || []);
        setAllCourses(coursesResponse.data || []);
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, []);


    // Search courses
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();

        setSearchQuery(query);

        if (query === "") {
            setCourses(allCourses);
            return;
        }

        const filteredCourses = allCourses.filter((course) =>
            course.title.toLowerCase().includes(query)
        );

        setCourses(filteredCourses);
    };


    return (
        <>
            <BaseHeader />

            <section className="bg-slate-50 py-6 sm:py-8">
                <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">

                    {/* dashboard hearder here --> */}
                    <Header />
                    <div className="
                    mt-6 
                    grid 
                    grid-cols-1 
                    gap-6 
                    lg:grid-cols-[288px_minmax(0,1fr)]">

                        {/* sidebar here --> */}
                        <Sidebar />

                        {/* main content here --> */}
                        <main className="min-w-0">

                            {/* page heading */}
                            <div className="
                            mb-6 
                            flex 
                            flex-col 
                            justify-between 
                            gap-4 
                            sm:flex-row 
                            sm:items-center">

                                <div>
                                    <div className="
                                    flex 
                                    items-center 
                                    gap-2 
                                    text-sm 
                                    text-slate-500">
                                        <LayoutDashboard size={16} />

                                        <span>Teacher Dashboard</span>

                                        <ChevronRight size={15} />

                                        <span className="text-slate-900">
                                            Dashboard
                                        </span>
                                    </div>

                                    <h1 className="
                                    mt-2 
                                    text-2xl 
                                    font-bold 
                                    tracking-tight 
                                    text-slate-900 
                                    sm:text-3xl">
                                        Dashboard
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage your courses and track your teaching
                                        performance.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="
                                    inline-flex 
                                    items-center 
                                    justify-center 
                                    gap-2 
                                    rounded-xl 
                                    bg-slate-900 
                                    px-5 
                                    py-3 
                                    text-sm 
                                    font-semibold 
                                    text-white 
                                    transition 
                                    hover:bg-emerald-600 
                                    active:scale-95"
                                >
                                    <Plus size={17} />
                                    Create Course
                                </button>
                            </div>

                            
                            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                                {/* total courses section here --> */}
                                <div className="
                                group 
                                rounded-2xl 
                                border 
                                border-slate-200 
                                bg-white 
                                p-5 
                                shadow-sm 
                                transition 
                                duration-300 
                                hover:-translate-y-1 
                                hover:shadow-md">
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-slate-500">
                                                Total Courses
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                                {stats?.total_courses || 0}
                                            </h2>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:scale-105">
                                            <BookOpen size={23} />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-xs text-slate-400">
                                        Courses created by you
                                    </p>
                                </div>

                                {/* total student section here --> */}
                                <div className="
                                group 
                                rounded-2xl 
                                border 
                                border-slate-200 
                                bg-white 
                                p-5 
                                shadow-sm 
                                transition 
                                duration-300 
                                hover:-translate-y-1 
                                hover:shadow-md">
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-slate-500">
                                                Total Students
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                                {stats?.total_students || 0}
                                            </h2>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:scale-105">
                                            <Users size={23} />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-xs text-slate-400">
                                        Students enrolled in your courses
                                    </p>
                                </div>

                                {/* revenue section here --> */}
                                <div className="
                                group 
                                rounded-2xl 
                                border 
                                border-slate-200 
                                bg-white 
                                p-5 
                                shadow-sm 
                                transition 
                                duration-300 
                                hover:-translate-y-1 
                                hover:shadow-md">
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-slate-500">
                                                Total Revenue
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                                $
                                                {Number(
                                                    stats?.total_revenue || 0
                                                ).toFixed(2)}
                                            </h2>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:scale-105">
                                            <DollarSign size={23} />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-xs text-slate-400">
                                        Total earnings from your courses
                                    </p>
                                </div>
                            </div>

                            {/* courses section here --> */}
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                Your Courses
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Manage, search, view and edit your
                                                courses.
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                                            {courses.length}{" "}
                                            {courses.length === 1
                                                ? "Course"
                                                : "Courses"}
                                        </div>
                                    </div>

                                    <div className="relative mt-5">

                                        <Search
                                            size={18}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="search"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                            placeholder="Search your courses..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>

                                {isLoading && (
                                    <div className="divide-y divide-slate-100">
                                        {[1, 2, 3].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-4 p-5"
                                            >
                                                <div className="h-16 w-24 animate-pulse rounded-xl bg-slate-200" />

                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                                                    <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}


                                {!isLoading && courses.length === 0 && (
                                    <div className="px-6 py-16 text-center">

                                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                            <BookOpen size={25} />
                                        </div>

                                        <h3 className="mt-4 font-semibold text-slate-900">
                                            No courses found
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {searchQuery
                                                ? "Try searching with a different course name."
                                                : "You haven't created any courses yet."}
                                        </p>
                                    </div>
                                )}


                                {!isLoading && courses.length > 0 && (
                                    <div className="hidden overflow-x-auto md:block">

                                        <table className="w-full min-w-[850px]">

                                            <thead className="border-b border-slate-200 bg-slate-50">
                                                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                                    <th className="px-6 py-4">
                                                        Course
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Enrolled
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Level
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Status
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Created
                                                    </th>

                                                    <th className="px-4 py-4 text-right">
                                                        Actions
                                                    </th>

                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-slate-100">

                                                {courses.map((c) => (
                                                    <tr
                                                        key={c.id}
                                                        className="group transition hover:bg-slate-50"
                                                    >

                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">

                                                                <img
                                                                    src={c.image}
                                                                    alt={c.title}
                                                                    className="h-16 w-24 shrink-0 rounded-xl object-cover shadow-sm"
                                                                />

                                                                <div className="min-w-0">

                                                                    <h3 className="max-w-xs truncate text-sm font-semibold text-slate-900">
                                                                        {c.title}
                                                                    </h3>

                                                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                                                        <span>
                                                                            {c.language}
                                                                        </span>

                                                                        <span className="text-slate-300">
                                                                            •
                                                                        </span>

                                                                        <span>
                                                                            ${c.price}
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2 text-sm text-slate-600">

                                                                <Users
                                                                    size={15}
                                                                    className="text-slate-400"
                                                                />

                                                                {c.students?.length || 0}
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span className="inline-flex rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                                {c.level}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span className="inline-flex rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                                Intermediate
                                                            </span>
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                                                            {moment(c.date).format(
                                                                "DD MMM, YYYY"
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <div className="flex justify-end gap-2">

                                                                <button
                                                                    type="button"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white active:scale-95"
                                                                    title="Edit"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white active:scale-95"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-800 hover:text-white active:scale-95"
                                                                    title="View"
                                                                >
                                                                    <Eye size={16} />
                                                                </button>

                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                )}


                                {!isLoading && courses.length > 0 && (
                                    <div className="divide-y divide-slate-100 md:hidden">

                                        {courses.map((c) => (
                                            <div
                                                key={c.id}
                                                className="p-5"
                                            >

                                                <div className="flex gap-4">

                                                    <img
                                                        src={c.image}
                                                        alt={c.title}
                                                        className="h-20 w-28 shrink-0 rounded-xl object-cover"
                                                    />

                                                    <div className="min-w-0 flex-1">

                                                        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                                            {c.title}
                                                        </h3>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {c.language}
                                                        </p>

                                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                                            ${c.price}
                                                        </p>

                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="self-start text-slate-400 transition hover:text-slate-700"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex flex-wrap items-center gap-2">

                                                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                        {c.level}
                                                    </span>

                                                    <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                        Intermediate
                                                    </span>

                                                    <span className="text-xs text-slate-500">
                                                        {c.students?.length || 0} students
                                                    </span>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">

                                                    <span className="text-xs text-slate-400">
                                                        {moment(c.date).format(
                                                            "DD MMM, YYYY"
                                                        )}
                                                    </span>

                                                    <div className="flex gap-2">

                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                                                        >
                                                            <Edit size={14} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
                                                        >
                                                            <Eye size={14} />
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                )}

                            </div>
                        </main>
                    </div>
                </div>
            </section>
      
          </>
    )
}

export default Dashboard;