import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search hospitals...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="bg-card shadow-medium rounded-lg border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base border-0 bg-muted focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex-1 relative md:max-w-xs">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12 text-base border-0 bg-muted focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Button type="submit" size="lg" className="h-12 px-8 bg-gradient-hero hover:opacity-90 transition-opacity">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;