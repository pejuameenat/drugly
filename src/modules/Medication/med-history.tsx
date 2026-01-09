import { RiCapsuleLine } from "react-icons/ri";
import { MdWarning } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { type Medication } from "../../lib/type";
import ConfirmDeleteMed from "./confirm-delete-med";
import EditMedicationForm from "./edit-medication";

const MedHistory = ({
  deleteMed,
  setDeleteMed,
  editMed,
  setEditMed,
  med,
}: {
  med: Medication;
  deleteMed: boolean;
  setDeleteMed: (value: boolean) => void;
  editMed: boolean;
  setEditMed: (value: boolean) => void;
}) => {
  return (
    <>
      <div className="bg-white rounded-md border border-[#bdbdbd] p-5 md:w-[33%]">
        <div className="text-[12px]">
          <div className="flex gap-3 items-center">
            <div className="bg-blue-50 w-8 h-8 rounded-full flex justify-center items-center">
              <RiCapsuleLine className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm capitalize">{med?.medName}</h3>
              <span className="text-[#bdbdbd]">
                {med?.medDose}
                {med?.medUnit}
              </span>
            </div>
          </div>
          <span className="pt-3 pb-1 block text-[#bdbdbd]">
            {med.medInstructions ?? "N/A"}
          </span>
          <div className="bg-amber-50 text-amber-800 flex gap-1 p-1.5 rounded-md items-center mt-1 mb-2">
            <MdWarning className="text-amber-200" />
            {med.medInteractions ?? "N/A"}
          </div>
          <div>
            <strong className="font-semibold block pb-0.5">Schedule:</strong>
            <div className="flex gap-2 text-[10px]">
              <span className="font-semibold bg-gray-100 rounded-md p-1">
                {med.medInterval}
              </span>
              <span className="font-semibold bg-gray-100 rounded-md p-1">
                Ends: {med.medEnddate ?? "N/A"}
              </span>
            </div>
            <div className="flex gap-1 items-center pt-3">
              <button
                type="button"
                className="flex-1 border border-[#bdbdbd] rounded-md gap-1  flex items-center justify-center" onClick={()=>setEditMed(true)}
              >
                <FiEdit />
                Edit
              </button>{" "}
              <button type="button" onClick={() => setDeleteMed(true)}>
                <FiTrash2 className="text-red-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteMed
        deleteMed={deleteMed}
        setDeleteMed={setDeleteMed}
        id={med?.id}
      />

      <EditMedicationForm editMed={editMed}
        setEditMed={setEditMed} medicationId={ med?.id} existingMed={med} />
    </>
  );
};

export default MedHistory;
