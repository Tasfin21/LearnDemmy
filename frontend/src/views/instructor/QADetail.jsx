import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";

import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

function QADetail() {
    const questions = [
        {
            name: "Jenny Adga",
            image: "https://desphixs.com/geeks/assets/images/avatar/avatar-2.jpg",
            time: "5hrs Ago",
            message: "Removed demands expense account",
        },
        {
            name: "Sam Freddy",
            image: "https://desphixs.com/geeks/assets/images/avatar/avatar-1.jpg",
            time: "5hrs Ago",
            message:
                "Removed demands expense account from the debby building in a hall town tak with",
        },
        {
            name: "Louis Ferguson",
            image: "https://desphixs.com/geeks/assets/images/avatar/avatar-3.jpg",
            time: "5hrs Ago",
            message: "Removed demands expense account",
        },
        {
            name: "Louis Ferguson",
            image: "https://desphixs.com/geeks/assets/images/avatar/avatar-3.jpg",
            time: "5hrs Ago",
            message: "Removed demands expense account",
        },
    ];

    return (
        <>
            <BaseHeader />

            <section className="min-h-screen bg-slate-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Header />

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content */}
                        <main className="min-w-0">
                            {/* Page Header */}
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <MessageCircle size={22} />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                            Q/A
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Angular Masterclass Course
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to="/instructor/question-answer/"
                                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
                                >
                                    <ArrowLeft size={17} />
                                    Back to Q/A
                                </Link>
                            </div>

                            {/* Q/A Card */}
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                {/* Card Header */}
                                <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                                Course
                                            </p>

                                            <h2 className="mt-1 text-base font-semibold text-slate-900">
                                                Angular Masterclass Course
                                            </h2>
                                        </div>

                                        <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                                            16 Questions
                                        </div>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="p-4 sm:p-6">
                                    <div className="h-[500px] space-y-4 overflow-y-auto pr-2">
                                        {questions.map((question, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-3"
                                            >
                                                {/* Avatar */}
                                                <div className="shrink-0">
                                                    <img
                                                        src={question.image}
                                                        alt={question.name}
                                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                                                    />
                                                </div>

                                                {/* Message */}
                                                <div className="min-w-0 max-w-3xl">
                                                    <div className="rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3">
                                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                            <h3 className="text-sm font-semibold text-slate-900">
                                                                {question.name}
                                                            </h3>

                                                            <span className="text-xs text-slate-400">
                                                                {question.time}
                                                            </span>
                                                        </div>

                                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                                            {question.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Message Composer */}
                                    <div className="mt-5 border-t border-slate-200 pt-5">
                                        <form className="flex flex-col gap-3 sm:flex-row sm:items-end">
                                            <div className="min-w-0 flex-1">
                                                <label
                                                    htmlFor="message"
                                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                                >
                                                    Your Reply
                                                </label>

                                                <textarea
                                                    id="message"
                                                    rows="3"
                                                    placeholder="Write a message..."
                                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow"
                                            >
                                                <Send size={17} />
                                                Post
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* <BaseFooter /> */}
        </>
    );
}

export default QADetail;