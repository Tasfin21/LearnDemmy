import React, { useState, useEffect, useContext } from "react";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import { ProfileContext } from "../plugin/Context";

import { Camera, CheckCircle, UserRound } from "lucide-react";

function Profile() {
    const [profile, setProfile] = useContext(ProfileContext);

    const [profileData, setProfileData] = useState({
        image: "",
        full_name: "",
        about: "",
        country: "",
    });

    const [imagePreview, setImagePreview] = useState("");

    const fetchProfile = () => {
        useAxios
            .get(`user/profile/${UserData()?.user_id}/`)
            .then((res) => {
                console.log(res.data);

                setProfile(res.data);
                setProfileData(res.data);
                setImagePreview(res.data.image);
            });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleProfileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        setProfileData({
            ...profileData,
            [event.target.name]: selectedFile,
        });

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(selectedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const res = await useAxios.get(
            `user/profile/${UserData()?.user_id}/`
        );

        const formdata = new FormData();

        if (
            profileData.image &&
            profileData.image !== res.data.image
        ) {
            formdata.append("image", profileData.image);
        }

        formdata.append("full_name", profileData.full_name);
        formdata.append("about", profileData.about);
        formdata.append("country", profileData.country);

        await useAxios
            .patch(
                `user/profile/${UserData()?.user_id}/`,
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setProfile(res.data);
                setProfileData(res.data);
                setImagePreview(res.data.image);
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
                                    <UserRound size={20} />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        Profile Details
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage your personal information and
                                        account settings.
                                    </p>
                                </div>
                            </div>

                            {/* Profile Card */}
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                {/* Card Header */}
                                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Profile Details
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        You have full control to manage your
                                        account settings.
                                    </p>
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={handleFormSubmit}
                                    className="p-5 sm:p-6"
                                >

                                    {/* Avatar Section */}
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">

                                            {/* Avatar */}
                                            <div className="relative">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Profile avatar"
                                                        className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-100"
                                                    />
                                                ) : (
                                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-4 ring-slate-50">
                                                        <UserRound size={36} />
                                                    </div>
                                                )}

                                                <label
                                                    htmlFor="profile-image"
                                                    className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700"
                                                >
                                                    <Camera size={15} />
                                                </label>

                                                <input
                                                    type="file"
                                                    id="profile-image"
                                                    name="image"
                                                    accept="image/png,image/jpeg"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </div>

                                            {/* Avatar Info */}
                                            <div>
                                                <h3 className="text-base font-semibold text-slate-900">
                                                    Your Avatar
                                                </h3>

                                                <p className="mt-1 max-w-md text-sm text-slate-500">
                                                    Upload a PNG or JPG image.
                                                    Recommended image size is
                                                    no larger than 800px wide
                                                    and tall.
                                                </p>

                                                <label
                                                    htmlFor="profile-image"
                                                    className="mt-3 inline-flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    Choose Image
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-8 border-t border-slate-200" />

                                    {/* Personal Details */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            Personal Details
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Edit your personal information and
                                            address.
                                        </p>

                                        {/* Form Fields */}
                                        <div className="mt-6 space-y-5">

                                            {/* Full Name */}
                                            <div>
                                                <label
                                                    htmlFor="full_name"
                                                    className="mb-2 block text-sm font-medium text-slate-700"
                                                >
                                                    Full Name
                                                </label>

                                                <input
                                                    type="text"
                                                    id="full_name"
                                                    name="full_name"
                                                    placeholder="Enter your full name"
                                                    required
                                                    value={
                                                        profileData.full_name
                                                    }
                                                    onChange={
                                                        handleProfileChange
                                                    }
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                                />
                                            </div>

                                            {/* About */}
                                            <div>
                                                <label
                                                    htmlFor="about"
                                                    className="mb-2 block text-sm font-medium text-slate-700"
                                                >
                                                    About Me
                                                </label>

                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows="5"
                                                    placeholder="Tell us a little about yourself..."
                                                    value={profileData.about}
                                                    onChange={
                                                        handleProfileChange
                                                    }
                                                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                                />
                                            </div>

                                            {/* Country */}
                                            <div>
                                                <label
                                                    htmlFor="country"
                                                    className="mb-2 block text-sm font-medium text-slate-700"
                                                >
                                                    Country
                                                </label>

                                                <input
                                                    type="text"
                                                    id="country"
                                                    name="country"
                                                    placeholder="Enter your country"
                                                    required
                                                    value={
                                                        profileData.country
                                                    }
                                                    onChange={
                                                        handleProfileChange
                                                    }
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <div className="mt-7">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100"
                                            >
                                                <CheckCircle size={17} />
                                                Update Profile
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* <BaseFooter /> */}
        </>
    );
}

export default Profile;