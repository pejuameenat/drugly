import { RiCapsuleLine } from "react-icons/ri";
import { MdWarning } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MedHistory = () => {
  return (
    <div className="bg-white rounded-md border border-[#bdbdbd] p-5 md:w-[33%]">
      <div className="text-[12px]">
        <div className="flex gap-3 items-center">
          <div className="bg-blue-50 w-8 h-8 rounded-full flex justify-center items-center">
            <RiCapsuleLine className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm">Metformin</h3>
            <span className="text-[#bdbdbd]">500mg</span>
          </div>
        </div>
        <span className="pt-3 pb-1 block text-[#bdbdbd]">Take with food</span>
        <div className="bg-amber-50 text-amber-800 flex gap-1 p-1.5 rounded-md items-center mt-1 mb-2">
          <MdWarning className="text-amber-200" />
          Avoid Alcohol
        </div>
        <div>
          <strong className="font-semibold block pb-0.5">Schedule:</strong>
          <div className="flex gap-2 text-[10px]">
            <span className="font-semibold bg-gray-100 rounded-md p-1">
              7:00 AM
            </span>
            <span className="font-semibold bg-gray-100 rounded-md p-1">
              7:00 PM
            </span>
          </div>
          <div className="flex gap-1 items-center pt-3">
            <button
              type="button"
              className="flex-1 border border-[#bdbdbd] rounded-md gap-1  flex items-center justify-center"
            >
              <FiEdit />
              Edit
            </button>{" "}
            <FiTrash2 className="text-red-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedHistory;
