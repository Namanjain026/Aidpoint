// import { createContext, useState, ReactNode } from "react";

// interface Doctor {
//   name: string;
//   specialty: string;
//   patients: number;
// }

// interface DoctorContextType {
//   doctors: Doctor[];
//   addDoctor: (doctor: Omit<Doctor, "patients">) => void;
// }

// export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

// export const DoctorProvider = ({ children }: { children: ReactNode }) => {
//   const [doctors, setDoctors] = useState<Doctor[]>([
//     { name: "Dr. John Smith", specialty: "Cardiology", patients: 8 },
//     { name: "Dr. Emily Brown", specialty: "Dermatology", patients: 5 },
//     { name: "Dr. David Wilson", specialty: "Neurology", patients: 12 },
//   ]);

//   const addDoctor = (doctor: Omit<Doctor, "patients">) => {
//     setDoctors((prevDoctors) => [
//       ...prevDoctors,
//       {
//         name: doctor.name,
//         specialty: doctor.specialty,
//         patients: 0, // Initialize with 0 patients for new doctors
//       },
//     ]);
//   };

//   return (
//     <DoctorContext.Provider value={{ doctors, addDoctor }}>
//       {children}
//     </DoctorContext.Provider>
//   );
// };

import { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  patients?: number; // Optional, as used in dashboard
}

interface DoctorContextType {
  doctors: Doctor[];
  addDoctor: (doctor: Doctor) => void;
  fetchDoctors: () => Promise<void>;
}

export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorProviderProps {
  children: ReactNode;
}

export const DoctorProvider = ({ children }: DoctorProviderProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Fetch doctors from Supabase on mount
  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("id, name, email, speciality");
      if (error) {
        throw error;
      }
      setDoctors(
        data.map((doc) => ({
          id: doc.id,
          name: doc.name,
          email: doc.email,
          specialty: doc.speciality,
          patients: 0, // Placeholder; update with actual patient count if available
        }))
      );
    } catch (err: any) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const addDoctor = (doctor: Doctor) => {
    setDoctors((prev) => [...prev, doctor]);
  };

  return (
    <DoctorContext.Provider value={{ doctors, addDoctor, fetchDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};