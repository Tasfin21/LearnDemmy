import { useEffect, useState, useContext } from "react";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

import {
    Search as SearchIcon,
    ShoppingCart,
    Heart,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Users,
    User,
    BookOpen,
    GraduationCap,
    X,
} from "lucide-react";

import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import apiInstance from "../../utils/axios";


function Search() {
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [cartCount, setCartCount] = useContext(CartContext);

    const [searchQuery, setSearchQuery] = useState("");

    const country = GetCurrentAddress().country;
    const userId = UserData()?.user_id;
    const cartId = CartId();


    // Fetch courses
    const fetchCourse = async () => {
        setIsLoading(true);

        try {
            const res = await useAxios.get(`/course/course-list/`);

            setCourses(res.data);
            setAllCourses(res.data);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchCourse();
    }, []);


    // Add course to cart
    const addToCart = async (
        courseId,
        userId,
        price,
        country,
        cartId
    ) => {
        const formdata = new FormData();

        formdata.append("course_id", courseId);
        formdata.append("user_id", userId);
        formdata.append("price", price);
        formdata.append("country_name", country);
        formdata.append("cart_id", cartId);

        try {
            await useAxios.post(`course/cart/`, formdata);

            Toast().fire({
                title: "Added To Cart",
                icon: "success",
            });

            const res = await apiInstance.get(
                `course/cart-list/${CartId()}/`
            );

            setCartCount(res.data?.length);

        } catch (error) {
            console.log(error);
        }
    };


    // Search courses
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();

        setSearchQuery(query);

        if (query === "") {
            setCourses(allCourses);
            return;
        }

        const filteredCourses = allCourses.filter((course) =>
            course.title.toLowerCase().includes(query)
        );

        setCourses(filteredCourses);
    };


    // Clear search
    const clearSearch = () => {
        setSearchQuery("");
        setCourses(allCourses);
    };


    return (
        <>
            <BaseHeader />

            
            <section className="
            border-b 
            border-slate-200 
            bg-slate-50">
                <div className="
                mx-auto 
                max-w-7xl 
                px-4 
                py-12 
                sm:px-6 
                lg:px-8">

                    <div className="max-w-3xl">

                        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                to="/"
                                className="transition hover:text-emerald-600"
                            >
                                Home
                            </Link>

                            <ChevronRight size={15} />

                            <span className="text-slate-800">
                                Courses
                            </span>
                        </div>

                        <h1 className="
                        text-3xl 
                        font-bold 
                        tracking-tight 
                        text-slate-900 
                        sm:text-4xl">
                            {searchQuery
                                ? `Showing results for "${searchQuery}"`
                                : "Explore Our Courses"}
                        </h1>

                        <p className="
                        mt-3 
                        text-sm 
                        leading-6 
                        text-slate-500 
                        sm:text-base">
                            Find the right course, learn new skills, and
                            continue building your knowledge.
                        </p>

                    </div>


                    {/* Search function here --> */}
                    <div className="mt-8 max-w-2xl">

                        <div className="relative">

                            <SearchIcon
                                size={20}
                                className="
                                absolute 
                                left-4 
                                top-1/2 
                                -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="
                                w-full 
                                rounded-2xl 
                                border 
                                border-slate-200 
                                bg-white 
                                py-4 
                                pl-12 
                                pr-12 
                                text-sm 
                                text-slate-900 
                                shadow-sm outline-none 
                                transition 
                                placeholder:text-slate-400 
                                focus:border-emerald-500 
                                focus:ring-4 
                                focus:ring-emerald-500/10"
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="
                                    absolute 
                                    right-4 
                                    top-1/2 
                                    -translate-y-1/2 
                                    text-slate-400 
                                    transition 
                                    hover:text-slate-700"
                                >
                                    <X size={18} />
                                </button>
                            )}

                        </div>

                    </div>

                </div>
            </section>



            <section className="bg-white py-12 sm:py-16">
                <div className="
                mx-auto 
                max-w-7xl 
                px-4 
                sm:px-6 
                lg:px-8">
                    <div className="
                    mb-7 
                    flex 
                    flex-col 
                    justify-between 
                    gap-3 
                    sm:flex-row 
                    sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Available Courses
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {courses.length}{" "}
                                {courses.length === 1
                                    ? "course"
                                    : "courses"}{" "}
                                found
                            </p>
                        </div>

                    </div>
                    {isLoading && (
                        <div className="
                        grid 
                        grid-cols-1 
                        gap-6 
                        sm:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4">

                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >
                                    <div className="h-48 animate-pulse bg-slate-200" />

                                    <div className="space-y-3 p-5">
                                        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                                        <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}



                    {!isLoading && courses.length === 0 && (
                        <div className="
                        rounded-2xl 
                        border 
                        border-dashed 
                        border-slate-300 
                        bg-slate-50 
                        px-6 
                        py-16 
                        text-center">

                            <div className="
                            mx-auto 
                            flex 
                            h-16 
                            w-16 
                            items-center 
                            justify-center 
                            rounded-2xl 
                            bg-white 
                            text-slate-400 
                            shadow-sm">
                                <SearchIcon size={28} />
                            </div>

                            <h3 className="
                            mt-5 
                            text-lg 
                            font-semibold 
                            text-slate-900">
                                No courses found
                            </h3>

                            <p className="
                            mx-auto 
                            mt-2 
                            max-w-md 
                            text-sm 
                            text-slate-500">
                                We couldn't find any courses matching your
                                search. Try using a different keyword.
                            </p>

                            <button
                                type="button"
                                onClick={clearSearch}
                                className="
                                mt-6 
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
                                View All Courses
                            </button>

                        </div>
                    )}


                    
                    {!isLoading && courses.length > 0 && (
                        <div className="
                        grid 
                        grid-cols-1 
                        gap-6 
                        sm:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4">

                            {courses.map((c) => (
                                <div
                                    key={c.id}
                                    className="
                                    group 
                                    flex 
                                    h-full 
                                    flex-col 
                                    overflow-hidden 
                                    rounded-2xl 
                                    border 
                                    border-slate-200 
                                    bg-white 
                                    shadow-sm 
                                    transition 
                                    duration-300 
                                    hover:-translate-y-1 
                                    hover:shadow-xl"
                                >

                                    
                                    <div className="relative overflow-hidden">

                                        <Link
                                            to={`/course-detail/${c.slug}/`}
                                        >
                                            <img
                                                src={c.image}
                                                alt={c.title}
                                                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        </Link>


                                        
                                        <div className="
                                        absolute 
                                        inset-0 
                                        bg-gradient-to-t 
                                        from-black/30 
                                        via-transparent 
                                        to-transparent 
                                        opacity-0 
                                        transition 
                                        group-hover:opacity-100" />
                                        <button
                                            type="button"
                                            className="
                                            absolute 
                                            right-3 
                                            top-3 
                                            flex 
                                            h-9 
                                            w-9 
                                            items-center 
                                            justify-center 
                                            rounded-full 
                                            bg-white/95 
                                            text-slate-500 
                                            shadow-sm 
                                            backdrop-blur 
                                            transition 
                                            hover:bg-white 
                                            hover:text-red-500"
                                        >
                                            <Heart size={17} />
                                        </button>

                                        <div className="absolute bottom-3 left-3">
                                            <span className="
                                            rounded-lg 
                                            bg-white/95 
                                            px-2.5 
                                            py-1.5 
                                            text-xs 
                                            font-semibold 
                                            text-slate-700 
                                            shadow-sm 
                                            backdrop-blur">
                                                {c.level}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="flex flex-1 flex-col p-5">

                                        <div className="mb-3">
                                            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                {c.language}
                                            </span>
                                        </div>

                                        <h3 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-slate-900">

                                            <Link
                                                to={`/course-detail/${c.slug}/`}
                                                className="transition hover:text-emerald-600"
                                            >
                                                {c.title}
                                            </Link>

                                        </h3>

                                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

                                            <User size={15} />

                                            <span className="truncate">
                                                By {c.teacher?.full_name}
                                            </span>

                                        </div>

                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                                            <Users size={15} />

                                            <span>
                                                {c.students?.length || 0}{" "}
                                                Student
                                                {c.students?.length > 1
                                                    ? "s"
                                                    : ""}
                                            </span>

                                        </div>

                                        <div className="mt-4 flex items-center gap-2">

                                            <Rater
                                                total={5}
                                                rating={c.average_rating || 0}
                                            />

                                            <span className="text-sm font-semibold text-amber-500">
                                                {Number(
                                                    c.average_rating || 0
                                                ).toFixed(1)}
                                            </span>

                                            <span className="text-xs text-slate-400">
                                                ({c.reviews?.length || 0})
                                            </span>

                                        </div>

                                        <div className="mt-auto pt-5">

                                            <div className="mb-4 border-t border-slate-100" />

                                            <div className="flex items-center justify-between gap-3">

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Course Price
                                                    </p>

                                                    <p className="mt-0.5 text-xl font-bold text-slate-900">
                                                        ${c.price}
                                                    </p>
                                                </div>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addToCart(
                                                            c.id,
                                                            userId,
                                                            c.price,
                                                            country,
                                                            cartId
                                                        )
                                                    }
                                                    className="
                                                    flex 
                                                    h-10 
                                                    w-10 
                                                    items-center 
                                                    justify-center 
                                                    rounded-xl 
                                                    bg-emerald-50 
                                                    text-emerald-600 
                                                    transition 
                                                    hover:bg-emerald-600 
                                                    hover:text-white 
                                                    active:scale-95"
                                                    title="Add to cart"
                                                >
                                                    <ShoppingCart size={18} />
                                                </button>

                                            </div>


                                            <Link
                                                to={`/course-detail/${c.slug}/`}
                                                className="
                                                mt-4 
                                                flex 
                                                w-full 
                                                items-center 
                                                justify-center 
                                                gap-2 
                                                rounded-xl 
                                                bg-slate-900 
                                                px-4 
                                                py-3 
                                                text-sm 
                                                font-semibold 
                                                text-white 
                                                transition 
                                                hover:bg-emerald-600 
                                                active:scale-[0.98]"
                                            >
                                                View Course

                                                <ArrowRight
                                                    size={16}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                    {!isLoading && courses.length > 0 && (
                        <div className="mt-10 flex items-center justify-center gap-2">

                            <button
                                type="button"
                                className="
                                flex 
                                h-10 
                                items-center 
                                gap-2 
                                rounded-xl 
                                border 
                                border-slate-200 
                                bg-white 
                                px-4 
                                text-sm 
                                font-medium 
                                text-slate-500 
                                transition 
                                hover:border-slate-300 
                                hover:bg-slate-50"
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>


                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm"
                            >
                                1
                            </button>


                            <button
                                type="button"
                                className="
                                flex 
                                h-10 
                                items-center 
                                gap-2 
                                rounded-xl 
                                border 
                                border-slate-200 
                                bg-white 
                                px-4 
                                text-sm 
                                font-medium 
                                text-slate-500 
                                transition 
                                hover:border-slate-300 
                                hover:bg-slate-50"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>

                        </div>
                    )}

                </div>

            </section>

            <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600">

                    <div className="grid items-center lg:grid-cols-2">

                        {/* Image */}
                        <div className="relative hidden min-h-[360px] overflow-hidden lg:block">

                            <img
                                src="https://desphixs.com/geeks/assets/images/png/cta-instructor-1.png"
                                alt="Become an instructor"
                                className="absolute bottom-0 left-1/2 h-[390px] -translate-x-1/2 object-contain"
                            />

                            <img
                                src="https://desphixs.com/geeks/assets/images/svg/dollor.svg"
                                alt=""
                                className="absolute bottom-12 left-10 w-14"
                            />

                            <img
                                src="https://desphixs.com/geeks/assets/images/svg/graph.svg"
                                alt=""
                                className="absolute right-10 top-10 w-20"
                            />

                        </div>

                        <div className="px-6 py-12 sm:px-10 lg:px-12">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                                <GraduationCap size={25} />
                            </div>

                            <h2 className="max-w-lg text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Become an instructor today
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
                                Instructors from around the world teach
                                thousands of students. Share your knowledge,
                                build your audience, and teach what you love.
                            </p>

                            <Link
                                to="/register-instructor"
                                className="
                                mt-7 
                                inline-flex 
                                items-center 
                                gap-2 
                                rounded-xl 
                                bg-white 
                                px-5 
                                py-3.5 
                                text-sm 
                                font-semibold 
                                text-slate-900 
                                shadow-sm 
                                transition 
                                hover:bg-slate-100 
                                active:scale-95"
                            >
                                Start Teaching Today

                                <ArrowRight size={17} />
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* <BaseFooter /> */}
        </>
    );
}

export default Search;