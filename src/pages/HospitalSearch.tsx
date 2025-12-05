
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MapPin, Search, Star, Bed, Phone, ArrowUpDown } from "lucide-react";

// // ────────────────────── MOCK DATA ──────────────────────
// const mockHospitals = [
//   {
//     id: "1",
//     name: "Fortis Escorts Hospital",
//     location: "Malviya Nagar",
//     city: "Jaipur",
//     rating: 4.8,
//     totalBeds: 525,
//     availableBeds: 48,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
//     phone: "+91-141-2547000",
//     lat: 26.847889,
//     lng: 75.804106,
//     specializations: "Cardiology,Neurology,Orthopedics,Emergency",
//     facilities: "ICU,Emergency,Radiology",
//   },
//   {
//     id: "2",
//     name: "SMS Hospital",
//     location: "Near Statue Circle",
//     city: "Jaipur",
//     rating: 4.2,
//     totalBeds: 2100,
//     availableBeds: 156,
//     image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
//     phone: "+91-141-2560291",
//     lat: 26.8445, 
//     lng: 75.8355,
//     specializations: "General,Surgery,Pediatrics",
//     facilities: "Trauma,Blood Bank",
//   },
//   {
//     id: "3",
//     name: "Eternal Heart Care Centre",
//     location: "Jagatpura",
//     city: "Jaipur",
//     rating: 4.7,
//     totalBeds: 200,
//     availableBeds: 22,
//     image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
//     phone: "+91-141-5155555",
//     lat: 26.8726, 
//     lng: 75.7483,
//     specializations: "Cardiology,Cardiac Surgery",
//     facilities: "CCU,Cath Lab",
//   },
//   {
//     id: "4",
//     name: "Apex Hospital",
//     location: "Mansarovar",
//     city: "Jaipur",
//     rating: 4.6,
//     totalBeds: 150,
//     availableBeds: 18,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
//     phone: "+91-141-5129000",
//     lat: 26.8039,
//     lng: 75.8070,
//     specializations: "Orthopedics,Neurology,Oncology",
//     facilities: "ICU,Dialysis",
//   },
//   {
//     id: "5",
//     name: "Narayana Multispeciality Hospital",
//     location: "Pratap Nagar",
//     city: "Jaipur",
//     rating: 4.5,
//     totalBeds: 350,
//     availableBeds: 42,
//     image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
//     phone: "+91-141-5153000",
//     lat: 26.8039, 
//     lng: 75.8070,
//     specializations: "Neurosurgery,Urology",
//     facilities: "Cath Lab,MRI",
//   },
//   {
//     id: "6",
//     name: "CK Birla Hospital",
//     location: "Tonk Road",
//     city: "Jaipur",
//     rating: 4.7,
//     totalBeds: 200,
//     availableBeds: 28,
//     image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
//     phone: "+91-141-3060600",
//     lat: 26.8842, 
//     lng: 75.7934,
//     specializations: "Joint Replacement,Spine",
//     facilities: "Modular OT",
//   },
//   {
//     id: "7",
//     name: "Manipal Hospital",
//     location: "Vidhyadhar Nagar",
//     city: "Jaipur",
//     rating: 4.6,
//     totalBeds: 300,
//     availableBeds: 35,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
//     phone: "+91-141-3988888",
//     lat: 26.9540, 
//     lng: 75.7929,
//     specializations: "Gastroenterology,Nephrology",
//     facilities: "Dialysis",
//   },
//   {
//     id: "8",
//     name: "Rukmani Birla Hospital",
//     location: "Gopalpura Bypass",
//     city: "Jaipur",
//     rating: 4.5,
//     totalBeds: 180,
//     availableBeds: 24,
//     image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
//     phone: "+91-141-2520000",
//     lat: 26.8804, 
//     lng: 75.7983,
//     specializations: "Oncology,Cancer Care",
//     facilities: "Radiation",
//   },
//   {
//     id: "9",
//     name: "Paras JK Hospital",
//     location: "Vidhyadhar Nagar",
//     city: "Jaipur",
//     rating: 4.4,
//     totalBeds: 120,
//     availableBeds: 16,
//     image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
//     phone: "+91-141-3988888",
//     lat: 26.9605, 
//     lng: 75.7992,
//     specializations: "Pediatrics,Neonatology",
//     facilities: "NICU",
//   },
//   {
//     id: "10",
//     name: "Mahatma Gandhi Hospital",
//     location: "Sitapura",
//     city: "Jaipur",
//     rating: 4.3,
//     totalBeds: 450,
//     availableBeds: 52,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
//     phone: "+91-141-2771111",
//     lat: 26.7696, 
//     lng: 75.8629,
//     specializations: "ENT,Ophthalmology",
//     facilities: "OPD",
//   },

