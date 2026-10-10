import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import moment from "moment";

import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";

import { Send, ArrowRight, MessageCircle, X, Search } from "lucide-react";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function QA() {
    const [questions, setQuestions] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversationShow, setConversationShow] = useState(false);

    const lastElementRef = useRef();

    const [createMessage, setCreateMessage] = useState({
        title: "",
        message: "",
    });

    const fetchQuestions = async () => {
        useAxios
            .get(`teacher/question-answer-list/${UserData()?.teacher_id}/`)
            .then((res) => {
                console.log(res.data);
                setQuestions(res.data);
            });
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleConversationClose = () => {
        setConversationShow(false);
        setSelectedConversation(null);
    };

    const handleConversationShow = (conversation) => {
        setConversationShow(true);
        setSelectedConversation(conversation);
    };

    const handleMessageChange = (event) => {
        setCreateMessage({
            ...createMessage,
            [event.target.name]: event.target.value,
        });
    };

    const sendNewMessage = async (e) => {
        e.preventDefault();

        if (!createMessage.message.trim()) return;

        const formdata = new FormData();

        formdata.append("course_id", selectedConversation.course);
        formdata.append("user_id", UserData()?.user_id);
        formdata.append("message", createMessage.message);
        formdata.append("qa_id", selectedConversation?.qa_id);

        useAxios
            .post(`student/question-answer-message-create/`, formdata)
            .then((res) => {
                setSelectedConversation(res.data.question);

                setCreateMessage({
                    title: "",
                    message: "",
                });
            });
    };

    useEffect(() => {
        if (lastElementRef.current) {
            lastElementRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [selectedConversation]);

    const handleSearchQuestion = (event) => {
        const query = event.target.value.toLowerCase();

        if (query === "") {
            fetchQuestions();
        } else {
            const filtered = questions?.filter((question) =>
                question.title.toLowerCase().includes(query)
            );

            setQuestions(filtered);
        }
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
                                    <MessageCircle size={21} />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        Question and Answer
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Discuss questions with your students
                                    </p>
                                </div>
                            </div>

                            {/* Discussion Card */}
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                {/* Card Header */}
                                <div className="border-b border-slate-200 p-5">

                                    <div className="mb-4">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Discussion
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Search and join student conversations
                                        </p>
                                    </div>

                                    {/* Search */}
                                    <div className="relative">
                                        <Search
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="search"
                                            placeholder="Search Questions"
                                            aria-label="Search"
                                            onChange={handleSearchQuestion}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                        />
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">

                                    {questions?.length > 0 ? (
                                        <div className="space-y-4">

                                            {questions.map((q, index) => (
                                                <div
                                                    key={q.qa_id || index}
                                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                                                >
                                                    {/* User Info */}
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">

                                                            <img
                                                                src={q.profile.image}
                                                                className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                                                                alt="avatar"
                                                            />

                                                            <div>
                                                                <h3 className="font-semibold text-slate-900">
                                                                    {q.profile.full_name}
                                                                </h3>

                                                                <p className="mt-0.5 text-xs text-slate-500">
                                                                    {moment(q.date).format(
                                                                        "DD MMM, YYYY"
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Question */}
                                                    <div className="mb-4">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h4 className="text-base font-semibold text-slate-900">
                                                                {q.title}
                                                            </h4>

                                                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                                                {q.messages?.length || 0}{" "}
                                                                {q.messages?.length === 1
                                                                    ? "message"
                                                                    : "messages"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Join Conversation */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleConversationShow(q)
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md"
                                                    >
                                                        Join Conversation
                                                        <ArrowRight size={16} />
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    ) : (
                                        /* Empty State */
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                <MessageCircle size={26} />
                                            </div>

                                            <h3 className="text-base font-semibold text-slate-900">
                                                No Questions
                                            </h3>

                                            <p className="mt-1 max-w-sm text-sm text-slate-500">
                                                There are no questions available at
                                                the moment.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* Conversation Modal */}
            {conversationShow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

                    <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                            <div className="min-w-0 pr-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                                    Lesson
                                </p>

                                <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
                                    {selectedConversation?.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={handleConversationClose}
                                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 sm:p-6">

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">

                                {/* Messages */}
                                <div className="h-[400px] overflow-y-auto pr-2 sm:h-[500px]">

                                    {selectedConversation?.messages?.length > 0 ? (
                                        <div className="space-y-4">

                                            {selectedConversation.messages.map(
                                                (m, index) => (
                                                    <div
                                                        className="flex items-start gap-3"
                                                        key={m.id || index}
                                                    >
                                                        {/* Avatar */}
                                                        <img
                                                            src={
                                                                m.profile.image?.startsWith(
                                                                    "http://127.0.0.1:8000"
                                                                )
                                                                    ? m.profile.image
                                                                    : `http://127.0.0.1:8000${m.profile.image}`
                                                            }
                                                            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                                                            alt="user avatar"
                                                        />

                                                        {/* Message */}
                                                        <div className="min-w-0 flex-1">
                                                            <div className="rounded-2xl rounded-tl-md bg-white p-3 shadow-sm ring-1 ring-slate-200">

                                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                                    <h4 className="text-sm font-semibold text-slate-900">
                                                                        {m.profile.full_name}
                                                                    </h4>

                                                                    <span className="text-xs text-slate-400">
                                                                        {moment(
                                                                            m.date
                                                                        ).format(
                                                                            "DD MMM, YYYY"
                                                                        )}
                                                                    </span>
                                                                </div>

                                                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                                                    {m.message}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}

                                            <div ref={lastElementRef} />
                                        </div>
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-center">
                                            <div>
                                                <MessageCircle
                                                    size={32}
                                                    className="mx-auto text-slate-300"
                                                />

                                                <p className="mt-3 text-sm text-slate-500">
                                                    No messages yet.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Message Form */}
                                <form
                                    className="mt-4 flex flex-col gap-2 sm:flex-row"
                                    onSubmit={sendNewMessage}
                                >
                                    <textarea
                                        name="message"
                                        value={createMessage.message}
                                        onChange={handleMessageChange}
                                        placeholder="Write your message..."
                                        rows="2"
                                        className="min-h-[52px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                    />

                                    <button
                                        type="submit"
                                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md sm:w-auto"
                                    >
                                        Post
                                        <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* <BaseFooter /> */}
        </>
    );
}

export default QA;