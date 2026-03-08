import { Link } from "react-router-dom";
import MedDetails from '../modules/dashboard/details'
import { auth } from '../Firebase/config'
import { fetchMedications } from "../lib/utilqueries.ts/medicationquery";
import { useQuery } from "@tanstack/react-query";
import { Loader2,Package } from "lucide-react";
import { useAuth } from "../Firebase/auth-context";

const Dashboard = () => {
  const {userId, loading } = useAuth()
  
  const {
    data: medications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medications", userId],
    queryFn: () => fetchMedications(userId!),
    enabled: !!userId||!loading,
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
    <div className="lg:ml-52 pt-18 lg:pt-14 px-4">
      <div className="pb-8 ">
        <h1 className="text-xl lg:text-3xl font-semibold">Dashboard</h1>
        <span className="text[12px] text-[#141414]">
         Welcome <strong>{auth.currentUser?.displayName}</strong> , your medication overview for today
        </span>
      </div>
      <div className="lg:grid lg:grid-cols-4 gap-4 ">
        <article className="bg-white lg:col-span-3 rounded-md p-4 border border-[#bdbdbd]  max-w-full">
          <div className="flex justify-between items-center  ">
            <div className="text-sm">
              <strong className="block text-[#141414] font-medium">
                Today's Medication
              </strong>
              <span className="text-[12px]">1 of 4 taken </span>
              <span className="text-[12px]">
                • Next: Lisinopril at 08:00 AM
              </span>
            </div>
            <Link
              to="/medications"
              className="bg-[#141414] p-2 text-white rounded-md text-[12px] lg:text-sm"
            >
              + Add Medication
            </Link>
          </div>

            {medications.length === 0 ? (
                    <div className="flex  flex-col items-center justify-center h-screen text-gray-600">
                      <Package size={100} />
                      <span>You have not added any medications yet.</span>
                    </div>
                  ) : (
                    <article className="pt-4 flex flex-col  gap-5">
                      {/* items */}
                      {medications?.map((med) => {
                        return <MedDetails med={ med} key={med?.id} />
                      })}
                    </article>
                  )}
          <div>
            {/* <MedDetails overdue='bg-red-500 text-white' /> */}
          </div>
        </article>
        {/* <div className="bg-white rounded-md p-4 border border-[#bdbdbd] text-sm mt-4 lg:mt-0">
          <span className="font-semibold  ">Todays's Adherence</span>
          <span className="block font-semibold text-center pt-4 text-xl">25%</span>
          <span className="text-[#bdbdbd] text-[12px] text-center block pb-2">on Track</span>
          <div className="rounded-full h-1.5 bg-[#bdbdbd]"><div className="bg-[#141414] rounded-l-full h-full w-1/4"></div></div>
          <div className="text-[#bdbdbd] flex justify-between text-[12px] pt-2"><span>1 taken</span><span>3 remaining</span></div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