//   // ────────────────────── NEW HOSPITALS ──────────────────────
//   {
//     id: "11",
//     name: "Regency State Hospital",
//     location: "Ajmer Road, Bhankrota",
//     city: "Jaipur",
//     rating: 4.4,
//     totalBeds: 280,
//     availableBeds: 37,
//     image: "https://images.unsplash.com/photo-1629909613654-28e377c5d34f?w=800",
//     phone: "+91-141-1234567",
//     lat: 26.8850,
//     lng: 75.6999,
//     specializations: "General Medicine,Orthopedics,Gynecology,Emergency",
//     facilities: "ICU,Operation Theatre,Pharmacy",
//   },
//   {
//     id: "12",
//     name: "Shri Raghuvansh Hospital",
//     location: "Sanganer",
//     city: "Jaipur",
//     rating: 4.5,
//     totalBeds: 180,
//     availableBeds: 29,
//     image: "https://images.unsplash.com/photo-1632833239868-9dde8bfd1e15?w=800",
//     phone: "+91-141-9876543",
//     lat: 26.8135,
//     lng: 75.7798,
//     specializations: "Cardiology,Neurology,General Surgery,Pediatrics",
//     facilities: "Cath Lab,ICU,Dialysis",
//   },
//   {
//     id: "13",
//     name: "Malot Hospital (Ortho, Eye & General Hospital)",
//     location: "Vaishali Nagar",
//     city: "Jaipur",
//     rating: 4.6,
//     totalBeds: 140,
//     availableBeds: 21,
//     image: "https://images.unsplash.com/photo-1596548438138-d6f7d569a3c4?w=800",
//     phone: "+91-141-4012345",
//     lat: 26.9132,
//     lng: 75.7420,
//     specializations: "Orthopedics,Ophthalmology,General Medicine,ENT",
//     facilities: "Eye OT,Joint Replacement Unit,Physiotherapy",
//   },
// ];

// // ────────────────────── MAP COMPONENT ──────────────────────
// const OpenStreetMap = ({
//   hospitals,
//   userPosition,
// }: {
//   hospitals: any[];
//   userPosition?: { lat: number; lng: number } | null;
// }) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstanceRef = useRef<any>(null);
//   const [L, setL] = useState<any>(null);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     if (window.L) {
//       setL(window.L);
//       return;
//     }

//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
//     document.head.appendChild(link);

//     const script = document.createElement("script");
//     script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
//     script.onload = () => setL(window.L);
//     document.body.appendChild(script);
//   }, []);

//   useEffect(() => {
//     if (!L || !mapRef.current || mapInstanceRef.current) return;

//     const map = L.map(mapRef.current, {
//       zoomControl: true,
//       attributionControl: true,
//     }).setView([26.836694618610295, 75.65034245381638], 12);

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors",
//       maxZoom: 19,
//     }).addTo(map);

//     mapInstanceRef.current = map;

//     return () => {
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [L]);

//   useEffect(() => {
//     if (!L || !mapInstanceRef.current) return;

//     mapInstanceRef.current.eachLayer((layer: any) => {
//       if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
//         mapInstanceRef.current.removeLayer(layer);
//       }
//     });

//     if (userPosition) {
//       const userIcon = L.divIcon({
//         className: "custom-user-marker",
//         html: '<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
//         iconSize: [20, 20],
//         iconAnchor: [10, 10],
//       });

//       L.marker([userPosition.lat, userPosition.lng], { icon: userIcon })
//         .addTo(mapInstanceRef.current)
//         .bindPopup("<strong>Your Location</strong>");
//     }

//     hospitals.forEach((h) => {
//       if (h.lat && h.lng) {
//         const hospitalIcon = L.divIcon({
//           className: "custom-hospital-marker",
//           html: '<div style="background: #dc2626; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">🏥</div>',
//           iconSize: [28, 28],
//           iconAnchor: [14, 14],
//         });

