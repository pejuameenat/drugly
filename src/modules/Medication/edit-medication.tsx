import { X } from "lucide-react";
import { database, auth } from "../../Firebase/config";
import { updateDoc, doc, collection } from "firebase/firestore";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type CreateMedicationInput } from "../../lib/type";

const EditMedicationForm = ({
  editMed,
  setEditMed,
  medicationId,
}: {
  editMed: boolean;
  setEditMed: (value: boolean) => void;
  medicationId: string;
}) => {
  // const [customUsage, setCustomUage] = useState(false)
  const [medName, setMedName] = useState("");
  const [medDose, setMedDose] = useState("");
  const [medInstructions, setMedInstructions] = useState("");
  const [medInteractions, setMedInteractions] = useState("");
  const [medUnit, setMedUnit] = useState("");
  const [medInterval, setMedInterval] = useState("");
  const [medNotes, setMedNotes] = useState("");
  const [medStart, setMedStart] = useState("");
  const [medEnddate, setMedEnddate] = useState("");
  const [customMMed, setCustomMed] = useState("");

  return (
    <>
      <div
        className={` fixed top-1/2 left-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-6 shadow-lg  max-w-full overflow-y-auto max-h-[90vh] z-10 ${
          editMed ? "visible" : "invisible"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Edit Medication</h2>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setEditMed(false)}
          >
            <X size={14} />
          </button>
        </div>

        <form className="space-y-4">
          {/* Medication Name, Dose, Unit */}
          <div className="flex gap-3  flex-col lg:flex-row  ">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1">
                Medication Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Metformin"
                className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                onChange={(e) => setMedName(e.target.value)}
              />
            </div>

            <div className="lg:w-24 flex flex-col">
              <label className="text-sm font-medium mb-1">Dose *</label>
              <input
                type="text"
                placeholder="500"
                className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                onChange={(e) => setMedDose(e.target.value)}
              />
            </div>

            <div className="lg:w-20 flex flex-col">
              <label className="text-sm font-medium mb-1">Unit</label>
              <input
                type="text"
                placeholder="mg"
                className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                onChange={(e) => setMedUnit(e.target.value)}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Instructions</label>
            <input
              type="text"
              placeholder="e.g., Take with food"
              className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              onChange={(e) => setMedInstructions(e.target.value)}
            />
          </div>

          {/* Warnings / Interactions */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Warnings / Interactions
            </label>
            <input
              type="text"
              placeholder="e.g., Avoid alcohol"
              className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              onChange={(e) => setMedInteractions(e.target.value)}
            />
          </div>

          {/* Schedule Times */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Schedule Times *</label>
            <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
              {medInterval === "as needed" && (
                <input
                  type="text"
                  placeholder="3 times daily"
                  className="p-2 bg-gray-100 rounded border border-gray-200 flex-1 focus:outline-none focus:ring-1 f
                  requiredocus:ring-blue-500 w-full"
                  onChange={(e) => setCustomMed(e.target.value)}
                />
              )}
              <select
                className={`p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  medInterval === "as needed" ? "w-1/2" : "w-full"
                }`}
                onChange={(e) => setMedInterval(e.target.value)}
              >
                <option>every 8 hours</option>
                <option>once Daily</option>
                <option>twice Daily</option>
                <option>3 times Daily</option>
                <option>4 times Daily</option>
                <option>Weekly</option>
                <option>as needed</option>
              </select>
              {/* <button
                type="button"
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Add Time
              </button> */}
            </div>
          </div>

          {/* Start / End Date */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                onChange={(e) => setMedStart(e.target.value)}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setMedEnddate(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Notes</label>
            <textarea
              rows={3}
              className="p-2 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setMedNotes(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-3">
            <button
              type="submit"
              //   disabled={isPending}
              className="bg-black text-white  rounded-md p-1 grow hover:bg-opacity-80 transition-colors duration-200 disabled:opacity-80"
            >
              {/* {isPending ? "Editing..." : "Edit medication"} */}
              Edit Medication
            </button>
            <button
              type="button"
              className=" text-black rounded-md p-1 border"
              onClick={() => setEditMed(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMedicationForm;
