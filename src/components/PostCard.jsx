import {
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  Pin,
  User,
} from "lucide-react";

const PostCard = ({ post, onClick }) => (
  <div
    className={`bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-teal-400 dark:hover:border-teal-600 transition-all duration-200 cursor-pointer ${
      post.isPinned ? "ring-1 ring-teal-500/30" : ""
    }`}
    onClick={onClick}
  >
    {post.isPinned && (
      <div className="flex items-center gap-2 mb-3 text-teal-600 dark:text-teal-400">
        <Pin size={16} />
        <span className="text-sm font-medium">Pinned</span>
      </div>
    )}

    <div className="flex items-start gap-4">
      {post.isAnonymous ? (
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-gray-500" />
        </div>
      ) : (
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 dark:text-white truncate">
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
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto flex-shrink-0">
            {post.timeAgo}
          </span>
        </div>
        <h2 className="text-base font-bold text-gray-900 dark:text-white my-2 line-clamp-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {post.content}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <ThumbsUp size={16} />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle size={16} />
              <span>{post.replies}</span>
            </div>
          </div>
          <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PostCard;