//         L.marker([h.lat, h.lng], { icon: hospitalIcon })
//           .addTo(mapInstanceRef.current)
//           .bindPopup(
//             `<div style="min-width: 200px;"><strong style="font-size: 14px;">${h.name}</strong><br><span style="color: #666; font-size: 12px;">${h.location}</span><br><span style="color: #059669; font-weight: 600; font-size: 12px;">⭐ ${h.rating} | 🛏️ ${h.availableBeds} beds</span></div>`
//           );
//       }
//     });
//   }, [L, hospitals, userPosition]);

//   return (
//     <div ref={mapRef} className="w-full h-full" style={{ minHeight: "100%" }} />
//   );
// };

// // ────────────────────── MAIN PAGE ──────────────────────
// export default function HospitalSearch() {
//   const navigate = useNavigate();

//   const [filteredHospitals, setFilteredHospitals] = useState(mockHospitals);
//   const [userPosition] = useState({ lat: 26.836694618610295, lng: 75.65034245381638 });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSpecialization, setSelectedSpecialization] = useState("all");
//   const [sortBy, setSortBy] = useState("distance");

//   useEffect(() => {
//     let results = mockHospitals;

//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       results = results.filter(
//         (h) =>
//           h.name.toLowerCase().includes(q) ||
//           h.location.toLowerCase().includes(q)
//       );
//     }

//     if (selectedSpecialization !== "all") {
//       results = results.filter((h) =>
//         h.specializations
//           .toLowerCase()
//           .includes(selectedSpecialization.toLowerCase())
//       );
//     }

//     // Sort on the filtered copy
//     if (sortBy === "rating") {
//       results = [...results].sort((a, b) => b.rating - a.rating);
//     } else if (sortBy === "beds") {
//       results = [...results].sort((a, b) => b.availableBeds - a.availableBeds);
//     } else {
//       results = [...results].sort((a, b) => {
//         const distA = calculateDistance(
//           userPosition.lat,
//           userPosition.lng,
//           a.lat,
//           a.lng
//         );
//         const distB = calculateDistance(
//           userPosition.lat,
//           userPosition.lng,
//           b.lat,
//           b.lng
//         );
//         return distA - distB;
//       });
//     }

//     setFilteredHospitals(results);
//   }, [searchQuery, selectedSpecialization, sortBy]);

//   const calculateDistance = (
//     lat1: number,
//     lng1: number,
//     lat2: number,
//     lng2: number
//   ) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLng = (lng2 - lng1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLng / 2) *
//         Math.sin(dLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const allSpecializations = Array.from(
//     new Set(
//       mockHospitals
//         .flatMap((h) => h.specializations.split(","))
//         .map((s) => s.trim())
//     )
//   );

//   const goToProfile = (hospital: any) => {
//     navigate(`/hospital/${hospital.id}`, { state: hospital });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="text-center space-y-2 pt-6">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Find Healthcare Near You
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Discover top-rated hospitals in Jaipur
//           </p>
//         </div>

//         <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
//           <OpenStreetMap
//             hospitals={filteredHospitals}
//             userPosition={userPosition}
//           />
//         </div>

//         <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 <Input
//                   placeholder="Search hospitals..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
//                 />
//               </div>

//               <Select
//                 value={selectedSpecialization}
//                 onValueChange={setSelectedSpecialization}
//               >
//                 <SelectTrigger className="h-12 border-gray-200">
//                   <SelectValue placeholder="All Specializations" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Specializations</SelectItem>
//                   {allSpecializations.map((s) => (
//                     <SelectItem key={s} value={s}>
//                       {s}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="h-12 border-gray-200">
//                   <ArrowUpDown className="mr-2 h-4 w-4" />
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="distance">Sort by Distance</SelectItem>
//                   <SelectItem value="rating">Sort by Rating</SelectItem>
//                   <SelectItem value="beds">Sort by Available Beds</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {filteredHospitals.length} Hospital
//             {filteredHospitals.length !== 1 && "s"} Found
//           </h2>
//           <div className="text-sm text-gray-600">
//             Sorted by:{" "}
//             <span className="font-semibold text-purple-600">
//               {sortBy === "distance"
//                 ? "Distance"
//                 : sortBy === "rating"
//                 ? "Rating"
//                 : "Available Beds"}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
//           {filteredHospitals.length === 0 ? (
//             <div className="col-span-full text-center py-20">
//               <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//               <p className="text-xl text-gray-600 font-medium">
//                 No hospitals found
//               </p>
//               <p className="text-gray-500 mt-2">Try adjusting your filters</p>
//             </div>
//           ) : (
//             filteredHospitals.map((hospital) => (
//               <Card
//                 key={hospital.id}
//                 className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white cursor-pointer"
//                 onClick={() => goToProfile(hospital)}
//               >
//                 <div className="relative h-52 overflow-hidden">
//                   <img
//                     src={hospital.image}
//                     alt={hospital.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                   <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg">
//                     <Star className="h-4 w-4 fill-current" />
//                     {hospital.rating}
//                   </div>
//                   <div className="absolute bottom-4 left-4 right-4">
//                     <h3 className="text-white font-bold text-lg drop-shadow-lg">
//                       {hospital.name}
//                     </h3>
//                   </div>
//                 </div>

