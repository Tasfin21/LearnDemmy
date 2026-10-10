import { useState, useEffect } from "react";
import moment from "moment";
import {
    ShoppingBag,
    FileText,
    CalendarDays,
    DollarSign,
    Receipt,
} from "lucide-react";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        useAxios
            .get(`teacher/course-order-list/${UserData()?.teacher_id}/`)
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((error) => {
                console.log("Error fetching orders:", error);
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
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
                                            <ShoppingBag
                                                size={21}
                                                className="text-indigo-600"
                                            />
                                        </div>

                                        <div>
                                            <h1 className="text-2xl font-semibold text-slate-900">
                                                Orders
                                            </h1>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Order Dashboard is a quick
                                                overview of all current orders.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Orders */}
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                                {/* Card Header */}
                                <div className="px-5 py-4 sm:px-6 border-b border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Receipt
                                                size={19}
                                                className="text-indigo-600"
                                            />

                                            <h2 className="text-lg font-semibold text-slate-900">
                                                Order History
                                            </h2>
                                        </div>

                                        {!isLoading && (
                                            <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                                                {orders.length}{" "}
                                                {orders.length === 1
                                                    ? "Order"
                                                    : "Orders"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Loading */}
                                {isLoading ? (
                                    <div className="divide-y divide-slate-100">
                                        {[1, 2, 3, 4].map((item) => (
                                            <div
                                                key={item}
                                                className="px-5 py-5 sm:px-6"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-2">
                                                        <div className="w-48 h-4 bg-slate-200 rounded animate-pulse" />
                                                        <div className="w-28 h-3 bg-slate-100 rounded animate-pulse" />
                                                    </div>

                                                    <div className="w-20 h-4 bg-slate-200 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : orders.length === 0 ? (
                                    /* Empty State */
                                    <div className="p-10 text-center">
                                        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-slate-100">
                                            <ShoppingBag
                                                size={25}
                                                className="text-slate-400"
                                            />
                                        </div>

                                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                            No orders yet
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Orders for your courses will appear
                                            here.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Desktop Table */}
                                        <div className="hidden md:block overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-slate-50/70 border-b border-slate-100">
                                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                            Course
                                                        </th>

                                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                            Amount
                                                        </th>

                                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                            Invoice
                                                        </th>

                                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                            Date
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {orders.map(
                                                        (o, index) => (
                                                            <tr
                                                                key={
                                                                    o.order
                                                                        ?.oid ||
                                                                    index
                                                                }
                                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                                            >
                                                                {/* Course */}
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50">
                                                                            <FileText
                                                                                size={
                                                                                    17
                                                                                }
                                                                                className="text-indigo-600"
                                                                            />
                                                                        </div>

                                                                        <span className="font-medium text-slate-900">
                                                                            {
                                                                                o
                                                                                    .course
                                                                                    ?.title
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>

                                                                {/* Amount */}
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                                                                        <DollarSign
                                                                            size={
                                                                                15
                                                                            }
                                                                            className="text-emerald-600"
                                                                        />
                                                                        {
                                                                            o.price
                                                                        }
                                                                    </div>
                                                                </td>

                                                                {/* Invoice */}
                                                                <td className="px-6 py-4">
                                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-sm font-medium text-slate-700">
                                                                        #
                                                                        {
                                                                            o
                                                                                .order
                                                                                ?.oid
                                                                        }
                                                                    </span>
                                                                </td>

                                                                {/* Date */}
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                                        <CalendarDays
                                                                            size={
                                                                                15
                                                                            }
                                                                            className="text-slate-400"
                                                                        />

                                                                        {moment(
                                                                            o.date
                                                                        ).format(
                                                                            "DD MMM, YYYY"
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
                                            {orders.map((o, index) => (
                                                <div
                                                    key={
                                                        o.order?.oid || index
                                                    }
                                                    className="p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-start gap-3 min-w-0">
                                                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50">
                                                                <FileText
                                                                    size={18}
                                                                    className="text-indigo-600"
                                                                />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <h3 className="font-medium text-slate-900 leading-5">
                                                                    {
                                                                        o
                                                                            .course
                                                                            ?.title
                                                                    }
                                                                </h3>

                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    Invoice #
                                                                    {
                                                                        o
                                                                            .order
                                                                            ?.oid
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <span className="flex-shrink-0 text-sm font-semibold text-slate-900">
                                                            ${o.price}
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-500">
                                                        <CalendarDays
                                                            size={15}
                                                            className="text-slate-400"
                                                        />

                                                        {moment(
                                                            o.date
                                                        ).format(
                                                            "DD MMM, YYYY"
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
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

export default Orders;