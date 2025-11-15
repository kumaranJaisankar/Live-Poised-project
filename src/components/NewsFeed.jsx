import React from "react";
import { Rss } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "The Future of Mental Wellness: Trends to Watch",
    link: "#",
    tag: "Recent",
  },
  {
    id: 2,
    title: "Mindfulness in the Digital Age: A Guide",
    link: "#",
    tag: "Popular",
  },
  {
    id: 3,
    title: "Breaking the Stigma: A Look at Mental Health in the Workplace",
    link: "#",
    tag: "Recent",
  },
  { id: 4, title: "The Power of Community in Healing", link: "#" },
  {
    id: 5,
    title: "Nutrition and Mental Health: The Gut-Brain Connection",
    link: "#",
    tag: "Featured",
  },
  { id: 6, title: "AI in Therapy: A New Frontier", link: "#", tag: "Recent" },
  {
    id: 7,
    title: "Coping with Anxiety: Practical Tips",
    link: "#",
    tag: "Popular",
  },
];

// Duplicate items for seamless loop
const extendedNewsItems = [...newsItems, ...newsItems];

const NewsFeed = () => {
  return (
    <div className="bg-white dark:bg-gray-800/40 rounded-2xl shadow-lg p-4 h-96 flex flex-col">
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <Rss size={20} className="text-teal-500" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          News & Articles
        </h2>
      </div>
      <div className="flex-grow overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full animate-scroll-vertical">
          {extendedNewsItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3  transition-colors duration-200 hover:bg-teal-50 dark:hover:bg-gray-700/50 border-t border-gray-700 dark:border-gray-700"
            >
              <p className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-1.5">
                {item.title}
              </p>
              {item.tag && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.tag === "Recent"
                      ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                      : item.tag === "Popular"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}
                >
                  {item.tag}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