//                 <CardContent className="p-5 space-y-4">
//                   <div className="flex items-start gap-2 text-gray-600">
//                     <MapPin className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
//                     <span className="text-sm font-medium">
//                       {hospital.location}, {hospital.city}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
//                     <span className="text-sm">{hospital.phone}</span>
//                   </div>

//                   <div className="pt-3 border-t border-gray-100">
//                     <div className="flex flex-wrap gap-1.5">
//                       {hospital.specializations
//                         .split(",")
//                         .slice(0, 3)
//                         .map((spec: string, idx: number) => (
//                           <span
//                             key={idx}
//                             className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
//                           >
//                             {spec.trim()}
//                           </span>
//                         ))}
//                       {hospital.specializations.split(",").length > 3 && (
//                         <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                           +{hospital.specializations.split(",").length - 3}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                     <div className="flex items-center gap-2">
//                       <div className="p-2 bg-green-50 rounded-lg">
//                         <Bed className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 font-medium">
//                           Available
//                         </p>
//                         <p className="text-xl font-bold text-green-600">
//                           {hospital.availableBeds}
//                           <span className="text-sm text-gray-400 font-normal ml-0.5">
//                             beds
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-gray-500 font-medium">
//                         Distance
//                       </p>
//                       <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                         {calculateDistance(
//                           userPosition.lat,
//                           userPosition.lng,
//                           hospital.lat,
//                           hospital.lng
//                         ).toFixed(1)}
//                         <span className="text-sm"> km</span>
//                       </p>
//                     </div>
//                   </div>

//                   <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all h-11">
//                     View Details →
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, Star, Bed, Phone, ArrowUpDown } from "lucide-react";

