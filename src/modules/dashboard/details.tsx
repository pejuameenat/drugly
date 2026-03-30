import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";
import { RiCapsuleLine } from "react-icons/ri";
import { type Medication } from "../../lib/type";
import { database } from "../../Firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../Firebase/auth-context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MedDetails = ({ med }: { med: Medication }) => {
  const startDate = med?.medStart ? new Date(med.medStart) : null;
  const today = new Date();

  const isSameDay = startDate?.toDateString() === today.toDateString();

  const isMedUpcoming = startDate && startDate > today && !isSameDay;
  const isMedOverdue = startDate && startDate < today && !isSameDay;

  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: takeMed, isPending } = useMutation({
    mutationFn: async () => {
      await updateDoc(doc(database, "medications", med?.id ?? ""), {
        userId,
        isTaken: true,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medications"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error editing medication");
    },
  });

  return (
    <div className="flex items-center gap-3 rounded-md border border-[#bdbdbd] mt-4 p-3">
      <div className="bg-blue-50 w-10 h-10 rounded-full flex justify-center items-center">
        <RiCapsuleLine className="text-blue-500" />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-0 lg:items-center flex-1">
        <div className="text-[12px]">
          <strong>
            {med.medName}{" "}
            <span>
              {" "}
              {med?.medDose}
              {med?.medUnit}
            </span>{" "}
          </strong>{" "}
          <span className="flex gap-0.5 items-center">
            <AiOutlineClockCircle />
            {med.medInterval} {med.medInstructions}
          </span>
          <span className="flex gap-0.5 items-center text-overflow-ellipsis">
            <AiOutlineWarning />
            {med.medInteractions}
          </span>{" "}
        </div>
        <div className="flex gap-1">
          {!med?.isTaken ? (
            <span
              className={`border ${isMedOverdue && "border-red-500 text-red-500"} "py-px rounded-md min-w-20 lg:w-[100px] block text-center`}
            >
              {isMedUpcoming
                ? "Upcoming"
                : isMedOverdue
                  ? "Overdue"
                  : "Due today"}
            </span>
          ) : null}
          <button
            type="button"
            className=" rounded-md py-px bg-[#141414] text-white min-w-20 [lg:w-[100px]"
            disabled={isPending}
            onClick={() => takeMed()}
          >
            {isPending ? (
              <div className="flex gap-1 items-center">
                Take
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : med?.isTaken ? (
              "Taken"
            ) : (
              "Take"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedDetails;
