// // import { useContext } from "react";
// // import { DoctorContext } from "@/contexts/DoctorContext";
// // import { Calendar, Users, Stethoscope, Plus, HeartPulse, BedDouble, Shield } from "lucide-react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { useNavigate } from "react-router-dom";

// // interface Appointment {
// //   patient: string;
// //   doctor: string;
// //   time: string;
// // }

// // interface ReportData {
// //   month: string;
// //   patients: number;
// // }

// // interface BedAvailability {
// //   general: number;
// //   icu: number;
// //   ventilators: number;
// //   emergency: number;
// // }

// // const HospitalDashboard = () => {
// //   const navigate = useNavigate();
// //   const doctorContext = useContext(DoctorContext);
// //   if (!doctorContext) {
// //     throw new Error("DoctorContext must be used within a DoctorProvider");
// //   }
// //   const { doctors } = doctorContext;

// //   // 🔹 Dummy Data (replace with API calls later)
// //   const stats = [
// //     { icon: Users, value: 128, label: "Registered Patients", color: "text-primary" },
// //     { icon: Stethoscope, value: doctors.length, label: "Active Doctors", color: "text-green-600" },
// //     { icon: Calendar, value: 56, label: "Appointments Today", color: "text-blue-600" },
// //   ];

// //   const appointments: Appointment[] = [
// //     { patient: "Jane Doe", doctor: "Dr. Smith", time: "10:00 AM" },
// //     { patient: "Michael Lee", doctor: "Dr. Brown", time: "11:30 AM" },
// //     { patient: "Sara Khan", doctor: "Dr. Wilson", time: "1:00 PM" },
// //   ];

// //   const reportData: ReportData[] = [
// //     { month: "Jan", patients: 40 },
// //     { month: "Feb", patients: 60 },
// //     { month: "Mar", patients: 80 },
// //     { month: "Apr", patients: 65 },
// //     { month: "May", patients: 90 },
// //   ];

// //   const insuranceProviders = ["MediCare+", "LifeSecure", "Arogya Health", "HealthPlus Insurance"];
// //   const insurancePartners = ["HDFC Ergo", "ICICI Lombard", "Star Health", "Max Bupa"];

// //   const specializations = [
// //     "Cardiology",
// //     "Neurology",
// //     "Dermatology",
// //     "Orthopedics",
// //     "Pediatrics",
// //     "General Surgery",
// //   ];

// //   const bedAvailability: BedAvailability = {
// //     general: 45,
// //     icu: 12,
// //     ventilators: 6,
// //     emergency: 10,
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
// //             Hospital Dashboard
// //           </h1>
// //           <p className="text-gray-700 dark:text-gray-300">
// //             Manage your doctors, patients, insurance, and facilities from one place.
// //           </p>
// //         </div>

// //         {/* Quick Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           {stats.map((stat, idx) => (
// //             <Card key={idx} className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //               <CardContent className="p-6 text-center">
// //                 <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
// //                 <div className="text-2xl font-bold text-foreground">{stat.value}</div>
// //                 <div className="text-sm text-muted-foreground">{stat.label}</div>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>

// //         {/* Doctors & Appointments */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Doctors */}
// //           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //             <CardHeader className="flex justify-between items-center">
// //               <CardTitle className="text-foreground">Doctors</CardTitle>
// //               <Button
// //                 size="sm"
// //                 variant="outline"
// //                 className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
// //                 onClick={() => navigate("/add-doctor")}
// //               >
// //                 <Plus className="h-4 w-4 mr-1" /> Add Doctor
// //               </Button>
// //             </CardHeader>
// //             <CardContent className="max-h-64 overflow-y-auto">
// //               <ul className="space-y-3">
// //                 {doctors.map((doc, idx) => (
// //                   <li key={idx} className="flex justify-between items-center">
// //                     <span className="text-foreground">
// //                       {doc.name} ({doc.specialty})
// //                     </span>
// //                     <span className="text-muted-foreground text-sm">
// //                       {doc.patients} patients
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </CardContent>
// //           </Card>

