import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Doctor } from '@/data/mockData';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group animate-fade-in bg-gradient-card">
      <CardHeader className="text-center pb-2">
        <div className="relative mx-auto">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-primary/10 group-hover:border-primary/20 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {doctor.name}
          </h3>
          <Badge variant="secondary" className="text-sm">
            {doctor.specialization}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{doctor.rating}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{doctor.experience}y exp</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{doctor.hospital}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Languages className="h-4 w-4 mr-1" />
            <span>{doctor.languages.join(', ')}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            ${doctor.consultationFee}
          </div>
          <div className="text-xs text-muted-foreground">Consultation Fee</div>
        </div>

        <div className="text-sm text-muted-foreground">
          <strong>Available:</strong> {doctor.availability.join(', ')}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {doctor.description}
        </p>
      </CardContent>

      <CardFooter className="pt-4 space-x-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/doctors/${doctor.id}`}>
            View Profile
          </Link>
        </Button>
        <Button asChild className="flex-1">
          <Link to={`/doctors/${doctor.id}?book=true`}>
            Book Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;