// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { AuthProvider } from "@/contexts/AuthContext";
// // import { ThemeProvider } from "next-themes";
// // import Navbar from "@/components/layout/Navbar";
// // import Chatbot from "@/components/layout/Chatbot";
// // import Home from "./pages/Home";
// // import HospitalList from "./pages/HospitalList";
// // import HospitalDetails from "./pages/HospitalDetails";
// // import DoctorList from "./pages/DoctorList";
// // import DoctorDetails from "./pages/DoctorDetails";
// // import MyAppointments from "./pages/MyAppointments";
// // import Dashboard from "./pages/Dashboard";
// // import Login from "./pages/Login";
// // import PatientDashboard from "./pages/PatientDashboard";
// // import HospitalDashboard from "./pages/HospitalDashboard";   // ✅ added
// // import Register from "./pages/Register";
// // import NotFound from "./pages/NotFound";

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
// //       <AuthProvider>
// //         <TooltipProvider>
// //           <Toaster />
// //           <Sonner />
// //           <BrowserRouter>
// //             <div className="min-h-screen flex flex-col">
// //               <Navbar />
// //               <main className="flex-1">
// //                 <Routes>
// //                   <Route path="/" element={<Home />} />
// //                   <Route path="/hospitals" element={<HospitalList />} />
// //                   <Route path="/hospitals/:id" element={<HospitalDetails />} />
// //                   <Route path="/doctors" element={<DoctorList />} />
// //                   <Route path="/doctors/:id" element={<DoctorDetails />} />
// //                   <Route path="/appointments" element={<MyAppointments />} />
// //                   <Route path="/dashboard" element={<Dashboard />} />
// //                   <Route path="/login" element={<Login />} />
// //                   <Route path="/patient-dashboard" element={<PatientDashboard />} />
// //                   <Route path="/hospital-dashboard" element={<HospitalDashboard />} /> {/* ✅ new */}
// //                   <Route path="/register" element={<Register />} />
// //                   <Route path="*" element={<NotFound />} />
// //                 </Routes>
// //               </main>
// //               <Chatbot />
// //             </div>
// //           </BrowserRouter>
// //         </TooltipProvider>
// //       </AuthProvider>
// //     </ThemeProvider>
// //   </QueryClientProvider>
// // );

// // export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "next-themes";

// import Navbar from "@/components/layout/Navbar";
// import Chatbot from "@/components/layout/Chatbot";
// import { ThemeToggle } from "@/components/ui/theme-toggle";

// import Home from "./pages/Home";
// import HospitalList from "./pages/HospitalList";
// import HospitalDetails from "./pages/HospitalDetails";
// import DoctorList from "./pages/DoctorList";
// import DoctorDetails from "./pages/DoctorDetails";
// import MyAppointments from "./pages/MyAppointments";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import PatientDashboard from "./pages/PatientDashboard";
// import HospitalDashboard from "./pages/HospitalDashboard";
// import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";

// import PrivateRoute from "@/components/PrivateRoute";
// import PageTransition from "@/components/PageTransition";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <div className="min-h-screen flex flex-col">
//               <Navbar />
//               <main className="flex-1">
//                 <PageTransition>
//                   <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/hospitals" element={<HospitalList />} />
//                     <Route path="/hospitals/:id" element={<HospitalDetails />} />
//                     <Route path="/doctors" element={<DoctorList />} />
//                     <Route path="/doctors/:id" element={<DoctorDetails />} />
//                     <Route path="/appointments" element={<MyAppointments />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />

//                     {/* Protected Routes */}
//                     <Route path="/patient-dashboard" element={
//                       <PrivateRoute allowedRoles={["patient"]}>
//                         <PatientDashboard />
//                       </PrivateRoute>
//                     } />
//                     <Route path="/hospital-dashboard" element={
//                       <PrivateRoute allowedRoles={["hospital"]}>
//                         <HospitalDashboard />
//                       </PrivateRoute>
//                     } />

//                     <Route path="*" element={<NotFound />} />
//                   </Routes>
//                 </PageTransition>
//               </main>
//               {/* <div className="absolute bottom-20 right-4">
//                 <ThemeToggle />
//               </div> */}
//               <Chatbot />
//             </div>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "next-themes";

// import Navbar from "@/components/layout/Navbar";
// import Chatbot from "@/components/layout/Chatbot";

