import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { 
    FiPlay, 
    FiLock, 
    FiBookOpen, 
    FiFileText, 
    FiMessageSquare, 
    FiStar, 
    FiChevronDown 
} from "react-icons/fi";
import BaseHeader from "../../partials/BaseHeader";
import Sidebar from "./Sidebar";
import Header from "./Header";

function StudentCourseLectureDetail() {
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
                        
                        {/* Video Player Section */}
                        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm aspect-video">
                            <ReactPlayer 
                                url="https://www.youtube.com/watch?v=LXb3EKWsInQ" 
                                width="100%" 
                                height="100%" 
                                controls={true}
                            />
                        </div>

                        {/* Course Content & Tabs Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            
                            {/* Tabs Header */}
                            <div className="border-b border-slate-100 px-6 pt-4">
                                <ul className="flex flex-wrap gap-6 text-sm font-semibold border-b border-transparent -mb-px" role="tablist">
                                    <li role="presentation">
                                        <button className="flex items-center gap-2 pb-3 border-b-2 border-slate-900 text-slate-900 transition-colors" id="course-pills-tab-1" type="button" role="tab">
                                            <FiBookOpen className="w-4 h-4" />
                                            <span>Course Lectures</span>
                                        </button>
                                    </li>
                                    <li role="presentation">
                                        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-colors" id="course-pills-tab-2" type="button" role="tab">
                                            <FiFileText className="w-4 h-4" />
                                            <span>Notes</span>
                                        </button>
                                    </li>
                                    <li role="presentation">
                                        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-colors" id="course-pills-tab-3" type="button" role="tab">
                                            <FiMessageSquare className="w-4 h-4" />
                                            <span>Discussion</span>
                                        </button>
                                    </li>
                                    <li role="presentation">
                                        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-colors" id="course-pills-tab-4" type="button" role="tab">
                                            <FiStar className="w-4 h-4" />
                                            <span>Leave a Review</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Tab Contents */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    
                                    {/* Accordion Item 1 */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-900 text-sm">
                                            <span>Introduction of Digital Marketing <span className="text-xs font-normal text-slate-500 ml-1">(3 Lectures)</span></span>
                                        </div>
                                        <div className="divide-y divide-slate-100 text-sm">
                                            
                                            {/* Lecture 1 */}
                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                        <FiPlay className="w-3.5 h-3.5 fill-rose-600" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">Introduction</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">2m 10s</span>
                                            </div>

                                            {/* Lecture 2 */}
                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                        <FiPlay className="w-3.5 h-3.5 fill-rose-600" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">What is Digital Marketing</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">15m 10s</span>
                                            </div>

                                            {/* Lecture 3 */}
                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0">
                                                        <FiLock className="w-3.5 h-3.5" />
                                                    </span>
                                                    <span className="font-medium text-slate-400">Type of Digital Marketing</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-400">18m 10s</span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Accordion Item 2 */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-900 text-sm">
                                            <span>Customer Life cycle <span className="text-xs font-normal text-slate-500 ml-1">(4 Lectures)</span></span>
                                        </div>
                                        <div className="divide-y divide-slate-100 text-sm">
                                            
                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                        <FiPlay className="w-3.5 h-3.5 fill-rose-600" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">What is Digital Marketing</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">11m 20s</span>
                                            </div>

                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                        <FiPlay className="w-3.5 h-3.5 fill-rose-600" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">15 Tips for Writing Magnetic Headlines</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">25m 20s</span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Accordion Item 3 */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-900 text-sm">
                                            <span>What is Search Engine Optimization (SEO) <span className="text-xs font-normal text-slate-500 ml-1">(10 Lectures)</span></span>
                                        </div>
                                        <div className="divide-y divide-slate-100 text-sm">
                                            
                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                        <FiPlay className="w-3.5 h-3.5 fill-rose-600" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">Introduction</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">1m 10s</span>
                                            </div>

                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                        <FiPlay className="w-3.5 h-3.5 fill-rose-600" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">Overview of SEO</span>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">11m 03s</span>
                                            </div>

                                            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                                                        <FiLock className="w-3.5 h-3.5" />
                                                    </span>
                                                    <span className="font-medium text-slate-800">How to Flip Features Into Benefits</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold uppercase tracking-wider rounded">Premium</span>
                                                    <span className="text-xs font-medium text-slate-500">35m 30s</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>

            {/* <BaseFooter /> */}
        </div>
    );
}

export default StudentCourseLectureDetail;