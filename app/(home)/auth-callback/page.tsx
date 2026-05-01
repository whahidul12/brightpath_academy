import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ROLE_ROUTES: Record<string, string> = {
  admin: "/dashboard/admin",
  teacher: "/dashboard/teachers",
  student: "/dashboard/students",
  parent: "/dashboard/parents",
};

function getRoleHome(role?: string | null) {
  if (!role) return "/";
  return ROLE_ROUTES[role] ?? "/";
}

function sanitizeInternalPath(value?: string) {
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

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams?: { redirect_url?: string };
}) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const redirectUrl = sanitizeInternalPath(searchParams?.redirect_url);

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  redirect(getRoleHome(role));
}
