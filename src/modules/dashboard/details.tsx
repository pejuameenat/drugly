import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";
import { RiCapsuleLine } from "react-icons/ri";

const MedDetails = () => {
  return (
     <div className="flex items-center gap-3 rounded-md border border-[#bdbdbd] mt-4 p-3">
              <div className="bg-blue-50 w-10 h-10 rounded-full flex justify-center items-center"><RiCapsuleLine className="text-blue-500" /></div>
              <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-0 lg:items-center flex-1">
              <div className="text-[12px]">
                <strong>Metformin <span>500 mg</span> </strong>{" "}
                <span className="flex gap-0.5 items-center">
                  <AiOutlineClockCircle />
                  07:00 AM Take with food
                </span>{" "}
                <span className="flex gap-0.5 items-center text-overflow-ellipsis">
                  <AiOutlineWarning />
                  Avoid alcohol
                </span>{" "}
              </div>
              <div className="flex gap-1">
                <button type="button" className="border py-px rounded-md min-w-20 lg:w-[100px]">Upcoming</button>
                <button type="button" className=" rounded-md py-px bg-[#141414] text-white min-w-20[ lg:w-[100px]">Take</button>
                <button type="button"className="border py-px rounded-md  lg:w-[100px] min-w-20">Snooze</button>
              </div>

              </div>
            </div>
  )
}

export default MedDetails