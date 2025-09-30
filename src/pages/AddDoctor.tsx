// import { useState, useContext } from "react";
// import { DoctorContext } from "@/contexts/DoctorContext"; // Corrected import
// import { User, Mail, Calendar, Briefcase, DollarSign, Stethoscope, Building2, Clock, Phone, MapPin, ArrowRight, CheckCircle, Plus, Save } from "lucide-react";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   age: string;
//   gender: string;
//   speciality: string;
//   experience: string;
//   fees: string;
//   timings: string;
//   hospital: string;
//   address: string;
// }

// const AddDoctor = () => {
//   const doctorContext = useContext(DoctorContext);
//   if (!doctorContext) {
//     throw new Error("DoctorContext must be used within a DoctorProvider");
//   }
//   const { addDoctor } = doctorContext;

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     age: "",
//     gender: "",
//     speciality: "",
//     experience: "",
//     fees: "",
//     timings: "",
//     hospital: "",
//     address: "",
//   });

//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     console.log("Doctor Data:", formData);
//     addDoctor({ name: formData.name, specialty: formData.speciality }); // Map speciality to specialty
//     setIsSubmitted(true);
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         age: "",
//         gender: "",
//         speciality: "",
//         experience: "",
//         fees: "",
//         timings: "",
//         hospital: "",
//         address: "",
//       });
//       setCurrentStep(1); // Reset to first step
//     }, 2000);
//   };

//   const nextStep = () => {
//     if (currentStep < 3) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const steps = [
//     { id: 1, title: "Personal Info", icon: User },
//     { id: 2, title: "Professional", icon: Stethoscope },
//     { id: 3, title: "Location", icon: MapPin }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8 pt-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
//             <Plus className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Doctor</h1>
//           <p className="text-gray-600">Join our healthcare network</p>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center space-x-4">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
//                   currentStep >= step.id 
//                     ? 'bg-purple-500 text-white shadow-lg' 
//                     : 'bg-gray-200 text-gray-400'
//                 }`}>
//                   <step.icon className="h-5 w-5" />
//                 </div>
//                 <div className="ml-2 hidden sm:block">
//                   <div className={`text-sm font-medium ${
//                     currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </div>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`w-8 h-0.5 mx-4 ${
//                     currentStep > step.id ? 'bg-purple-500' : 'bg-gray-200'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
//           <div className="p-8">
//             {/* Step 1: Personal Information */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personal Information</h2>
//                   <p className="text-gray-600">Let's start with basic details</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <User className="h-4 w-4 mr-2 text-purple-500" />
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="Dr. John Smith"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Mail className="h-4 w-4 mr-2 text-purple-500" />
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="doctor@hospital.com"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Phone className="h-4 w-4 mr-2 text-purple-500" />
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="+1 (555) 123-4567"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Calendar className="h-4 w-4 mr-2 text-purple-500" />
//                       Age
//                     </label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={formData.age}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="35"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800">Gender</label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Professional Information */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Professional Details</h2>
//                   <p className="text-gray-600">Your medical expertise and experience</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
//                       Medical Speciality
//                     </label>
//                     <input
//                       type="text"
//                       name="speciality"
//                       value={formData.speciality}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="Cardiologist, Neurologist, etc."
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Briefcase className="h-4 w-4 mr-2 text-purple-500" />
//                       Years of Experience
//                     </label>
//                     <input
//                       type="number"
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="10"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
//                       Consultation Fees ($)
//                     </label>
//                     <input
//                       type="number"
//                       name="fees"
//                       value={formData.fees}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="150"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Clock className="h-4 w-4 mr-2 text-purple-500" />
//                       Available Timings
//                     </label>
//                     <input
//                       type="text"
//                       name="timings"
//                       value={formData.timings}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="9:00 AM - 5:00 PM"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Location Information */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Practice Location</h2>
//                   <p className="text-gray-600">Where patients can find you</p>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <Building2 className="h-4 w-4 mr-2 text-purple-500" />
//                       Hospital/Clinic Name
//                     </label>
//                     <input
//                       type="text"
//                       name="hospital"
//                       value={formData.hospital}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
//                       placeholder="City General Hospital"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-800 flex items-center">
//                       <MapPin className="h-4 w-4 mr-2 text-purple-500" />
//                       Complete Address
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black resize-none"
//                       placeholder="123 Medical Center Drive, Suite 100, City, State 12345"
//                     />
//                   </div>
//                 </div>

//                 {/* Summary Card */}
//                 <div className="bg-purple-50 rounded-2xl p-6 mt-8">
//                   <h3 className="text-lg font-semibold text-purple-800 mb-4">Summary</h3>
//                   <div className="grid md:grid-cols-2 gap-4 text-sm">
//                     <div><span className="font-medium">Name:</span> {formData.name || "Not provided"}</div>
//                     <div><span className="font-medium">Email:</span> {formData.email || "Not provided"}</div>
//                     <div><span className="font-medium">Speciality:</span> {formData.speciality || "Not provided"}</div>
//                     <div><span className="font-medium">Experience:</span> {formData.experience ? `${formData.experience} years` : "Not provided"}</div>
//                     <div><span className="font-medium">Fees:</span> {formData.fees ? `$${formData.fees}` : "Not provided"}</div>
//                     <div><span className="font-medium">Hospital:</span> {formData.hospital || "Not provided"}</div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
//             <button
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`px-6 py-2 rounded-xl font-medium transition-all ${
//                 currentStep === 1 
//                   ? 'text-gray-400 cursor-not-allowed' 
//                   : 'text-purple-600 hover:bg-purple-100'
//               }`}
//             >
//               Previous
//             </button>

