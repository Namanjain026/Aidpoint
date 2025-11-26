// import { useState, useEffect, useRef } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { MapPin, Search, Star, Phone, Bed } from 'lucide-react';

// declare global {
//   interface Window {
//     L?: any;
//   }
// }

// // Mock Hospital Data for Jaipur
// const mockHospitals = [
//   {
//     id: '1',
//     name: 'Fortis Escorts Hospital',
//     location: 'Jawahar Lal Nehru Marg, Malviya Nagar',
//     city: 'Jaipur',
//     specializations: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency Medicine'],
//     rating: 4.8,
//     totalBeds: 525,
//     availableBeds: 48,
//     image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
//     phone: '+91-141-2547000',
//     email: 'info@fortisescorts.in',
//     lat: 26.8517,
//     lng: 75.8104,
//     facilities: ['ICU', 'Emergency', 'Radiology', 'Lab', 'Pharmacy'],
//   },
//   {
//     id: '2',
//     name: 'SMS Hospital',
//     location: 'JLN Marg, Near Statue Circle',
//     city: 'Jaipur',
//     specializations: ['General Medicine', 'Surgery', 'Pediatrics', 'Gynecology'],
//     rating: 4.2,
//     totalBeds: 2100,
//     availableBeds: 156,
//     image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
//     phone: '+91-141-2560291',
//     email: 'sms.hospital@rajasthan.gov.in',
//     lat: 26.9173,
//     lng: 75.7881,
//     facilities: ['ICU', 'Emergency', 'Trauma Center', 'Blood Bank'],
//   },
//   {
//     id: '3',
//     name: 'Eternal Heart Care Centre',
//     location: 'Jagatpura Road, Near Jagatpura Circle',
//     city: 'Jaipur',
//     specializations: ['Cardiology', 'Cardiac Surgery', 'Critical Care'],
//     rating: 4.7,
//     totalBeds: 200,
//     availableBeds: 22,
//     image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
//     phone: '+91-141-5155555',
//     email: 'contact@eternalheartcare.com',
//     lat: 26.8413,
//     lng: 75.8721,
//     facilities: ['ICU', 'CCU', 'Cath Lab', 'Emergency'],
//   },
//   {
//     id: '4',
//     name: 'Apex Hospital',
//     location: 'Sector 43, Shipra Path, Mansarovar',
//     city: 'Jaipur',
//     specializations: ['Multi Specialty', 'Orthopedics', 'Neurology', 'Oncology'],
//     rating: 4.6,
//     totalBeds: 150,
//     availableBeds: 18,
//     image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
//     phone: '+91-141-5129000',
//     email: 'info@apexhospitaljaipur.com',
//     lat: 26.8721,
//     lng: 75.7644,
//     facilities: ['ICU', 'Emergency', 'Radiology', 'Lab', 'Dialysis'],
//   },
//   {
//     id: '5',
//     name: 'Narayana Multispeciality Hospital',
//     location: 'Sector 28, Pratap Nagar',
//     city: 'Jaipur',
//     specializations: ['Cardiology', 'Neurosurgery', 'Orthopedics', 'Urology'],
//     rating: 4.5,
//     totalBeds: 350,
//     availableBeds: 42,
//     image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
//     phone: '+91-141-5153000',
//     email: 'jaipur@narayanahealth.org',
//     lat: 26.8764,
//     lng: 75.7752,
//     facilities: ['ICU', 'Emergency', 'Cath Lab', 'CT Scan', 'MRI'],
//   },
//   {
//     id: '6',
//     name: 'CK Birla Hospital',
//     location: 'Nehru Sahkar Bhawan, Tonk Road',
//     city: 'Jaipur',
//     specializations: ['Orthopedics', 'Joint Replacement', 'Spine Surgery', 'Sports Medicine'],
//     rating: 4.7,
//     totalBeds: 200,
//     availableBeds: 28,
//     image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
//     phone: '+91-141-3060600',
//     email: 'jaipur@ckbirlahospitals.com',
//     lat: 26.8764,
//     lng: 75.8123,
//     facilities: ['ICU', 'Modular OT', 'Physiotherapy', 'Radiology'],
//   },
//   {
//     id: '7',
//     name: 'Manipal Hospital',
//     location: 'Sector 5, Vidhyadhar Nagar',
//     city: 'Jaipur',
//     specializations: ['Multi Specialty', 'Gastroenterology', 'Nephrology', 'Pulmonology'],
//     rating: 4.6,
//     totalBeds: 300,
//     availableBeds: 35,
//     image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
//     phone: '+91-141-3988888',
//     email: 'jaipur@manipalhospitals.com',
//     lat: 26.9644,
//     lng: 75.8239,
//     facilities: ['ICU', 'Emergency', 'Dialysis', 'Lab', 'Pharmacy'],
//   },
//   {
//     id: '8',
//     name: 'Rukmani Birla Hospital',
//     location: 'Gopalpura Bypass Road',
//     city: 'Jaipur',
//     specializations: ['Oncology', 'Cancer Care', 'Radiation Therapy', 'Chemotherapy'],
//     rating: 4.5,
//     totalBeds: 180,
//     availableBeds: 24,
//     image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
//     phone: '+91-141-2520000',
//     email: 'rbh@ckbirlagroup.com',
//     lat: 26.8356,
//     lng: 75.8144,
//     facilities: ['ICU', 'Radiation Unit', 'Chemotherapy', 'Lab'],
//   },
//   {
//     id: '9',
//     name: 'Paras JK Hospital',
//     location: 'Sector 5, Vidhyadhar Nagar',
//     city: 'Jaipur',
//     specializations: ['Pediatrics', 'Neonatology', 'Child Care', 'Vaccination'],
//     rating: 4.4,
//     totalBeds: 120,
//     availableBeds: 16,
//     image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
//     phone: '+91-141-3988888',
//     email: 'jaipur@parasjkhospital.com',
//     lat: 26.9621,
//     lng: 75.8267,
//     facilities: ['NICU', 'Pediatric ICU', 'Emergency', 'Lab'],
//   },
//   {
//     id: '10',
//     name: 'Mahatma Gandhi Hospital',
//     location: 'Jawahar Lal Nehru Marg, Sitapura',
//     city: 'Jaipur',
//     specializations: ['General Medicine', 'Surgery', 'ENT', 'Ophthalmology'],
//     rating: 4.3,
//     totalBeds: 450,
//     availableBeds: 52,
//     image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
//     phone: '+91-141-2771111',
//     email: 'info@mghospital.in',
//     lat: 26.8156,
//     lng: 75.8122,
//     facilities: ['ICU', 'Emergency', 'OPD', 'Lab', 'Pharmacy'],
//   },
// ];

