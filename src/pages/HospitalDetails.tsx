import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe, Bed, DollarSign, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DoctorCard from '@/components/ui/doctor-card';
import { mockHospitals, mockDoctors } from '@/data/mockData';

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const hospital = mockHospitals.find(h => h.id === id);
  const hospitalDoctors = mockDoctors.filter(d => d.hospitalId === id);

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Hospital Not Found</h2>
          <Button asChild>
            <Link to="/hospitals">Back to Hospitals</Link>
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
            <Link to="/hospitals">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hospitals
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hospital Header */}
        <div className="bg-card rounded-lg border p-8 mb-8 animate-fade-in">
          <div className="lg:flex lg:items-start lg:space-x-8">
            <div className="lg:flex-shrink-0">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full lg:w-64 h-48 lg:h-48 object-cover rounded-lg shadow-medium"
              />
            </div>
            
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {hospital.name}
                  </h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    {hospital.location}, {hospital.city}
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                  <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-yellow-700">{hospital.rating}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {hospital.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {hospital.specializations.map(spec => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">{hospital.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">{hospital.email}</span>
                </div>
                {hospital.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <a href={hospital.website} className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6 text-center">
              <Bed className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{hospital.availableBeds}</div>
              <div className="text-sm text-muted-foreground">Available Beds</div>
              <div className="text-xs text-muted-foreground mt-1">
                out of {hospital.totalBeds} total
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">${hospital.pricing.consultation}</div>
              <div className="text-sm text-muted-foreground">Consultation</div>
              <div className="text-xs text-muted-foreground mt-1">
                Starting from
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency</div>
              <div className="text-xs text-muted-foreground mt-1">
                Always available
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{hospital.acceptedInsurance.length}</div>
              <div className="text-sm text-muted-foreground">Insurance</div>
              <div className="text-xs text-muted-foreground mt-1">
                Plans accepted
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="doctors" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalDoctors.length > 0 ? (
                hospitalDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No doctors found for this hospital.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium">General Consultation</span>
                    <span className="text-lg font-bold text-primary">${hospital.pricing.consultation}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium">Emergency Visit</span>
                    <span className="text-lg font-bold text-primary">${hospital.pricing.emergency}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium">Surgery (Starting from)</span>
                    <span className="text-lg font-bold text-primary">${hospital.pricing.surgery}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  * Prices may vary based on specific treatments and insurance coverage.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Accepted Insurance Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.acceptedInsurance.map(insurance => (
                    <div key={insurance} className="flex items-center p-4 bg-muted rounded-lg">
                      <Shield className="h-5 w-5 text-success mr-3" />
                      <span className="font-medium">{insurance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {hospital.reviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.patientName}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HospitalDetails;