// //           {/* Appointments */}
// //           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //             <CardHeader className="flex justify-between items-center">
// //               <CardTitle className="text-foreground">Recent Appointments</CardTitle>
// //               <Button
// //                 size="sm"
// //                 variant="outline"
// //                 className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
// //               >
// //                 View All
// //               </Button>
// //             </CardHeader>
// //             <CardContent className="max-h-64 overflow-y-auto">
// //               <ul className="space-y-3">
// //                 {appointments.map((appt, idx) => (
// //                   <li key={idx} className="flex justify-between items-center">
// //                     <span className="text-foreground">
// //                       {appt.patient} with {appt.doctor}
// //                     </span>
// //                     <span className="text-muted-foreground text-sm">
// //                       {appt.time}
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Insurance & Specializations */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
// //           {/* Insurance */}
// //           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //             <CardHeader>
// //               <CardTitle className="text-foreground">
// //                 <Shield className="h-5 w-5 inline mr-2 text-blue-600 dark:text-blue-400" />
// //                 Insurance Coverage
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div>
// //                 <p className="font-semibold mb-2 text-foreground">Providers:</p>
// //                 <ul className="list-disc list-inside text-sm text-muted-foreground">
// //                   {insuranceProviders.map((p, idx) => <li key={idx}>{p}</li>)}
// //                 </ul>
// //               </div>
// //               <div className="mt-4">
// //                 <p className="font-semibold mb-2 text-foreground">Partners:</p>
// //                 <ul className="list-disc list-inside text-sm text-muted-foreground">
// //                   {insurancePartners.map((p, idx) => <li key={idx}>{p}</li>)}
// //                 </ul>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Specializations */}
// //           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //             <CardHeader>
// //               <CardTitle className="text-foreground">
// //                 <HeartPulse className="h-5 w-5 inline mr-2 text-red-600 dark:text-red-400" />
// //                 Specializations Available
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
// //                 {specializations.map((s, idx) => (
// //                   <li key={idx} className="bg-muted px-3 py-1 rounded">
// //                     {s}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Beds & ICU Availability */}
// //         <div className="mt-8">
// //           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //             <CardHeader>
// //               <CardTitle className="text-foreground">
// //                 <BedDouble className="h-5 w-5 inline mr-2 text-green-600 dark:text-green-400" />
// //                 Bed & ICU Availability
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
// //                 <div>
// //                   <p className="text-2xl font-bold text-foreground">{bedAvailability.general}</p>
// //                   <p className="text-sm text-muted-foreground">General Beds</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-2xl font-bold text-foreground">{bedAvailability.icu}</p>
// //                   <p className="text-sm text-muted-foreground">ICU Beds</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-2xl font-bold text-foreground">{bedAvailability.ventilators}</p>
// //                   <p className="text-sm text-muted-foreground">Ventilators</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-2xl font-bold text-foreground">{bedAvailability.emergency}</p>
// //                   <p className="text-sm text-muted-foreground">Emergency Beds</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Reports Section */}
// //         <div className="mt-8">
// //           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
// //             <CardHeader>
// //               <CardTitle className="text-foreground">Reports & Analytics</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="h-72">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <LineChart data={reportData}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="month" stroke="var(--foreground)" />
// //                     <YAxis stroke="var(--foreground)" />
// //                     <Tooltip />
// //                     <Line
// //                       type="monotone"
// //                       dataKey="patients"
// //                       stroke="#2563eb"
// //                       strokeWidth={2}
// //                     />
// //                   </LineChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HospitalDashboard;

// import { useState, useEffect, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { DoctorContext } from "@/contexts/DoctorContext";
// import { Calendar, Users, Stethoscope, Plus, HeartPulse, BedDouble, Shield } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { useNavigate } from "react-router-dom";

// interface Appointment {
//   patient: string;
//   doctor: string;
//   time: string;
// }

// interface ReportData {
//   month: string;
//   patients: number;
// }

// interface BedAvailability {
//   general: number;
//   icu: number;
//   ventilators: number;
//   emergency: number;
// }

// interface Doctor {
//   id: string;
//   name: string;
//   specialty: string;
//   email: string;
//   patients?: number;
// }

// const HospitalDashboard = () => {
//   const navigate = useNavigate();
//   const doctorContext = useContext(DoctorContext);
//   if (!doctorContext) {
//     throw new Error("DoctorContext must be used within a DoctorProvider");
//   }
//   const { fetchDoctors } = doctorContext;

