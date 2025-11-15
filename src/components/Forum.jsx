import React, { useState } from "react";
import {
  Plus,
  Filter,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  Pin,
  TrendingUp,
  Clock,
  User,
  Heart,
  Reply,
  Search,
} from "lucide-react";
import PostCard from "./PostCard";
import PostDetail from "./PostDetail";

const Forum = ({ onPageChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);

  const filterTabs = [
    { id: "all", label: "All" },
    { id: "mentor", label: "Mentor" },
    { id: "trending", label: "Trending" },
    { id: "recent", label: "Recent" },
  ];

  const forumPosts = [
    {
      id: 1,
      title: "How to cope with treatment anxiety - my journey and tips",
      content:
        "I wanted to share my experience dealing with anxiety during cancer treatment. It's been 6 months since I completed chemo, and I've learned some valuable coping strategies...",
      author: "Dr. Sarah Williams",
      authorType: "mentor",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1",
      timeAgo: "2h",
      replies: 24,
      likes: 156,
      tags: ["Cancer", "Mental Health", "Coping"],
      isPinned: true,
      isAnonymous: false,
    },
    {
      id: 2,
      title: "Finding hope during difficult recovery periods",
      content:
        "For anyone struggling right now, please know that you're not alone. I've been through the darkest moments and want to share what helped me find light again...",
      author: "Anonymous",
      authorType: "mentee",
      avatar: null,
      timeAgo: "4h",
      replies: 12,
      likes: 89,
      tags: ["Mental Health", "Recovery", "Support"],
      isPinned: false,
      isAnonymous: true,
    },
    {
      id: 3,
      title: "Nutrition during chemotherapy - what worked for me",
      content:
        "Maintaining proper nutrition was crucial during my treatment journey. Here are some practical tips and recipes that helped me stay nourished...",
      author: "Lisa Chang",
      authorType: "mentor",
      avatar:
        "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1",
      timeAgo: "6h",
      replies: 18,
      likes: 203,
      tags: ["Nutrition", "Cancer", "Health"],
      isPinned: false,
      isAnonymous: false,
    },
  ];

  const trendingTopics = [
    "Mental Health",
    "Coping Strategies",
    "Nutrition Tips",
    "Recovery Stories",
    "Clinical Trials",
  ];

  if (selectedPost) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community Forum
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Engage with peers, share experiences, and find support.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left Column: Posts */}
        <div className="lg:col-span-2">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search forum..."
                className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-full pl-10 pr-4 py-2.5 text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-full p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === tab.id
                      ? "bg-teal-500 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0">
          <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Trending Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-800/50 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => onPageChange("create-post")}
            className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-lg"
          >
            <Plus size={22} />
            Create a Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
