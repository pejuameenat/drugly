import ReusableHeader from "../modules/Medication/reusable-header";
import MedHistory from "../modules/Medication/med-history";
import MedicationForm from "../modules/Medication/medication-form";
import { useState } from "react";
import UniversalOverlay from "../components/universal-overlay";
import { auth } from "../Firebase/config";
import { Loader2, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMedications } from "../lib/utilqueries.ts/medicationquery";

const Medications = () => {
  const [showForm, setShowForm] = useState(false);
  const [deleteMed, setDeleteMed] = useState(false);
  const [editMed, setEditMed] = useState(false);

  const userId = auth.currentUser?.uid;

  const {
    data: medications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medications", userId],
    queryFn: () => fetchMedications(userId!),
    enabled: !!userId,
  });
  console.log(medications);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-4xl">
        Error
      </div>
    );
  }

  return (
    <>
      <section className="lg:ml-52 pt-18 lg:pt-14 px-4">
        <ReusableHeader
          heading="Medications"
          text="   Manage your medication schedule"
          buttonText="+ Add Medication"
          onClick={() => setShowForm(true)}
        />

        {medications.length === 0 ? (
          <div className="flex  flex-col items-center justify-center h-screen text-gray-600">
            <Package size={100} />
            <span>You have not added any medications yet.</span>
          </div>
        ) : (
          <article className="pt-4 flex flex-col md:flex-row gap-5">
            {/* items */}
            {medications?.map((med) => {
              return (
                <MedHistory
                  key={med.id}
                  deleteMed={deleteMed}
                  setDeleteMed={setDeleteMed}
                  editMed={editMed}
                  setEditMed={setEditMed}
                  med={med}
                />
              );
            })}
          </article>
        )}
      </section>
      <UniversalOverlay
        overlay={showForm ? showForm : editMed ? editMed : deleteMed}
        setOverlay={
          showForm ? setShowForm : editMed ? setEditMed : setDeleteMed
        }
      />
      <MedicationForm showForm={showForm} setShowForm={setShowForm} />
    </>
  );
};

export default Medications;
