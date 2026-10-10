import React from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiSend } from "react-icons/fi";

import Sidebar from "./Sidebar"
import Header from "./Header"
import BaseHeader from "../../partials/BaseHeader"

function QADetail() {
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
                            <span>Q/A - Angular Masterclass Course</span>
                        </h1>

                        {/* Card Container */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                            
                            {/* Card Header */}
                            <div className="p-6 border-b border-slate-100 space-y-1">
                                <p className="text-sm font-medium text-slate-700">
                                    Course: <span className="font-bold text-slate-900">Angular Masterclass Course</span>
                                </p>
                                <p className="text-sm font-medium text-slate-700">
                                    Questions: <span className="font-bold text-slate-900">16</span>
                                </p>
                            </div>

                            {/* Chat / Comment Stream */}
                            <div className="p-4 sm:p-6 space-y-6 flex-1">
                                <ul className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                                    
                                    {/* Comment Item 1 */}
                                    <li className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <a href="#">
                                                <img 
                                                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-100" 
                                                    src="https://desphixs.com/geeks/assets/images/avatar/avatar-2.jpg" 
                                                    alt="Jenny Adga" 
                                                />
                                            </a>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="font-bold text-slate-900 text-sm">
                                                        <a href="#!" className="hover:text-slate-600 transition-colors">
                                                            Jenny Adga
                                                        </a>
                                                    </h6>
                                                    <span className="text-xs text-slate-400 font-medium">5hrs Ago</span>
                                                </div>
                                                <p className="text-sm text-slate-600">Removed demands expense account</p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Comment Item 2 */}
                                    <li className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <a href="#">
                                                <img 
                                                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-100" 
                                                    src="https://desphixs.com/geeks/assets/images/avatar/avatar-1.jpg" 
                                                    alt="Sam Freddy" 
                                                />
                                            </a>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="font-bold text-slate-900 text-sm">
                                                        <a href="#!" className="hover:text-slate-600 transition-colors">
                                                            Sam Freddy
                                                        </a>
                                                    </h6>
                                                    <span className="text-xs text-slate-400 font-medium">5hrs Ago</span>
                                                </div>
                                                <p className="text-sm text-slate-600">Removed demands expense account from the debby building in a hall town tak with</p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Comment Item 3 */}
                                    <li className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <a href="#">
                                                <img 
                                                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-100" 
                                                    src="https://desphixs.com/geeks/assets/images/avatar/avatar-3.jpg" 
                                                    alt="Louis Ferguson" 
                                                />
                                            </a>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="font-bold text-slate-900 text-sm">
                                                        <a href="#!" className="hover:text-slate-600 transition-colors">
                                                            Louis Ferguson
                                                        </a>
                                                    </h6>
                                                    <span className="text-xs text-slate-400 font-medium">5hrs Ago</span>
                                                </div>
                                                <p className="text-sm text-slate-600">Removed demands expense account</p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Comment Item 4 */}
                                    <li className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <a href="#">
                                                <img 
                                                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-100" 
                                                    src="https://desphixs.com/geeks/assets/images/avatar/avatar-3.jpg" 
                                                    alt="Louis Ferguson" 
                                                />
                                            </a>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="font-bold text-slate-900 text-sm">
                                                        <a href="#!" className="hover:text-slate-600 transition-colors">
                                                            Louis Ferguson
                                                        </a>
                                                    </h6>
                                                    <span className="text-xs text-slate-400 font-medium">5hrs Ago</span>
                                                </div>
                                                <p className="text-sm text-slate-600">Removed demands expense account</p>
                                            </div>
                                        </div>
                                    </li>

                                </ul>

                                {/* Reply / Message Form */}
                                <form className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <textarea 
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all resize-none" 
                                            id="autoheighttextarea" 
                                            rows="2" 
                                            placeholder="Write a message..."
                                        ></textarea>
                                    </div>
                                    <div className="flex-shrink-0 flex items-start">
                                        <button 
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200" 
                                            type="button"
                                        >
                                            <span>Post</span>
                                            <FiSend className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </main>

            <BaseFooter />
        </div>
    );
}

export default QADetail