// ────────────────────── MOCK DATA ──────────────────────
const mockHospitals = [
  {
    id: "1",
    name: "Fortis Escorts Hospital",
    location: "Malviya Nagar",
    city: "Jaipur",
    rating: 4.8,
    totalBeds: 525,
    availableBeds: 48,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    phone: "+91-141-2547000",
    lat: 26.847889,
    lng: 75.804106,
    specializations: "Cardiology,Neurology,Orthopedics,Emergency",
    facilities: "ICU,Emergency,Radiology",
  },
  {
    id: "2",
    name: "SMS Hospital",
    location: "Near Statue Circle",
    city: "Jaipur",
    rating: 4.2,
    totalBeds: 2100,
    availableBeds: 156,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    phone: "+91-141-2560291",
    lat: 26.8445, 
    lng: 75.8355,
    specializations: "General,Surgery,Pediatrics",
    facilities: "Trauma,Blood Bank",
  },
  {
    id: "3",
    name: "Eternal Heart Care Centre",
    location: "Jagatpura",
    city: "Jaipur",
    rating: 4.7,
    totalBeds: 200,
    availableBeds: 22,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
    phone: "+91-141-5155555",
    lat: 26.8726, 
    lng: 75.7483,
    specializations: "Cardiology,Cardiac Surgery",
    facilities: "CCU,Cath Lab",
  },
  {
    id: "4",
    name: "Apex Hospital",
    location: "Mansarovar",
    city: "Jaipur",
    rating: 4.6,
    totalBeds: 150,
    availableBeds: 18,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    phone: "+91-141-5129000",
    lat: 26.8039,
    lng: 75.8070,
    specializations: "Orthopedics,Neurology,Oncology",
    facilities: "ICU,Dialysis",
  },
  {
    id: "5",
    name: "Narayana Multispeciality Hospital",
    location: "Pratap Nagar",
    city: "Jaipur",
    rating: 4.5,
    totalBeds: 350,
    availableBeds: 42,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    phone: "+91-141-5153000",
    lat: 26.8039, 
    lng: 75.8070,
    specializations: "Neurosurgery,Urology",
    facilities: "Cath Lab,MRI",
  },
  {
    id: "6",
    name: "CK Birla Hospital",
    location: "Tonk Road",
    city: "Jaipur",
    rating: 4.7,
    totalBeds: 200,
    availableBeds: 28,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
    phone: "+91-141-3060600",
    lat: 26.8842, 
    lng: 75.7934,
    specializations: "Joint Replacement,Spine",
    facilities: "Modular OT",
  },
  {
    id: "7",
    name: "Manipal Hospital",
    location: "Vidhyadhar Nagar",
    city: "Jaipur",
    rating: 4.6,
    totalBeds: 300,
    availableBeds: 35,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    phone: "+91-141-3988888",
    lat: 26.9540, 
    lng: 75.7929,
    specializations: "Gastroenterology,Nephrology",
    facilities: "Dialysis",
  },
  {
    id: "8",
    name: "Rukmani Birla Hospital",
    location: "Gopalpura Bypass",
    city: "Jaipur",
    rating: 4.5,
    totalBeds: 180,
    availableBeds: 24,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    phone: "+91-141-2520000",
    lat: 26.8804, 
    lng: 75.7983,
    specializations: "Oncology,Cancer Care",
    facilities: "Radiation",
  },
  {
    id: "9",
    name: "Paras JK Hospital",
    location: "Vidhyadhar Nagar",
    city: "Jaipur",
    rating: 4.4,
    totalBeds: 120,
    availableBeds: 16,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
    phone: "+91-141-3988888",
    lat: 26.9605, 
    lng: 75.7992,
    specializations: "Pediatrics,Neonatology",
    facilities: "NICU",
  },
  {
    id: "10",
    name: "Mahatma Gandhi Hospital",
    location: "Sitapura",
    city: "Jaipur",
    rating: 4.3,
    totalBeds: 450,
    availableBeds: 52,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    phone: "+91-141-2771111",
    lat: 26.7696, 
    lng: 75.8629,
    specializations: "ENT,Ophthalmology",
    facilities: "OPD",
  },
  // ────────────────────── NEW HOSPITALS (Aidpoint Partners) ──────────────────────
  {
    id: "11",
    name: "Regency State Hospital",
    location: "Ajmer Road, Bhankrota",
    city: "Jaipur",
    rating: 4.4,
    totalBeds: 280,
    availableBeds: 37,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&fit=crop",
    phone: "+91-141-1234567",
    lat: 26.8850,
    lng: 75.6999,
    specializations: "General Medicine,Orthopedics,Gynecology,Emergency",
    facilities: "ICU,Operation Theatre,Pharmacy",
    isAidpointPartner: true,
  },
  {
    id: "12",
    name: "Shri Raghuvansh Hospital",
    location: "Sanganer",
    city: "Jaipur",
    rating: 4.5,
    totalBeds: 180,
    availableBeds: 29,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&fit=crop",
    phone: "+91-141-9876543",
    lat: 26.8135,
    lng: 75.7798,
    specializations: "Cardiology,Neurology,General Surgery,Pediatrics",
    facilities: "Cath Lab,ICU,Dialysis",
    isAidpointPartner: true,
  },
  {
    id: "13",
    name: "Malot Hospital (Ortho, Eye & General Hospital)",
    location: "Vaishali Nagar",
    city: "Jaipur",
    rating: 4.6,
    totalBeds: 140,
    availableBeds: 21,
    image: "https://images.unsplash.com/photo-1586776978256-19b11f4ca76d?w=800&fit=crop",
    phone: "+91-141-4012345",
    lat: 26.9132,
    lng: 75.7420,
    specializations: "Orthopedics,Ophthalmology,General Medicine,ENT",
    facilities: "Eye OT,Joint Replacement Unit,Physiotherapy",
    isAidpointPartner: true,
  },
];

