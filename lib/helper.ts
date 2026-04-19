import { auth } from "@clerk/nextjs/server";

export const getRole = async (): Promise<string | undefined> => {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: string })?.role;
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const { userId } = await auth();
  return userId;
};
