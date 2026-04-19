import { auth } from "@clerk/nextjs/server";

const { sessionClaims } = await auth();
const { userId } = await auth();
export const role = (sessionClaims?.metadata as { role?: string })?.role;
export const CurrentUserId = userId;
