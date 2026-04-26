import { deleteClass } from "@/features/delete/deleteClass/actions";
import { deleteSubject } from "@/features/delete/deleteSubjects/actions";
import { deleteTeacher } from "@/features/delete/deleteTeacher/actions";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const deleteActionMap: Record<
  string,
  (currentState: any, id: any) => Promise<any>
> = {
  subject: deleteSubject as any,
  class: deleteClass as any,
  teacher: deleteTeacher as any,
  // student: deleteStudent,
  // exam: deleteExam,
  // // TODO: OTHER DELETE ACTIONS
  // parent: deleteSubject,
  // lesson: deleteSubject,
  // assignment: deleteSubject,
  // result: deleteSubject,
  // attendance: deleteSubject,
  // event: deleteSubject,
  // announcement: deleteSubject,
};

export const DeleteConfirmation = ({
  id,
  table,
  setIsOpen,
}: {
  id: string | number;
  table: string;
  setIsOpen?: any;
}) => {
  const actionToExecute = deleteActionMap[table];
  const [state, formAction, isPending] = useActionState(actionToExecute!, {
    success: false,
    error: false,
  });
  useEffect(() => {
    if (state.success) {
      toast.success(`${table} deleted successfully`, {
        description: `The subject has been removed`,
        duration: 4000,
        style: {
          background: "#f0fdf4",
          border: "1px solid #86efac",
          color: "#14532d",
        },
      });

      if (setIsOpen) setIsOpen(false);
    } else if (state.error) {
      toast.error(
        typeof state.error === "string" ? state.error : "Failed to delete",
        {
          description:
            typeof state.error === "string" ? state.error : "Please try again.",
          duration: 4000,
          style: {
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            color: "#7f1d1d",
          },
        },
      );
    }
  }, [state, table, setIsOpen]);
  const handleDelete = () => {
    startTransition(() => {
      formAction(id);
    });
  };
  return (
    <div className="flex flex-col gap-4 p-4 text-center">
      <h2 className="text-xl font-bold">Are you absolutely sure?</h2>
      <p className="text-sm text-gray-500">
        This action cannot be undone. This will permanently delete the {table}.
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
