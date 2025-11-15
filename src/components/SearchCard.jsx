import React from "react";
import { Search } from "lucide-react";

const SearchCard = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search topics, mentees, mentors..."
        className="w-full bg-gray-100 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-full pl-12 pr-4 py-3 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default SearchCard;