// ────────────────────── MAP COMPONENT ──────────────────────
const OpenStreetMap = ({
  hospitals,
  userPosition,
}: {
  hospitals: any[];
  userPosition?: { lat: number; lng: number } | null;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.L) {
      setL(window.L);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setL(window.L);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!L || !mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([26.836694618610295, 75.65034245381638], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [L]);

  useEffect(() => {
    if (!L || !mapInstanceRef.current) return;

    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    if (userPosition) {
      const userIcon = L.divIcon({
        className: "custom-user-marker",
        html: '<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker([userPosition.lat, userPosition.lng], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("<strong>Your Location</strong>");
    }

    hospitals.forEach((h) => {
      if (h.lat && h.lng) {
        const hospitalIcon = L.divIcon({
          className: "custom-hospital-marker",
          html: '<div style="background: #dc2626; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">🏥</div>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        L.marker([h.lat, h.lng], { icon: hospitalIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `<div style="min-width: 200px;"><strong style="font-size: 14px;">${h.name}</strong><br><span style="color: #666; font-size: 12px;">${h.location}</span><br><span style="color: #059669; font-weight: 600; font-size: 12px;">⭐ ${h.rating} | 🛏️ ${h.availableBeds} beds</span></div>`
          );
      }
    });
  }, [L, hospitals, userPosition]);

  return (
    <div ref={mapRef} className="w-full h-full" style={{ minHeight: "100%" }} />
  );
};

// ────────────────────── MAIN PAGE ──────────────────────
export default function HospitalSearch() {
  const navigate = useNavigate();

  const [filteredHospitals, setFilteredHospitals] = useState(mockHospitals);
  const [userPosition] = useState({ lat: 26.836694618610295, lng: 75.65034245381638 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [sortBy, setSortBy] = useState("distance");

  useEffect(() => {
    let results = mockHospitals;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q)
      );
    }

    if (selectedSpecialization !== "all") {
      results = results.filter((h) =>
        h.specializations
          .toLowerCase()
          .includes(selectedSpecialization.toLowerCase())
      );
    }

    // Sort on the filtered copy
    if (sortBy === "rating") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "beds") {
      results = [...results].sort((a, b) => b.availableBeds - a.availableBeds);
    } else {
      results = [...results].sort((a, b) => {
        const distA = calculateDistance(
          userPosition.lat,
          userPosition.lng,
          a.lat,
          a.lng
        );
        const distB = calculateDistance(
          userPosition.lat,
          userPosition.lng,
          b.lat,
          b.lng
        );
        return distA - distB;
      });
    }

    setFilteredHospitals(results);
  }, [searchQuery, selectedSpecialization, sortBy, userPosition]);

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const allSpecializations = Array.from(
    new Set(
      mockHospitals
        .flatMap((h) => h.specializations.split(","))
        .map((s) => s.trim())
    )
  );

  const goToProfile = (hospital: any) => {
    navigate(`/hospital/${hospital.id}`, { state: hospital });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2 pt-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Find Healthcare Near You
          </h1>
          <p className="text-gray-600 text-lg">
            Discover top-rated hospitals in Jaipur
          </p>
        </div>

        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
          <OpenStreetMap
            hospitals={filteredHospitals}
            userPosition={userPosition}
          />
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <Input
                  placeholder="Search hospitals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger className="h-12 border-gray-200">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {allSpecializations.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 border-gray-200">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="beds">Sort by Available Beds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredHospitals.length} Hospital
            {filteredHospitals.length !== 1 && "s"} Found
          </h2>
          <div className="text-sm text-gray-600">
            Sorted by:{" "}
            <span className="font-semibold text-purple-600">
              {sortBy === "distance"
                ? "Distance"
                : sortBy === "rating"
                ? "Rating"
                : "Available Beds"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-medium">
                No hospitals found
              </p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white cursor-pointer relative"
                onClick={() => goToProfile(hospital)}
              >
                {/* Aidpoint Partner Badge - Only for partnered hospitals */}
                {hospital.isAidpointPartner && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-white/50 flex items-center gap-2 text-sm font-bold tracking-wide transform rotate-[-2deg] hover:rotate-0 transition-all duration-300 group-hover:scale-105">
                      <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></span>
                      🤝 Associated with Aidpoint
                    </div>
                  </div>
                )}

                <div className="relative h-52 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg z-10">
                    <Star className="h-4 w-4 fill-current" />
                    {hospital.rating}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">
                      {hospital.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {hospital.location}, {hospital.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{hospital.phone}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.specializations
                        .split(",")
                        .slice(0, 3)
                        .map((spec: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {spec.trim()}
                          </span>
                        ))}
                      {hospital.specializations.split(",").length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          +{hospital.specializations.split(",").length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Bed className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Available</p>
                        <p className="text-xl font-bold text-green-600">
                          {hospital.availableBeds}
                          <span className="text-sm text-gray-400 font-normal ml-0.5">beds</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">Distance</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {calculateDistance(
                          userPosition.lat,
                          userPosition.lng,
                          hospital.lat,
                          hospital.lng
                        ).toFixed(1)}
                        <span className="text-sm"> km</span>
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all h-11">
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
