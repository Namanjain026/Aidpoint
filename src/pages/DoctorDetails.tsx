import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Languages, GraduationCap, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { mockDoctors } from '@/data/mockData';

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    reason: '',
    patientName: user?.name || '',
    phone: '',
    email: user?.email || '',
  });

  const doctor = mockDoctors.find(d => d.id === id);
  const shouldOpenBooking = searchParams.get('book') === 'true';

  useEffect(() => {
    if (shouldOpenBooking && isAuthenticated) {
      setIsBookingOpen(true);
    }
  }, [shouldOpenBooking, isAuthenticated]);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    // Mock booking submission
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctor?.name} has been scheduled for ${bookingForm.date} at ${bookingForm.time}.`,
    });
    
    setIsBookingOpen(false);
    setBookingForm({
      date: '',
      time: '',
      reason: '',
      patientName: user?.name || '',
      phone: '',
      email: user?.email || '',
    });
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
          <Button asChild>
            <Link to="/doctors">Back to Doctors</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Back Button */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild>
            <Link to="/doctors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Profile */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-8">
            <div className="md:flex md:items-start md:space-x-8">
              <div className="md:flex-shrink-0">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0 border-4 border-primary/10 shadow-medium"
                />
              </div>
              
              <div className="mt-6 md:mt-0 md:flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {doctor.name}
                    </h1>
                    <Badge variant="secondary" className="text-sm mb-4">
                      {doctor.specialization}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center bg-yellow-50 px-3 py-1 rounded-lg">
                    <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-yellow-700">{doctor.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-sm">{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-sm">{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Languages className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-sm">{doctor.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-sm">{doctor.education}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {doctor.description}
                </p>

                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-primary mb-2">
                    ${doctor.consultationFee}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Consultation Fee
                  </div>
                  
                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full md:w-auto">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              required
                              value={bookingForm.date}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="time">Time</Label>
                            <Select value={bookingForm.time} onValueChange={(value) => setBookingForm(prev => ({ ...prev, time: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map(time => (
                                  <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="patientName">Patient Name</Label>
                          <Input
                            id="patientName"
                            required
                            value={bookingForm.patientName}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, patientName: e.target.value }))}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="reason">Reason for Visit</Label>
                          <Textarea
                            id="reason"
                            placeholder="Brief description of your concern..."
                            value={bookingForm.reason}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, reason: e.target.value }))}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            Confirm Booking
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {doctor.availability.map(day => (
                <Badge key={day} variant="outline" className="px-3 py-1">
                  {day}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Doctor is available on the above days. Please book an appointment to confirm availability for specific times.
            </p>
          </CardContent>
        </Card>

        {/* Need to Login CTA */}
        {!isAuthenticated && shouldOpenBooking && (
          <Card className="mb-8 animate-fade-in border-primary bg-primary/5">
            <CardContent className="p-6 text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Login Required</h3>
              <p className="text-muted-foreground mb-4">
                Please log in to book an appointment with {doctor.name}.
              </p>
              <div className="space-x-2">
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;