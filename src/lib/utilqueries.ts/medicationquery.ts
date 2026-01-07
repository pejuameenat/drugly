// lib/queries/medications.ts
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../Firebase/config";
import { type Medication } from "../type";

export const fetchMedications = async (userId: string): Promise<Medication[]> => {
  if (!userId) return [];

  const medQuery = query(
    collection(database, "medications"),
    where("userId", "==", userId)
  );

  const meds = await getDocs(medQuery);

  return meds.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Medication, "id">),
  }));
};
