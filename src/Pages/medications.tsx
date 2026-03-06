import ReusableHeader from "../modules/Medication/reusable-header";
import MedHistory from "../modules/Medication/med-history";
import MedicationForm from "../modules/Medication/medication-form";
import { useState } from "react";
import UniversalOverlay from "../components/universal-overlay";
import { Loader2, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMedications } from "../lib/utilqueries.ts/medicationquery";
import { useAuth } from "../Firebase/auth-context";
import { type Medication } from "../lib/type";
import ConfirmDeleteMed from "../modules/Medication/confirm-delete-med";
import EditMedicationForm from "../modules/Medication/edit-medication";

const Medications = () => {
  const [overlayType, setOverlayType] = useState<
    "add" | "edit" | "delete" | null
  >(null);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  const { userId, loading } = useAuth();

  const {
    data: medications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medications", userId],
    queryFn: () => fetchMedications(userId!),
    enabled: !!userId || !loading,
  });

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
          onClick={() => setOverlayType("add")}
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
                  key={med?.id}
                  med={med}
                  setDeleteMed={() => setOverlayType("delete")}
                  setEditMed={() => setOverlayType("edit")}
                  setSelectedMed={setSelectedMed}
                />
              );
            })}
          </article>
        )}
      </section>
      <UniversalOverlay
        overlay={overlayType !== null}
        setOverlay={() => setOverlayType(null)}
      />
      <MedicationForm
        showForm={overlayType}
        setShowForm={() => setOverlayType(null)}
      />
      <ConfirmDeleteMed
        deleteMed={overlayType}
        setDeleteMed={() => setOverlayType(null)}
        id={selectedMed?.id}
      />

      <EditMedicationForm
        editMed={overlayType}
        setEditMed={() => setOverlayType(null)}
        existingMed={selectedMed}
      />
    </>
  );
};

export default Medications;
