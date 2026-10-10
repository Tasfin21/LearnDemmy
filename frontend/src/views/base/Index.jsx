import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { motion, AnimatePresence } from "framer-motion";

import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import { CartContext } from "../plugin/Context";
import apiInstance from "../../utils/axios";
import BaseHeader from "../partials/BaseHeader";

// Keep using your project's existing Toast helper/import if it is not global.

const fadeUp = {
hidden: { opacity: 0, y: 24 },
visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
hidden: {},
visible: {
transition: {
staggerChildren: 0.08,
},
},
};

function Index() {
const [courses, setCourses] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [cartCount, setCartCount] = useContext(CartContext);
const [currentPage, setCurrentPage] = useState(1);

const { address } = GetCurrentAddress();
const country = address?.country || "United States";
const userId = UserData()?.user_id;
const cartId = CartId();

const itemsPerPage = 8;

const fetchCourses = async () => {
setIsLoading(true);


try {
  const res = await apiInstance.get("/course/course-list/");
  setCourses(Array.isArray(res.data) ? res.data : []);
} catch (error) {
  console.error("Unable to fetch courses:", error);
  setCourses([]);
} finally {
  setIsLoading(false);
}


};

useEffect(() => {
fetchCourses();
}, []);

const addToCart = async (courseId, userId, price, country, cartId) => {
const formdata = new FormData();


    formdata.append("course_id", courseId);
    formdata.append("user_id", userId);
    formdata.append("price", price);
    formdata.append("country_name", country);
    formdata.append("cart_id", cartId);

    try {
    await apiInstance.post("course/cart/", formdata);

    Toast().fire({
        title: "Added to cart",
        icon: "success",
    });

    const res = await apiInstance.get(
        `course/cart-list/${CartId()}/`
    );

    setCartCount(res.data?.length ?? 0);
    } catch (error) {
    console.error("Unable to add course to cart:", error);

    Toast().fire({
        title: "Unable to add course to cart",
        icon: "error",
    });
    }


};

const addToWishlist = async (courseId) => {
const formdata = new FormData();


formdata.append("user_id", UserData()?.user_id);
formdata.append("course_id", courseId);

try {
  const res = await apiInstance.post(
    `student/wishlist/${UserData()?.user_id}/`,
    formdata
  );

  Toast().fire({
    icon: "success",
    title: res.data.message,
  });
} catch (error) {
  console.error("Unable to add course to wishlist:", error);

  Toast().fire({
    icon: "error",
    title:
      error.response?.data?.message ||
      "Unable to add course to wishlist.",
  });
}


};

const totalPages = Math.ceil(courses.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentItems = courses.slice(
indexOfFirstItem,
indexOfLastItem
);

const pageNumbers = Array.from(
{ length: totalPages },
(_, index) => index + 1
);

const changePage = (page) => {
setCurrentPage(page);
document
.getElementById("popular-courses")
?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const stats = [
    { value: "100+", label: "Qualified instructors", icon: "◈" },
    { value: "20K+", label: "Course enrolments", icon: "↗" },
    { value: "500+", label: "Courses to explore", icon: "▤" },
    { value: "10K+", label: "Online video lessons", icon: "▷" },
];

const testimonials = [
{
    initial: "G",
    name: "Gladys Colbert",
    role: "Software Engineer",
    quote:
    "The courses are well structured and easy to follow. I landed a better job within 3 months of learning here.",
},
{
    initial: "J",
    name: "James Wilson",
    role: "Product Designer",
    quote:
    "A great way to explore new skills, learn at my own pace, and keep growing professionally.",
},
{
    initial: "S",
    name: "Sarah Mitchell",
    role: "Web Developer",
    quote:
    "The learning experience made complicated topics feel approachable. I enjoyed learning one step at a time.",
},
];

return ( <div className="min-h-screen overflow-hidden bg-white text-slate-900"> <BaseHeader />


  {/* HERO */}
  <section className="relative isolate overflow-hidden bg-[#f8faff]">
    {/* Background decoration */}
    <div
      className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[100px]"
      aria-hidden="true"
    />

    <div
      className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-violet-200/40 blur-[100px]"
      aria-hidden="true"
    />

    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            A smarter way to learn
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
          >
            Learn something new.
            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Become something more.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            Build real-world skills, discover new interests, and move
            closer to your goals with courses from passionate instructors.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/register/"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Start learning for free
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="https://www.youtube.com/watch?v=Nfzi7034Kbg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:text-blue-700"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                ▷
              </span>
              Watch demo
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="text-emerald-600">✓</span>
              Learn at your own pace
            </span>

            <span className="flex items-center gap-2">
              <span className="text-emerald-600">✓</span>
              Explore new skills
            </span>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-300/40 via-violet-300/20 to-indigo-300/40 blur-xl" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-2 shadow-[0_30px_90px_rgba(37,99,235,0.16)]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop"
                alt="Students learning together"
                className="h-[300px] w-full rounded-[1.35rem] object-cover sm:h-[390px]"
              />

              <div className="absolute inset-x-2 bottom-2 rounded-b-[1.35rem] bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent px-6 pb-6 pt-20">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-200">
                  Your next chapter
                </p>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Make learning count.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating learning card */}
          <motion.div
            animate={{ y: [0, 7, 0], rotate: [0, 1, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-3 top-8 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:block md:-left-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
                ✓
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Keep growing
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  One lesson at a time
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:block md:-right-7"
          >
            <p className="text-xs font-medium text-slate-500">
              Your potential
            </p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">
              Unlimited<span className="text-blue-600">.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>

  {/* PLATFORM STATS */}
  <section className="relative border-y border-slate-100 bg-white py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="group text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600 transition duration-300 group-hover:-translate-y-1 group-hover:bg-blue-600 group-hover:text-white">
              {stat.icon}
            </div>

            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {stat.value}
            </h3>

            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>

  {/* POPULAR COURSES */}
  <section
    id="popular-courses"
    className="scroll-mt-24 bg-[#fafbff] py-16 sm:py-20 lg:py-24"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
            <span>✦</span>
            Handpicked for you
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Explore popular courses
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Discover courses designed to help you learn new skills and
            make meaningful progress.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-100">
            ▦
          </span>
          {courses.length} courses available
        </div>
      </motion.div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Loading courses"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
            >
              <div className="h-48 animate-pulse bg-slate-100" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
                <div className="h-5 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
            ▤
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            No courses available yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Please check back later for new courses.
          </p>

          <button
            onClick={fetchCourses}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="wait">
              {currentItems.map((course, index) => (
                <motion.article
                  key={course.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.045,
                  }}
                  whileHover={{ y: -7 }}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100/90 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.025)] transition-shadow duration-300 hover:border-blue-100 hover:shadow-[0_20px_45px_rgba(37,99,235,0.10)]"
                >
                  <Link
                    to={`/course-detail/${course.slug}/`}
                    className="relative block overflow-hidden bg-slate-100"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      {course.level && (
                        <span className="rounded-full border border-white/50 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-md">
                          {course.level}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {course.language || "Online course"}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Rater
                          total={5}
                          rating={course.average_rating || 0}
                        />

                        <span className="ml-1 text-xs font-medium text-slate-500">
                          ({course.reviews?.length || 0})
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToWishlist(course.id)}
                        aria-label={`Add ${course.title} to wishlist`}
                        title="Add to wishlist"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-100 text-lg text-slate-400 transition duration-200 hover:border-rose-100 hover:bg-rose-50 hover:text-rose-500"
                      >
                        ♡
                      </button>
                    </div>

                    <Link to={`/course-detail/${course.slug}/`}>
                      <h3 className="line-clamp-2 min-h-[3.25rem] text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-blue-700">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="mt-2 truncate text-xs text-slate-500">
                      By{" "}
                      <span className="font-medium text-slate-700">
                        {course.teacher?.full_name || "Instructor"}
                      </span>
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      <span className="mr-1 text-blue-600">◉</span>
                      {course.students?.length || 0} student
                      {course.students?.length !== 1 ? "s" : ""}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-5">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Course price
                        </p>
                        <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                          ${course.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            addToCart(
                              course.id,
                              userId,
                              course.price,
                              country,
                              cartId
                            )
                          }
                          aria-label={`Add ${course.title} to cart`}
                          title="Add to cart"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-lg text-blue-700 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                        >
                          +
                        </button>

                        <Link
                          to={`/course-detail/${course.slug}/`}
                          className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-white transition duration-200 hover:bg-blue-600"
                        >
                          Enroll
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {pageNumbers.map((number) => (
                <button
                  type="button"
                  key={number}
                  onClick={() => changePage(number)}
                  aria-current={
                    currentPage === number ? "page" : undefined
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                    currentPage === number
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </section>

  {/* INSTRUCTOR CTA */}
  <section className="bg-white py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950"
      >
        <div className="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-blue-600/40 blur-[90px]" />
        <div className="absolute -bottom-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-violet-600/30 blur-[90px]" />

        <div className="grid items-center lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
              <span>✦</span>
              Share what you know
            </span>

            <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Turn your knowledge into someone else's breakthrough.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
              Create courses, share your expertise, and help learners
              develop skills that make a difference.
            </p>

            <Link
              to="/register/"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              Become an instructor
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="relative hidden min-h-[440px] overflow-hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&auto=format&fit=crop"
              alt="Instructor teaching students"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/10 to-transparent" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-xl"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-100">
                Teach. Inspire. Grow.
              </p>

              <p className="mt-2 text-lg font-bold">
                Your experience can inspire someone.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>

  {/* TESTIMONIALS */}
  <section className="border-t border-slate-100 bg-[#f8faff] py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
      >
        <div className="mb-4 flex justify-center gap-1 text-lg text-amber-400">
          {"★★★★★".split("").map((star, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              {star}
            </motion.span>
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Learner experiences
        </p>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Learning that moves you forward
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Every learning journey is different. Here's what learners have
          shared about their experiences.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="grid gap-5 md:grid-cols-3"
      >
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.name}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7"
          >
            <div className="mb-5 flex gap-1 text-sm text-amber-400">
              {"★★★★★".split("").map((star, starIndex) => (
                <span key={starIndex}>{star}</span>
              ))}
            </div>

            <span className="text-4xl font-serif leading-none text-blue-200">
              “
            </span>

            <p className="mt-1 min-h-[112px] text-sm leading-7 text-slate-600">
              {testimonial.quote}
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 text-sm font-extrabold text-blue-700">
                {testimonial.initial}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {testimonial.role}
                </p>
              </div>

              <span className="ml-auto text-lg text-emerald-500">
                ✓
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
</div>


);
}

export default Index;
