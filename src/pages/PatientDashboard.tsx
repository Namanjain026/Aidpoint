import { useState } from 'react';
import { Plus, Calendar, User, FileText, Clock, Star, MapPin, Phone, Search, ChevronDown, Filter, Edit3, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { mockHospitals, mockDoctors, mockAppointments } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const PatientDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [activeTab, setActiveTab] = useState('appointments');
  
  // Mock patient data (in real app, this would be fetched from API)
  const patientAppointments = mockAppointments.filter(a => a.patientId === user?.id);
  const upcomingAppointments = patientAppointments.filter(a => a.status === 'upcoming');
  const completedAppointments = patientAppointments.filter(a => a.status === 'completed');
  
  const [newAppointment, setNewAppointment] = useState({
    hospitalId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    notes: '',
  });

  const [medicalHistory] = useState([
    {
      id: 1,
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'City General Hospital',
      diagnosis: 'Annual Health Checkup',
      prescription: 'Vitamin D supplements, Regular exercise',
      notes: 'Patient in good health, recommended lifestyle changes'
    },
    {
      id: 2,
      date: '2024-02-20',
      doctor: 'Dr. Michael Chen',
      hospital: 'Metro Medical Center',
      diagnosis: 'Mild Hypertension',
      prescription: 'Lisinopril 10mg daily, Low sodium diet',
      notes: 'Blood pressure slightly elevated, monitoring required'
    }
  ]);

  // Debug logging - remove this in production
  console.log('Auth Debug:', { isAuthenticated, user, userRole: user?.role });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Please Log In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access the patient dashboard.
            </p>
            <Button asChild className="w-full">
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              This dashboard is only available for patients. Current role: {user?.role || 'undefined'}
            </p>
            <Button asChild className="w-full">
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredDoctors = selectedHospital 
    ? mockDoctors.filter(d => d.hospitalId === selectedHospital)
    : [];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookAppointmentOpen(false);
    setNewAppointment({
      hospitalId: '',
      doctorId: '',
      date: '',
      time: '',
      reason: '',
      notes: '',
    });
    setSelectedHospital('');
    setSelectedDoctor('');
    toast({
      title: "Appointment Requested",
      description: "Your appointment request has been submitted. You will receive a confirmation shortly.",
    });
  };

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Total Appointments',
      value: patientAppointments.length,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'Medical Records',
      value: medicalHistory.length,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Active Prescriptions',
      value: 2,
      icon: User,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r 
  from-gray-900 to-gray-600 
  dark:from-gray-100 dark:to-gray-400 
  bg-clip-text text-transparent">
              Welcome back, {user?.user_metadata?.name || user?.name || 'User'}!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage your health and appointments here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 md:h-12 md:w-12">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {(user?.user_metadata?.name || user?.name || 'U').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.user_metadata?.name || user?.name || 'User'}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-3 ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="appointments" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 sm:w-auto">
              <TabsTrigger value="appointments" className="text-xs sm:text-sm">Appointments</TabsTrigger>
              <TabsTrigger value="doctors" className="text-xs sm:text-sm">Find Doctors</TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm">Medical History</TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
            </TabsList>
            
            {activeTab === 'appointments' && (
              <Dialog open={isBookAppointmentOpen} onOpenChange={setIsBookAppointmentOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Book New Appointment</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBookAppointment} className="space-y-4">
                    <div>
                      <Label htmlFor="hospital">Select Hospital</Label>
                      <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Choose a hospital..." />
                        </SelectTrigger>
                        <SelectContent>
                          {mockHospitals.map(hospital => (
                            <SelectItem key={hospital.id} value={hospital.id}>
                              {hospital.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="doctor">Select Doctor</Label>
                      <Select 
                        value={selectedDoctor} 
                        onValueChange={setSelectedDoctor}
                        disabled={!selectedHospital}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Choose a doctor..." />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredDoctors.map(doctor => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialization} (${doctor.consultationFee})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="appointmentDate">Preferred Date</Label>
                        <Input
                          id="appointmentDate"
                          type="date"
                          required
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="appointmentTime">Preferred Time</Label>
                        <Select
                          value={newAppointment.time}
                          onValueChange={(value) => setNewAppointment(prev => ({ ...prev, time: value }))}
                        >
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select time..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input
                        id="reason"
                        required
                        value={newAppointment.reason}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, reason: e.target.value }))}
                        placeholder="Brief description of your concern"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any additional information for the doctor"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsBookAppointmentOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Book Appointment</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Appointments Management */}
          <TabsContent value="appointments" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>View and manage your upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {patientAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
                    <p className="text-muted-foreground mb-4">Book your first appointment to get started</p>
                    <Button onClick={() => setIsBookAppointmentOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Doctor</TableHead>
                            <TableHead className="hidden sm:table-cell">Hospital</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="hidden md:table-cell">Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Fee</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {patientAppointments.map(appointment => {
                            const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                            return (
                            <TableRow key={appointment.id} className="cursor-pointer hover:bg-muted/50">
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8 hidden sm:inline-flex">
                                    <AvatarImage src={doctor?.image} alt={appointment.doctorName} />
                                    <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{appointment.doctorName}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">{appointment.hospitalName}</TableCell>
                              <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                              <TableCell className="hidden md:table-cell">{appointment.time}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    appointment.status === 'upcoming' ? 'default' : 
                                    appointment.status === 'completed' ? 'secondary' : 'outline'
                                  }
                                  className={
                                    appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300' : ''
                                  }
                                >
                                  {appointment.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">${appointment.fees}</TableCell>
                            </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Find Doctors */}
          <TabsContent value="doctors" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Find Doctors</CardTitle>
                <CardDescription>Browse and book appointments with healthcare professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by doctor name, specialization, or hospital..."
                      className="pl-9"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="shrink-0">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>All Specialties</DropdownMenuItem>
                      <DropdownMenuItem>Cardiology</DropdownMenuItem>
                      <DropdownMenuItem>Dermatology</DropdownMenuItem>
                      <DropdownMenuItem>Neurology</DropdownMenuItem>
                      <DropdownMenuItem>Pediatrics</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {mockDoctors.slice(0, 6).map(doctor => {
                    const hospital = mockHospitals.find(h => h.id === doctor.hospitalId);
                    return (
                      <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col">
                            <div className="p-6 pb-4 flex items-start gap-4">
                              <Avatar className="h-16 w-16 border">
                                <AvatarImage src={doctor.image} alt={doctor.name} />
                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg">{doctor.name}</h4>
                                <p className="text-muted-foreground">{doctor.specialization}</p>
                                <div className="flex items-center mt-2">
                                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{doctor.rating}</span>
                                  {/* <span className="text-sm text-muted-foreground ml-2">({doctor.reviews} reviews)</span> */}
                                </div>
                              </div>
                            </div>
                            
                            <div className="px-6 pb-4 space-y-2">
                              <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-muted-foreground">{hospital?.name}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-muted-foreground">{doctor.experience} years experience</span>
                              </div>
                            </div>
                            
                            <div className="px-6 py-4 bg-muted/30 flex items-center justify-between">
                              <div>
                                <span className="text-lg font-semibold text-primary">${doctor.consultationFee}</span>
                                <span className="text-sm text-muted-foreground block">Consultation fee</span>
                              </div>
                              <Button size="sm" onClick={() => {
                                setActiveTab('appointments');
                                setIsBookAppointmentOpen(true);
                                setSelectedDoctor(doctor.id);
                                setSelectedHospital(doctor.hospitalId);
                              }}>
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button variant="outline">Load More Doctors</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical History */}
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Your past medical records and visit history</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Records
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {medicalHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No medical records yet</h3>
                    <p className="text-muted-foreground">Your medical history will appear here after appointments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {medicalHistory.map(record => (
                      <Card key={record.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{record.diagnosis}</h4>
                              <p className="text-muted-foreground">{record.doctor} • {record.hospital}</p>
                            </div>
                            <Badge variant="outline" className="w-fit">
                              {new Date(record.date).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="flex items-center mb-2">
                                <Label className="text-sm font-medium">Prescription</Label>
                              </div>
                              <p className="text-sm bg-muted/30 p-3 rounded-md">{record.prescription}</p>
                            </div>
                            <div>
                              <div className="flex items-center mb-2">
                                <Label className="text-sm font-medium">Doctor's Notes</Label>
                              </div>
                              <p className="text-sm bg-muted/30 p-3 rounded-md">{record.notes}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Management */}
          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">Patient since {new Date().getFullYear() - 1}</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={user?.name || ''}
                      className="mt-1"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      className="mt-1"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex mt-1">
                      <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="phone"
                        value="+1 (555) 123-4567"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value="1990-05-15"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select defaultValue="O+">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value="123 Main Street, Anytown, State 12345"
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                    <Input placeholder="Contact Name" defaultValue="Jane Smith" />
                    <Input placeholder="Contact Phone" defaultValue="+1 (555) 987-6543" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies or medications to avoid..."
                    className="mt-1"
                    rows={2}
                    defaultValue="Penicillin, Peanuts"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button>
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;