// import Home from "./pages/Home";
// import HospitalList from "./pages/HospitalList";
// import HospitalDetails from "./pages/HospitalDetails";
// import DoctorList from "./pages/DoctorList";
// import DoctorDetails from "./pages/DoctorDetails";
// import MyAppointments from "./pages/MyAppointments";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import PatientDashboard from "./pages/PatientDashboard";
// import HospitalDashboard from "./pages/HospitalDashboard";
// import AddDoctor from "./pages/AddDoctor";   // ✅ new
// import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";

// import PrivateRoute from "@/components/PrivateRoute";
// import PageTransition from "@/components/PageTransition";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <div className="min-h-screen flex flex-col">
//               <Navbar />
//               <main className="flex-1">
//                 <PageTransition>
//                   <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/hospitals" element={<HospitalList />} />
//                     <Route path="/hospitals/:id" element={<HospitalDetails />} />
//                     <Route path="/doctors" element={<DoctorList />} />
//                     <Route path="/doctors/:id" element={<DoctorDetails />} />
//                     <Route path="/add-doctor" element={<AddDoctor />} />
//                     <Route path="/appointments" element={<MyAppointments />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/login" element={<Login />} /> 
//                     <Route path="/register" element={<Register />} />

//                     {/* Protected Routes */}
//                     <Route
//                       path="/patient-dashboard"
//                       element={
//                         <PrivateRoute allowedRoles={["patient"]}>
//                           <PatientDashboard />
//                         </PrivateRoute>
//                       }
//                     />
//                     <Route
//                       path="/hospital-dashboard"
//                       element={
//                         <PrivateRoute allowedRoles={["hospital"]}>
//                           <HospitalDashboard />
//                         </PrivateRoute>
//                       }
//                     />
//                     <Route
//                       path="/add-doctor"
//                       element={
//                         <PrivateRoute allowedRoles={["hospital"]}>
//                           <AddDoctor />
//                         </PrivateRoute>
//                       }
//                     />

//                     <Route path="*" element={<NotFound />} />
//                   </Routes>
//                 </PageTransition>
//               </main>
//               <Chatbot />
//             </div>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "next-themes";
// import { DoctorProvider } from "@/contexts/DoctorContext"; // Updated import path

// import Navbar from "@/components/layout/Navbar";
// import Chatbot from "@/components/layout/Chatbot";

// import Home from "./pages/Home";
// import HospitalList from "./pages/HospitalList";
// import HospitalDetails from "./pages/HospitalDetails";
// import DoctorList from "./pages/DoctorList";
// import DoctorDetails from "./pages/DoctorDetails";
// import MyAppointments from "./pages/MyAppointments";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import PatientDashboard from "./pages/PatientDashboard";
// import HospitalDashboard from "./pages/HospitalDashboard";
// import AddDoctor from "./pages/AddDoctor";
// import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";

// import PrivateRoute from "@/components/PrivateRoute";
// import PageTransition from "@/components/PageTransition";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <DoctorProvider> {/* Wrap Routes with DoctorProvider */}
//               <div className="min-h-screen flex flex-col">
//                 <Navbar />
//                 <main className="flex-1">
//                   <PageTransition>
//                     <Routes>
//                       <Route path="/" element={<Home />} />
//                       <Route path="/hospitals" element={<HospitalList />} />
//                       <Route path="/hospitals/:id" element={<HospitalDetails />} />
//                       <Route path="/doctors" element={<DoctorList />} />
//                       <Route path="/doctors/:id" element={<DoctorDetails />} />
//                       <Route path="/appointments" element={<MyAppointments />} />
//                       <Route path="/dashboard" element={<Dashboard />} />
//                       <Route path="/login" element={<Login />} />
//                       <Route path="/register" element={<Register />} />

//                       {/* Protected Routes */}
//                       <Route
//                         path="/patient-dashboard"
//                         element={
//                           <PrivateRoute allowedRoles={["patient"]}>
//                             <PatientDashboard />
//                           </PrivateRoute>
//                         }
//                       />
//                       <Route
//                         path="/hospital-dashboard"
//                         element={
//                           <PrivateRoute allowedRoles={["hospital"]}>
//                             <HospitalDashboard />
//                           </PrivateRoute>
//                         }
//                       />
//                       <Route
//                         path="/add-doctor"
//                         element={
//                           <PrivateRoute allowedRoles={["hospital"]}>
//                             <AddDoctor />
//                           </PrivateRoute>
//                         }
//                       />

//                       <Route path="*" element={<NotFound />} />
//                     </Routes>
//                   </PageTransition>
//                 </main>
//                 <Chatbot />
//               </div>
//             </DoctorProvider>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "next-themes";
// import { DoctorProvider } from "@/contexts/DoctorContext";

