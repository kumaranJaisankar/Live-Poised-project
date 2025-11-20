import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommunities,
  createCommunity,
  getPosts,
  createPost,
  getPostById,
} from "../services/CommunityService";
import {
  Plus,
  Users,
  MessageSquare,
  Flame,
  ArrowUp,
  Clock,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import PostCard from "./PostCard";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";

const Forum = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeFilter, setActiveFilter] = useState("latest");

  const {
    data: communities,
    isLoading: communitiesLoading,
    isError: communitiesError,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  useEffect(() => {
    if (!selectedCommunity && communities && communities.length > 0) {
      setSelectedCommunity(communities[0].id);
    }
  }, [communities, selectedCommunity]);

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: ["posts", selectedCommunity, activeFilter],
    queryFn: () => getPosts(selectedCommunity, { sortBy: activeFilter }),
    enabled: !!selectedCommunity && !selectedPost,
  });

  const {
    data: postDetail,
    isLoading: postDetailLoading,
    isError: postDetailError,
  } = useQuery({
    queryKey: ["post", selectedPost],
    queryFn: () => getPostById(selectedPost),
    enabled: !!selectedPost,
  });

  const createCommunityMutation = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries(["communities"]);
      setShowCreateCommunity(false);
    },
  });

  const createPostMutation = useMutation({
    mutationFn: ({ communityId, postData }) =>
      createPost(communityId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", selectedCommunity]);
      setShowCreatePost(false);
    },
  });

  const handleCreateCommunity = (formData) => {
    const communityData = {
      ...formData,
      created_by: {
        user_id: auth.user.sub,
        name: auth.user.name,
        role: "Mentor",
      },
    };
    createCommunityMutation.mutate(communityData);
  };

  const handleCreatePost = (postData) => {
    createPostMutation.mutate({
      communityId: selectedCommunity,
      postData: {
        ...postData,
        author: {
          user_id: auth.user.sub,
          name: auth.user.name,
          role: "Mentor",
        },
      },
    });
  };

  if (selectedPost && postDetail) {
    return (
      <div className="mt-4">
        <PostDetail
          post={postDetail.post}
          comments={postDetail.comments_tree}
          onBack={() => setSelectedPost(null)}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-8xl mx-auto grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Left Sidebar: Communities */}
        <aside className="col-span-3">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Communities
              </h2>
              <button
                onClick={() => setShowCreateCommunity(true)}
                className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {communitiesLoading && (
                <p className="text-sm text-gray-500">Loading...</p>
              )}
              {communitiesError && (
                <p className="text-sm text-red-500">
                  Error loading communities.
                </p>
              )}
              {communities?.map((community) => (
                <div
                  key={community.id}
                  onClick={() => {
                    setSelectedCommunity(community.id);
                    setSelectedPost(null);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCommunity === community.id
                      ? "bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 font-semibold"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <div className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <span>{community.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content: Post Feed */}
        <main className="col-span-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-800/50 rounded-full shadow-sm">
              <FilterButton
                active={activeFilter === "latest"}
                onClick={() => setActiveFilter("latest")}
                icon={Clock}
                label="Latest"
              />
              <FilterButton
                active={activeFilter === "popular"}
                onClick={() => setActiveFilter("popular")}
                icon={Flame}
                label="Popular"
              />
              <FilterButton
                active={activeFilter === "top"}
                onClick={() => setActiveFilter("top")}
                icon={ArrowUp}
                label="Top"
              />
            </div>
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2.5 rounded-full bg-teal-500 text-white hover:bg-teal-600 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus size={18} /> Create Post
            </button>
          </div>

          <div className="space-y-6">
            {postsLoading && (
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 text-center text-gray-500">
                Loading posts...
              </div>
            )}
            {postsError && (
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 text-center text-red-500">
                Error loading posts.
              </div>
            )}
            {posts?.length === 0 && !postsLoading && (
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-10 text-center">
                <MessageSquare size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  No posts yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Be the first to create a post in this community!
                </p>
              </div>
            )}
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                post={{
                  ...post,
                  author: post.author.name,
                  avatar: `https://i.pravatar.cc/150?u=${post.author.user_id}`,
                  authorType: post.author.role,
                  timeAgo: new Date(post.created_at).toLocaleDateString(),
                  replies: 0,
                }}
                onClick={() => setSelectedPost(post._id)}
              />
            ))}
          </div>
        </main>

        {/* Right Sidebar: Widgets */}
        <aside className="col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-4 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  "#mentalhealth",
                  "#recovery",
                  "#mindfulness",
                  "#anxiety-support",
                  "#selfcare",
                ].map((tag) => (
                  <div
                    key={tag}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 cursor-pointer"
                  >
                    <span className="font-semibold">{tag}</span>
                    <p className="text-xs text-gray-400">1,234 posts</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-4 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                New Members
              </h3>
              {/* Placeholder for new members */}
            </div>
          </div>
        </aside>
      </div>

      {showCreateCommunity && (
        <CreateCommunityForm
          onSubmit={handleCreateCommunity}
          onClose={() => setShowCreateCommunity(false)}
          isLoading={createCommunityMutation.isLoading}
        />
      )}

      {showCreatePost && selectedCommunity && (
        <CreatePost
          onSubmit={handleCreatePost}
          onClose={() => setShowCreatePost(false)}
          isLoading={createPostMutation.isLoading}
        />
      )}
    </div>
  );
};

const FilterButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
  >
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

const CreateCommunityForm = ({ onSubmit, onClose, isLoading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, tags: tags.split(",").map((t) => t.trim()) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Create a new community
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g., Mindfulness & Meditation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              placeholder="What is this community about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., wellness, anxiety, support"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-1 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-1 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forum;
