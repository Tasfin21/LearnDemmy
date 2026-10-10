import { useState, useEffect } from "react";
import moment from "moment";
import {
    LayoutDashboard,
    ChevronRight,
    Search,
    BookOpen,
    Users,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    Plus,
    DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchCourseData = async () => {
        setIsLoading(true);

        try {
            const res = await useAxios.get(
                `teacher/course-lists/${UserData()?.teacher_id}/`
            );

            console.log(res.data);

            setCourses(res.data);
            setAllCourses(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();

        setSearchQuery(query);

        if (query === "") {
            setCourses(allCourses);
            return;
        }

        const filtered = allCourses.filter((course) =>
            course.title.toLowerCase().includes(query)
        );

        setCourses(filtered);
    };

    return (
        <>
            <BaseHeader />

            <section className="bg-slate-50 py-6 sm:py-8">
                <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">

                    {/* dashboard header here --> */}
                    <Header />

                    
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">

                        {/* Sidebar here --> */}
                        <Sidebar />

                        <main className="min-w-0">
                            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                                <div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <LayoutDashboard size={16} />

                                        <span>Teacher Dashboard</span>

                                        <ChevronRight size={15} />

                                        <span className="text-slate-900">
                                            Courses
                                        </span>
                                    </div>

                                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                        Courses
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage, search, view and edit your
                                        courses.
                                    </p>
                                </div>

                                <Link
                                    to="/instructor/create-course/"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-95"
                                >
                                    <Plus size={17} />
                                    Create Course
                                </Link>
                            </div>


                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                Your Courses
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Manage your courses from here,
                                                search, view, edit or delete
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

                                        {!searchQuery && (
                                            <Link
                                                to="/instructor/create-course/"
                                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600"
                                            >
                                                <Plus size={16} />
                                                Create Course
                                            </Link>
                                        )}

                                    </div>
                                )}

                                {/* desktop and tab option here --> */}
                                {!isLoading && courses.length > 0 && (
                                    <div className="hidden overflow-x-auto md:block">

                                        <table className="w-full min-w-[900px]">

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
                                                        key={c.course_id}
                                                        className="group transition hover:bg-slate-50"
                                                    >

                                                        {/* Course */}
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

                                                                        <span className="inline-flex items-center gap-1">
                                                                            <Users
                                                                                size={13}
                                                                            />
                                                                            {c.language}
                                                                        </span>

                                                                        <span className="text-slate-300">
                                                                            •
                                                                        </span>

                                                                        <span>
                                                                            {c.level}
                                                                        </span>

                                                                        <span className="text-slate-300">
                                                                            •
                                                                        </span>

                                                                        <span className="inline-flex items-center gap-1">
                                                                            <DollarSign
                                                                                size={13}
                                                                            />
                                                                            {c.price}
                                                                        </span>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* enrolled course */}
                                                        <td className="px-4 py-4">

                                                            <div className="flex items-center gap-2 text-sm text-slate-600">

                                                                <Users
                                                                    size={15}
                                                                    className="text-slate-400"
                                                                />

                                                                {c.students?.length || 0}

                                                            </div>

                                                        </td>

                                                        {/* Level */}
                                                        <td className="px-4 py-4">

                                                            <span className="inline-flex rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                                {c.level}
                                                            </span>

                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-4 py-4">

                                                            <span className="inline-flex rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                                Intermediate
                                                            </span>

                                                        </td>

                                                        {/* Date */}
                                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">

                                                            {moment(c.date).format(
                                                                "DD MMM, YYYY"
                                                            )}

                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-4 py-4">

                                                            <div className="flex justify-end gap-2">

                                                                <Link
                                                                    to={`/instructor/edit-course/${c.course_id}/`}
                                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white active:scale-95"
                                                                    title="Edit"
                                                                >
                                                                    <Edit size={16} />
                                                                </Link>

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

                                {/* mobile views here --> */}
                                {!isLoading && courses.length > 0 && (
                                    <div className="divide-y divide-slate-100 md:hidden">

                                        {courses.map((c) => (
                                            <div
                                                key={c.course_id}
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
                                                        title="More actions"
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

                                                        <Link
                                                            to={`/instructor/edit-course/${c.course_id}/`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                                                        >
                                                            <Edit size={14} />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-800 hover:text-white"
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

            {/* <BaseFooter /> */}
        </>
    );
}

export default Courses;