// import Navbar from "@/components/layout/Navbar";
// import Chatbot from "@/components/layout/Chatbot";

// import Home from "./pages/Home";
// import HospitalList from "./pages/HospitalList";
// import HospitalDetails from "./pages/HospitalDetails";
// import DoctorList from "./pages/DoctorList";
// import DoctorDetails from "./pages/DoctorDetails";
// import MyAppointments from "./pages/MyAppointments";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import PatientDashboard from "./pages/PatientDashboard";
// import HospitalDashboard from "./pages/HospitalDashboard";
// import AddDoctor from "./pages/AddDoctor";
// import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";

// import PrivateRoute from "@/components/PrivateRoute";
// import PageTransition from "@/components/PageTransition";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <DoctorProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Navbar />
//                 <main className="flex-1">
//                   <PageTransition>
//                     <Routes>
//                       <Route path="/" element={<Home />} />
//                       <Route path="/hospitals" element={<HospitalList />} />
//                       <Route path="/hospitals/:id" element={<HospitalDetails />} />
//                       <Route path="/doctors" element={<DoctorList />} />
//                       <Route path="/doctors/:id" element={<DoctorDetails />} />
//                       <Route path="/appointments" element={<MyAppointments />} />
//                       <Route path="/dashboard" element={<Dashboard />} />
//                       <Route path="/login" element={<Login />} />
//                       <Route path="/register" element={<Register />} />

//                       {/* Protected Routes */}
//                       <Route
//                         path="/patient-dashboard"
//                         element={
//                           <PrivateRoute allowedRoles={["patient"]}>
//                             <PatientDashboard />
//                           </PrivateRoute>
//                         }
//                       />
//                       <Route
//                         path="/hospital-dashboard"
//                         element={
//                           <PrivateRoute allowedRoles={["hospital"]}>
//                             <HospitalDashboard />
//                           </PrivateRoute>
//                         }
//                       />
//                       <Route
//                         path="/add-doctor"
//                         element={
//                           <PrivateRoute allowedRoles={["hospital"]}>
//                             <AddDoctor />
//                           </PrivateRoute>
//                         }
//                       />

//                       <Route path="*" element={<NotFound />} />
//                     </Routes>
//                   </PageTransition>
//                 </main>
//                 <Chatbot />
//               </div>
//             </DoctorProvider>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { DoctorProvider } from "@/contexts/DoctorContext";

import Navbar from "@/components/layout/Navbar";
import Chatbot from "@/components/layout/Chatbot";

import Home from "./pages/Home";
import HospitalList from "./pages/HospitalList";
import HospitalDetails from "./pages/HospitalDetails";
import DoctorList from "./pages/DoctorList";
import DoctorDetails from "./pages/DoctorDetails";
import MyAppointments from "./pages/MyAppointments";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import AddDoctor from "./pages/AddDoctor";
import HospitalSearch from "./pages/HospitalSearch"; // Added
import Feedback from "./pages/Feedback"; // Added
import FeedbackDashboard from "./pages/FeedbackDashboard"; // Developer feedback viewer
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AppointmentsPage from "./pages/AppointmentsPage";

import PrivateRoute from "@/components/PrivateRoute";
import PageTransition from "@/components/PageTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <DoctorProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <PageTransition>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/hospitals" element={<HospitalList />} />
                      <Route path="/hospitals/:id" element={<HospitalDetails />} />
                      <Route path="/doctors" element={<DoctorList />} />
                      <Route path="/doctors/:id" element={<DoctorDetails />} />
                      <Route path="/hospital-search" element={<HospitalSearch />} /> {/* Added */}
                      <Route path="/feedback" element={<Feedback />} /> {/* Added */}
                      <Route path="/feedback-dashboard" element={<FeedbackDashboard />} /> {/* Developer dashboard */}
                      <Route path="/appointments" element={<AppointmentsPage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />

                      {/* Protected Routes */}
                      <Route
                        path="/patient-dashboard"
                        element={
                          <PrivateRoute allowedRoles={["patient"]}>
                            <PatientDashboard />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/hospital-dashboard"
                        element={
                          <PrivateRoute allowedRoles={["hospital"]}>
                            <HospitalDashboard />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/add-doctor"
                        element={
                          <PrivateRoute allowedRoles={["hospital"]}>
                            <AddDoctor />
                          </PrivateRoute>
                        }
                      />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageTransition>
                </main>
                <Chatbot />
              </div>
            </DoctorProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;