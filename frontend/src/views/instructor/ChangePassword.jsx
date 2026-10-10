import React, { useState } from "react";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

import { CheckCircle, LockKeyhole } from "lucide-react";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
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
        formdata.append("new_password", password.new_password);

        await useAxios
            .post(`user/change-password/`, formdata)
            .then((res) => {
                console.log(res.data);

                Toast().fire({
                    icon: res.data.icon,
                    title: res.data.message,
                });
            });
    };

    return (
        <>
            <BaseHeader />

            <section className="pt-6 pb-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <Header />

                    {/* Main Layout */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">

                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content */}
                        <main className="min-w-0">

                            {/* Page Header */}
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <LockKeyhole size={20} />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        Change Password
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Update your account password
                                    </p>
                                </div>
                            </div>

                            {/* Card */}
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                {/* Card Header */}
                                <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Password Settings
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Enter your current password and choose a
                                        new password.
                                    </p>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 sm:p-6">

                                    <form
                                        className="space-y-5"
                                        onSubmit={changePasswordSubmit}
                                    >

                                        {/* Old Password */}
                                        <div>
                                            <label
                                                htmlFor="old_password"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Old Password
                                            </label>

                                            <input
                                                type="password"
                                                id="old_password"
                                                name="old_password"
                                                placeholder="Enter your old password"
                                                required
                                                value={password.old_password}
                                                onChange={handlePasswordChange}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            />
                                        </div>

                                        {/* New Password */}
                                        <div>
                                            <label
                                                htmlFor="new_password"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                New Password
                                            </label>

                                            <input
                                                type="password"
                                                id="new_password"
                                                name="new_password"
                                                placeholder="Enter your new password"
                                                required
                                                value={password.new_password}
                                                onChange={handlePasswordChange}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            />
                                        </div>

                                        {/* Confirm New Password */}
                                        <div>
                                            <label
                                                htmlFor="confirm_new_password"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Confirm New Password
                                            </label>

                                            <input
                                                type="password"
                                                id="confirm_new_password"
                                                name="confirm_new_password"
                                                placeholder="Confirm your new password"
                                                required
                                                value={
                                                    password.confirm_new_password
                                                }
                                                onChange={handlePasswordChange}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100"
                                            >
                                                <CheckCircle size={17} />
                                                Save New Password
                                            </button>
                                        </div>
                                    </form>
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

export default ChangePassword;