// // OpenStreetMap Component
// const OpenStreetMap = ({ hospitals, userPosition, flyToTarget }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [mapInstance, setMapInstance] = useState(null);
//   const [leaflet, setLeaflet] = useState(null);

//   useEffect(() => {
//     // Load Leaflet dynamically
//     if (typeof window !== 'undefined' && !window.L) {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
//       document.head.appendChild(link);

//       const script = document.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
//       script.onload = () => {
//         setLeaflet(window.L);
//       };
//       document.body.appendChild(script);
//     } else if (window.L) {
//       setLeaflet(window.L);
//     }
//   }, []);

//   useEffect(() => {
//     if (!leaflet || !mapRef.current || mapInstance) return;

//     const map = leaflet.map(mapRef.current).setView([26.9124, 75.7873], 12);

//     leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     setMapInstance(map);

//     return () => {
//       if (map) {
//         map.remove();
//       }
//     };
//   }, [leaflet, mapRef]);

//   useEffect(() => {
//     if (!mapInstance || !leaflet) return;

//     // Clear existing markers
//     mapInstance.eachLayer((layer) => {
//       if (layer instanceof leaflet.Marker) {
//         mapInstance.removeLayer(layer);
//       }
//     });

//     // Add user position marker
//     if (userPosition) {
//       const userIcon = leaflet.divIcon({
//         className: 'custom-user-marker',
//         html: '<div style="background-color: #2563eb; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
//         iconSize: [24, 24],
//         iconAnchor: [12, 12]
//       });
//       leaflet.marker([userPosition.lat, userPosition.lng], { icon: userIcon })
//         .addTo(mapInstance)
//         .bindPopup('Your Location');
//     }

//     // Add hospital markers
//     hospitals.forEach((hospital) => {
//       const hospitalIcon = leaflet.divIcon({
//         className: 'custom-hospital-marker',
//         html: '<div style="background-color: #dc2626; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">🏥</div>',
//         iconSize: [28, 28],
//         iconAnchor: [14, 14]
//       });

//       leaflet.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
//         .addTo(mapInstance)
//         .bindPopup(`<strong>${hospital.name}</strong><br>${hospital.location}`);
//     });
//   }, [mapInstance, hospitals, userPosition, leaflet]);

//   useEffect(() => {
//     if (!mapInstance || !flyToTarget) return;
//     mapInstance.flyTo([flyToTarget.lat, flyToTarget.lng], flyToTarget.zoom || 13, {
//       duration: 1.5
//     });
//   }, [flyToTarget, mapInstance]);

