import React from "react";
import {
  Home,
  MessageSquare,
  MessageCircle,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BellDot,
  Heart,
  Plus,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import useThemeStore from "../utils/themeStore";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getUserByName } from "../services/userServices";
import Avatar from "./Avatar";

const Sidebar = ({ currentPage, onPageChange }) => {
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const { theme, setTheme } = useTheme();
  const auth = useAuth();
  const userDetails = auth.user;
  const isAuthenticated = typeof window !== "undefined" && auth.isAuthenticated;
  console.log("Sidebar Rendered - Theme:", theme);
  console.log("User Details:", userDetails?.preferred_username);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["userprofile", userDetails?.preferred_username],
    queryFn: () => getUserByName(userDetails?.preferred_username),
  });

  useEffect(() => {
    if (userDetails?.preferred_username) {
      refetch();
    }
  }, [userDetails?.preferred_username, currentPage]);

  const navigationItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "forum", icon: MessageSquare, label: "Forum" },
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "notification", icon: BellDot, label: "Notification" },
    // { id: "profile", icon: User, label: "Profile" },
    // { id: "settings", icon: Settings, label: "Settings" },
  ];

  function formatDateTimeMMDDYYYY(isoDateStr) {
    const date = new Date(isoDateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const formattedDate = formatDateTimeMMDDYYYY(
    data?.loginDetails?.lastLoggedInAt ||
      data?.lastLoggedInAt ||
      "2025-06-10T10:00:00"
  );

  console.log("Formatted Login Date:", formattedDate);
  console.log("User Profile Data from side bar component:", data);
  return (
    <div
      className={`${sidebarCollapsed ? "w-20" : "w-72"} transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-r border-teal-100 dark:border-gray-800 flex flex-col h-screen fixed left-0 top-0 z-40`}
    >
      {/* Header with Collapse Button */}
      <div className="relative p-3 border-b border-teal-100 dark:border-gray-800">
        {/* Collapse Button at Top Edge */}
        <button
          onClick={toggleSidebar}
          className={`absolute ${sidebarCollapsed ? "-right-3" : "-right-4"} top-4 w-8 h-8 bg-white dark:bg-gray-800 border border-teal-200 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 shadow-sm z-50`}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500  text-gray-900 dark:text-white   to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
            {/* <Heart size={20} className="text-white" /> */}
            LP
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                Live Poised
              </h1>
              <p className="text-sm text-teal-600 dark:text-teal-400">
                Healing Together
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <div
        className="p-4 border-b border-teal-100 dark:border-gray-800 cursor-pointer"
        onClick={() => onPageChange("profile")}
      >
        <div className="flex items-center gap-3">
          <img
            src={
              "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
            }
            alt={"auth.user.name"}
            className="w-16 h-16 rounded-full object-cover border-4 border-teal-200 dark:border-teal-700"
          />
        </div>
      </div> */}
      {/* User Avatar */}
      {isAuthenticated && auth.user && (
        <div
          className="p-4 border-b border-teal-100 dark:border-gray-800 cursor-pointer"
          onClick={() => onPageChange("profile")}
        >
          <div className="flex items-center gap-3">
            {data?.userProfile?.userType === "Mentor" ||
            data?.userType === "Mentor" ? (
              <img
                src={
                  "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
                }
                alt={auth.user.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-teal-200 dark:border-teal-700"
              />
            ) : (
              <Avatar
                name={auth.user.name}
                className="w-16 h-16 text-2xl border-4 border-teal-200 dark:border-teal-700"
              />
            )}
            {!sidebarCollapsed && (
              <div className=" inline-block min-w-0">
                <p className="font-semibold text-base text-gray-900 dark:text-white truncate ">
                  {auth.user.name}
                </p>
                <p className="text-[11px] text-teal-500 dark:text-teal-600 truncate">
                  {data?.userProfile?.userType || data?.userType}
                </p>

                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  Last Login: {formattedDate || "2025-06-10 10:00 AM"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* {isAuthenticated && auth.user && (
        <div
          className="p-4 border-b border-teal-100 dark:border-gray-800 cursor-pointer"
          onClick={() => onPageChange("profile")}
        >
          <div className="flex flex-col items-center justify-center ">
            <img
              src={
                "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
              }
              alt={auth.user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-teal-200 dark:border-teal-700"
            />
            {!sidebarCollapsed && (
              <div className="min-w-0 text-center mt-2">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {auth.user.name}{" "}
                  <span
                    className={
                      "text-xs px-2 py-1 rounded-full mt-2 inline-block bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }
                  >
                    Mentor
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )} */}
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-teal-400"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-medium text-sm font-inter truncate">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-3 border-t border-teal-100 dark:border-gray-800">
        <div className="relative">
          <div className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
            {theme === "light" ? (
              <Sun size={18} className="flex-shrink-0" />
            ) : (
              <Moon size={18} className="flex-shrink-0" />
            )}
            {!sidebarCollapsed && (
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-transparent outline-none font-medium text-sm font-inter appearance-none"
              >
                <option
                  value="light"
                  className="font-medium bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  Light
                </option>
                <option
                  value="dark"
                  className="font-medium bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  Dark
                </option>
                <option
                  value="system"
                  className="font-medium bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  System
                </option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-teal-100 dark:border-gray-800">
        <button
          onClick={auth.logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="font-medium text-sm font-inter">Logout</span>
          )}
        </button>
      </div>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className="p-3 text-center">
          <p className="text-[10px] text-slate-500">© Vanna Info Tech</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
