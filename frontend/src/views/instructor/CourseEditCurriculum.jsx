import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Image as ImageIcon,
    Loader2,
    Video,
} from "lucide-react";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import Swal from "sweetalert2";

function CourseEditCurriculum() {
    const [courseData, setCourseData] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const navigate = useNavigate();
    const param = useParams();

    const defaultImage =
        "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";

    // =========================
    // Fetch course details
    // =========================
    const fetchCourseDetail = () => {
        useAxios
            .get(`course/category/`)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });

        useAxios
            .get(`teacher/course-detail/${param.course_id}/`)
            .then((res) => {
                setCourseData(res.data);
                setImagePreview(res?.data?.image);
            })
            .catch((error) => {
                console.error("Error fetching course:", error);
            });
    };

    useEffect(() => {
        fetchCourseDetail();
    }, []);

    // =========================
    // Image upload
    // =========================
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

    // =========================
    // Intro video upload
    // =========================
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

    // =========================
    // Input changes
    // =========================
    const handleCourseInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setCourseData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // =========================
    // Update course
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsUpdating(true);

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

        try {
            const response = await useAxios.post(
                `teacher/course-create/`,
                json
            );

            navigate(
                `/instructor/edit-course/${response?.data?.course_id}/`
            );

            Swal.fire({
                icon: "success",
                title: "Course Updated Successfully",
            });
        } catch (error) {
            console.error("Error updating course:", error);

            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Unable to update the course.",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <BaseHeader />

            <section className="min-h-screen bg-slate-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Header />

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content */}
                        <main className="min-w-0">
                            {/* Page Header */}
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                        Edit Course
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Update your course information and
                                        continue managing your curriculum.
                                    </p>
                                </div>

                                <Link
                                    to="/instructor/courses/"
                                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
                                >
                                    <ArrowLeft size={17} />
                                    Back to Courses
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Basic Information */}
                                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Update the main information about
                                            your course.
                                        </p>
                                    </div>

                                    <div className="space-y-6 p-5 sm:p-6">
                                        {/* Thumbnail */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Course Thumbnail
                                            </label>

                                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                                                <div className="relative aspect-video w-full">
                                                    {loading ? (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                            <Loader2
                                                                size={32}
                                                                className="animate-spin text-indigo-600"
                                                            />

                                                            <p className="mt-2 text-sm text-slate-500">
                                                                Uploading
                                                                thumbnail...
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={
                                                                imagePreview ||
                                                                defaultImage
                                                            }
                                                            alt="Course thumbnail"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <label
                                                htmlFor="courseThumbnail"
                                                className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                                            >
                                                <ImageIcon size={18} />
                                                Choose New Thumbnail
                                            </label>

                                            <input
                                                id="courseThumbnail"
                                                className="hidden"
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />

                                            <p className="mt-2 text-xs text-slate-400">
                                                Upload a clear image that
                                                represents your course.
                                            </p>
                                        </div>

                                        {/* Intro Video */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Intro Video
                                            </label>

                                            <label
                                                htmlFor="introVideo"
                                                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                                            >
                                                {fileLoading ? (
                                                    <>
                                                        <Loader2
                                                            size={18}
                                                            className="animate-spin"
                                                        />
                                                        Uploading video...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Video size={18} />
                                                        Choose Intro Video
                                                    </>
                                                )}
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
                                                    href={courseData.file}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
                                                >
                                                    <Video size={16} />
                                                    Preview Current Video
                                                </a>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label
                                                htmlFor="courseTitle"
                                                className="mb-2 block text-sm font-semibold text-slate-700"
                                            >
                                                Course Title
                                            </label>

                                            <input
                                                id="courseTitle"
                                                type="text"
                                                name="title"
                                                value={courseData?.title || ""}
                                                onChange={
                                                    handleCourseInputChange
                                                }
                                                placeholder="Enter course title"
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                            />

                                            <p className="mt-2 text-xs text-slate-400">
                                                Write a clear course title,
                                                preferably under 60 characters.
                                            </p>
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label
                                                htmlFor="courseCategory"
                                                className="mb-2 block text-sm font-semibold text-slate-700"
                                            >
                                                Course Category
                                            </label>

                                            <select
                                                id="courseCategory"
                                                name="category"
                                                value={
                                                    courseData?.category?.id ||
                                                    ""
                                                }
                                                onChange={
                                                    handleCourseInputChange
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                            >
                                                <option value="">
                                                    Select category
                                                </option>

                                                {category?.map((c, index) => (
                                                    <option
                                                        key={index}
                                                        value={c.id}
                                                    >
                                                        {c.title}
                                                    </option>
                                                ))}
                                            </select>

                                            <p className="mt-2 text-xs text-slate-400">
                                                Choose a category that best
                                                represents your course.
                                            </p>
                                        </div>

                                        {/* Level + Language */}
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="courseLevel"
                                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                                >
                                                    Course Level
                                                </label>

                                                <select
                                                    id="courseLevel"
                                                    name="level"
                                                    value={
                                                        courseData?.level || ""
                                                    }
                                                    onChange={
                                                        handleCourseInputChange
                                                    }
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                                >
                                                    <option value="">
                                                        Select level
                                                    </option>

                                                    <option value="Beginner">
                                                        Beginner
                                                    </option>

                                                    <option value="Intemediate">
                                                        Intemediate
                                                    </option>

                                                    <option value="Advanced">
                                                        Advanced
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="courseLanguage"
                                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                                >
                                                    Language
                                                </label>

                                                <select
                                                    id="courseLanguage"
                                                    name="language"
                                                    value={
                                                        courseData?.language ||
                                                        ""
                                                    }
                                                    onChange={
                                                        handleCourseInputChange
                                                    }
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
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
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Course Description
                                            </label>

                                            <div className="overflow-hidden rounded-xl border border-slate-200">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={
                                                        courseData?.description ||
                                                        ""
                                                    }
                                                    onChange={(
                                                        event,
                                                        editor
                                                    ) => {
                                                        const data =
                                                            editor.getData();

                                                        setCourseData(
                                                            (prev) => ({
                                                                ...prev,
                                                                description:
                                                                    data,
                                                            })
                                                        );
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

                                            <p className="mt-2 text-xs text-slate-400">
                                                A brief summary of your course.
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label
                                                htmlFor="coursePrice"
                                                className="mb-2 block text-sm font-semibold text-slate-700"
                                            >
                                                Course Price
                                            </label>

                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                                                    $
                                                </span>

                                                <input
                                                    id="coursePrice"
                                                    type="number"
                                                    name="price"
                                                    value={
                                                        courseData?.price || ""
                                                    }
                                                    onChange={
                                                        handleCourseInputChange
                                                    }
                                                    placeholder="20.99"
                                                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <Link
                                        to={`/instructor/edit-course/${param?.course_id}/curriculum/`}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow"
                                    >
                                        Manage Curriculum
                                        <ArrowRight size={17} />
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle size={18} />
                                                Update Course
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </section>

            {/* <BaseFooter /> */}
        </>
    );
}

export default CourseEditCurriculum;