//   return <div ref={(el) => mapRef.current = el} style={{ width: '100%', height: '100%' }} />;
// };

// const HospitalSearch = () => {
//   const [hospitals] = useState(mockHospitals);
//   const [filteredHospitals, setFilteredHospitals] = useState(mockHospitals);
//   const [userPosition, setUserPosition] = useState({ lat: 26.9124, lng: 75.7873 });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedSpecialization, setSelectedSpecialization] = useState('all');
//   const [minRating, setMinRating] = useState(0);
//   const [selectedFacility, setSelectedFacility] = useState('all');
//   const [flyToTarget, setFlyToTarget] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserPosition(pos);
//         },
//         () => {
//           console.log('Using default Jaipur location');
//         }
//       );
//     }
//   }, []);

//   useEffect(() => {
//     let results = hospitals;

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       results = results.filter(
//         (h) =>
//           h.name.toLowerCase().includes(query) ||
//           h.location.toLowerCase().includes(query) ||
//           h.city.toLowerCase().includes(query)
//       );
//     }

//     if (selectedSpecialization !== 'all') {
//       results = results.filter((h) => 
//         h.specializations.some(s => s.toLowerCase().includes(selectedSpecialization.toLowerCase()))
//       );
//     }

//     if (selectedFacility !== 'all') {
//       results = results.filter((h) => h.facilities.includes(selectedFacility));
//     }

//     results = results.filter((h) => h.rating >= minRating);

//     results = results.sort((a, b) => {
//       const distA = calculateDistance(userPosition.lat, userPosition.lng, a.lat, a.lng);
//       const distB = calculateDistance(userPosition.lat, userPosition.lng, b.lat, b.lng);
//       return distA - distB;
//     });

//     setFilteredHospitals(results);
//   }, [searchQuery, selectedSpecialization, selectedFacility, minRating, userPosition, hospitals]);

//   const calculateDistance = (lat1, lng1, lat2, lng2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLng = (lng2 - lng1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLng / 2) * Math.sin(dLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const uniqueSpecializations = Array.from(new Set(hospitals.flatMap((h) => h.specializations)));
//   const uniqueFacilities = Array.from(new Set(hospitals.flatMap((h) => h.facilities)));

//   const zoomToUserLocation = () => {
//     setFlyToTarget({ lat: userPosition.lat, lng: userPosition.lng, zoom: 14, ts: Date.now() });
//   };

//   return (
//     <div style={{ paddingTop: 'var(--navbar-height)' }} className="min-h-screen transition-all duration-500 bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 p-4 md:p-8 relative overflow-x-hidden">
//       <div className="max-w-7xl mx-auto">


//         <div className="mb-8">
//           <div className="relative z-0 h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl bg-white">
//             <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
//               <Button
//                 size="sm"
//                 className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all hover:scale-105"
//                 onClick={zoomToUserLocation}
//               >
//                 <MapPin className="h-4 w-4 mr-2" />
//                 My Location
//               </Button>
//             </div>
//             <OpenStreetMap
//               hospitals={filteredHospitals}
//               userPosition={userPosition}
//               flyToTarget={flyToTarget}
//             />
//           </div>
//         </div>

//         <Card className="mb-8 shadow-xl backdrop-blur-sm bg-white/95 border-0">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
//                 <Input
//                   type="text"
//                   placeholder="Search hospitals..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-11 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//                 />
//               </div>

//               <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
//                 <SelectTrigger className="h-11 bg-white border-gray-200">
//                   <SelectValue placeholder="Specialization" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Specializations</SelectItem>
//                   {uniqueSpecializations.map((spec) => (
//                     <SelectItem key={spec} value={spec}>
//                       {spec}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select value={selectedFacility} onValueChange={setSelectedFacility}>
//                 <SelectTrigger className="h-11 bg-white border-gray-200">
//                   <SelectValue placeholder="Facility" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Facilities</SelectItem>
//                   {uniqueFacilities.map((fac) => (
//                     <SelectItem key={fac} value={fac}>
//                       {fac}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-md">
//                 <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
//                 <Slider
//                   defaultValue={[0]}
//                   max={5}
//                   step={0.5}
//                   value={[minRating]}
//                   onValueChange={(value) => setMinRating(value[0])}
//                   className="flex-1"
//                 />
//                 <span className="text-sm font-medium text-gray-700 min-w-[3ch]">{minRating}+</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mb-6">
//           <p className="text-gray-800 text-lg font-medium">
//             {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''} found
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredHospitals.length === 0 ? (
//             <div className="col-span-full text-center py-16">
//               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
//                 <Search className="h-10 w-10 text-gray-700" />
//               </div>
//               <p className="text-gray-800 text-xl font-medium">No hospitals found</p>
//               <p className="text-gray-600 mt-2">Try adjusting your filters</p>
//             </div>
//           ) : (
//             filteredHospitals.map((hospital) => (
//               <Card key={hospital.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
//                 <div className="relative">
//                   <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
//                   <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold text-sm shadow-lg flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-current" />
//                     {hospital.rating}
//                   </div>
//                 </div>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-xl text-gray-900">{hospital.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-start gap-2 text-gray-600">
//                     <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
//                     <span className="text-sm">{hospital.location}</span>
//                   </div>

//                   <div className="flex items-center gap-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-1">
//                       <Phone className="h-4 w-4 text-green-600" />
//                       <span className="text-xs">{hospital.phone}</span>
//                     </div>
//                   </div>
                  
//                   <div className="pt-2 border-t border-gray-100">
//                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specializations</p>
//                     <div className="flex flex-wrap gap-1">
//                       {hospital.specializations.slice(0, 3).map((spec, idx) => (
//                         <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
//                           {spec}
//                         </span>
//                       ))}
//                       {hospital.specializations.length > 3 && (
//                         <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
//                           +{hospital.specializations.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="pt-2 border-t border-gray-100">
//                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Facilities</p>
//                     <div className="flex flex-wrap gap-1">
//                       {hospital.facilities.slice(0, 3).map((fac, idx) => (
//                         <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
//                           {fac}
//                         </span>
//                       ))}
//                       {hospital.facilities.length > 3 && (
//                         <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
//                           +{hospital.facilities.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                     <div className="flex items-center gap-2">
//                       <Bed className="h-5 w-5 text-gray-500" />
//                       <div>
//                         <p className="text-xs text-gray-500">Available Beds</p>
//                         <p className="text-lg font-bold text-gray-900">
//                           {hospital.availableBeds}
//                           <span className="text-sm text-gray-400 font-normal">/{hospital.totalBeds}</span>
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-gray-500">Distance</p>
//                       <p className="text-lg font-bold text-blue-600">
//                         {calculateDistance(userPosition.lat, userPosition.lng, hospital.lat, hospital.lng).toFixed(1)} km
//                       </p>
//                     </div>
//                   </div>

//                   <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all">
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalSearch;

// src/pages/HospitalSearch.tsx

// src/pages/HospitalSearch.tsx

// src/pages/HospitalSearch.tsx

// src/pages/HospitalSearch.tsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Star, Bed, Phone, ArrowUpDown } from "lucide-react";

// ────────────────────── MOCK DATA ──────────────────────
const mockHospitals = [
  { id: "1", name: "Fortis Escorts Hospital", location: "Malviya Nagar", city: "Jaipur", rating: 4.8, totalBeds: 525, availableBeds: 48, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", phone: "+91-141-2547000", lat: 26.8517, lng: 75.8104, specializations: "Cardiology,Neurology,Orthopedics,Emergency", facilities: "ICU,Emergency,Radiology" },
  { id: "2", name: "SMS Hospital", location: "Near Statue Circle", city: "Jaipur", rating: 4.2, totalBeds: 2100, availableBeds: 156, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800", phone: "+91-141-2560291", lat: 26.9173, lng: 75.7881, specializations: "General,Surgery,Pediatrics", facilities: "Trauma,Blood Bank" },
  { id: "3", name: "Eternal Heart Care Centre", location: "Jagatpura", city: "Jaipur", rating: 4.7, totalBeds: 200, availableBeds: 22, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800", phone: "+91-141-5155555", lat: 26.8413, lng: 75.8721, specializations: "Cardiology,Cardiac Surgery", facilities: "CCU,Cath Lab" },
  { id: "4", name: "Apex Hospital", location: "Mansarovar", city: "Jaipur", rating: 4.6, totalBeds: 150, availableBeds: 18, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", phone: "+91-141-5129000", lat: 26.8721, lng: 75.7644, specializations: "Orthopedics,Neurology,Oncology", facilities: "ICU,Dialysis" },
  { id: "5", name: "Narayana Multispeciality Hospital", location: "Pratap Nagar", city: "Jaipur", rating: 4.5, totalBeds: 350, availableBeds: 42, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800", phone: "+91-141-5153000", lat: 26.8764, lng: 75.7752, specializations: "Neurosurgery,Urology", facilities: "Cath Lab,MRI" },
  { id: "6", name: "CK Birla Hospital", location: "Tonk Road", city: "Jaipur", rating: 4.7, totalBeds: 200, availableBeds: 28, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800", phone: "+91-141-3060600", lat: 26.8764, lng: 75.8123, specializations: "Joint Replacement,Spine", facilities: "Modular OT" },
  { id: "7", name: "Manipal Hospital", location: "Vidhyadhar Nagar", city: "Jaipur", rating: 4.6, totalBeds: 300, availableBeds: 35, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", phone: "+91-141-3988888", lat: 26.9644, lng: 75.8239, specializations: "Gastroenterology,Nephrology", facilities: "Dialysis" },
  { id: "8", name: "Rukmani Birla Hospital", location: "Gopalpura Bypass", city: "Jaipur", rating: 4.5, totalBeds: 180, availableBeds: 24, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800", phone: "+91-141-2520000", lat: 26.8356, lng: 75.8144, specializations: "Oncology,Cancer Care", facilities: "Radiation" },
  { id: "9", name: "Paras JK Hospital", location: "Vidhyadhar Nagar", city: "Jaipur", rating: 4.4, totalBeds: 120, availableBeds: 16, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800", phone: "+91-141-3988888", lat: 26.9621, lng: 75.8267, specializations: "Pediatrics,Neonatology", facilities: "NICU" },
  { id: "10", name: "Mahatma Gandhi Hospital", location: "Sitapura", city: "Jaipur", rating: 4.3, totalBeds: 450, availableBeds: 52, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", phone: "+91-141-2771111", lat: 26.8156, lng: 75.8122, specializations: "ENT,Ophthalmology", facilities: "OPD" },
];

// ────────────────────── MAP COMPONENT ──────────────────────
const OpenStreetMap = ({ hospitals, userPosition }: { hospitals: any[]; userPosition: { lat: number; lng: number } }) => {
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
      attributionControl: true
    }).setView([26.9124, 75.7873], 12);
    
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
        className: 'custom-user-marker',
        html: '<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      L.marker([userPosition.lat, userPosition.lng], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("<strong>Your Location</strong>");
    }

    hospitals.forEach((h) => {
      if (h.lat && h.lng) {
        const hospitalIcon = L.divIcon({
          className: 'custom-hospital-marker',
          html: '<div style="background: #dc2626; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">🏥</div>',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
        
        L.marker([h.lat, h.lng], { icon: hospitalIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<div style="min-width: 200px;"><strong style="font-size: 14px;">${h.name}</strong><br><span style="color: #666; font-size: 12px;">${h.location}</span><br><span style="color: #059669; font-weight: 600; font-size: 12px;">⭐ ${h.rating} | 🛏️ ${h.availableBeds} beds</span></div>`);
      }
    });
  }, [L, hospitals, userPosition]);

  return <div ref={mapRef} className="w-full h-full" style={{ minHeight: '100%' }} />;
};

// ────────────────────── MAIN PAGE ──────────────────────
export default function HospitalSearch() {
  const navigate = useNavigate();

  const [filteredHospitals, setFilteredHospitals] = useState(mockHospitals);
  const [userPosition] = useState({ lat: 26.9124, lng: 75.7873 });
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
        h.specializations.toLowerCase().includes(selectedSpecialization.toLowerCase())
      );
    }

    if (sortBy === "rating") {
      results = results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "beds") {
      results = results.sort((a, b) => b.availableBeds - a.availableBeds);
    } else {
      results = results.sort((a, b) => {
        const distA = calculateDistance(userPosition.lat, userPosition.lng, a.lat, a.lng);
        const distB = calculateDistance(userPosition.lat, userPosition.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    setFilteredHospitals(results);
  }, [searchQuery, selectedSpecialization, sortBy]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
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
    new Set(mockHospitals.flatMap((h) => h.specializations.split(",")).map((s) => s.trim()))
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
          <p className="text-gray-600 text-lg">Discover top-rated hospitals in Jaipur</p>
        </div>

        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
          <OpenStreetMap hospitals={filteredHospitals} userPosition={userPosition} />
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
              
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
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
            {filteredHospitals.length} Hospital{filteredHospitals.length !== 1 && "s"} Found
          </h2>
          <div className="text-sm text-gray-600">
            Sorted by: <span className="font-semibold text-purple-600">
              {sortBy === "distance" ? "Distance" : sortBy === "rating" ? "Rating" : "Available Beds"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-medium">No hospitals found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white cursor-pointer"
                onClick={() => goToProfile(hospital)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                    {hospital.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">{hospital.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{hospital.location}, {hospital.city}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{hospital.phone}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.specializations.split(",").slice(0, 3).map((spec: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
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
                        {calculateDistance(userPosition.lat, userPosition.lng, hospital.lat, hospital.lng).toFixed(1)}
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