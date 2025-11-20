import React, { useState } from "react";
import { X, Globe, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const CreatePost = ({ onSubmit, onClose, isLoading }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const postData = {
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
      visibility,
    };

    onSubmit(postData);
  };

  const privacyOptions = [
    { id: "public", label: "Public", icon: Globe },
    { id: "private", label: "Private", icon: Lock },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl shadow-2xl flex flex-col max-h-[95vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Create a Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-semibold dark:text-white">
              {user?.name || "User"}
            </span>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-lg font-semibold bg-transparent focus:outline-none border-b border-gray-200 dark:border-gray-700"
            required
          />

          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[150px] resize-none"
            required
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="relative">
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-sm font-semibold rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900 bg-gray-100 dark:bg-gray-800 border border-transparent text-gray-600 dark:text-gray-300"
              >
                {privacyOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              {React.createElement(
                privacyOptions.find((p) => p.id === visibility)?.icon || Globe,
                {
                  className:
                    "absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500",
                }
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-600 disabled:bg-teal-400/50"
              disabled={isLoading || !title.trim()}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
