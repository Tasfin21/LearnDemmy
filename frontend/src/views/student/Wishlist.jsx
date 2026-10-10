import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { 
    FiHeart, 
    FiShoppingCart, 
    FiArrowRight, 
    FiUser 
} from "react-icons/fi";

import BaseHeader from "../partials/BaseHeader"
import Sidebar from './partials/Sidebar'
import Header from "./partials/Header";
import useAxios from "../../utils/useAxios"
import UserData from "../plugin/UserData"

import CartId from '../plugin/CartId'
import GetCurrentAddress from '../plugin/UserCountry'
import { CartContext } from "../plugin/Context";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [cartCount, setCartCount] = useContext(CartContext);

    const fetchWishlist = () => {
        useAxios.get(`student/wishlist/${UserData()?.user_id}/`).then((res) => {
            console.log(res.data);
            setWishlist(res.data);
        });
    };
    const country = GetCurrentAddress()?.country;

    useEffect(() => {
        fetchWishlist();
    }, []);

    const addToCart = async (courseId, userId, price, country, cartId) => {
        const formdata = new FormData();

        formdata.append("course_id", courseId);
        formdata.append("user_id", userId);
        formdata.append("price", price);
        formdata.append("country_name", country);
        formdata.append("cart_id", cartId);

        try {
            await useAxios.post(`course/cart/`, formdata).then((res) => {
                console.log(res.data);
                Toast().fire({
                    title: "Added To Cart",
                    icon: "success",
                });

                // Set cart count after adding to cart
                useAxios
                    .get(`course/cart-list/${CartId()}/`)
                    .then((res) => {
                        setCartCount(res.data?.length);
                    });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToWishlist = (courseId) => {
        const formdata = new FormData();
        formdata.append("user_id", UserData()?.user_id);
        formdata.append("course_id", courseId);

        useAxios.post(`student/wishlist/${UserData()?.user_id}/`, formdata).then((res) => {
            console.log(res.data);
            fetchWishlist();
            Toast().fire({
                icon: "success",
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
                        
                        {/* Page Title */}
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                            <FiHeart className="w-6 h-6 text-slate-900 fill-slate-900" />
                            <span>Wishlist</span>
                        </h1>

                        {/* Wishlist Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlist?.map((w, index) => (
                                <div 
                                    key={w.course?.id || index}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md group"
                                >
                                    {/* Card Image */}
                                    <div className="relative overflow-hidden aspect-video">
                                        <Link to={`/course-detail/${w.course.slug}/`}>
                                            <img
                                                src={w.course.image}
                                                alt="course"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-3">
                                            {/* Badges & Favorite Toggle */}
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="px-2.5 py-1 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-lg uppercase tracking-wider">
                                                        {w.course.level}
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg uppercase tracking-wider">
                                                        {w.course.language}
                                                    </span>
                                                </div>
                                                <button 
                                                    onClick={() => addToWishlist(w.course?.id)} 
                                                    className="text-rose-500 hover:text-rose-600 transition-colors p-1"
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <FiHeart className="w-5 h-5 fill-rose-500" />
                                                </button>
                                            </div>

                                            {/* Course Title */}
                                            <h3 className="font-bold text-slate-900 line-clamp-2 leading-snug">
                                                <Link to={`/course-detail/${w.course.slug}/`} className="hover:text-slate-600 transition-colors">
                                                    {w.course.title}
                                                </Link>
                                            </h3>

                                            {/* Instructor & Students Info */}
                                            <div className="text-xs text-slate-500 space-y-0.5">
                                                <p className="font-medium text-slate-700">By: {w.course?.teacher?.full_name}</p>
                                                <p>
                                                    {w.course.students?.length || 0} Student
                                                    {w.course.students?.length > 1 && "s"}
                                                </p>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 pt-1">
                                                <span className="text-amber-500 text-sm">
                                                    <Rater total={5} rating={w.course.average_rating || 0} interactive={false} />
                                                </span>
                                                <span className="text-xs font-bold text-slate-700">4.5</span>
                                                <span className="text-xs text-slate-400">({w.course.reviews?.length || 0} Reviews)</span>
                                            </div>
                                        </div>

                                        {/* Card Footer */}
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                            <h4 className="text-lg font-bold text-slate-900">${w.course.price}</h4>
                                            
                                            <div className="flex items-center gap-2">
                                                {/* Add to Cart Button */}
                                                <button 
                                                    type="button" 
                                                    onClick={() => addToCart(w.course.id, UserData()?.user_id, w.course.price, country, CartId())} 
                                                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm transition-all duration-200"
                                                    title="Add to Cart"
                                                >
                                                    <FiShoppingCart className="w-4 h-4" />
                                                </button>

                                                {/* Enroll Now Button */}
                                                <Link 
                                                    to={`/course-detail/${w.course.slug}/`} 
                                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-200"
                                                >
                                                    <span>Enroll</span>
                                                    <FiArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty Wishlist State */}
                        {wishlist.length < 1 && (
                            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100 text-slate-500 font-medium">
                                No item in wishlist
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* <BaseFooter /> */}
        </div>
    );
}

export default Wishlist;