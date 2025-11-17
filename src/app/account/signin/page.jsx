"use client";

import { useState } from "react";
// import useAuth from "@/utils/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/userServices.js";
import { useAuth } from "../../../hooks/useAuth";
import { ProtectedRoute } from "../../../components/auth/ProtectedRoute";
import "../../global.css";

// import { useRouter } from "next/navigation";

// import { UnProtectedRoute } from "../../../components/auth/UnProtectedRoute";

export default function SignInPage() {
  //   const router = useRouter();
  const auth = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      //   router.push("/dashboard");
    },
    onError: () => alert("Login failed. Check your credentials."),
  });

  //   const { signInWithCredentials } = useAuth();
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    mutation.mutate({ email, password });
  };

  const handleKeycloakLogin = () => {
    auth.login(); // This triggers the Keycloak login flow
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    // if (!email || !password) {
    //   setError("Please fill in all fields");
    //   setLoading(false);
    //   return;
    // }
    auth.login();

    // try {
    //   await signInWithCredentials({
    //     email,
    //     password,
    //     callbackUrl: "/",
    //     redirect: true,
    //   });
    // } catch (err) {
    //   console.error("Sign in error:", err);
    //   setError("Invalid email or password. Please try again.");
    //   setLoading(false);
    // }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-screen-xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg flex justify-center flex-1 overflow-hidden">
          {/* Form */}
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 w-full">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                Live Poised
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Medical Discussion Community
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <h2 className="text-xl xl:text-2xl font-bold">Welcome Back</h2>
              <div className="w-full flex-1 mt-8">
                <form
                  className="mx-auto max-w-xs"
                  onSubmit={handleCredentialsSubmit}
                >
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-teal-400 focus:bg-white dark:focus:bg-gray-800"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-teal-400 focus:bg-white dark:focus:bg-gray-800"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={mutation.isLoading}
                    className="mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">
                      {mutation.isLoading ? "Signing In..." : "Sign In"}
                    </span>
                  </button>
                </form>

                <div className="my-8 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 dark:text-gray-400 tracking-wide font-medium bg-gray-50 dark:bg-gray-900 transform translate-y-1/2">
                    Or sign in with
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleKeycloakLogin}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.2l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-71.4 0-105.2V149.9H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 149.9l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.3z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign in with Keycloak</span>
                  </button>
                </div>

                <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
                  Don't have an account?{" "}
                  <a
                    href="/account/signup"
                    className="border-b border-gray-500 font-semibold"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
