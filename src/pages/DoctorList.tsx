import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import DoctorCard from '@/components/ui/doctor-card';
import SearchBar from '@/components/ui/search-bar';
import { mockDoctors, Doctor } from '@/data/mockData';

const DoctorList = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    specialization: '',
    minRating: '',
    maxFee: '',
    availability: '',
  });

  const specializations = Array.from(
    new Set(mockDoctors.map(d => d.specialization))
  ).sort();

  useEffect(() => {
    let filtered = mockDoctors;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(filters.search.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(doctor =>
        doctor.hospital.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Specialization filter
    if (filters.specialization) {
      filtered = filtered.filter(doctor =>
        doctor.specialization === filters.specialization
      );
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(doctor =>
        doctor.rating >= parseFloat(filters.minRating)
      );
    }

    // Fee filter
    if (filters.maxFee) {
      filtered = filtered.filter(doctor =>
        doctor.consultationFee <= parseFloat(filters.maxFee)
      );
    }

    // Availability filter
    if (filters.availability) {
      filtered = filtered.filter(doctor =>
        doctor.availability.includes(filters.availability)
      );
    }

    setFilteredDoctors(filtered);
  }, [filters]);

  const handleSearch = (query: string, location: string) => {
    setFilters(prev => ({ ...prev, search: query, location }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      specialization: '',
      minRating: '',
      maxFee: '',
      availability: '',
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="specialization" className="text-sm font-medium">
          Specialization
        </Label>
        <Select value={filters.specialization} onValueChange={(value) => handleFilterChange('specialization', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Specializations</SelectItem>
            {specializations.map(spec => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="rating" className="text-sm font-medium">
          Minimum Rating
        </Label>
        <Select value={filters.minRating} onValueChange={(value) => handleFilterChange('minRating', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select minimum rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Rating</SelectItem>
            <SelectItem value="4.8">4.8+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
            <SelectItem value="4.0">4.0+ Stars</SelectItem>
            <SelectItem value="3.5">3.5+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="maxFee" className="text-sm font-medium">
          Maximum Fee
        </Label>
        <Select value={filters.maxFee} onValueChange={(value) => handleFilterChange('maxFee', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select max fee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Fee</SelectItem>
            <SelectItem value="150">Up to $150</SelectItem>
            <SelectItem value="200">Up to $200</SelectItem>
            <SelectItem value="250">Up to $250</SelectItem>
            <SelectItem value="300">Up to $300</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="availability" className="text-sm font-medium">
          Available Day
        </Label>
        <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Day</SelectItem>
            <SelectItem value="Monday">Monday</SelectItem>
            <SelectItem value="Tuesday">Tuesday</SelectItem>
            <SelectItem value="Wednesday">Wednesday</SelectItem>
            <SelectItem value="Thursday">Thursday</SelectItem>
            <SelectItem value="Friday">Friday</SelectItem>
            <SelectItem value="Saturday">Saturday</SelectItem>
            <SelectItem value="Sunday">Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Find Doctors</h1>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search doctors by name, specialization, or hospital..."
          />
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <div className="bg-card rounded-lg border p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 mr-2" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Doctors</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Doctor Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No doctors found matching your criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;