//             <div className="flex space-x-2">
//               {steps.map((step) => (
//                 <div
//                   key={step.id}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     currentStep >= step.id ? 'bg-purple-500' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>

//             {currentStep < 3 ? (
//               <button
//                 onClick={nextStep}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-all flex items-center"
//               >
//                 Next
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitted}
//                 className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center ${
//                   isSubmitted 
//                     ? 'bg-green-500 text-white' 
//                     : 'bg-purple-500 text-white hover:bg-purple-600'
//                 }`}
//               >
//                 {isSubmitted ? (
//                   <>
//                     <CheckCircle className="mr-2 h-4 w-4" />
//                     Added!
//                   </>
//                 ) : (
//                   <>
//                     <Save className="mr-2 h-4 w-4" />
//                     Add Doctor
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 pb-8">
//           <p className="text-gray-500 text-sm">
//             All information will be reviewed and verified before activation
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDoctor;

import { useState, useContext } from "react";
import { supabase } from "@/lib/supabaseClient";
import { DoctorContext } from "@/contexts/DoctorContext";
import { User, Mail, Calendar, Briefcase, DollarSign, Stethoscope, Building2, Clock, Phone, MapPin, ArrowRight, CheckCircle, Plus, Save } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  speciality: string;
  experience: string;
  fees: string;
  timings: string;
  hospital: string;
  address: string;
}

const AddDoctor = () => {
  const doctorContext = useContext(DoctorContext);
  if (!doctorContext) {
    throw new Error("DoctorContext must be used within a DoctorProvider");
  }
  const { addDoctor } = doctorContext;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    speciality: "",
    experience: "",
    fees: "",
    timings: "",
    hospital: "",
    address: "",
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.speciality) {
      setError("Name, email, and speciality are required.");
      return;
    }

    try {
      // Insert doctor data into Supabase
      const { error } = await supabase.from("doctors").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          age: parseInt(formData.age) || null,
          gender: formData.gender || null,
          speciality: formData.speciality,
          experience: parseInt(formData.experience) || null,
          fees: parseFloat(formData.fees) || null,
          timings: formData.timings || null,
          hospital: formData.hospital || null,
          address: formData.address || null,
        },
      ]);

      if (error) {
        throw error;
      }

      // Update context (if still needed)
      addDoctor({ name: formData.name, specialty: formData.speciality });

      setIsSubmitted(true);
      setError(null);

      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          gender: "",
          speciality: "",
          experience: "",
          fees: "",
          timings: "",
          hospital: "",
          address: "",
        });
        setCurrentStep(1);
      }, 2000);
    } catch (err: any) {
      console.error("Error adding doctor:", err);
      setError(err.message || "Failed to add doctor. Please try again.");
      setIsSubmitted(false);
    }
  };

  const nextStep = () => {
    // Validate required fields before moving to next step
    if (currentStep === 1 && (!formData.name || !formData.email)) {
      setError("Please fill in name and email before proceeding.");
      return;
    }
    if (currentStep === 2 && !formData.speciality) {
      setError("Please fill in speciality before proceeding.");
      return;
    }
    setError(null);
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    setError(null);
  };

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Professional", icon: Stethoscope },
    { id: 3, title: "Location", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Doctor</h1>
          <p className="text-gray-600">Join our healthcare network</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    currentStep >= step.id ? "bg-purple-500 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-2 hidden sm:block">
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-purple-600" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-purple-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                {error}
              </div>
            )}

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Let's start with basic details</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <User className="h-4 w-4 mr-2 text-purple-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-purple-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="doctor@hospital.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-purple-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="35"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Professional Details</h2>
                  <p className="text-gray-600">Your medical expertise and experience</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                      Medical Speciality
                    </label>
                    <input
                      type="text"
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="Cardiologist, Neurologist, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-purple-500" />
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                      Consultation Fees ($)
                    </label>
                    <input
                      type="number"
                      name="fees"
                      value={formData.fees}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="150"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-500" />
                      Available Timings
                    </label>
                    <input
                      type="text"
                      name="timings"
                      value={formData.timings}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="9:00 AM - 5:00 PM"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Practice Location</h2>
                  <p className="text-gray-600">Where patients can find you</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                      Hospital/Clinic Name
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="City General Hospital"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                      Complete Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black resize-none"
                      placeholder="123 Medical Center Drive, Suite 100, City, State 12345"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-purple-50 rounded-2xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Name:</span> {formData.name || "Not provided"}</div>
                    <div><span className="font-medium">Email:</span> {formData.email || "Not provided"}</div>
                    <div><span className="font-medium">Speciality:</span> {formData.speciality || "Not provided"}</div>
                    <div><span className="font-medium">Experience:</span> {formData.experience ? `${formData.experience} years` : "Not provided"}</div>
                    <div><span className="font-medium">Fees:</span> {formData.fees ? `$${formData.fees}` : "Not provided"}</div>
                    <div><span className="font-medium">Hospital:</span> {formData.hospital || "Not provided"}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                currentStep === 1 ? "text-gray-400 cursor-not-allowed" : "text-purple-600 hover:bg-purple-100"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentStep >= step.id ? "bg-purple-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-all flex items-center"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center ${
                  isSubmitted ? "bg-green-500 text-white" : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Added!
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Add Doctor
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-gray-500 text-sm">
            All information will be reviewed and verified before activation
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;