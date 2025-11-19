"use client";

import { useAuth } from "@/hooks/useAuth";
// import { useRouter, usePathname } from "next/navigation";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import SignInPage from "../../app/account/signin/page";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, login, getToken } = useAuth();
  const navigate = useNavigate();
  //   const router = useRouter();
  //   const pathname = usePathname();
  const path = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute Token:", getToken());
    if (!isLoading && !isAuthenticated) {
      sessionStorage.setItem("redirectUrl", path.pathname);

      navigate("/account/signin");
    } else if (!isLoading && isAuthenticated) {
      localStorage.setItem("access_token", getToken());
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate, path.pathname]);

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-950">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }
  //   if (!isAuthenticated) {
  //     return null;
  //   }

  return children;
}
