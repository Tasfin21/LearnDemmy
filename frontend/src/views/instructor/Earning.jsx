import { useEffect, useState } from "react";
import {
    DollarSign,
    MoreVertical,
    Pencil,
    Trash2,
    ShoppingCart,
    TrendingUp,
    History,
    ChevronDown,
} from "lucide-react";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import useAxios from '../../utils/useAxios'
import UserData from "../plugin/UserData";

function Earning() {
    const [stats, setStats] = useState([]);
    const [earning, setEarning] = useState([]);
    const [bestSellingCourse, setBestSellingCourse] = useState([]);

    const [earningMenuOpen, setEarningMenuOpen] = useState(false);
    const [courseMenuOpen, setCourseMenuOpen] = useState(null);

    useEffect(() => {
        useAxios
            .get(`teacher/summary/${UserData()?.user_id}/`)
            .then((res) => {
                console.log(res.data[0]);
                setStats(res.data[0]);
            });

        useAxios
            .get(`teacher/all-months-earning/${UserData()?.user_id}/`)
            .then((res) => {
                console.log(res.data);
                setEarning(res.data);
            });

        useAxios
            .get(`teacher/best-course-earning/${UserData()?.user_id}/`)
            .then((res) => {
                console.log(res.data);
                setBestSellingCourse(res.data);
            });
    }, []);

    const getMonthName = (month) => {
        const months = [
            "",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        return months[month] || "";
    };

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
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50">
                                            <DollarSign
                                                size={21}
                                                className="text-emerald-600"
                                            />
                                        </div>

                                        <div>
                                            <h1 className="text-2xl font-semibold text-slate-900">
                                                Earnings
                                            </h1>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Track your course revenue and
                                                earning history.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Earnings Overview */}
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
                                <div className="flex items-center justify-between px-5 py-4 sm:px-6 border-b border-slate-100">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Earnings Overview
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Your current revenue performance.
                                        </p>
                                    </div>

                                    {/* Dropdown */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEarningMenuOpen(
                                                    !earningMenuOpen
                                                )
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                        >
                                            <span>Period</span>
                                            <ChevronDown size={15} />
                                        </button>

                                        {earningMenuOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                                                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Setting
                                                </div>

                                                <button
                                                    type="button"
                                                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                                                    onClick={() =>
                                                        setEarningMenuOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    30 Days
                                                </button>

                                                <button
                                                    type="button"
                                                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                                                    onClick={() =>
                                                        setEarningMenuOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    2 Months
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Total Revenue */}
                                        <div className="group border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50">
                                                <ShoppingCart
                                                    size={19}
                                                    className="text-emerald-600"
                                                />
                                            </div>

                                            <p className="mt-4 text-sm text-slate-500">
                                                Monthly Earnings
                                            </p>

                                            <h3 className="mt-1 text-3xl font-bold text-slate-900">
                                                $
                                                {stats.total_revenue?.toFixed(
                                                    2
                                                )}
                                            </h3>

                                            <p className="mt-2 text-xs text-slate-400">
                                                January
                                            </p>
                                        </div>

                                        {/* Monthly Revenue */}
                                        <div className="group border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50">
                                                <TrendingUp
                                                    size={19}
                                                    className="text-emerald-600"
                                                />
                                            </div>

                                            <p className="mt-4 text-sm text-slate-500">
                                                Your Revenue
                                            </p>

                                            <h3 className="mt-1 text-3xl font-bold text-slate-900">
                                                $
                                                {stats.monthly_revenue?.toFixed(
                                                    2
                                                )}
                                            </h3>

                                            <p className="mt-2 text-xs text-slate-400">
                                                Current earnings
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Best Selling Courses */}
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
                                <div className="px-5 py-4 sm:px-6 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp
                                            size={19}
                                            className="text-emerald-600"
                                        />

                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Best Selling Courses
                                        </h2>
                                    </div>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Course
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Sales
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Amount
                                                </th>

                                                <th className="px-6 py-3 w-14" />
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {bestSellingCourse?.map(
                                                (b, index) => (
                                                    <tr
                                                        key={
                                                            b.course_id ||
                                                            b.id ||
                                                            index
                                                        }
                                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <img
                                                                    src={
                                                                        "http://127.0.0.1:8000" +
                                                                        b.course_image
                                                                    }
                                                                    alt={
                                                                        b.course_title
                                                                    }
                                                                    className="w-20 h-14 rounded-lg object-cover bg-slate-100"
                                                                />

                                                                <span className="font-medium text-slate-900">
                                                                    {
                                                                        b.course_title
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-slate-600">
                                                            {b.sales}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                                            ${b.revenue}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <div className="relative">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setCourseMenuOpen(
                                                                            courseMenuOpen ===
                                                                                index
                                                                                ? null
                                                                                : index
                                                                        )
                                                                    }
                                                                    className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                                                                >
                                                                    <MoreVertical
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </button>

                                                                {courseMenuOpen ===
                                                                    index && (
                                                                    <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                                                                        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                                            Setting
                                                                        </div>

                                                                        <button
                                                                            type="button"
                                                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                                                                        >
                                                                            <Pencil
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                            Edit
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                                                        >
                                                                            <Trash2
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="md:hidden divide-y divide-slate-100">
                                    {bestSellingCourse?.map((b, index) => (
                                        <div
                                            key={
                                                b.course_id || b.id || index
                                            }
                                            className="p-5"
                                        >
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={
                                                        "http://127.0.0.1:8000" +
                                                        b.course_image
                                                    }
                                                    alt={b.course_title}
                                                    className="w-20 h-14 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-medium text-slate-900 truncate">
                                                        {b.course_title}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                                                        <div>
                                                            <p className="text-xs text-slate-400">
                                                                Sales
                                                            </p>
                                                            <p className="text-sm font-medium text-slate-700">
                                                                {b.sales}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-slate-400">
                                                                Amount
                                                            </p>
                                                            <p className="text-sm font-semibold text-slate-900">
                                                                ${b.revenue}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:bg-slate-100"
                                                >
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {bestSellingCourse?.length === 0 && (
                                    <div className="p-10 text-center">
                                        <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-slate-100">
                                            <ShoppingCart
                                                size={22}
                                                className="text-slate-400"
                                            />
                                        </div>

                                        <h3 className="mt-4 font-semibold text-slate-900">
                                            No course sales yet
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Your best selling courses will
                                            appear here.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Earning History */}
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                                <div className="px-5 py-4 sm:px-6 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <History
                                            size={19}
                                            className="text-emerald-600"
                                        />

                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Earning History
                                        </h2>
                                    </div>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Month
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {earning?.map((e, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-sm text-slate-700">
                                                        {getMonthName(e.month)}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                                        $
                                                        {e.total_earning?.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile History */}
                                <div className="sm:hidden divide-y divide-slate-100">
                                    {earning?.map((e, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between px-5 py-4"
                                        >
                                            <span className="text-sm text-slate-600">
                                                {getMonthName(e.month)}
                                            </span>

                                            <span className="text-sm font-semibold text-slate-900">
                                                $
                                                {e.total_earning?.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {earning?.length === 0 && (
                                    <div className="p-10 text-center">
                                        <p className="text-sm text-slate-500">
                                            No earning history available.
                                        </p>
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

export default Earning;