import { useState, useEffect } from "react";
import moment from "moment";
import {
    Bell,
    Check,
    CalendarDays,
    Inbox,
} from "lucide-react";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter"; 

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";

function TeacherNotification() {
    const [noti, setNoti] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNoti = () => {
        setIsLoading(true);

        useAxios
            .get(`teacher/noti-list/${UserData()?.teacher_id}/`)
            .then((res) => {
                setNoti(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log("Error fetching notifications:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchNoti();
    }, []);

    const handleMarkAsSeen = (notiId) => {
        const formdata = new FormData();

        formdata.append("teacher", UserData()?.teacher_id);
        formdata.append("pk", notiId);
        formdata.append("seen", true);

        useAxios
            .patch(
                `teacher/noti-detail/${UserData()?.teacher_id}/${notiId}`,
                formdata
            )
            .then((res) => {
                console.log(res.data);

                fetchNoti();

                Toast().fire({
                    icon: "success",
                    title: "Notification Seen",
                });
            })
            .catch((error) => {
                console.log("Error marking notification:", error);
            });
    };

    return (
        <>
            <BaseHeader />

            <section className="pt-6 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <Header />

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
                        
                        <Sidebar />

                        
                        <main className="min-w-0">
                            
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="
                                        relative 
                                        flex 
                                        items-center 
                                        justify-center 
                                        w-10 
                                        h-10 
                                        rounded-xl 
                                        bg-indigo-50">
                                            <Bell
                                                size={21}
                                                className="text-indigo-600"
                                            />

                                            {noti.length > 0 && (
                                                <span className="
                                                absolute 
                                                -top-1 
                                                -right-1 
                                                flex 
                                                items-center 
                                                justify-center 
                                                min-w-5 
                                                h-5 
                                                px-1 
                                                rounded-full 
                                                bg-red-500 
                                                text-white 
                                                text-[10px] 
                                                font-semibold">
                                                    {noti.length}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h1 className="text-2xl font-semibold text-slate-900">
                                                Notifications
                                            </h1>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Manage all your notifications
                                                from here.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-5 py-4 sm:px-6 border-b border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Inbox
                                                size={19}
                                                className="text-indigo-600"
                                            />

                                            <h2 className="text-lg font-semibold text-slate-900">
                                                Recent Notifications
                                            </h2>
                                        </div>

                                        {!isLoading && (
                                            <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                                                {noti.length}{" "}
                                                {noti.length === 1
                                                    ? "Notification"
                                                    : "Notifications"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                
                                {isLoading ? (
                                    <div className="divide-y divide-slate-100">
                                        {[1, 2, 3, 4].map((item) => (
                                            <div
                                                key={item}
                                                className="p-5 sm:p-6"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse flex-shrink-0" />

                                                    <div className="flex-1 space-y-3">
                                                        <div className="w-40 h-5 bg-slate-200 rounded animate-pulse" />
                                                        <div className="w-28 h-4 bg-slate-100 rounded animate-pulse" />
                                                        <div className="w-24 h-9 bg-slate-100 rounded-lg animate-pulse" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : noti.length === 0 ? (
                                    /* Empty State */
                                    <div className="p-10 text-center">
                                        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-slate-100">
                                            <Bell
                                                size={25}
                                                className="text-slate-400"
                                            />
                                        </div>

                                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                            No notifications
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            You're all caught up. New
                                            notifications will appear here.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {noti.map((n, index) => (
                                            <div
                                                key={n.id || index}
                                                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors"
                                            >
                                                <div className="
                                                flex 
                                                flex-col 
                                                sm:flex-row 
                                                sm:items-start 
                                                sm:justify-between 
                                                gap-5">
                                                    {/* notification information here --> */}
                                                    <div className="flex items-start gap-4 min-w-0">
                                                        <div className="
                                                        flex-shrink-0 
                                                        flex 
                                                        items-center 
                                                        justify-center 
                                                        w-10 
                                                        h-10 
                                                        rounded-xl 
                                                        bg-indigo-50">
                                                            <Bell
                                                                size={18}
                                                                className="text-indigo-600"
                                                            />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <h3 className="text-base font-semibold text-slate-900">
                                                                {n.type}
                                                            </h3>

                                                            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                                                                <CalendarDays
                                                                    size={14}
                                                                />

                                                                <span>
                                                                    {moment(
                                                                        n.date
                                                                    ).format(
                                                                        "DD MMM, YYYY"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleMarkAsSeen(
                                                                n.id
                                                            )
                                                        }
                                                        className="
                                                        inline-flex 
                                                        items-center 
                                                        justify-center 
                                                        gap-2 
                                                        px-4 
                                                        py-2.5 
                                                        rounded-lg 
                                                        border 
                                                        border-slate-200 
                                                        bg-white 
                                                        text-sm 
                                                        font-medium 
                                                        text-slate-700 
                                                        hover:bg-emerald-50 
                                                        hover:border-emerald-200 
                                                        hover:text-emerald-700 
                                                        transition-colors 
                                                        sm:flex-shrink-0"
                                                    >
                                                        <Check size={16} />
                                                        Mark as Seen
                                                    </button>
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

            <BaseFooter />
        </>
    );
}

export default TeacherNotification;