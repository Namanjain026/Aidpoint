import { createContext, useState, ReactNode } from "react";

interface Doctor {
  name: string;
  specialty: string;
  patients: number;
}

interface DoctorContextType {
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, "patients">) => void;
}

export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { name: "Dr. John Smith", specialty: "Cardiology", patients: 8 },
    { name: "Dr. Emily Brown", specialty: "Dermatology", patients: 5 },
    { name: "Dr. David Wilson", specialty: "Neurology", patients: 12 },
  ]);

  const addDoctor = (doctor: Omit<Doctor, "patients">) => {
    setDoctors((prevDoctors) => [
      ...prevDoctors,
      {
        name: doctor.name,
        specialty: doctor.specialty,
        patients: 0, // Initialize with 0 patients for new doctors
      },
    ]);
  };

  return (
    <DoctorContext.Provider value={{ doctors, addDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};