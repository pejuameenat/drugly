import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../Firebase/config";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ConfirmDeleteMedProps {
  id?: string;
  deleteMed: string|null;
  setDeleteMed: (value:boolean) => void;
}

const ConfirmDeleteMed = ({
  id,
  deleteMed,
  setDeleteMed,
}: ConfirmDeleteMedProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMedMutation, isPending } = useMutation({
    mutationFn: async (medId: string) => {
      await deleteDoc(doc(database, "medications", medId));
    },
    onSuccess: () => {
      toast.success("Medication deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["medications"],
      });
      setDeleteMed(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error deleting medication");
    },
  });

  return (
    <div
      className={`fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-6 shadow-lg max-w-full overflow-y-auto max-h-[90vh] z-10 ${
        deleteMed==='delete' ? "visible" : "invisible"
      }`}
    >
      <h3 className="text-center">
        Are you sure you want to delete medication?
      </h3>
      <div className="flex justify-center items-center gap-4 pt-4">
        <button
          type="button"
          className="rounded-md p-1 border lg:w-20"
          onClick={() => setDeleteMed(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md p-1 bg-red-600 text-white w-20"
          onClick={() => deleteMedMutation(id??'')}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteMed;
