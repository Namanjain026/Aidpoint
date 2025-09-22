import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Search, Star } from 'lucide-react';
import { mockHospitals, Hospital } from '@/data/mockData';

// Extend Hospital interface for facilities (not in mockdata but added for filtering)
interface ExtendedHospital extends Hospital {
  facilities: string[];
  lat: number;
  lng: number;
}

const HospitalSearch = () => {
  const [hospitals, setHospitals] = useState<ExtendedHospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<ExtendedHospital[]>([]);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedFacility, setSelectedFacility] = useState<string>('all');

  // Mock user position (fallback if geolocation fails)
  const mockUserPosition = { lat: 40.7128, lng: -74.0060 }; // New York

  // Load dummy data with added lat/lng and facilities
  useEffect(() => {
    const extendedHospitals: ExtendedHospital[] = mockHospitals.map((h, index) => ({
      ...h,
      lat: 40.7128 + index * 0.05, // Mock coordinates for sorting
      lng: -74.0060 + index * 0.05,
      facilities: ['ICU', 'Emergency', 'Radiology', 'Lab'].slice(0, index + 2), // Mock facilities
    }));
    setHospitals(extendedHospitals);
    setFilteredHospitals(extendedHospitals);
  }, []);

  // Mock geolocation
  useEffect(() => {
    // Attempt real geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          console.warn('Geolocation unavailable, using mock position');
          setUserPosition(mockUserPosition);
        }
      );
    } else {
      console.warn('Geolocation not supported, using mock position');
      setUserPosition(mockUserPosition);
    }
  }, []);

  // Filter and sort hospitals
  useEffect(() => {
    let results = hospitals;

    // Search by name, location, or city
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(queryLower) ||
          h.location.toLowerCase().includes(queryLower) ||
          h.city.toLowerCase().includes(queryLower)
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== 'all') {
      results = results.filter((h) => h.specializations.includes(selectedSpecialization));
    }

    // Filter by facility
    if (selectedFacility !== 'all') {
      results = results.filter((h) => h.facilities.includes(selectedFacility));
    }

    // Filter by rating
    results = results.filter((h) => h.rating >= minRating);

    // Sort by distance if user position available
    if (userPosition) {
      results = results.sort((a, b) => {
        const distA = calculateDistance(userPosition.lat, userPosition.lng, a.lat, a.lng);
        const distB = calculateDistance(userPosition.lat, userPosition.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    setFilteredHospitals(results);
  }, [searchQuery, selectedSpecialization, selectedFacility, minRating, userPosition, hospitals]);

  // Haversine distance formula (in km)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get unique specializations and facilities for filters
  const uniqueSpecializations = Array.from(new Set(hospitals.flatMap((h) => h.specializations)));
  const uniqueFacilities = Array.from(new Set(hospitals.flatMap((h) => h.facilities || [])));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Hospitals</h1>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, location, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <SelectTrigger>
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              {uniqueSpecializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFacility} onValueChange={setSelectedFacility}>
            <SelectTrigger>
              <SelectValue placeholder="Facility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Facilities</SelectItem>
              {uniqueFacilities.map((fac) => (
                <SelectItem key={fac} value={fac}>
                  {fac}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <Slider
              defaultValue={[0]}
              max={5}
              step={0.5}
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
            />
            <span>{minRating}+</span>
          </div>
        </div>

        {/* Hospital List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.length === 0 ? (
            <p className="col-span-3 text-center text-gray-600">No hospitals found.</p>
          ) : (
            filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden">
                <img src={hospital.image} alt={hospital.name} className="w-full h-40 object-cover" />
                <CardHeader>
                  <CardTitle>{hospital.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> {hospital.location}, {hospital.city}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">Rating: {hospital.rating} ⭐</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Specializations: {hospital.specializations.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Facilities: {hospital.facilities.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Available Beds: {hospital.availableBeds} / {hospital.totalBeds}
                  </p>
                  {userPosition && (
                    <p className="text-sm text-gray-600">
                      Distance: {calculateDistance(userPosition.lat, userPosition.lng, hospital.lat, hospital.lng).toFixed(2)} km
                    </p>
                  )}
                  <Button variant="outline" className="mt-4 w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalSearch;