import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import {
  X,
  Image,
  FileText,
  Hash,
  Users,
  Globe,
  Lock,
  ChevronDown,
  Send,
  MessageSquare,
  HelpCircle,
  Star,
  Award,
  Link2,
  Newspaper,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const TabButton = ({ id, activeTab, setActiveTab, icon: Icon, children }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
      activeTab === id
        ? "text-teal-500 border-teal-500"
        : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
    }`}
  >
    <Icon size={18} />
    <span>{children}</span>
  </button>
);

const CreatePost = ({ onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("post"); // post, image, link
  const [title, setTitle] = useState("");
  const editor = useMemo(() => withReact(createEditor()), []);
  const [postContent, setPostContent] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [flair, setFlair] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const flairs = [
    {
      id: "support",
      label: "Support Request",
      color: "bg-blue-500 text-white",
    },
    {
      id: "question",
      label: "Question",
      color: "bg-purple-500 text-white",
    },
    {
      id: "experience",
      label: "Share Experience",
      color: "bg-green-500 text-white",
    },
    {
      id: "milestone",
      label: "Milestone",
      color: "bg-yellow-500 text-black",
    },
  ];

  const privacyOptions = [
    {
      id: "public",
      label: "Public",
      icon: Globe,
    },
    {
      id: "members",
      label: "Members Only",
      icon: Users,
    },
    {
      id: "private",
      label: "Private",
      icon: Lock,
    },
  ];

  const handleSubmit = () => {
    if (!title.trim()) return;

    const postData = {
      title,
      privacy,
      flair,
      postType: activeTab,
      content: postContent,
      imageUrl: imageUrl,
      linkUrl: linkUrl,
      timestamp: new Date().toISOString(),
    };

    console.log("Creating post:", postData);
    onClose();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "image":
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center bg-gray-50 dark:bg-gray-800/50">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              This is a placeholder. You can implement file uploads here.
            </p>
          </div>
        );
      case "link":
        return (
          <div className="p-4">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Url"
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        );
      case "post":
      default:
        return (
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md focus-within:ring-2 focus-within:ring-teal-500 min-h-[150px]">
            <Slate
              editor={editor}
              initialValue={postContent}
              onChange={(value) => setPostContent(value)}
            >
              <Editable
                placeholder="Text (optional)"
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none resize-none"
              />
            </Slate>
          </div>
        );
    }
  };

  const selectedFlair = flairs.find((f) => f.id === flair);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-3xl shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
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

        <div className="p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-semibold dark:text-white">
                {user?.name || "User"}
              </span>
            </div>
            <div className="relative">
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-sm font-semibold rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900 bg-gray-100 dark:bg-gray-800 border border-transparent text-gray-600 dark:text-gray-300"
              >
                {privacyOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Users
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            <TabButton
              id="post"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              icon={Newspaper}
            >
              Post
            </TabButton>
            <TabButton
              id="image"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              icon={Image}
            >
              Image & Video
            </TabButton>
            <TabButton
              id="link"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              icon={Link2}
            >
              Link
            </TabButton>
          </div>

          {/* Title */}
          <div className="relative mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title *"
              maxLength={300}
              required
              className="w-full bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-16"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {title.length}/300
            </span>
          </div>

          {/* Content */}
          {renderContent()}

          {/* Flairs */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <div className="relative">
              <select
                value={flair || ""}
                onChange={(e) => setFlair(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-sm font-semibold rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900 bg-gray-100 dark:bg-gray-800 border border-transparent text-gray-600 dark:text-gray-300"
              >
                <option value="" disabled>
                  Add Flair
                </option>
                {flairs.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
              <Hash
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
            {selectedFlair && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 ${selectedFlair.color} rounded-full text-xs font-bold`}
              >
                {selectedFlair.label}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg flex-shrink-0">
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
