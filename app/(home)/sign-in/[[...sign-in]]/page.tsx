"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import "./style.css";

interface ClerkAPIError {
  message: string;
  code: string;
}

interface ClerkAPIErrorResponse {
  errors?: ClerkAPIError[];
}

const DEMO_CREDENTIALS = [
  {
    role: "Admin",
    username: "admin",
    password: "admin",
    icon: "👨‍💼",
    color: "bg-primary hover:bg-secondary",
  },
  {
    role: "Teacher",
    username: "teacher",
    password: "teacher",
    icon: "👨‍🏫",
    color: "bg-primary hover:bg-secondary",
  },
  {
    role: "Student",
    username: "student",
    password: "student",
    icon: "👨‍🎓",
    color: "bg-primary hover:bg-secondary",
  },
  {
    role: "Parent",
    username: "parent",
    password: "parent",
    icon: "👨‍👩‍👧",
    color: "bg-primary hover:bg-secondary",
  },
];

function sanitizeRedirectPath(value: string | null) {
  if (!value) return null;

  try {
    const decoded = decodeURIComponent(value);

    if (!decoded.startsWith("/")) return null;
    if (decoded.startsWith("//")) return null;
    if (decoded.startsWith("/sign-in")) return null;
    if (decoded.startsWith("/auth-callback")) return null;

    return decoded;
  } catch {
    return null;
  }
}

const LoginPage = () => {
  const clerk = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectUrl = sanitizeRedirectPath(searchParams.get("redirect_url"));

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

    const signIn = clerk.client?.signIn;

    if (!signIn) {
      setError("Authentication service unavailable. Please refresh the page.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: identifier.trim(),
        password,
      });

      if (result.status === "complete") {
        await clerk.setActive({ session: result.createdSessionId });

        const callbackUrl = redirectUrl
          ? `/auth-callback?redirect_url=${encodeURIComponent(redirectUrl)}`
          : "/auth-callback";

        router.replace(callbackUrl);
        return;
      }

      setError(
        `Sign-in requires an additional step (status: ${result.status}). Contact your administrator.`,
      );
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
    <div className="relative container flex min-h-screen min-w-screen items-center justify-center p-4">
      <div className="absolute top-0 left-0 h-full w-full bg-black/0 backdrop-blur-[3px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white/70 p-8 shadow-2xl dark:bg-gray-800">
          <div className="mb-4 flex flex-col items-center gap-1">
            <div className="rounded-full">
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
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
              <p className="mb-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                Demo Credentials - Click to auto-fill
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

            {error && (
              <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!clerk.loaded || loading}
              className="bg-primary hover:bg-secondary relative w-full overflow-hidden rounded-lg py-3 font-semibold text-white shadow-lg transition-all hover:cursor-pointer hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
