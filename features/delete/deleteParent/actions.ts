"use server";
import { revalidatePath } from "next/cache";
import { deleteParentService } from "./services";
import { clerkClient } from "@clerk/nextjs/server";

interface ActionResponse {
  success: boolean;
  error: string | boolean;
}

export const deleteParent = async (
  currentState: ActionResponse,
  id: string,
): Promise<ActionResponse> => {
  try {
    // Delete Clerk user first
    const client = await clerkClient();
    await client.users.deleteUser(id);

    // Delete from database
    await deleteParentService(id);

    revalidatePath("/list/parents");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error deleting parent:", error);

    // If Clerk deletion fails, still try to delete from database
    try {
      await deleteParentService(id);
      revalidatePath("/list/parents");
      return { success: true, error: false };
    } catch (dbError) {
      console.error("Error deleting parent from database:", dbError);
    }

    return { success: false, error: "Failed to delete parent" };
  }
};
