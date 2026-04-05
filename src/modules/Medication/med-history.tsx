import { RiCapsuleLine } from "react-icons/ri";
import { MdWarning } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { type Medication } from "../../lib/type";

const MedHistory = ({
  setDeleteMed,
  setEditMed,
  med,
  setSelectedMed,
}: {
  setDeleteMed: (value: boolean) => void;
  setEditMed: (value: boolean) => void;
  med: Medication;
  setSelectedMed: (value: Medication) => void;
}) => {
  return (
    <>
      <div className="bg-white rounded-md border border-[#bdbdbd] p-5">
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
            {med?.medInstructions ?? "N/A"}
          </span>
          <div className="bg-amber-50 text-amber-800 flex gap-1 p-1.5 rounded-md items-center mt-1 mb-2">
            <MdWarning className="text-amber-200" />
            {med?.medInteractions ?? "N/A"}
          </div>
          <div>
            <strong className="font-med?mibold block pb-0.5">Schedule:</strong>
            <div className="flex gap-2 text-[10px]">
              <span className="font-med?mibold bg-gray-100 rounded-md p-1">
                {med?.medInterval}
              </span>
              <span className="font-med?mibold bg-gray-100 rounded-md p-1">
                Ends: {med?.medEnddate ?? "N/A"}
              </span>
            </div>
            <div className="flex gap-1 items-center pt-3">
              <button
                type="button"
                className="flex-1 border border-[#f0ebeb] rounded-md gap-1  flex items-center justify-center"
                onClick={() => {
                  setEditMed(Boolean('edit'));
                  setSelectedMed(med);
                }}
              >
                <FiEdit />
                Edit
              </button>{" "}
              <button type="button" onClick={() => {
                setDeleteMed(Boolean('delete'))
                setSelectedMed(med)
              }}>
                <FiTrash2 className="text-red-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedHistory;
