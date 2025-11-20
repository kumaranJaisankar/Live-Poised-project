"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/services/userServices";
import { Eye, EyeOff, Check, Heart } from "lucide-react";
export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const [userType, setUserType] = useState("Mentee");
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User created successfully", data);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setFormError(null);
      setTimeout(() => {
        navigate("/account/signin?signup=success");
      }, 2000); // Redirect after 2 seconds
      // navigate("/account/signin?signup=success");
    },
    onError: (error) => {
      console.error("Sign up error:", error);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Front-end validation
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !userType
    ) {
      setFormError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    // Execute the mutation
    mutation.mutate({ name, email, phone, password, userType });
  };

  const passwordStrength =
    password.length >= 6 ? "strong" : password.length >= 3 ? "medium" : "weak";

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 p-8 text-white">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/20 p-4">
              <Heart size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Join Live Poised
          </h1>
          <p className="mt-4 text-lg text-teal-100">
            A community dedicated to healing and growing together. Share your
            journey in a safe and supportive space.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 sm:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
              Create Your Account
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Let's get you started.
            </p>
          </div>

          <form noValidate onSubmit={onSubmit} className="space-y-4">
            <h2 className="hidden lg:block text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Sign Up
            </h2>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  placeholder="Your Full Name "
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555-123-4567"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  I am a...
                </label>
                <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="Mentee">Mentee</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    required
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {confirmPassword && password === confirmPassword && (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 mt-2">
                    <Check size={14} />
                    Passwords match
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {(formError || mutation.isError) && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                {formError ||
                  mutation.error?.message ||
                  "An unknown error occurred"}
              </div>
            )}
            {successMessage && (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-600 dark:text-green-400">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50"
            >
              {mutation.isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-4">
              Already have an account?{" "}
              <a
                href="/account/signin"
                className="font-semibold text-teal-600 hover:underline dark:text-teal-500"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import useAuth from "@/utils/useAuth";
// import { Eye, EyeOff, Check } from "lucide-react";

// export default function SignUpPage() {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { signUpWithCredentials } = useAuth();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Validation
//     if (!name || !email || !phone || !password || !confirmPassword) {
//       setError("Please fill in all fields");
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       setLoading(false);
//       return;
//     }

//     try {
//       await signUpWithCredentials({
//         name,
//         email,
//         phone,
//         password,
//         callbackUrl: "/",
//         redirect: true,
//       });
//     } catch (err) {
//       console.error("Sign up error:", err);
//       setError("Failed to create account. Email may already be in use.");
//       setLoading(false);
//     }
//   };

//   const passwordStrength =
//     password.length >= 6 ? "strong" : password.length >= 3 ? "medium" : "weak";

//   return (
//     <div className="flex min-h-screen  w-full items-center justify-center bg-slate-100 dark:bg-slate-950  p-4">
//       <div className="w-full max-w-md space-y-8">
//         {/* Logo Area */}
//         <div className="text-center">
//           <div className="mb-4 flex justify-center">
//             <div className="rounded-full bg-gradient-to-br from-blue-500 to-teal-500 p-3">
//               <span className="text-3xl">🏥</span>
//             </div>
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
//             Live Poised
//           </h1>
//           <p className="mt-2 text-slate-600 dark:to-slate-400">
//             Medical Discussion Community
//           </p>
//         </div>

//         {/* Form Card */}
//         <form
//           noValidate
//           onSubmit={onSubmit}
//           className="rounded-2xl bg-slate-50 dark:bg-slate-900  p-8 shadow-lg"
//         >
//           <h2 className="mb-6 text-2xl font-bold text-slate-900">
//             Create Account
//           </h2>

//           <div className="space-y-4">
//             {/* Name Input */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
//                 Full Name
//               </label>
//               <input
//                 required
//                 name="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Dr. Jane Smith"
//                 className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               />
//             </div>

//             {/* Email Input */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
//                 Email Address
//               </label>
//               <input
//                 required
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               />
//             </div>
//             {/* Phone Number Input */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
//                 Phone Number
//               </label>
//               <input
//                 required
//                 name="phone"
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="e.g., +1 555-123-4567"
//                 className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   required
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {password && (
//                 <div className="text-xs text-slate-500">
//                   Password strength:{" "}
//                   <span
//                     className={
//                       passwordStrength === "strong"
//                         ? "text-green-600"
//                         : passwordStrength === "medium"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                     }
//                   >
//                     {passwordStrength}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Confirm Password Input */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   required
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//               </div>
//               {confirmPassword && password === confirmPassword && (
//                 <div className="flex items-center gap-1 text-xs text-green-600">
//                   <Check size={16} />
//                   Passwords match
//                 </div>
//               )}
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-3 font-semibold text-white transition hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
//             >
//               {loading ? "Creating Account..." : "Sign Up"}
//             </button>

//             {/* Sign In Link */}
//             <p className="text-center text-sm text-slate-600 dark:text-slate-300">
//               Already have an account?{" "}
//               <a
//                 href="/account/signin"
//                 className="font-semibold text-blue-600 hover:text-blue-700"
//               >
//                 Sign in
//               </a>
//             </p>
//           </div>
//         </form>

//         {/* Terms Note */}
//         <p className="text-center text-xs text-slate-500">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
//       </div>
//     </div>
//   );
// }
