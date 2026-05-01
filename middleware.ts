import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccessMap } from "./lib/settings";

const ROLE_ROUTES: Record<string, string> = {
  admin: "/dashboard/admin",
  teacher: "/dashboard/teachers",
  student: "/dashboard/students",
  parent: "/dashboard/parents",
};

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/auth-callback(.*)",
  "/api/webhooks(.*)",
]);

const accessRules = Object.entries(routeAccessMap).map(
  ([route, allowedRoles]) => ({
    matcher: createRouteMatcher([route]),
    allowedRoles,
  }),
);

function getRoleHome(role?: string | null) {
  if (!role) return "/";
  return ROLE_ROUTES[role] ?? "/";
}

function sanitizeInternalPath(pathname: string, search: string) {
  const value = `${pathname}${search}`;

  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  if (value.startsWith("/sign-in")) return "/";
  if (value.startsWith("/auth-callback")) return "/";

  return value;
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const pathname = req.nextUrl.pathname;

  if (!userId) {
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set(
      "redirect_url",
      sanitizeInternalPath(pathname, req.nextUrl.search),
    );

    return NextResponse.redirect(signInUrl);
  }

  if (pathname === "/" || pathname.startsWith("/sign-in")) {
    const callbackUrl = new URL("/auth-callback", req.url);

    const redirectUrl = req.nextUrl.searchParams.get("redirect_url");
    if (redirectUrl) {
      callbackUrl.searchParams.set("redirect_url", redirectUrl);
    }

    return NextResponse.redirect(callbackUrl);
  }

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (!role) {
    return NextResponse.redirect(new URL("/auth-callback", req.url));
  }

  for (const { matcher, allowedRoles } of accessRules) {
    if (matcher(req) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(getRoleHome(role), req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
