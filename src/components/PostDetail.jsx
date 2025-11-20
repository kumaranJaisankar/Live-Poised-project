import React, { useState } from "react";
import { MoreHorizontal, User, ThumbsUp, MessageCircle } from "lucide-react";

const ReplyForm = ({ isToplevel = false }) => (
  <div className="flex items-start gap-3">
    <img
      src={`https://i.pravatar.cc/150?u=current-user`} // Dummy avatar
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
  const hasReplies = comment.children && comment.children.length > 0;

  return (
    <div className="flex items-start gap-3">
      <img
        src={`https://i.pravatar.cc/150?u=${comment.author.user_id}`}
        alt={comment.author.name}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
              {comment.author.name}
            </h4>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                comment.author.role === "mentor"
                  ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              }`}
            >
              {comment.author.role}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {comment.text}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1.5 pl-2">
          <span>{new Date(comment.created_at).toLocaleDateString()}</span>
          <button className="font-medium hover:text-teal-600 dark:hover:text-teal-400">
            Like
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
              : `View ${comment.children.length} ${
                  comment.children.length > 1 ? "replies" : "reply"
                }`}
          </button>
        )}
        {showReplies && hasReplies && (
          <div className="mt-4 space-y-4 pl-5 border-l-2 border-gray-200 dark:border-gray-700">
            {comment.children.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PostDetail = ({ post, comments, onBack }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-4 mt-4 sm:p-6 max-w-4xl mx-auto">
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
      <img
        src={`https://i.pravatar.cc/150?u=${post.author.user_id}`}
        alt={post.author.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {post.author.name}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              post.author.role === "mentor"
                ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            }`}
          >
            {post.author.role}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(post.created_at).toLocaleDateString()}
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
        <span>{comments.length}</span>
      </button>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      <div className="space-y-6">
        <ReplyForm isToplevel={true} />
        <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PostDetail;
