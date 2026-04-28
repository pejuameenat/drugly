import { Link } from "react-router-dom";
import { useMemo } from "react";
import MedDetails from "../modules/dashboard/details";
import { auth } from "../Firebase/config";
import { fetchMedications } from "../lib/utilqueries.ts/medicationquery";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Package } from "lucide-react";
import { useAuth } from "../Firebase/auth-context";

const Dashboard = () => {
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

  const todaysMedications = useMemo(
    () =>
      medications?.filter((med) => {
        const createdOrStartsToday =  new Date(med?.medStart ?? "").toDateString() ===
        new Date().toDateString() ||
        med?.createdAt?.toDate().toDateString() === new Date().toDateString()
        return createdOrStartsToday && med?.isTaken === false;
        
      }),
    [medications],
  );

  const takenMedications = useMemo(
    () =>
      todaysMedications?.filter((med) => {
        return med?.isTaken === true;
      }),
    [todaysMedications],
  );

  const notTakenMedications = useMemo(
    () =>
      todaysMedications?.filter((med) => {
        return med?.isTaken === false;
      }),
    [todaysMedications],
  );

  // const calculateAdherencePercentage = takenMedications
  const adherencePercentage =
    todaysMedications?.length > 0
      ? (takenMedications?.length / todaysMedications?.length) * 100
      : 0;
  //use interval and updatedAt to determine next medication and time until next medication

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
    <div className="lg:ml-52 pt-18 lg:pt-14 px-4">
      <div className="pb-8 ">
        <h1 className="text-xl lg:text-3xl font-semibold">Dashboard</h1>
        <span className="text[12px] text-[#141414]">
          Welcome <strong>{auth.currentUser?.displayName}</strong> , your
          medication overview for today
        </span>
      </div>
      <div className="lg:grid lg:grid-cols-4 gap-4">
        <article className="bg-white lg:col-span-3 rounded-md p-4 border border-[#bdbdbd]  max-w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
            <div className="text-sm">
              <strong className="block text-[#141414] font-medium">
                Today's Medication
              </strong>
              {todaysMedications?.length > 0 && (
                <>
                  <span className="text-[12px]">
                    {takenMedications?.length} of {todaysMedications?.length}{" "}
                    taken{" "}
                  </span>
                  <span className="text-[12px]">
                    • Next: {notTakenMedications[0]?.medName} at{" "}
                    {notTakenMedications[0]?.medInterval}
                  </span>
                </>
              )}
            </div>
            <Link
              to="/medications"
              className="bg-[#141414] p-2 text-white rounded-md text-[12px] lg:text-sm w-fit"
            >
              + Add Medication
            </Link>
          </div>

          {todaysMedications.length === 0 ? (
            <div className="flex  flex-col items-center justify-center h-screen text-gray-600">
              <Package size={100} />
              <span>You don't have any medications for today.</span>
            </div>
          ) : (
            <article className="pt-4 flex flex-col gap-5">
              {/* items */}
              {todaysMedications?.map((med) => {
                return <MedDetails med={med} key={med?.id} />;
              })}
            </article>
          )}
        </article>
        <div className="bg-white rounded-md p-4 border border-[#bdbdbd] text-sm mt-4 lg:mt-0">
          <span className="font-semibold  ">Todays's Adherence</span>
          <span className="block font-semibold text-center pt-4 text-xl">
            {adherencePercentage}%
          </span>
          <span className="text-[#bdbdbd] text-[12px] text-center block pb-2">
            {adherencePercentage > 20 ? "on Track" : adherencePercentage === 0 ? "No Meds" : "Needs Improvement"}
          </span>
          <div className="rounded-full h-1.5 bg-[#bdbdbd]">
            <div
              className="bg-[#141414] rounded-l-full h-full"
              style={{ width: `${adherencePercentage}%` }}
            ></div>
          </div>
          <div className="text-[#bdbdbd] flex justify-between text-[12px] pt-2">
            <span>{takenMedications?.length} taken</span>
            <span>{notTakenMedications?.length} remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