//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch doctors from Supabase on mount
//   useEffect(() => {
//     const loadDoctors = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("doctors")
//           .select("id, name, email, speciality");
//         if (error) {
//           throw error;
//         }
//         setDoctors(
//           data.map((doc) => ({
//             id: doc.id,
//             name: doc.name,
//             email: doc.email,
//             specialty: doc.speciality,
//             patients: 0, // Placeholder; update with actual patient count if available
//           }))
//         );
//         // Sync DoctorContext
//         await fetchDoctors();
//       } catch (err: any) {
//         console.error("Error fetching doctors:", err);
//         setError(err.message || "Failed to load doctors.");
//       }
//     };
//     loadDoctors();
//   }, [fetchDoctors]);

//   // Dummy data (replace with Supabase calls if needed)
//   const stats = [
//     { icon: Users, value: 128, label: "Registered Patients", color: "text-primary" },
//     { icon: Stethoscope, value: doctors.length, label: "Active Doctors", color: "text-green-600" },
//     { icon: Calendar, value: 56, label: "Appointments Today", color: "text-blue-600" },
//   ];

//   const appointments: Appointment[] = [
//     { patient: "Jane Doe", doctor: "Dr. Smith", time: "10:00 AM" },
//     { patient: "Michael Lee", doctor: "Dr. Brown", time: "11:30 AM" },
//     { patient: "Sara Khan", doctor: "Dr. Wilson", time: "1:00 PM" },
//   ];

//   const reportData: ReportData[] = [
//     { month: "Jan", patients: 40 },
//     { month: "Feb", patients: 60 },
//     { month: "Mar", patients: 80 },
//     { month: "Apr", patients: 65 },
//     { month: "May", patients: 90 },
//   ];

//   const insuranceProviders = ["MediCare+", "LifeSecure", "Arogya Health", "HealthPlus Insurance"];
//   const insurancePartners = ["HDFC Ergo", "ICICI Lombard", "Star Health", "Max Bupa"];

//   const specializations = [
//     "Cardiology",
//     "Neurology",
//     "Dermatology",
//     "Orthopedics",
//     "Pediatrics",
//     "General Surgery",
//   ];

