import { useState, useEffect } from "react";
import moment from "moment";
import { MapPin, Users, UserRound } from "lucide-react";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function Students() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        useAxios
            .get(`teacher/student-lists/${UserData()?.teacher_id}/`)
            .then((res) => {
                console.log("res.data: ", res.data);
                setStudents(res.data);
            })
            .catch((error) => {
                console.log("Error fetching students:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <BaseHeader />

            <section className="pt-6 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Header />

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content */}
                        <main className="min-w-0">
                            {/* Page Header */}
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
                                <div className="p-5 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users
                                                    size={20}
                                                    className="text-indigo-600"
                                                />
                                                <h1 className="text-2xl font-semibold text-slate-900">
                                                    Students
                                                </h1>
                                            </div>

                                            <p className="text-sm text-slate-500">
                                                Meet people taking your course.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                                            <Users
                                                size={16}
                                                className="text-slate-500"
                                            />
                                            <span className="text-sm font-medium text-slate-700">
                                                {students.length}{" "}
                                                {students.length === 1
                                                    ? "Student"
                                                    : "Students"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Students */}
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div
                                            key={item}
                                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="w-[70px] h-[70px] rounded-full bg-slate-200 animate-pulse" />

                                                <div className="w-28 h-5 bg-slate-200 rounded mt-4 animate-pulse" />

                                                <div className="w-20 h-4 bg-slate-100 rounded mt-2 animate-pulse" />
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between">
                                                <div className="w-16 h-4 bg-slate-100 rounded animate-pulse" />
                                                <div className="w-24 h-4 bg-slate-100 rounded animate-pulse" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : students.length === 0 ? (
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
                                    <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-slate-100">
                                        <UserRound
                                            size={26}
                                            className="text-slate-400"
                                        />
                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                        No students yet
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Students enrolled in your courses will
                                        appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {students.map((s, index) => (
                                        <div
                                            key={s.id || s.user_id || index}
                                            className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                                        >
                                            <div className="p-6">
                                                {/* Student Profile */}
                                                <div className="text-center">
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={`http://127.0.0.1:8000${s.image}`}
                                                            alt={s.full_name}
                                                            className="w-[70px] h-[70px] rounded-full object-cover border-4 border-white shadow-sm bg-slate-100"
                                                        />

                                                        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                                                    </div>

                                                    <h3 className="mt-4 text-lg font-semibold text-slate-900 truncate">
                                                        {s.full_name}
                                                    </h3>

                                                    <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500">
                                                        <MapPin size={14} />
                                                        <span>
                                                            {s.country}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Enrollment Info */}
                                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <span className="text-sm text-slate-500">
                                                        Enrolled
                                                    </span>

                                                    <span className="text-sm font-medium text-slate-800">
                                                        {moment(s.date).format(
                                                            "DD MMM YYYY"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* <BaseFooter /> */}
        </>
    );
}

export default Students;