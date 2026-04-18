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

const LoginPage = () => {
  const clerk = useClerk();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clerk.loaded) return;

    setError(null);
    setLoading(true);

    try {
      const result = await clerk.client!.signIn.create({
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
    <div className="bg-background flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2 rounded-md bg-white p-12 shadow-2xl">
        {/* Brand header */}
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          SchooLama
        </h1>
        <h2 className="text-gray-400">Sign in to your account</h2>

        <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-2">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="identifier" className="text-xs text-gray-500">
              Username
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="rounded-md p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="admin"
              autoComplete="username"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs text-gray-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              disabled={loading}
            />
          </div>

          {/* Error display */}
          {error && (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!clerk.loaded || loading}
            className="my-1 rounded-md bg-blue-500 p-2.5 text-sm text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