//   const bedAvailability: BedAvailability = {
//     general: 45,
//     icu: 12,
//     ventilators: 6,
//     emergency: 10,
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
//             Hospital Dashboard
//           </h1>
//           <p className="text-gray-700 dark:text-gray-300">
//             Manage your doctors, patients, insurance, and facilities from one place.
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
//             {error}
//           </div>
//         )}

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {stats.map((stat, idx) => (
//             <Card key={idx} className="border border-blue-100 dark:bg-black dark:border-blue-900">
//               <CardContent className="p-6 text-center">
//                 <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
//                 <div className="text-2xl font-bold text-foreground">{stat.value}</div>
//                 <div className="text-sm text-muted-foreground">{stat.label}</div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Doctors & Appointments */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Doctors */}
//           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
//             <CardHeader className="flex justify-between items-center">
//               <CardTitle className="text-foreground">Doctors</CardTitle>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
//                 onClick={() => navigate("/add-doctor")}
//               >
//                 <Plus className="h-4 w-4 mr-1" /> Add Doctor
//               </Button>
//             </CardHeader>
//             <CardContent className="max-h-64 overflow-y-auto">
//               {doctors.length === 0 ? (
//                 <p className="text-muted-foreground">No doctors found.</p>
//               ) : (
//                 <ul className="space-y-3">
//                   {doctors.map((doc) => (
//                     <li key={doc.id} className="flex justify-between items-center">
//                       <span className="text-foreground">
//                         {doc.name} ({doc.specialty})
//                       </span>
//                       <span className="text-muted-foreground text-sm">
//                         {doc.patients || 0} patients
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </CardContent>
//           </Card>

//           {/* Appointments */}
//           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
//             <CardHeader className="flex justify-between items-center">
//               <CardTitle className="text-foreground">Recent Appointments</CardTitle>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
//               >
//                 View All
//               </Button>
//             </CardHeader>
//             <CardContent className="max-h-64 overflow-y-auto">
//               <ul className="space-y-3">
//                 {appointments.map((appt, idx) => (
//                   <li key={idx} className="flex justify-between items-center">
//                     <span className="text-foreground">
//                       {appt.patient} with {appt.doctor}
//                     </span>
//                     <span className="text-muted-foreground text-sm">
//                       {appt.time}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Insurance & Specializations */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//           {/* Insurance */}
//           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
//             <CardHeader>
//               <CardTitle className="text-foreground">
//                 <Shield className="h-5 w-5 inline mr-2 text-blue-600 dark:text-blue-400" />
//                 Insurance Coverage
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div>
//                 <p className="font-semibold mb-2 text-foreground">Providers:</p>
//                 <ul className="list-disc list-inside text-sm text-muted-foreground">
//                   {insuranceProviders.map((p, idx) => <li key={idx}>{p}</li>)}
//                 </ul>
//               </div>
//               <div className="mt-4">
//                 <p className="font-semibold mb-2 text-foreground">Partners:</p>
//                 <ul className="list-disc list-inside text-sm text-muted-foreground">
//                   {insurancePartners.map((p, idx) => <li key={idx}>{p}</li>)}
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Specializations */}
//           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
//             <CardHeader>
//               <CardTitle className="text-foreground">
//                 <HeartPulse className="h-5 w-5 inline mr-2 text-red-600 dark:text-red-400" />
//                 Specializations Available
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
//                 {specializations.map((s, idx) => (
//                   <li key={idx} className="bg-muted px-3 py-1 rounded">
//                     {s}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Beds & ICU Availability */}
//         <div className="mt-8">
//           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
//             <CardHeader>
//               <CardTitle className="text-foreground">
//                 <BedDouble className="h-5 w-5 inline mr-2 text-green-600 dark:text-green-400" />
//                 Bed & ICU Availability
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                 <div>
//                   <p className="text-2xl font-bold text-foreground">{bedAvailability.general}</p>
//                   <p className="text-sm text-muted-foreground">General Beds</p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-foreground">{bedAvailability.icu}</p>
//                   <p className="text-sm text-muted-foreground">ICU Beds</p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-foreground">{bedAvailability.ventilators}</p>
//                   <p className="text-sm text-muted-foreground">Ventilators</p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-foreground">{bedAvailability.emergency}</p>
//                   <p className="text-sm text-muted-foreground">Emergency Beds</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Reports Section */}
//         <div className="mt-8">
//           <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
//             <CardHeader>
//               <CardTitle className="text-foreground">Reports & Analytics</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-72">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={reportData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" stroke="var(--foreground)" />
//                     <YAxis stroke="var(--foreground)" />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="patients"
//                       stroke="#2563eb"
//                       strokeWidth={2}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalDashboard;

import { useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabaseClient";
import { DoctorContext } from "@/contexts/DoctorContext";
import {
  Calendar,
  Users,
  Stethoscope,
  Plus,
  HeartPulse,
  BedDouble,
  Shield,
  Clock,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

/* ---------- Types ---------- */
interface Appointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: string; // "2025-10-30"
  appointment_time: string; // "10:30 AM"
  status: string;
  created_at: string; // ISO timestamp
}

/* ---------- Dashboard ---------- */
const HospitalDashboard = () => {
  const navigate = useNavigate();
  const doctorContext = useContext(DoctorContext);
  if (!doctorContext)
    throw new Error("DoctorContext must be used within a DoctorProvider");
  const { fetchDoctors } = doctorContext;

  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- Load doctors (same as before) ---------- */
  useEffect(() => {
    const loadDoctors = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("id, name, email, speciality");
      if (error) return setError(error.message);
      setDoctors(
        data.map((d) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          specialty: d.speciality,
          patients: 0,
        }))
      );
      await fetchDoctors();
    };
    loadDoctors();
  }, [fetchDoctors]);

  /* ---------- Load ALL appointments (for the “Recent” preview) ---------- */
  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          id,
          patient_name,
          doctor_name,
          appointment_date,
          appointment_time,
          status,
          created_at
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setAppointments(data ?? []);
      }
      setLoading(false);
    };
    loadAppointments();
  }, []);

  /* ---------- Dummy stats (you can replace with real counts) ---------- */
  const stats = [
    {
      icon: Users,
      value: 128,
      label: "Registered Patients",
      color: "text-primary",
    },
    {
      icon: Stethoscope,
      value: doctors.length,
      label: "Active Doctors",
      color: "text-green-600",
    },
    {
      icon: Calendar,
      value: appointments.length,
      label: "Appointments Today",
      color: "text-blue-600",
    },
  ];

  const recentAppointments = appointments.slice(0, 3); // <-- preview

  /* ---------- Rest of the dummy data (unchanged) ---------- */
  const reportData = [
    { month: "Jan", patients: 40 },
    { month: "Feb", patients: 60 },
    { month: "Mar", patients: 80 },
    { month: "Apr", patients: 65 },
    { month: "May", patients: 90 },
  ];
  const insuranceProviders = [
    "MediCare+",
    "LifeSecure",
    "Arogya Health",
    "HealthPlus Insurance",
  ];
  const insurancePartners = [
    "HDFC Ergo",
    "ICICI Lombard",
    "Star Health",
    "Max Bupa",
  ];
  const specializations = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "General Surgery",
  ];
  const bedAvailability = {
    general: 45,
    icu: 12,
    ventilators: 6,
    emergency: 10,
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Header + New Button */}
        <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Hospital Dashboard
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Manage your doctors, patients, insurance, and facilities from one
              place.
            </p>
          </div>

          {/* NEW BUTTON */}
          <Button
            onClick={() => navigate("/hospital-profile")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Hospital Profile
          </Button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s, i) => (
            <Card
              key={i}
              className="border border-blue-100 dark:bg-black dark:border-blue-900"
            >
              <CardContent className="p-6 text-center">
                <s.icon className={`h-8 w-8 mx-auto mb-2 ${s.color}`} />
                <div className="text-2xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Doctors & Recent Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Doctors */}
          <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-foreground">Doctors</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
                onClick={() => navigate("/add-doctor")}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Doctor
              </Button>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              {doctors.length === 0 ? (
                <p className="text-muted-foreground">No doctors found.</p>
              ) : (
                <ul className="space-y-3">
                  {doctors.map((d) => (
                    <li
                      key={d.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-foreground">
                        {d.name} ({d.specialty})
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {d.patients ?? 0} patients
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Recent Appointments */}
          <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-foreground">
                Recent Appointments
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
                onClick={() => navigate("/appointments")} // ← NEW PAGE
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              {loading ? (
                <p className="text-muted-foreground">Loading…</p>
              ) : recentAppointments.length === 0 ? (
                <p className="text-muted-foreground">No appointments yet.</p>
              ) : (
                <ul className="space-y-3">
                  {recentAppointments.map((a) => (
                    <li
                      key={a.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-foreground">
                        {a.patient_name}{" "}
                        <span className="text-muted-foreground">with</span>{" "}
                        {a.doctor_name}
                      </span>
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(
                          new Date(
                            `${a.appointment_date} ${a.appointment_time}`
                          ),
                          "h:mm a"
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* … (the rest of your dashboard – unchanged) … */}
        {/* Insurance, Specializations, Beds, Reports – copy-paste from your original file */}
        {/* --------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Insurance */}
          <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-foreground">
                <Shield className="h-5 w-5 inline mr-2 text-blue-600 dark:text-blue-400" />
                Insurance Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-semibold mb-2 text-foreground">Providers:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {insuranceProviders.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2 text-foreground">Partners:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {insurancePartners.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-foreground">
                <HeartPulse className="h-5 w-5 inline mr-2 text-red-600 dark:text-red-400" />
                Specializations Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {specializations.map((s, i) => (
                  <li key={i} className="bg-muted px-3 py-1 rounded">
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Beds */}
        <div className="mt-8">
          <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-foreground">
                <BedDouble className="h-5 w-5 inline mr-2 text-green-600 dark:text-green-400" />
                Bed & ICU Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bedAvailability.general}
                  </p>
                  <p className="text-sm text-muted-foreground">General Beds</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bedAvailability.icu}
                  </p>
                  <p className="text-sm text-muted-foreground">ICU Beds</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bedAvailability.ventilators}
                  </p>
                  <p className="text-sm text-muted-foreground">Ventilators</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bedAvailability.emergency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Emergency Beds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports */}
        <div className="mt-8">
          <Card className="border border-blue-100 dark:bg-black dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-foreground">
                Reports & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="var(--foreground)" />
                    <YAxis stroke="var(--foreground)" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="patients"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        
        {/* --------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default HospitalDashboard;
