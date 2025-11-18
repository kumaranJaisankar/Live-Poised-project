import React, { useState } from "react";
import { Search, Bell, Sun, Moon, Menu, X } from "lucide-react";
import useThemeStore from "../utils/themeStore";
import { useTheme } from "next-themes";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Navbar = ({ onMobileMenuToggle, mobileMenuOpen }) => {
  const { theme, setTheme } = useTheme();
  const auth = useAuth();
  const userDetails = auth.user;
  // const { theme, toggleTheme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userDetails?.preferred_username],
    queryFn: () => getUserByName(userDetails?.preferred_username),
  });
  console.log("Data", data)
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border-b border-teal-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-800 transition-all duration-200"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            type="text"
            placeholder="Search discussions, mentors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <img
            src="https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-teal-200 dark:border-teal-700 hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-200 cursor-pointer"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {userDetails?.name}
            </p>
            <p className="text-xs text-teal-600 dark:text-teal-400"> {data?.userProfile?.userType || "Mentee"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
