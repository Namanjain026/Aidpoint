// // src/pages/PublicHospitalProfile.tsx

// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Building2,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   BedDouble,
//   HeartPulse,
//   Calendar,
//   Shield,
//   ArrowLeft,
//   Star,
//   Clock,
// } from "lucide-react";

// const PublicHospitalProfile = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // The full hospital object comes from navigate(..., { state: hospital })
//   const hospital = state;

//   if (!hospital) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Building2 className="h-20 w-20 text-gray-400 mx-auto mb-4" />
//           <p className="text-2xl font-bold text-gray-700">Hospital Not Found</p>
//           <Button onClick={() => navigate(-1)} className="mt-6">
//             <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <div className="max-w-6xl mx-auto px-4 py-12">

//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           onClick={() => navigate(-1)}
//           className="mb-8 text-gray-700 hover:bg-gray-100"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Search
//         </Button>

//         {/* Hero Banner */}
//         <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-10">
//           <img
//             src={hospital.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200"}
//             alt={hospital.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
//           <div className="absolute bottom-8 left-8 text-white">
//             <h1 className="text-5xl md:text-6xl font-bold mb-3 drop-shadow-2xl">
//               {hospital.name}
//             </h1>
//             <div className="flex items-center gap-3 text-xl">
//               <MapPin className="h-7 w-7" />
//               <span>{hospital.location}, {hospital.city}</span>
//             </div>
//             <div className="flex items-center gap-3 mt-4">
//               <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
//                 <Star className="h-5 w-5 fill-current" />
//                 {hospital.rating} / 5.0
//               </div>
//               <span className="text-lg opacity-90">Excellent Reviews</span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
//           <Card className="text-center py-6 bg-white/80 backdrop-blur">
//             <BedDouble className="h-12 w-12 mx-auto mb-3 text-blue-600" />
//             <p className="text-3xl font-bold">{hospital.totalBeds}</p>
//             <p className="text-gray-600">Total Beds</p>
//           </Card>
//           <Card className="text-center py-6 bg-white/80 backdrop-blur">
//             <BedDouble className="h-12 w-12 mx-auto mb-3 text-green-600" />
//             <p className="text-3xl font-bold text-green-600">{hospital.availableBeds}</p>
//             <p className="text-gray-600">Available Now</p>
//           </Card>
//           <Card className="text-center py-6 bg-white/80 backdrop-blur">
//             <Clock className="h-12 w-12 mx-auto mb-3 text-purple-600" />
//             <p className="text-2xl font-bold">24/7</p>
//             <p className="text-gray-600">Emergency Care</p>
//           </Card>
//           <Card className="text-center py-6 bg-white/80 backdrop-blur">
//             <HeartPulse className="h-12 w-12 mx-auto mb-3 text-red-600" />
//             <p className="text-2xl font-bold">Multi-Specialty</p>
//             <p className="text-gray-600">Advanced Care</p>
//           </Card>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

//           {/* Left Column - About & Specializations */}
//           <div className="lg:col-span-2 space-y-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl">About {hospital.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700 leading-relaxed text-lg">
//                   {hospital.name} is a leading multi-specialty hospital in {hospital.city}, known for its world-class healthcare services, experienced doctors, and state-of-the-art facilities. We are committed to providing compassionate and high-quality medical care to all our patients.
//                 </p>
//                 <p className="text-gray-600 mt-4">
//                   With {hospital.totalBeds}+ beds and 24/7 emergency services, we ensure timely and effective treatment for all medical needs.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl">Specializations</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-3">
//                   {hospital.specializations.split(",").map((spec: string) => (
//                     <Badge
//                       key={spec}
//                       variant="secondary"
//                       className="text-sm py-2 px-4 bg-blue-100 text-blue-800 hover:bg-blue-200"
//                     >
//                       {spec.trim()}
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Contact Info */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl flex items-center gap-3">
//                   <Phone className="h-7 w-7 text-green-600" />
//                   Contact Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5 text-lg">
//                 <div className="flex items-center gap-4">
//                   <Phone className="h-6 w-6 text-blue-600" />
//                   <span className="font-medium">{hospital.phone}</span>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <MapPin className="h-6 w-6 text-blue-600 mt-1" />
//                   <div>
//                     <p className="font-medium">{hospital.name}</p>
//                     <p className="text-gray-600">{hospital.location}, {hospital.city}</p>
//                   </div>
//                 </div>
//                 <div className="pt-4 border-t">
//                   <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">Facilities Available</p>
//                   <div className="flex flex-wrap gap-2">
//                     {hospital.facilities.split(",").slice(0, 4).map((f: string) => (
//                       <span key={f} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                         {f.trim()}
//                       </span>
//                     ))}
//                     {hospital.facilities.split(",").length > 4 && (
//                       <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
//                         +{hospital.facilities.split(",").length - 4} more
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
//               <CardContent className="pt-8 text-center">
//                 <Shield className="h-16 w-16 mx-auto mb-4 opacity-90" />
//                 <p className="text-xl font-bold mb-6">Insurance Accepted</p>
//                 <p className="text-lg opacity-90">
//                   We accept all major health insurance providers including MediCare+, LifeSecure, and more.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Book Appointment CTA */}
//         <div className="mt-16 text-center">
//           <Button
//             size="lg"
//             onClick={() => navigate("/appointments", { state: { hospital } })}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-2xl px-16 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
//           >
//             Book Appointment Now
//           </Button>
//           <p className="text-gray-600 mt-6 text-lg">
//             Get treated by top doctors • 24/7 emergency care • No waiting
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicHospitalProfile;

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  Building2,
  MapPin,
  Phone,
  BedDouble,
  HeartPulse,
  Clock,
  Shield,
  ArrowLeft,
  Star,
} from "lucide-react";

const PublicHospitalProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthenticated } = useAuth();

  // Safe access — prevent crash if state is missing or incomplete
  const hospital = state ?? {};

  if (!hospital || !hospital.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <p className="text-2xl font-bold text-gray-700">Hospital Not Found</p>
          <Button onClick={() => navigate(-1)} className="mt-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/patient-dashboard", {
      state: { openBookAppointment: true },
    });
  };

  // Safe string splitting with fallback
  const specializations = typeof hospital.specializations === "string"
    ? hospital.specializations.split(",").map((s: string) => s.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Search
        </Button>

        {/* Hero Banner */}
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-10">
          <img
            src={hospital.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200"}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 drop-shadow-2xl">
              {hospital.name}
            </h1>
            <div className="flex items-center gap-3 text-xl">
              <MapPin className="h-7 w-7" />
              <span>{hospital.location || "Location"}, {hospital.city || "City"}</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" />
                {hospital.rating || "N/A"} / 5.0
              </div>
              <span className="text-lg opacity-90">Excellent Reviews</span>
            </div>

            {/* Affiliated Badge */}
            {["11", "12", "13"].includes(hospital.id) && (
              <div className="mt-6">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-bold shadow-xl border-2 border-white/30">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Affiliated with Aidpoint
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center py-6 bg-white/80 backdrop-blur">
            <BedDouble className="h-12 w-12 mx-auto mb-3 text-blue-600" />
            <p className="text-3xl font-bold">{hospital.totalBeds || "N/A"}</p>
            <p className="text-gray-600">Total Beds</p>
          </Card>
          <Card className="text-center py-6 bg-white/80 backdrop-blur">
            <BedDouble className="h-12 w-12 mx-auto mb-3 text-green-600" />
            <p className="text-3xl font-bold text-green-600">{hospital.availableBeds || "N/A"}</p>
            <p className="text-gray-600">Available Now</p>
          </Card>
          <Card className="text-center py-6 bg-white/80 backdrop-blur">
            <Clock className="h-12 w-12 mx-auto mb-3 text-purple-600" />
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-gray-600">Emergency Care</p>
          </Card>
          <Card className="text-center py-6 bg-white/80 backdrop-blur">
            <HeartPulse className="h-12 w-12 mx-auto mb-3 text-red-600" />
            <p className="text-2xl font-bold">Multi-Specialty</p>
            <p className="text-gray-600">Advanced Care</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About {hospital.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {hospital.name} is a leading multi-specialty hospital in {hospital.city || "the region"}, known for its world-class healthcare services and advanced facilities.
                </p>
                <p className="text-gray-600 mt-4">
                  With {hospital.totalBeds || "many"} beds and 24/7 emergency services, we ensure timely and effective treatment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                {specializations.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {specializations.map((spec: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="py-2 px-4 bg-blue-100 text-blue-800">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No specializations listed</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Phone className="h-7 w-7 text-green-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-lg">
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <span className="font-medium">{hospital.phone || "Not available"}</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-gray-600">{hospital.location || "Location"}, {hospital.city || "City"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
              <CardContent className="pt-8 text-center">
                <Shield className="h-16 w-16 mx-auto mb-4 opacity-90" />
                <p className="text-xl font-bold mb-6">Insurance Accepted</p>
                <p className="text-lg opacity-90">
                  We accept all major health insurance providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Book Appointment CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleBookAppointment}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-2xl px-24 py-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold"
          >
            Book Appointment Now
          </Button>
          <p className="text-gray-600 mt-6 text-lg">
            Instant booking • No waiting time • 24/7 available
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicHospitalProfile;