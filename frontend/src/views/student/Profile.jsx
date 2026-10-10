import React, { useState, useEffect, useContext } from "react";
import { 
    FiUser, 
    FiCheckCircle, 
    FiUpload, 
    FiGlobe, 
    FiFileText 
} from "react-icons/fi";

import BaseHeader from "../partials/BaseHeader"
import Sidebar from './partials/Sidebar'
import Header from "./partials/Header";
import useAxios from "../../utils/useAxios"
import UserData from "../plugin/UserData"

import Toast from "../plugin/Toast"
import { ProfileContext } from "../plugin/Context"

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
        useAxios.get(`user/profile/${UserData()?.user_id}/`).then((res) => {
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
        setProfileData({
            ...profileData,
            [event.target.name]: selectedFile,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const res = await useAxios.get(`user/profile/${UserData()?.user_id}/`);
        const formdata = new FormData();
        if (profileData.image && profileData.image !== res.data.image) {
            formdata.append("image", profileData.image);
        }

        formdata.append("full_name", profileData.full_name);
        formdata.append("about", profileData.about);
        formdata.append("country", profileData.country);

        await useAxios
            .patch(`user/profile/${UserData()?.user_id}/`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
                setProfile(res.data);
            });
    };

    console.log(imagePreview);

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
                        
                        {/* Profile Settings Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            
                            {/* Card Header */}
                            <div className="p-6 border-b border-slate-100">
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Profile Details</h1>
                                <p className="text-sm text-slate-500 mt-0.5">You have full control to manage your own account setting.</p>
                            </div>

                            {/* Card Body / Form */}
                            <form className="p-6 space-y-6" onSubmit={handleFormSubmit}>
                                
                                {/* Avatar Section */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <img
                                            src={imagePreview}
                                            id="img-uploaded"
                                            className="w-[100px] h-[100px] rounded-full object-cover shadow-sm border-2 border-slate-100 flex-shrink-0"
                                            alt="avatar"
                                        />
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-slate-900">Your avatar</h3>
                                            <p className="text-xs text-slate-500">PNG or JPG no bigger than 800px wide and tall.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-all duration-200 shadow-sm">
                                            <FiUpload className="w-4 h-4" />
                                            <span>Upload New Image</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                name="image" 
                                                onChange={handleFileChange} 
                                            />
                                        </label>
                                    </div>
                                </div>

                                <hr className="border-slate-100 my-6" />

                                {/* Personal Details Section */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Personal Details</h3>
                                        <p className="text-sm text-slate-500">Edit your personal information and address.</p>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2" htmlFor="fname">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                    <FiUser className="w-4 h-4" />
                                                </span>
                                                <input 
                                                    type="text" 
                                                    id="fname" 
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all" 
                                                    placeholder="Full Name" 
                                                    required 
                                                    value={profileData.full_name} 
                                                    onChange={handleProfileChange} 
                                                    name="full_name" 
                                                />
                                            </div>
                                        </div>

                                        {/* About Me */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2" htmlFor="lname">
                                                About Me
                                            </label>
                                            <div className="relative">
                                                <span className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                                                    <FiFileText className="w-4 h-4" />
                                                </span>
                                                <textarea 
                                                    onChange={handleProfileChange} 
                                                    name="about" 
                                                    id="lname" 
                                                    rows="4" 
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all resize-y" 
                                                    value={profileData.about}
                                                    placeholder="Write a short description about yourself..."
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2" htmlFor="editCountry">
                                                Country
                                            </label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                    <FiGlobe className="w-4 h-4" />
                                                </span>
                                                <input 
                                                    type="text" 
                                                    id="country" 
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all" 
                                                    placeholder="Country" 
                                                    required 
                                                    value={profileData.country} 
                                                    onChange={handleProfileChange} 
                                                    name="country" 
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-4">
                                            <button 
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20" 
                                                type="submit"
                                            >
                                                <span>Update Profile</span>
                                                <FiCheckCircle className="w-4 h-4" />
                                            </button>
                                        </div>
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

export default Profile;
