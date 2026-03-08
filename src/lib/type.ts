export type Medication = {
  id: string;
  userId?: string;
  medName: string;
  medDose: string;
  medInterval: string;
  isActive: boolean;
  medInstructions: string;
  medInteractions: string;
  medUnit: string;
  medEnddate?: string;
  medStart?: string;
  medNotes?: string;
  createdAt?: any;  
  
};

export type CreateMedicationInput = {
  userId: string;
  medName: string;
  medDose: string;
  medUnit: string;
  medInstructions: string;
  medInteractions: string;
  medInterval: string;
  medStart: string;
  medEnddate?: string;
  medNotes?: string;
  isActive: boolean;
  isTaken: boolean;
};