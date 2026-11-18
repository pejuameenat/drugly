import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../Firebase/config";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteMedProps {
  id?: string;
  deleteMed: string | null;
  setDeleteMed: (value: boolean) => void;
}

const ConfirmDeleteMed = ({
  id,
  deleteMed,
  setDeleteMed,
}: ConfirmDeleteMedProps) => {
  const queryClient = useQueryClient();
  const {t} = useTranslation()

  const { mutate: deleteMedMutation, isPending } = useMutation({
    mutationFn: async (medId: string) => {
      await deleteDoc(doc(database, "medications", medId));
    },
    onSuccess: () => {
      toast.success(t("delMedSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["medications"],
      });
      setDeleteMed(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t("delMedError"));
    },
  });

  return (
    <div
      className={`fixed top-1/2 left-1/2 lg:w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-6 shadow-lg max-w-full overflow-y-auto max-h-[90vh] z-10 ${
        deleteMed === "delete" ? "visible" : "invisible"
      }`}
    >
      <h3 className="text-center">
        {t("deleteMed")}
      </h3>
      <div className="flex justify-center items-center gap-4 pt-4">
        <button
          type="button"
          className="rounded-md p-1 border lg:w-20"
          onClick={() => setDeleteMed(false)}
        >
          {t("cancel")}
        </button>
        <button
          type="button"
          className="rounded-md p-1 bg-red-600 text-white w-20 hover:opacity-50"
          onClick={() => deleteMedMutation(id ?? "")}
          disabled={isPending}
        >
          {isPending ? <span>{t("deleting")}</span>  : <span>{t("delete")}</span>}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteMed;
