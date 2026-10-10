import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Trash2,
    ArrowRight,
    User,
    Mail,
    Globe,
    CreditCard,
    ShieldCheck,
    BookOpen,
    ChevronRight,
} from "lucide-react";

import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
import apiInstance from "../../utils/axios";
import CartId from "../plugin/CartId";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import { userId } from "../../utils/constants";
import useAxios from "../../utils/useAxios";
import Swal from "sweetalert2";


function Cart() {
    const [cart, setCart] = useState([]);
    const [cartStats, setCartStats] = useState([]);

    const [cartCount, setCartCount] = useContext(CartContext);

    const [bioData, setBioData] = useState({
        full_name: "",
        email: "",
        country: "",
    });

    const navigate = useNavigate();


    // Fetch cart items and cart statistics
    const fetchCartItem = async () => {
        try {
            const cartResponse = await apiInstance.get(
                `course/cart-list/${CartId()}/`
            );

            setCart(cartResponse.data);

            const statsResponse = await apiInstance.get(
                `cart/stats/${CartId()}/`
            );

            setCartStats(statsResponse.data);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchCartItem();
    }, []);


    // Handle personal information
    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };


    // Delete cart item
    const cartItemDelete = async (itemId) => {
        try {
            await apiInstance.delete(
                `course/cart-item-delete/${CartId()}/${itemId}/`
            );

            await fetchCartItem();

            Toast().fire({
                icon: "success",
                title: "Cart Item Deleted",
            });

            const response = await apiInstance.get(
                `course/cart-list/${CartId()}/`
            );

            setCartCount(response.data?.length);

        } catch (error) {
            console.log(error);
        }
    };


    // Create order
    const createOrder = async (e) => {
        e.preventDefault();

        if (
            !bioData.full_name ||
            !bioData.email ||
            !bioData.country
        ) {
            Toast().fire({
                icon: "warning",
                title: "Please provide your bio data",
            });

            return;
        }

        const formdata = new FormData();

        formdata.append("full_name", bioData.full_name);
        formdata.append("email", bioData.email);
        formdata.append("country", bioData.country);
        formdata.append("cart_id", CartId());
        formdata.append("user_id", userId);

        try {
            const response = await useAxios.post(
                `order/create-order/`,
                formdata
            );

            navigate(`/checkout/${response.data.order_oid}/`);

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: error?.response?.data?.detail,
            });
        }
    };


    return (
        <>
            <BaseHeader />

            
            <section className="
            bg-slate-50 
            border-b 
            border-slate-200">
                <div className="
                mx-auto 
                max-w-7xl 
                px-4 
                py-12 
                sm:px-6 
                lg:px-8">

                    <div className="text-center">
                        <div className="
                        mb-3 
                        flex 
                        items-center 
                        justify-center 
                        gap-2 
                        text-sm 
                        text-slate-500">
                            <Link
                                to="/"
                                className="transition hover:text-emerald-600"
                            >
                                Home
                            </Link>

                            <ChevronRight size={15} />

                            <Link
                                to="/courses"
                                className="transition hover:text-emerald-600"
                            >
                                Courses
                            </Link>

                            <ChevronRight size={15} />

                            <span className="text-slate-800">
                                Cart
                            </span>
                        </div>

                        <div className="
                        mx-auto 
                        flex 
                        h-14 
                        w-14 
                        items-center 
                        justify-center 
                        rounded-2xl 
                        bg-emerald-100 
                        text-emerald-600">
                            <ShoppingCart size={26} />
                        </div>

                        <h1 className="
                        mt-4 
                        text-3xl 
                        font-bold 
                        tracking-tight 
                        text-slate-900 
                        sm:text-4xl">
                            My Cart
                        </h1>

                        <p className="
                        mx-auto 
                        mt-2 
                        max-w-xl 
                        
                        text-sm 
                        text-slate-500">
                            Review your courses and complete your purchase.
                        </p>
                    </div>

                </div>
            </section>


            
            <section className="
            bg-white 
            py-10 
            sm:py-14
            ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <form onSubmit={createOrder}>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                            
                            <div className="
                            space-y-8 
                            lg:col-span-2">

                                
                                <div className="
                                overflow-hidden 
                                rounded-2xl
                                border 
                                border-slate-200 
                                bg-white 
                                shadow-sm 
                                transition 
                                hover:shadow-md">

                                    <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                                        <div className="flex items-center justify-between">

                                            <div>
                                                <h2 className="text-lg font-semibold text-slate-900">
                                                    Cart Items
                                                </h2>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {cart?.length || 0}{" "}
                                                    {cart?.length === 1
                                                        ? "course"
                                                        : "courses"}{" "}
                                                    in your cart
                                                </p>
                                            </div>

                                            <div className="
                                            flex 
                                            h-10 
                                            w-10 
                                            items-center 
                                            justify-center 
                                            rounded-xl 
                                            bg-emerald-50 
                                            text-emerald-600">
                                                <BookOpen size={20} />
                                            </div>

                                        </div>
                                    </div>


                                    {/* items section here --> */}
                                    <div className="divide-y divide-slate-100">

                                        {cart?.map((c) => (
                                            <div
                                                key={c.id}
                                                className="
                                                group 
                                                flex 
                                                flex-col 
                                                gap-4 
                                                p-5 
                                                transition 
                                                hover:bg-slate-50 
                                                sm:flex-row 
                                                sm:items-center 
                                                sm:p-6"
                                            >

                                                {/* course image here --> */}
                                                <div className="shrink-0">
                                                    <img
                                                        src={c.course.image}
                                                        alt={c.course.title}
                                                        className="
                                                        h-24 
                                                        w-full 
                                                        rounded-xl 
                                                        object-cover 
                                                        shadow-sm 
                                                        transition 
                                                        duration-300 
                                                        group-hover:scale-[1.02] 
                                                        sm:h-20 
                                                        sm:w-32"
                                                    />
                                                </div>


                                                {/* course information here --> */}
                                                <div className="min-w-0 flex-1">

                                                    <Link
                                                        to={`/course-detail/${c.course.slug || ""}`}
                                                        className="
                                                        line-clamp-2 
                                                        text-base 
                                                        font-semibold 
                                                        text-slate-900 
                                                        transition 
                                                        hover:text-emerald-600"
                                                    >
                                                        {c.course.title}
                                                    </Link>

                                                    <p className="mt-2 text-sm text-slate-500">
                                                        Digital course
                                                    </p>

                                                </div>


                                                {/* price option here --> */}
                                                <div className="
                                                flex 
                                                items-center 
                                                justify-between 
                                                gap-5 
                                                sm:flex-col 
                                                sm:items-end">

                                                    <p className="text-lg font-bold text-emerald-600">
                                                        ${Number(c.price).toFixed(2)}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            cartItemDelete(c.id)
                                                        }
                                                        className="
                                                        flex 
                                                        h-9 
                                                        w-9 
                                                        items-center 
                                                        justify-center 
                                                        rounded-lg 
                                                        border 
                                                        border-red-100 
                                                        bg-red-50 
                                                        text-red-500 
                                                        transition 
                                                        hover:border-red-200 
                                                        hover:bg-red-100 
                                                        hover:text-red-600 
                                                        active:scale-95"
                                                        title="Remove item"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>

                                                </div>

                                            </div>
                                        ))}


                                        {/* empty cart code here --> */}
                                        {cart?.length < 1 && (
                                            <div className="
                                            flex 
                                            flex-col 
                                            items-center 
                                            justify-center 
                                            px-6 
                                            py-16 
                                            text-center">

                                                <div className="
                                                flex 
                                                h-16 
                                                w-16 
                                                items-center 
                                                justify-center 
                                                rounded-2xl 
                                                bg-slate-100 
                                                text-slate-400">
                                                    <ShoppingCart size={28} />
                                                </div>

                                                <h3 className="
                                                mt-5 
                                                text-lg 
                                                font-semibold 
                                                text-slate-900">
                                                    Your cart is empty
                                                </h3>

                                                <p className="
                                                mt-2 
                                                max-w-sm 
                                                text-sm 
                                                text-slate-500">
                                                    You haven't added any courses
                                                    to your cart yet.
                                                </p>

                                                <Link
                                                    to="/courses"
                                                    className="
                                                    mt-6 
                                                    inline-flex 
                                                    items-center 
                                                    gap-2 
                                                    rounded-xl 
                                                    bg-emerald-600 
                                                    px-5 
                                                    py-3 
                                                    text-sm 
                                                    font-semibold 
                                                    text-white 
                                                    transition 
                                                    hover:bg-emerald-700 
                                                    active:scale-95"
                                                >
                                                    Browse Courses
                                                    <ArrowRight size={17} />
                                                </Link>

                                            </div>
                                        )}

                                    </div>

                                </div>


                                {/* personal detail here */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="mb-6 flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <User size={19} />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900">
                                                Personal Details
                                            </h2>

                                            <p className="text-sm text-slate-500">
                                                Enter your information for the order.
                                            </p>
                                        </div>

                                    </div>


                                    <div className="space-y-5">

                                        {/* name */}
                                        <div>
                                            <label
                                                htmlFor="yourName"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Your name
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">

                                                <User
                                                    size={18}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                />

                                                <input
                                                    type="text"
                                                    id="yourName"
                                                    name="full_name"
                                                    placeholder="Enter your name"
                                                    value={bioData.full_name}
                                                    onChange={handleBioDataChange}
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                                />

                                            </div>
                                        </div>


                                        {/* email */}
                                        <div>
                                            <label
                                                htmlFor="emailInput"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Email address
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">

                                                <Mail
                                                    size={18}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                />

                                                <input
                                                    type="email"
                                                    id="emailInput"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    value={bioData.email}
                                                    onChange={handleBioDataChange}
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                                />

                                            </div>
                                        </div>


                                        {/* country */}
                                        <div>
                                            <label
                                                htmlFor="countryInput"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Country
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">

                                                <Globe
                                                    size={18}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                />

                                                <input
                                                    type="text"
                                                    id="countryInput"
                                                    name="country"
                                                    placeholder="Enter your country"
                                                    value={bioData.country}
                                                    onChange={handleBioDataChange}
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                                />

                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>


                            
                            <div className="lg:col-span-1">

                                <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                    {/* header section here --> */}
                                    <div className="border-b border-slate-200 p-6">

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Cart Total
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Your order summary
                                        </p>

                                    </div>


                                    {/* summary section here --> */}
                                    <div className="space-y-4 p-6">

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">
                                                Sub Total
                                            </span>

                                            <span className="font-medium text-slate-900">
                                                $
                                                {Number(
                                                    cartStats.price || 0
                                                ).toFixed(2)}
                                            </span>
                                        </div>


                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">
                                                Tax
                                            </span>

                                            <span className="font-medium text-slate-900">
                                                $
                                                {Number(
                                                    cartStats.tax || 0
                                                ).toFixed(2)}
                                            </span>
                                        </div>


                                        <div className="border-t border-dashed border-slate-200 pt-4">

                                            <div className="flex items-center justify-between">

                                                <span className="font-semibold text-slate-900">
                                                    Total
                                                </span>

                                                <span className="text-2xl font-bold text-emerald-600">
                                                    $
                                                    {Number(
                                                        cartStats.total || 0
                                                    ).toFixed(2)}
                                                </span>

                                            </div>

                                        </div>


                                        {/* checkout button here */}
                                        <button
                                            type="submit"
                                            disabled={cart?.length < 1}
                                            className="
                                            group 
                                            mt-3 
                                            flex 
                                            w-full 
                                            items-center 
                                            justify-center 
                                            gap-2 
                                            rounded-xl 
                                            bg-emerald-600 
                                            px-5 
                                            py-3.5 
                                            text-sm 
                                            font-semibold 
                                            text-white 
                                            shadow-sm 
                                            transition 
                                            duration-200 
                                            hover:bg-emerald-700 
                                            hover:shadow-lg 
                                            hover:shadow-emerald-600/20 
                                            active:scale-[0.98] 
                                            disabled:cursor-not-allowed 
                                            disabled:bg-slate-300 
                                            disabled:shadow-none"
                                        >
                                            <CreditCard size={18} />

                                            Proceed to Checkout

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </button>


                                        {/* security option here --> */}
                                        <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">

                                            <ShieldCheck
                                                size={20}
                                                className="mt-0.5 shrink-0 text-emerald-600"
                                            />

                                            <p className="text-xs leading-5 text-slate-500">
                                                Your information is securely
                                                processed. By proceeding to
                                                checkout, you agree to our{" "}
                                                <Link
                                                    to="/terms"
                                                    className="font-semibold text-slate-700 underline underline-offset-2 transition hover:text-emerald-600"
                                                >
                                                    Terms of Service
                                                </Link>
                                                .
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </section>

            {/* <BaseFooter /> */}
        </>
    );
}


export default Cart;