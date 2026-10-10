import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft, CheckCircle, Upload, Video, Image as ImageIcon } from "lucide-react";

import useAxios from "../../utils/useAxios";
import Swal from "sweetalert2";

function CourseCreate() {
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        image: "",
        file: "",
        level: "",
        language: "",
        price: "",
        category: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        useAxios.get(`course/category/`).then((res) => {
            setCategory(res.data);
        });
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setImagePreview(null);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await useAxios.post("/file-upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.data?.url) {
                setImagePreview(response.data.url);

                setCourseData((prev) => ({
                    ...prev,
                    image: response.data.url,
                }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setFileLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await useAxios.post("/file-upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.data?.url) {
                setCourseData((prev) => ({
                    ...prev,
                    file: response.data.url,
                }));
            }
        } catch (error) {
            console.error("Error uploading course intro:", error);
        } finally {
            setFileLoading(false);
        }
    };

    const handleCourseInputChange = (event) => {
        setCourseData((prev) => ({
            ...prev,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const json = {
            title: courseData?.title,
            description: courseData?.description,
            image: courseData?.image,
            file: courseData?.file,
            level: courseData?.level,
            language: courseData?.language,
            price: courseData?.price,
            category: courseData?.category,
        };

        const response = await useAxios.post(
            `teacher/course-create/`,
            json
        );

        navigate(
            `/instructor/edit-course/${response?.data?.course_id}/`
        );

        Swal.fire({
            icon: "success",
            title: "Course Created Successfully",
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

                            <form onSubmit={handleSubmit}>

                                {/* Hero Header */}
                                <section className="overflow-hidden rounded-2xl bg-indigo-600 shadow-sm">
                                    <div className="p-6 sm:p-8">

                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                            <div>
                                                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                                                    Add New Course
                                                </h1>

                                                <p className="mt-2 text-sm text-indigo-100 sm:text-base">
                                                    Just fill the form and create
                                                    your course.
                                                </p>
                                            </div>

                                            <Link
                                                to="/instructor/courses/"
                                                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                            >
                                                <ArrowLeft size={17} />
                                                Back to Courses
                                            </Link>
                                        </div>
                                    </div>
                                </section>

                                {/* Basic Information */}
                                <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                    {/* Section Header */}
                                    <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Add the basic details of your course.
                                        </p>
                                    </div>

                                    <div className="space-y-6 p-5 sm:p-6">

                                        {/* Thumbnail Preview */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Thumbnail Preview
                                            </label>

                                            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">

                                                {loading ? (
                                                    <div className="flex h-[220px] items-center justify-center sm:h-[330px]">
                                                        <div className="text-center">
                                                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" />

                                                            <p className="mt-3 text-sm text-slate-500">
                                                                Uploading thumbnail...
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={
                                                            imagePreview ||
                                                            "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                                                        }
                                                        alt="Course thumbnail preview"
                                                        className="h-[220px] w-full object-cover sm:h-[330px]"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Thumbnail Upload */}
                                        <div>
                                            <label
                                                htmlFor="courseThumbnail"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Course Thumbnail
                                            </label>

                                            <label
                                                htmlFor="courseThumbnail"
                                                className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
                                            >
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                                    <ImageIcon size={20} />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        Choose course thumbnail
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        PNG or JPG recommended
                                                    </p>
                                                </div>
                                            </label>

                                            <input
                                                id="courseThumbnail"
                                                className="hidden"
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </div>

                                        {/* Intro Video */}
                                        <div>
                                            <label
                                                htmlFor="introVideo"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Intro Video
                                            </label>

                                            <label
                                                htmlFor="introVideo"
                                                className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
                                            >
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                                    <Video size={20} />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {fileLoading
                                                            ? "Uploading video..."
                                                            : "Choose intro video"}
                                                    </p>

                                                    <p className="mt-0.5 truncate text-xs text-slate-500">
                                                        Upload your course introduction video
                                                    </p>
                                                </div>
                                            </label>

                                            <input
                                                id="introVideo"
                                                className="hidden"
                                                type="file"
                                                name="file"
                                                accept="video/*"
                                                onChange={handleFileUpload}
                                            />

                                            {courseData?.file && (
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={courseData.file}
                                                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                                >
                                                    <Video size={16} />
                                                    Preview Video
                                                </a>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label
                                                htmlFor="courseTitle"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Course Title
                                            </label>

                                            <input
                                                id="courseTitle"
                                                type="text"
                                                name="title"
                                                placeholder="Enter your course title"
                                                onChange={handleCourseInputChange}
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            />

                                            <p className="mt-2 text-xs text-slate-500">
                                                Write a 60 character course title.
                                            </p>
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label
                                                htmlFor="category"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Course Category
                                            </label>

                                            <select
                                                id="category"
                                                name="category"
                                                onChange={handleCourseInputChange}
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            >
                                                <option value="">
                                                    Select category
                                                </option>

                                                {category?.map((c, index) => (
                                                    <option
                                                        key={c.id || index}
                                                        value={c.id}
                                                    >
                                                        {c.title}
                                                    </option>
                                                ))}
                                            </select>

                                            <p className="mt-2 text-xs text-slate-500">
                                                Help people find your course by
                                                choosing a relevant category.
                                            </p>
                                        </div>

                                        {/* Level */}
                                        <div>
                                            <label
                                                htmlFor="level"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Course Level
                                            </label>

                                            <select
                                                id="level"
                                                name="level"
                                                onChange={handleCourseInputChange}
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            >
                                                <option value="">
                                                    Select level
                                                </option>

                                                <option value="Beginner">
                                                    Beginner
                                                </option>

                                                <option value="Intermediate">
                                                    Intermediate
                                                </option>

                                                <option value="Advanced">
                                                    Advanced
                                                </option>
                                            </select>
                                        </div>

                                        {/* Language */}
                                        <div>
                                            <label
                                                htmlFor="language"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Course Language
                                            </label>

                                            <select
                                                id="language"
                                                name="language"
                                                onChange={handleCourseInputChange}
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            >
                                                <option value="">
                                                    Select language
                                                </option>

                                                <option value="English">
                                                    English
                                                </option>

                                                <option value="Spanish">
                                                    Spanish
                                                </option>

                                                <option value="French">
                                                    French
                                                </option>
                                            </select>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Course Description
                                            </label>

                                            <div className="overflow-hidden rounded-xl border border-slate-200">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data=""
                                                    onChange={(event, editor) => {
                                                        setCourseData((prev) => ({
                                                            ...prev,
                                                            description:
                                                                editor.getData(),
                                                        }));
                                                    }}
                                                    config={{
                                                        toolbar: [
                                                            "bold",
                                                            "italic",
                                                            "link",
                                                            "bulletedList",
                                                            "numberedList",
                                                            "blockQuote",
                                                            "undo",
                                                            "redo",
                                                        ],
                                                    }}
                                                />
                                            </div>

                                            <p className="mt-2 text-xs text-slate-500">
                                                Add a brief summary and description
                                                of your course.
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label
                                                htmlFor="price"
                                                className="mb-2 block text-sm font-medium text-slate-700"
                                            >
                                                Course Price
                                            </label>

                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                                                    $
                                                </span>

                                                <input
                                                    id="price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    name="price"
                                                    placeholder="20.99"
                                                    onChange={handleCourseInputChange}
                                                    required
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Submit */}
                                <button
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100"
                                    type="submit"
                                >
                                    <CheckCircle size={18} />
                                    Create Course
                                </button>
                            </form>
                        </main>
                    </div>
                </div>
            </section>

            {/* <BaseFooter /> */}
        </>
    );
}

export default CourseCreate;