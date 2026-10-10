import React, { useState } from "react";
import { 
    FiLock, 
    FiCheckCircle 
} from "react-icons/fi";

import BaseHeader from "../partials/BaseHeader"
import Sidebar from './partials/Sidebar'
import Header from "./partials/Header";
import useAxios from "../../utils/useAxios"
import UserData from "../plugin/UserData"

import Toast from "../plugin/Toast";

function ChangePassword() {
    const [password, setPassword] = useState({
        old_password: "",
        new_password: "",
        confirm_new_password: "",
    });

    const handlePasswordChange = (event) => {
        setPassword({
            ...password,
            [event.target.name]: event.target.value,
        });
    };
    console.log(password);

    const changePasswordSubmit = async (e) => {
        e.preventDefault();

        if (password.confirm_new_password !== password.new_password) {
            Toast().fire({
                icon: "error",
                title: "Password does not match",
            });
            return;
        }

        const formdata = new FormData();
        formdata.append("user_id", UserData()?.user_id);
        formdata.append("old_password", password.old_password);
        formdata.append("new_password", password.new_passowrd);

        await useAxios.post(`user/change-password/`, formdata).then((res) => {
            console.log(res.data);
            Toast().fire({
                icon: res.data.icon,
                title: res.data.message,
            });
        });
    };

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
                        
                        {/* Change Password Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            
                            {/* Card Header */}
                            <div className="p-6 border-b border-slate-100">
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Change Password</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Update your account password securely.</p>
                            </div>

                            {/* Card Body / Form */}
                            <form className="p-6 space-y-6" onSubmit={changePasswordSubmit}>
                                <div className="space-y-4">
                                    
                                    {/* Old Password */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2" htmlFor="old_password">
                                            Old Password
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <FiLock className="w-4 h-4" />
                                            </span>
                                            <input 
                                                type="password" 
                                                id="old_password" 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all" 
                                                placeholder="**************" 
                                                required 
                                                name="old_password" 
                                                value={password.old_password} 
                                                onChange={handlePasswordChange} 
                                            />
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2" htmlFor="new_password">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <FiLock className="w-4 h-4" />
                                            </span>
                                            <input 
                                                type="password" 
                                                id="new_password" 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all" 
                                                placeholder="**************" 
                                                required 
                                                name="new_password" 
                                                value={password.new_passowrd} 
                                                onChange={handlePasswordChange} 
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2" htmlFor="confirm_new_password">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <FiLock className="w-4 h-4" />
                                            </span>
                                            <input 
                                                type="password" 
                                                id="confirm_new_password" 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all" 
                                                placeholder="**************" 
                                                required 
                                                name="confirm_new_password" 
                                                value={password.confirm_new_password} 
                                                onChange={handlePasswordChange} 
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button 
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20" 
                                            type="submit"
                                        >
                                            <span>Save New Password</span>
                                            <FiCheckCircle className="w-4 h-4" />
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </main>

            {/* <BaseFooter /> */}
        </div>
    );
}

export default ChangePassword;