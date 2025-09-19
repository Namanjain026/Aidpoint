import { Link } from 'react-router-dom';
import { MapPin, Star, Bed, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Hospital } from '@/data/mockData';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard = ({ hospital }: HospitalCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group animate-fade-in bg-gradient-card">
      <div className="relative overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {hospital.rating}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {hospital.name}
        </h3>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {hospital.location}, {hospital.city}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {hospital.specializations.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="outline" className="text-xs">
              {spec}
            </Badge>
          ))}
          {hospital.specializations.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{hospital.specializations.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Bed className="h-4 w-4 mr-1" />
            <span>{hospital.availableBeds} / {hospital.totalBeds} beds</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Phone className="h-4 w-4 mr-1" />
            <span className="text-xs">{hospital.phone}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {hospital.description}
        </p>
      </CardContent>

      <CardFooter className="pt-4">
        <Button asChild className="w-full" variant="outline">
          <Link to={`/hospitals/${hospital.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HospitalCard;