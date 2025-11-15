import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Forum from "../components/Forum";
import Chat from "../components/Chat";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import useThemeStore from "../utils/themeStore";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { loginUser } from "../services/userServices";

export default function HealConnectApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { theme, sidebarCollapsed } = useThemeStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", "userId"],
    queryFn: () => loginUser("email", "passwork"),
  });
  // console.log("User Profile Data:", error);
  // if (isLoading) return <p>Loading profile...</p>;
  // if (isError) return <p>Failed to load user profile</p>;

  // Initialize theme on component mount
  useEffect(() => {
    loginUser("email", "password");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handlePageChange = (page) => {
    if (page === "create-post") {
      setShowCreatePost(true);
    } else {
      setCurrentPage(page);
      setMobileMenuOpen(false);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onPageChange={handlePageChange} />;
      case "forum":
        return <Forum onPageChange={handlePageChange} />;
      case "chat":
        return <Chat />;
      case "profile":
        return <Profile />;
      case "settings":
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Settings page coming soon...
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Nunito+Sans:wght@300;400;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap");

        .font-inter {
          font-family: "Inter", sans-serif;
        }
        .font-nunito {
          font-family: "Nunito Sans", sans-serif;
        }
        .font-manrope {
          font-family: "Manrope", sans-serif;
        }

        /* Prevent elastic/rubber band scrolling */
        html,
        body {
          overscroll-behavior: none;
          overscroll-behavior-y: none;
          -webkit-overflow-scrolling: touch;
        }

        /* Prevent horizontal scrolling */
        body {
          overflow-x: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Smooth animations */
        * {
          transition-property:
            background-color, border-color, color, fill, stroke, opacity,
            box-shadow, transform;
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        <ProtectedRoute>
          <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
          <div
            className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"} flex flex-col h-screen`}
          >
            {/* <Navbar
              onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
              mobileMenuOpen={mobileMenuOpen}
            /> */}
            <main className="flex-1 overflow-y-auto">
              {renderCurrentPage()}
            </main>
          </div>
        </ProtectedRoute>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-screen flex flex-col">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-0 z-50 w-72 h-full">
              <Sidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}

        {/* Mobile Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                HealConnect
              </span>
            </div>
            <div className="w-10"></div>
          </div>
          <main className="flex-1 overflow-y-auto">{renderCurrentPage()}</main>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
}
