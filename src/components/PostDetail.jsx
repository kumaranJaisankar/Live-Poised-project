import React, { useState } from "react";
import { MoreHorizontal, User, ThumbsUp, MessageCircle } from "lucide-react";

// This data would typically be fetched or passed from a higher-level component
const comments = [
  {
    id: 1,
    postId: 1,
    author: "Mark Thompson",
    authorType: "mentee",
    avatar:
      "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    content:
      "Thank you so much for sharing this. I'm currently dealing with pre-treatment anxiety and this really helps.",
    timeAgo: "1h ago",
    likes: 12,
    isAnonymous: false,
    replies: [
      {
        id: 2,
        postId: 1,
        author: "Dr. Emily Chen",
        authorType: "mentor",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
        content:
          "Excellent advice, Sarah. I'd also recommend mindfulness meditation - it has shown great results in clinical studies.",
        timeAgo: "45m ago",
        likes: 18,
        isAnonymous: false,
        replies: [
          {
            id: 3,
            postId: 1,
            author: "Mark Thompson",
            authorType: "mentee",
            avatar:
              "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
            content: "I'll give that a try! Any good apps you recommend?",
            timeAgo: "30m ago",
            likes: 5,
            isAnonymous: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    postId: 1,
    author: "Anonymous",
    authorType: "mentee",
    avatar: null,
    content:
      "This is a great thread. It's comforting to know I'm not alone in feeling this way.",
    timeAgo: "20m ago",
    likes: 9,
    isAnonymous: true,
    replies: [],
  },
];

const ReplyForm = ({ isToplevel = false }) => (
  <div className="flex items-start gap-3">
    <img
      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
      alt="Current User"
      className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-1"
    />
    <div className="flex-1">
      <textarea
        placeholder={isToplevel ? "Share your thoughts..." : "Write a reply..."}
        className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
        rows={isToplevel ? 3 : 2}
      />
      <div className="flex justify-end items-center mt-2 gap-3">
        <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <input
            type="checkbox"
            className="rounded-sm bg-transparent dark:bg-gray-700"
          />
          <span>Post anonymously</span>
        </label>
        <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-medium">
          {isToplevel ? "Post Comment" : "Post Reply"}
        </button>
      </div>
    </div>
  </div>
);

const Comment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="flex items-start gap-3">
      {comment.isAnonymous ? (
        <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-gray-500" />
        </div>
      ) : (
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
              {comment.isAnonymous ? "Anonymous" : comment.author}
            </h4>
            {comment.authorType && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  comment.authorType === "mentor"
                    ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                }`}
              >
                {comment.authorType}
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {comment.content}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1.5 pl-2">
          <span>{comment.timeAgo}</span>
          <button className="font-medium hover:text-teal-600 dark:hover:text-teal-400">
            Like ({comment.likes})
          </button>
          <button
            onClick={() => setShowReply(!showReply)}
            className="font-medium hover:text-teal-600 dark:hover:text-teal-400"
          >
            Reply
          </button>
        </div>
        {showReply && (
          <div className="mt-3">
            <ReplyForm />
          </div>
        )}
        {hasReplies && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mt-2 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${
                showReplies ? "rotate-90" : ""
              }`}
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            {showReplies
              ? "Hide replies"
              : `View ${comment.replies.length} ${
                  comment.replies.length > 1 ? "replies" : "reply"
                }`}
          </button>
        )}
        {showReplies && hasReplies && (
          <div className="mt-4 space-y-4 pl-5 border-l-2 border-gray-200 dark:border-gray-700">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PostDetail = ({ post, onBack }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-4 sm:p-6">
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onBack}
        className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Forum
      </button>
      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
        <MoreHorizontal size={18} className="text-gray-500" />
      </button>
    </div>

    <div className="flex items-start gap-4 mb-4">
      {post.isAnonymous ? (
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-gray-500" />
        </div>
      ) : (
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {post.isAnonymous ? "Anonymous" : post.author}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              post.authorType === "mentor"
                ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            }`}
          >
            {post.authorType}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {post.timeAgo}
        </span>
      </div>
    </div>

    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {post.title}
    </h1>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
      {post.content}
    </p>
    <div className="flex flex-wrap gap-2 mb-6">
      {post.tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
        >
          #{tag}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
      <button className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
        <ThumbsUp size={16} />
        <span>{post.likes}</span>
      </button>
      <button className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
        <MessageCircle size={16} />
        <span>{post.replies}</span>
      </button>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Comments ({post.replies})
      </h3>

      <div className="space-y-6">
        <ReplyForm isToplevel={true} />
        <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          {comments
            .filter((comment) => comment.postId === post.id)
            .map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default PostDetail;
