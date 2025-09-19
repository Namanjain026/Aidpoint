import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import HospitalCard from '@/components/ui/hospital-card';
import SearchBar from '@/components/ui/search-bar';
import { mockHospitals, Hospital } from '@/data/mockData';

const HospitalList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(mockHospitals);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    specialization: '',
    minRating: '',
    hasAvailableBeds: false,
    insurance: [] as string[],
  });

  const specializations = Array.from(
    new Set(mockHospitals.flatMap(h => h.specializations))
  ).sort();

  const insuranceOptions = Array.from(
    new Set(mockHospitals.flatMap(h => h.acceptedInsurance))
  ).sort();

  useEffect(() => {
    let filtered = mockHospitals;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        hospital.specializations.some(spec => 
          spec.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(hospital =>
        hospital.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        hospital.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Specialization filter
    if (filters.specialization) {
      filtered = filtered.filter(hospital =>
        hospital.specializations.includes(filters.specialization)
      );
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(hospital =>
        hospital.rating >= parseFloat(filters.minRating)
      );
    }

    // Available beds filter
    if (filters.hasAvailableBeds) {
      filtered = filtered.filter(hospital => hospital.availableBeds > 0);
    }

    // Insurance filter
    if (filters.insurance.length > 0) {
      filtered = filtered.filter(hospital =>
        filters.insurance.some(insurance =>
          hospital.acceptedInsurance.includes(insurance)
        )
      );
    }

    setFilteredHospitals(filtered);
  }, [filters]);

  const handleSearch = (query: string, location: string) => {
    setFilters(prev => ({ ...prev, search: query, location }));
    
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (location) params.set('location', location);
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleInsuranceChange = (insurance: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      insurance: checked
        ? [...prev.insurance, insurance]
        : prev.insurance.filter(i => i !== insurance)
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      specialization: '',
      minRating: '',
      hasAvailableBeds: false,
      insurance: [],
    });
    setSearchParams({});
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
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
            <SelectItem value="4.0">4.0+ Stars</SelectItem>
            <SelectItem value="3.5">3.5+ Stars</SelectItem>
            <SelectItem value="3.0">3.0+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="availableBeds"
          checked={filters.hasAvailableBeds}
          onCheckedChange={(checked) => handleFilterChange('hasAvailableBeds', checked)}
        />
        <Label htmlFor="availableBeds" className="text-sm font-medium">
          Has Available Beds
        </Label>
      </div>

      <div>
        <Label className="text-sm font-medium">Insurance Accepted</Label>
        <div className="mt-2 space-y-3">
          {insuranceOptions.map(insurance => (
            <div key={insurance} className="flex items-center space-x-2">
              <Checkbox
                id={insurance}
                checked={filters.insurance.includes(insurance)}
                onCheckedChange={(checked) => handleInsuranceChange(insurance, !!checked)}
              />
              <Label htmlFor={insurance} className="text-sm">
                {insurance}
              </Label>
            </div>
          ))}
        </div>
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Find Hospitals</h1>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search hospitals by name or specialization..."
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
                  <SheetTitle>Filter Hospitals</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Hospital Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredHospitals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHospitals.map(hospital => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No hospitals found matching your criteria
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

export default HospitalList;