import React, { useState } from "react";
import {
  MessageCircle,
  Plus,
  TrendingUp,
  Users,
  Heart,
  Clock,
  MessageSquare,
  ThumbsUp,
  Target,
  Award,
  Calendar,
  ArrowRight,
} from "lucide-react";
import NewsFeed from "./NewsFeed";
import SearchCard from "./SearchCard";

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    teal: {
      bg: "bg-teal-100 dark:bg-teal-900/30",
      text: "text-teal-600 dark:text-teal-400",
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
    },
  };
  const classes = colorClasses[color] || colorClasses.teal;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex items-center gap-4">
      <div
        className={`w-10 h-10 ${classes.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={20} className={classes.text} />
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
};

const QuickActionButton = ({ icon: Icon, text }) => (
  <button className="w-full p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left transition-colors duration-200">
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-gray-600 dark:text-gray-300" />
      <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
        {text}
      </span>
    </div>
  </button>
);

const Dashboard = ({ onPageChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const mentors = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Cancer Recovery",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1",
    },
    {
      id: 2,
      name: "Marcus Thompson",
      specialty: "Mental Health",
      avatar:
        "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1",
    },
  ];

  const recentForumPosts = [
    {
      id: 1,
      title: "Tips for managing chemotherapy side effects",
      author: "Dr. Sarah Williams",
      authorType: "mentor",
      replies: 24,
      likes: 156,
      timeAgo: "2h ago",
      preview:
        "I wanted to share some practical tips that helped me through my treatment...",
    },
    {
      id: 2,
      title: "Finding hope during difficult recovery periods",
      author: "Michael Rodriguez",
      authorType: "mentee",
      replies: 12,
      likes: 89,
      timeAgo: "4h ago",
      preview:
        "For anyone struggling right now, please know that you're not alone...",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "message",
      content: "Dr. Emily Chen sent you a message",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "forum",
      content: "New reply to 'Managing anxiety during recovery'",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "milestone",
      content: "Congratulations! 30 days of progress logged",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Posts" },
    { id: "mentor", label: "Mentor Only" },
    { id: "trending", label: "Trending" },
    { id: "recent", label: "Recent" },
  ];

  return (
    <div className="p-4 sm:p-5 lg:p-6  min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome back, Kumara!
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Here's your summary for today.
              </p>
            </div>
            <SearchCard />
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={Users}
                label="Active Mentees"
                value="12"
                color="teal"
              />
              <StatCard
                icon={MessageSquare}
                label="Forum Posts"
                value="248"
                color="blue"
              />
              <StatCard
                icon={Heart}
                label="Helpful Responses"
                value="1.2k"
                color="green"
              />
              <StatCard
                icon={Award}
                label="Recovery Journey"
                value="2.5Y"
                color="purple"
              />
            </div>
            {/* My Mentees */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Mentees
                </h2>
                <button className="text-teal-600 dark:text-teal-400 hover:underline text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">
                        {mentor.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {mentor.specialty}
                      </p>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-teal-500 hover:bg-teal-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Forum Posts */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Forum Activity
                </h2>
                <button
                  onClick={() => onPageChange("create-post")}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Create Post
                </button>
              </div>
              {/* Filter Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-3">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 -mb-px border-b-2 ${
                      activeFilter === tab.id
                        ? "border-teal-500 text-teal-600 dark:text-teal-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {recentForumPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {post.preview}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span>by {post.author}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            post.authorType === "mentor"
                              ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          }`}
                        >
                          {post.authorType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MessageCircle size={12} /> {post.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={12} /> {post.likes}
                        </span>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <QuickActionButton
                  icon={MessageSquare}
                  text="Start New Discussion"
                />
                <QuickActionButton icon={Users} text="Find New Mentees" />
                <QuickActionButton icon={Calendar} text="Schedule Session" />
              </div>
            </div>
            <NewsFeed />
            {/* Progress Tracker */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Target size={20} className="text-teal-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Progress Tracker
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You've completed <strong>8 of 10</strong> recovery milestones.
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-teal-500 h-2.5 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
