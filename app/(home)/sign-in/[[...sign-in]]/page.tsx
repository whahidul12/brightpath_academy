"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useClerk } from "@clerk/nextjs";

interface ClerkAPIError {
  message: string;
  code: string;
}
interface ClerkAPIErrorResponse {
  errors?: ClerkAPIError[];
}

const ROLE_ROUTES: Record<string, string> = {
  admin: "/dashboard/admin",
  teacher: "/dashboard/teachers",
  student: "/dashboard/students",
  parent: "/dashboard/parents",
};

const DEMO_CREDENTIALS = [
  {
    role: "Admin",
    username: "admin",
    password: "admin",
    icon: "👨‍💼",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    role: "Teacher",
    username: "teacher",
    password: "teacher",
    icon: "👨‍🏫",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    role: "Student",
    username: "student",
    password: "student",
    icon: "👨‍🎓",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    role: "Parent",
    username: "parent",
    password: "parent",
    icon: "👨‍👩‍👧",
    color: "bg-orange-500 hover:bg-orange-600",
  },
];

const LoginPage = () => {
  const clerk = useClerk();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = (username: string, password: string) => {
    setIdentifier(username);
    setPassword(password);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clerk.loaded) {
      setError("Authentication service is loading. Please wait...");
      return;
    }

    if (!clerk.client) {
      setError("Authentication service unavailable. Please refresh the page.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await clerk.client.signIn.create({
        identifier,
        password,
      });

      if (result.status === "complete") {
        await clerk.setActive({ session: result.createdSessionId });
        const role = clerk.user?.publicMetadata?.role as string | undefined;
        const destination = ROLE_ROUTES[role ?? ""] ?? "/";
        router.push(destination);
      } else {
        setError(
          `Sign-in requires an additional step (status: ${result.status}). Contact your administrator.`,
        );
      }
    } catch (err: unknown) {
      const clerkErr = err as ClerkAPIErrorResponse;
      const message =
        clerkErr?.errors?.[0]?.message ??
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300 opacity-20 blur-3xl dark:bg-purple-600"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-300 opacity-20 blur-3xl dark:bg-blue-600"></div>
      </div>

      {/* Login Form */}
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
          {/* Brand header */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3">
              <Image
                src={"/branding/brand-logo.png"}
                alt={"brand-logo"}
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              BrightPath Academy
            </h1>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Demo Credentials Section */}
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
              <p className="mb-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                🎯 Demo Credentials - Click to auto-fill
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_CREDENTIALS.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() =>
                      handleDemoLogin(demo.username, demo.password)
                    }
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 rounded-lg ${demo.color} px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span>{demo.icon}</span>
                    <span>{demo.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400">👤</span>
                </div>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="Enter username"
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400">🔒</span>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={!clerk.loaded || loading}
              className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Protected by Clerk Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
