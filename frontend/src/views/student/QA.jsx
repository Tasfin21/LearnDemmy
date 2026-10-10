import React from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiArrowRight } from "react-icons/fi";

import BaseHeader from "../../partials/BaseHeader";
import Sidebar from "./Sidebar";
import Header from "./Header";

function QA() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <BaseHeader />

            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {/* Header Here */}
                <Header />

                <div className="mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Here */}
                    <Sidebar />

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Page Title */}
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                            <FiMessageSquare className="w-6 h-6 text-slate-900" />
                            <span>Question and Answer</span>
                        </h1>

                        {/* Card Container */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Discussions</h3>
                                <p className="text-sm text-slate-500">All Questions and Answers are listed here</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            <th className="py-3.5 px-6">Courses</th>
                                            <th className="py-3.5 px-6">Questions</th>
                                            <th className="py-3.5 px-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        
                                        {/* Row 1 */}
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <a href="#" className="flex-shrink-0">
                                                        <img 
                                                            src="https://desphixs.com/geeks/assets/images/course/course-angular.jpg" 
                                                            alt="course" 
                                                            className="w-[100px] h-[70px] rounded-xl object-cover shadow-sm border border-slate-100" 
                                                        />
                                                    </a>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900 leading-snug">
                                                            <a href="#" className="hover:text-slate-600 transition-colors">
                                                                Angular Masterclass Course
                                                            </a>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600 font-medium">
                                                5
                                            </td>
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <Link 
                                                    to={`/student/question-answer/course_id/`} 
                                                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-200"
                                                >
                                                    <span>Join Conversation</span>
                                                    <FiArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <a href="#" className="flex-shrink-0">
                                                        <img 
                                                            src="https://desphixs.com/geeks/assets/images/course/course-react.jpg" 
                                                            alt="course" 
                                                            className="w-[100px] h-[70px] rounded-xl object-cover shadow-sm border border-slate-100" 
                                                        />
                                                    </a>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900 leading-snug">
                                                            <a href="#" className="hover:text-slate-600 transition-colors">
                                                                Learn React for Beginners
                                                            </a>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600 font-medium">
                                                5
                                            </td>
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <Link 
                                                    to={`/student/question-answer/course_id/`} 
                                                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-200"
                                                >
                                                    <span>Join Conversation</span>
                                                    <FiArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* <BaseFooter /> */}
        </div>
    );
}

export default QA;