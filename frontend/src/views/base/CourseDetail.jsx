import BaseHeader from "../partials/BaseHeader";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import Toast from '../plugin/Toast'
import apiInstance from "../../utils/axios";
import { CartContext } from "../plugin/Context";

import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
import moment from "moment";

import {
    Star,
    Users,
    Signal,
    CalendarDays,
    Globe,
    Play,
    Lock,
    CheckCircle,
    ShoppingCart,
    Loader2,
    Share2,
    Copy,
    BookOpen,
    Clock,
    UserRound,
    X,
    ArrowRight,
    Send,
    ChevronDown,
    GraduationCap,
} from "lucide-react";

import {
    FaTwitter,
    FaFacebookF,
    FaLinkedinIn,
} from "react-icons/fa";


function CourseDetail() {
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [addToCartBtn, setAddToCartBtn] = useState("Add To Cart");

    const [cartCount, setCartCount] = useContext(CartContext);

    // UI states
    const [activeTab, setActiveTab] = useState("overview");
    const [openSections, setOpenSections] = useState({});
    const [showVideo, setShowVideo] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    const param = useParams();

    const country = GetCurrentAddress().country;
    const userId = UserData()?.user_id || 0;


    // --------------------------------------------------
    // Fetch course
    // --------------------------------------------------

    const fetchCourse = async () => {
        try {
            const response = await useAxios.get(
                `course/course-detail/${param.slug}/`
            );

            setCourse(response.data);
        } catch (error) {
            console.log("Course fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchCourse();
    }, [param.slug]);


    // --------------------------------------------------
    // Add course to cart
    // --------------------------------------------------

    const addToCart = async (
        courseId,
        userId,
        price,
        country,
        cartId
    ) => {
        setAddToCartBtn("Adding To Cart");

        const formdata = new FormData();

        formdata.append("course_id", courseId);
        formdata.append("user_id", userId);
        formdata.append("price", price);
        formdata.append("country_name", country);
        formdata.append("cart_id", cartId);

        try {
            const response = await useAxios.post(
                "course/cart/",
                formdata
            );

            console.log(response.data);

            setAddToCartBtn("Added To Cart");

            Toast().fire({
                title: "Added To Cart",
                icon: "success",
            });

            // Update cart count
            const cartResponse = await apiInstance.get(
                `course/cart-list/${CartId()}/`
            );

            setCartCount(cartResponse.data?.length);
        } catch (error) {
            console.log(error);

            setAddToCartBtn("Add To Cart");
        }
    };


    // --------------------------------------------------
    // Curriculum accordion
    // --------------------------------------------------

    const toggleSection = (sectionId) => {
        setOpenSections((previous) => ({
            ...previous,
            [sectionId]: !previous[sectionId],
        }));
    };


    // --------------------------------------------------
    // Share
    // --------------------------------------------------

    const copyCourseLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);

            Toast().fire({
                title: "Course link copied",
                icon: "success",
            });

            setShareOpen(false);
        } catch (error) {
            console.log(error);
        }
    };


    // --------------------------------------------------
    // Loading
    // --------------------------------------------------

    if (isLoading) {
        return (
            <>
                <BaseHeader />

                <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />

                        <p className="text-sm text-slate-500">
                            Loading course...
                        </p>
                    </div>
                </div>

                {/* <BaseFooter /> */}
            </>
        );
    }


    return (
        <>
            <BaseHeader />

            {/* =====================================================
                COURSE HERO
            ====================================================== */}

            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                    <div className="max-w-4xl">

                        {/* Category */}
                        <div className="mb-5">
                            <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
                                {course?.category?.title}
                            </span>
                        </div>


                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                            {course?.title}
                        </h1>


                        {/* Short description */}
                        <p
                            className="mt-5 max-w-3xl text-base sm:text-lg leading-7 text-slate-600"
                            dangerouslySetInnerHTML={{
                                __html: course?.description?.slice(0, 200),
                            }}
                        />


                        {/* Course meta */}
                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">

                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />

                                <span className="font-medium text-slate-900">
                                    {course?.average_rating}/5
                                </span>
                            </div>


                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-orange-500" />

                                <span>
                                    {course?.students?.length || 0} Enrolled
                                </span>
                            </div>


                            <div className="flex items-center gap-2">
                                <Signal className="w-4 h-4 text-green-600" />

                                <span>{course?.level}</span>
                            </div>


                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-red-500" />

                                <span>
                                    {moment(course?.date).format(
                                        "DD MMM, YYYY"
                                    )}
                                </span>
                            </div>


                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-500" />

                                <span>{course?.language}</span>
                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

            <section className="bg-white py-10 lg:py-16">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">


                        {/* =================================================
                            LEFT CONTENT
                        ================================================== */}

                        <div className="lg:col-span-8">

                            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">


                                {/* =================================================
                                    TABS
                                ================================================== */}

                                <div className="border-b border-slate-200 overflow-x-auto">

                                    <div className="flex min-w-max px-4 sm:px-6">

                                        {[
                                            {
                                                id: "overview",
                                                label: "Overview",
                                            },
                                            {
                                                id: "curriculum",
                                                label: "Curriculum",
                                            },
                                            {
                                                id: "instructor",
                                                label: "Instructor",
                                            },
                                            {
                                                id: "reviews",
                                                label: "Reviews",
                                            },
                                        ].map((tab) => (

                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() =>
                                                    setActiveTab(tab.id)
                                                }
                                                className={`
                                                    relative px-4 sm:px-5 py-5
                                                    text-sm font-medium
                                                    transition-colors duration-200
                                                    whitespace-nowrap
                                                    ${
                                                        activeTab === tab.id
                                                            ? "text-blue-600"
                                                            : "text-slate-500 hover:text-slate-900"
                                                    }
                                                `}
                                            >
                                                {tab.label}

                                                {activeTab === tab.id && (
                                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                                )}
                                            </button>

                                        ))}

                                    </div>

                                </div>


                                {/* =================================================
                                    TAB CONTENT
                                ================================================== */}

                                <div className="p-5 sm:p-7 lg:p-8">


                                    {/* =================================================
                                        OVERVIEW
                                    ================================================== */}

                                    {activeTab === "overview" && (

                                        <div className="animate-[fadeIn_0.25s_ease-out]">

                                            <h2 className="text-xl font-bold text-slate-900">
                                                Course Description
                                            </h2>

                                            <div
                                                className="
                                                    mt-5
                                                    prose prose-slate
                                                    max-w-none
                                                    prose-headings:text-slate-900
                                                    prose-p:text-slate-600
                                                    prose-p:leading-7
                                                    prose-a:text-blue-600
                                                "
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        course?.description ||
                                                        "",
                                                }}
                                            />

                                        </div>

                                    )}


                                    {/* =================================================
                                        CURRICULUM
                                    ================================================== */}

                                    {activeTab === "curriculum" && (

                                        <div className="animate-[fadeIn_0.25s_ease-out]">

                                            <h2 className="text-xl font-bold text-slate-900 mb-6">
                                                Course Curriculum
                                            </h2>


                                            <div className="space-y-3">

                                                {course?.curriculum?.map(
                                                    (section, index) => {

                                                        const sectionId =
                                                            section.variant_id ||
                                                            index;

                                                        const isOpen =
                                                            openSections[
                                                                sectionId
                                                            ] ?? true;

                                                        return (

                                                            <div
                                                                key={sectionId}
                                                                className="
                                                                    overflow-hidden
                                                                    rounded-xl
                                                                    border
                                                                    border-slate-200
                                                                    bg-slate-50/50
                                                                    transition-all
                                                                    duration-200
                                                                    hover:border-slate-300
                                                                "
                                                            >

                                                                {/* Section header */}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        toggleSection(
                                                                            sectionId
                                                                        )
                                                                    }
                                                                    className="
                                                                        flex
                                                                        w-full
                                                                        items-center
                                                                        justify-between
                                                                        gap-4
                                                                        px-4
                                                                        py-4
                                                                        text-left
                                                                        transition-colors
                                                                        hover:bg-slate-100
                                                                    "
                                                                >

                                                                    <div className="flex items-center gap-3 min-w-0">

                                                                        <div className="
                                                                            flex
                                                                            h-9
                                                                            w-9
                                                                            shrink-0
                                                                            items-center
                                                                            justify-center
                                                                            rounded-lg
                                                                            bg-blue-100
                                                                            text-blue-600
                                                                        ">
                                                                            <BookOpen className="w-4 h-4" />
                                                                        </div>


                                                                        <span className="font-semibold text-slate-900 truncate">
                                                                            {section.title}
                                                                        </span>

                                                                    </div>


                                                                    <ChevronDown
                                                                        className={`
                                                                            w-5 h-5
                                                                            shrink-0
                                                                            text-slate-400
                                                                            transition-transform
                                                                            duration-200
                                                                            ${
                                                                                isOpen
                                                                                    ? "rotate-180"
                                                                                    : ""
                                                                            }
                                                                        `}
                                                                    />

                                                                </button>


                                                                {/* Lectures */}

                                                                <div
                                                                    className={`
                                                                        grid
                                                                        transition-[grid-template-rows]
                                                                        duration-300
                                                                        ${
                                                                            isOpen
                                                                                ? "grid-rows-[1fr]"
                                                                                : "grid-rows-[0fr]"
                                                                        }
                                                                    `}
                                                                >

                                                                    <div className="overflow-hidden">

                                                                        <div className="border-t border-slate-200 px-4">

                                                                            {section?.variant_items?.map(
                                                                                (
                                                                                    lecture,
                                                                                    lectureIndex
                                                                                ) => (

                                                                                    <div
                                                                                        key={
                                                                                            lecture.id ||
                                                                                            lectureIndex
                                                                                        }
                                                                                        className="
                                                                                            flex
                                                                                            items-center
                                                                                            justify-between
                                                                                            gap-4
                                                                                            py-4
                                                                                            border-b
                                                                                            border-slate-200
                                                                                            last:border-b-0
                                                                                        "
                                                                                    >

                                                                                        <div className="flex min-w-0 items-center gap-3">

                                                                                            <div
                                                                                                className={`
                                                                                                    flex
                                                                                                    h-9
                                                                                                    w-9
                                                                                                    shrink-0
                                                                                                    items-center
                                                                                                    justify-center
                                                                                                    rounded-full
                                                                                                    ${
                                                                                                        lecture.preview
                                                                                                            ? "bg-red-50 text-red-500"
                                                                                                            : "bg-slate-100 text-slate-500"
                                                                                                    }
                                                                                                `}
                                                                                            >

                                                                                                {lecture.preview ? (
                                                                                                    <Play className="w-4 h-4 fill-current" />
                                                                                                ) : (
                                                                                                    <Lock className="w-4 h-4" />
                                                                                                )}

                                                                                            </div>


                                                                                            <span className="truncate text-sm font-medium text-slate-700">
                                                                                                {
                                                                                                    lecture.title
                                                                                                }
                                                                                            </span>

                                                                                        </div>


                                                                                        <span className="shrink-0 text-xs text-slate-500">
                                                                                            {
                                                                                                section.content_duration
                                                                                            }
                                                                                        </span>

                                                                                    </div>

                                                                                )
                                                                            )}

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        );
                                                    }
                                                )}

                                            </div>

                                        </div>

                                    )}


                                    {/* =================================================
                                        INSTRUCTOR
                                    ================================================== */}

                                    {activeTab === "instructor" && (

                                        <div className="animate-[fadeIn_0.25s_ease-out]">

                                            <div className="overflow-hidden rounded-2xl border border-slate-200">

                                                <div className="grid grid-cols-1 md:grid-cols-5">

                                                    {/* Instructor image */}

                                                    <div className="md:col-span-2">

                                                        <img
                                                            src={
                                                                course?.teacher
                                                                    ?.image
                                                            }
                                                            alt="Instructor"
                                                            className="
                                                                h-full
                                                                min-h-[280px]
                                                                w-full
                                                                object-cover
                                                            "
                                                        />

                                                    </div>


                                                    {/* Instructor info */}

                                                    <div className="md:col-span-3 p-6 sm:p-8">

                                                        <h3 className="text-2xl font-bold text-slate-900">
                                                            {
                                                                course?.teacher
                                                                    ?.full_name
                                                            }
                                                        </h3>

                                                        <p className="mt-3 leading-7 text-slate-600">
                                                            {
                                                                course?.teacher
                                                                    ?.bio
                                                            }
                                                        </p>


                                                        {/* Social links */}

                                                        <div className="mt-6 flex items-center gap-3">

                                                            {course?.teacher
                                                                ?.twitter && (

                                                                <a
                                                                    href={
                                                                        course
                                                                            .teacher
                                                                            .twitter
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="
                                                                        flex
                                                                        h-10
                                                                        w-10
                                                                        items-center
                                                                        justify-center
                                                                        rounded-lg
                                                                        border
                                                                        border-slate-200
                                                                        text-slate-500
                                                                        transition
                                                                        hover:border-blue-200
                                                                        hover:bg-blue-50
                                                                        hover:text-blue-600
                                                                    "
                                                                >
                                                                    <FaTwitter className="w-4 h-4" />
                                                                </a>

                                                            )}


                                                            {course?.teacher
                                                                ?.facebook && (

                                                                <a
                                                                    href={
                                                                        course
                                                                            .teacher
                                                                            .facebook
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="
                                                                        flex
                                                                        h-10
                                                                        w-10
                                                                        items-center
                                                                        justify-center
                                                                        rounded-lg
                                                                        border
                                                                        border-slate-200
                                                                        text-slate-500
                                                                        transition
                                                                        hover:border-blue-200
                                                                        hover:bg-blue-50
                                                                        hover:text-blue-600
                                                                    "
                                                                >
                                                                    <FaFacebookF className="w-4 h-4" />
                                                                </a>

                                                            )}


                                                            {course?.teacher
                                                                ?.linkedin && (

                                                                <a
                                                                    href={
                                                                        course
                                                                            .teacher
                                                                            .linkedin
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="
                                                                        flex
                                                                        h-10
                                                                        w-10
                                                                        items-center
                                                                        justify-center
                                                                        rounded-lg
                                                                        border
                                                                        border-slate-200
                                                                        text-slate-500
                                                                        transition
                                                                        hover:border-blue-200
                                                                        hover:bg-blue-50
                                                                        hover:text-blue-600
                                                                    "
                                                                >
                                                                    <FaLinkedinIn className="w-4 h-4" />
                                                                </a>

                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* About instructor */}

                                            <div className="mt-8">

                                                <h3 className="text-xl font-bold text-slate-900">
                                                    About Instructor
                                                </h3>

                                                <p className="mt-4 leading-7 text-slate-600">
                                                    {course?.teacher?.about}
                                                </p>

                                            </div>

                                        </div>

                                    )}


                                    {/* =================================================
                                        REVIEWS
                                    ================================================== */}

                                    {activeTab === "reviews" && (

                                        <div className="animate-[fadeIn_0.25s_ease-out]">

                                            <h2 className="text-xl font-bold text-slate-900">
                                                Our Student Reviews
                                            </h2>


                                            <div className="mt-6 divide-y divide-slate-200">

                                                {course?.reviews?.length > 0 ? (

                                                    course.reviews.map(
                                                        (review, index) => (

                                                            <div
                                                                key={
                                                                    review.id ||
                                                                    index
                                                                }
                                                                className="flex gap-4 py-6 first:pt-0 last:pb-0"
                                                            >

                                                                {/* Avatar */}

                                                                <div className="
                                                                    flex
                                                                    h-11
                                                                    w-11
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    rounded-full
                                                                    bg-blue-100
                                                                    text-blue-600
                                                                    font-semibold
                                                                ">
                                                                    {review?.profile?.full_name
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        ?.toUpperCase()}
                                                                </div>


                                                                <div className="min-w-0">

                                                                    <div className="flex flex-wrap items-center gap-2">

                                                                        <h3 className="font-semibold text-slate-900">
                                                                            {
                                                                                review
                                                                                    ?.profile
                                                                                    ?.full_name
                                                                            }
                                                                        </h3>

                                                                        <span className="text-sm text-slate-500">
                                                                            (
                                                                            {
                                                                                review?.rating
                                                                            }
                                                                            /5)
                                                                        </span>

                                                                    </div>


                                                                    <p className="mt-1 text-xs text-slate-400">
                                                                        5 days ago
                                                                    </p>


                                                                    <p className="mt-3 leading-6 text-slate-600">
                                                                        {
                                                                            review?.review ||
                                                                            ""
                                                                        }
                                                                    </p>

                                                                </div>

                                                            </div>

                                                        )
                                                    )

                                                ) : (

                                                    <div className="py-10 text-center">

                                                        <Star className="mx-auto h-8 w-8 text-slate-300" />

                                                        <p className="mt-3 text-sm text-slate-500">
                                                            No reviews yet.
                                                        </p>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================== */}

                        <aside className="lg:col-span-4">

                            <div className="lg:sticky lg:top-6 space-y-6">


                                {/* =================================================
                                    COURSE PURCHASE CARD
                                ================================================== */}

                                <div className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                ">

                                    {/* Course image */}

                                    <div className="relative">

                                        <img
                                            src={course?.image}
                                            alt="Course"
                                            className="
                                                aspect-video
                                                w-full
                                                object-cover
                                            "
                                        />

                                    </div>


                                    {/* Course information */}

                                    <div className="p-5">


                                        <div className="flex items-center justify-between gap-4">

                                            <div>

                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                                    Course price
                                                </p>

                                                <h2 className="mt-1 text-3xl font-bold text-slate-900">
                                                    ${course?.price}
                                                </h2>

                                            </div>


                                            {/* Share */}

                                            <div className="relative">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShareOpen(
                                                            !shareOpen
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        border
                                                        border-slate-200
                                                        text-slate-500
                                                        transition
                                                        hover:bg-slate-50
                                                        hover:text-slate-900
                                                    "
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                </button>


                                                {shareOpen && (

                                                    <div className="
                                                        absolute
                                                        right-0
                                                        top-12
                                                        z-30
                                                        w-48
                                                        overflow-hidden
                                                        rounded-xl
                                                        border
                                                        border-slate-200
                                                        bg-white
                                                        p-1
                                                        shadow-xl
                                                        animate-[fadeIn_0.15s_ease-out]
                                                    ">

                                                        <a
                                                            href="#"
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                rounded-lg
                                                                px-3
                                                                py-2.5
                                                                text-sm
                                                                text-slate-600
                                                                transition
                                                                hover:bg-slate-50
                                                                hover:text-slate-900
                                                            "
                                                        >
                                                            <Twitter className="w-4 h-4" />
                                                            Twitter
                                                        </a>


                                                        <a
                                                            href="#"
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                rounded-lg
                                                                px-3
                                                                py-2.5
                                                                text-sm
                                                                text-slate-600
                                                                transition
                                                                hover:bg-slate-50
                                                                hover:text-slate-900
                                                            "
                                                        >
                                                            <Facebook className="w-4 h-4" />
                                                            Facebook
                                                        </a>


                                                        <a
                                                            href="#"
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                rounded-lg
                                                                px-3
                                                                py-2.5
                                                                text-sm
                                                                text-slate-600
                                                                transition
                                                                hover:bg-slate-50
                                                                hover:text-slate-900
                                                            "
                                                        >
                                                            <Linkedin className="w-4 h-4" />
                                                            LinkedIn
                                                        </a>


                                                        <button
                                                            type="button"
                                                            onClick={
                                                                copyCourseLink
                                                            }
                                                            className="
                                                                flex
                                                                w-full
                                                                items-center
                                                                gap-3
                                                                rounded-lg
                                                                px-3
                                                                py-2.5
                                                                text-sm
                                                                text-slate-600
                                                                transition
                                                                hover:bg-slate-50
                                                                hover:text-slate-900
                                                            "
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                            Copy link
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </div>


                                        {/* Add to cart */}

                                        <div className="mt-6">

                                            {addToCartBtn === "Add To Cart" && (

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addToCart(
                                                            course?.id,
                                                            userId,
                                                            course?.price,
                                                            country,
                                                            CartId()
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        rounded-xl
                                                        bg-blue-600
                                                        px-5
                                                        py-3.5
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                        shadow-sm
                                                        transition-all
                                                        duration-200
                                                        hover:bg-blue-700
                                                        hover:shadow-md
                                                        active:scale-[0.98]
                                                    "
                                                >
                                                    <ShoppingCart className="w-4 h-4" />

                                                    Add To Cart
                                                </button>

                                            )}


                                            {addToCartBtn === "Adding To Cart" && (

                                                <button
                                                    type="button"
                                                    disabled
                                                    className="
                                                        flex
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        rounded-xl
                                                        bg-blue-600
                                                        px-5
                                                        py-3.5
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                        opacity-80
                                                        cursor-not-allowed
                                                    "
                                                >
                                                    <Loader2 className="w-4 h-4 animate-spin" />

                                                    Adding To Cart
                                                </button>

                                            )}


                                            {addToCartBtn === "Added To Cart" && (

                                                <button
                                                    type="button"
                                                    disabled
                                                    className="
                                                        flex
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        rounded-xl
                                                        bg-green-600
                                                        px-5
                                                        py-3.5
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    <CheckCircle className="w-4 h-4" />

                                                    Added To Cart
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    COURSE INCLUDES
                                ================================================== */}

                                <div className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-5
                                    shadow-sm
                                ">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        This course includes
                                    </h3>


                                    <div className="mt-5 divide-y divide-slate-100">

                                        <div className="flex items-center justify-between py-3">

                                            <div className="flex items-center gap-3 text-sm text-slate-600">

                                                <BookOpen className="w-4 h-4 text-blue-600" />

                                                Lectures

                                            </div>

                                            <span className="text-sm font-medium text-slate-900">
                                                30
                                            </span>

                                        </div>


                                        <div className="hidden flex items-center justify-between py-3">

                                            <div className="flex items-center gap-3 text-sm text-slate-600">

                                                <Clock className="w-4 h-4 text-blue-600" />

                                                Duration

                                            </div>

                                            <span className="text-sm font-medium text-slate-900">
                                                4h 50m
                                            </span>

                                        </div>


                                        <div className="flex items-center justify-between py-3">

                                            <div className="flex items-center gap-3 text-sm text-slate-600">

                                                <Signal className="w-4 h-4 text-blue-600" />

                                                Skills

                                            </div>

                                            <span className="text-sm font-medium text-slate-900">
                                                {course?.level || "Beginner"}
                                            </span>

                                        </div>


                                        <div className="flex items-center justify-between py-3">

                                            <div className="flex items-center gap-3 text-sm text-slate-600">

                                                <Globe className="w-4 h-4 text-blue-600" />

                                                Language

                                            </div>

                                            <span className="text-sm font-medium text-slate-900">
                                                {course?.language || "English"}
                                            </span>

                                        </div>


                                        <div className="flex items-center justify-between py-3">

                                            <div className="flex items-center gap-3 text-sm text-slate-600">

                                                <UserRound className="w-4 h-4 text-blue-600" />

                                                Published

                                            </div>

                                            <span className="text-sm font-medium text-slate-900">
                                                {moment(course?.date).format(
                                                    "DD MMM, YYYY"
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    INTRODUCTION VIDEO
                                ================================================== */}

                                {course?.file && (

                                    <button
                                        type="button"
                                        onClick={() => setShowVideo(true)}
                                        className="
                                            group
                                            flex
                                            w-full
                                            items-center
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-4
                                            text-left
                                            shadow-sm
                                            transition
                                            hover:border-blue-200
                                            hover:shadow-md
                                        "
                                    >

                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-red-50
                                            text-red-500
                                            transition
                                            group-hover:bg-red-100
                                        ">
                                            <Play className="w-5 h-5 fill-current" />
                                        </div>


                                        <div>

                                            <p className="text-sm font-semibold text-slate-900">
                                                Course Introduction Video
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Watch before enrolling
                                            </p>

                                        </div>

                                    </button>

                                )}

                            </div>

                        </aside>

                    </div>

                </div>

            </section>


            {/* =====================================================
                VIDEO MODAL
            ====================================================== */}

            {showVideo && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-slate-950/70
                        p-4
                        backdrop-blur-sm
                        animate-[fadeIn_0.2s_ease-out]
                    "
                    onClick={() => setShowVideo(false)}
                >

                    <div
                        className="
                            relative
                            w-full
                            max-w-3xl
                            overflow-hidden
                            rounded-2xl
                            bg-white
                            shadow-2xl
                        "
                        onClick={(event) => event.stopPropagation()}
                    >

                        {/* Modal header */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-200
                            px-5
                            py-4
                        ">

                            <div>

                                <h3 className="font-semibold text-slate-900">
                                    Course Introduction
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Preview this course
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() => setShowVideo(false)}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-slate-500
                                    transition
                                    hover:bg-slate-100
                                    hover:text-slate-900
                                "
                            >
                                <X className="w-5 h-5" />
                            </button>

                        </div>


                        {/* Video */}

                        <div className="bg-black">

                            <video
                                src={course?.file || ""}
                                className="w-full aspect-video"
                                controls
                                autoPlay
                            />

                        </div>


                        {/* Modal footer */}

                        <div className="flex justify-end border-t border-slate-200 px-5 py-4">

                            <button
                                type="button"
                                onClick={() => setShowVideo(false)}
                                className="
                                    rounded-lg
                                    bg-slate-900
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-slate-800
                                "
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* <BaseFooter /> */}
        </>
    );
}

export default CourseDetail;