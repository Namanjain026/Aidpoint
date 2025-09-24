import { useState } from 'react';
import { Plus, Calendar, User, FileText, Clock, Star, MapPin, Phone, Search, ChevronDown, Filter, Edit3, Download, MoreHorizontal, X, ArrowRight, Upload } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
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
import { supabase } from '@/lib/supabaseClient';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPatientData, updatePatientData, PatientData } from '@/lib/userDataUtils';

const PatientDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [activeTab, setActiveTab] = useState('appointments');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.name?.split(' ')[0] || user?.name?.split(' ')[0] || '',
    lastName: user?.user_metadata?.name?.split(' ')[1] || user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    dateOfBirth: user?.user_metadata?.date_of_birth || '',
    gender: user?.user_metadata?.gender || '',
    address: user?.user_metadata?.address || '',
    city: user?.user_metadata?.city || '',
    state: user?.user_metadata?.state || '',
    zipCode: user?.user_metadata?.zip_code || '',
    bloodType: user?.user_metadata?.blood_type || '',
    emergencyContact: user?.user_metadata?.emergency_contact || '',
    allergies: user?.user_metadata?.allergies || 'No known allergies'
  });
  
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

  // Fixed theme classes (not affected by dark mode)
  const themeClasses = 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300';
  const cardClasses = 'backdrop-blur-xl bg-white/80 border border-blue-100 shadow-sm rounded-xl';
  const textClasses = 'text-gray-700';
  const headingClasses = 'text-gray-800';

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses} p-4`}>
        <div className={`w-full max-w-md p-8 ${cardClasses}`}>
          <h2 className={`text-2xl font-bold text-center mb-4 ${headingClasses}`}>Please Log In</h2>
          <p className={`text-center mb-6 ${textClasses}`}>
            You need to be logged in to access the patient dashboard.
          </p>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    );
  }

  if (user?.role !== 'authenticated') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses} p-4`}>
        <div className={`w-full max-w-md p-8 ${cardClasses}`}>
          <h2 className={`text-2xl font-bold text-center mb-4 ${headingClasses}`}>Access Restricted</h2>
          <p className={`text-center mb-6 ${textClasses}`}>
            This dashboard is only available for patients.
          </p>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    );
  }

  const filteredDoctors = selectedHospital 
    ? mockDoctors.filter(d => d.hospitalId === selectedHospital)
    : [];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
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
      setIsLoading(false);
      toast({
        title: "Appointment Requested",
        description: "Your appointment request has been submitted. You will receive a confirmation shortly.",
      });
    }, 1500);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
      
      // Update user metadata in Supabase
      const { error } = await supabase.auth.updateUser({
        email: profileData.email,
        data: {
          name: fullName,
          phone: profileData.phone,
          date_of_birth: profileData.dateOfBirth,
          gender: profileData.gender,
          address: profileData.address,
          city: profileData.city,
          state: profileData.state,
          zip_code: profileData.zipCode,
          blood_type: profileData.bloodType,
          emergency_contact: profileData.emergencyContact,
          allergies: profileData.allergies,
          updated_at: new Date().toISOString()
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Profile Updated Successfully",
        description: "Your profile information has been updated and saved.",
      });

    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Appointments',
      value: patientAppointments.length,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Medical Records',
      value: medicalHistory.length,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Prescriptions',
      value: 2,
      icon: User,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses} relative overflow-x-hidden`}>
      {/* Medical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Medical cross pattern */}
        <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.05] overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMax slice" className="text-blue-600">
            {/* Large medical crosses */}
            <g fill="currentColor">
              <rect x="900" y="100" width="60" height="200" />
              <rect x="840" y="160" width="180" height="60" />
              <rect x="600" y="300" width="40" height="150" />
              <rect x="560" y="340" width="120" height="40" />
              <rect x="300" y="450" width="50" height="180" />
              <rect x="250" y="510" width="150" height="50" />
            </g>
            {/* Medical symbols */}
            <g fill="currentColor" opacity="0.3">
              <circle cx="700" cy="200" r="30" />
              <circle cx="700" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M690,200 L710,200 M700,190 L700,210" stroke="currentColor" strokeWidth="3" />
              <circle cx="400" cy="600" r="25" />
              <circle cx="400" cy="600" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M392,600 L408,600 M400,592 L400,608" stroke="currentColor" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Animated floating medical elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 relative z-10">
        {/* Header */}
        <div className={`mb-6 p-6 ${cardClasses}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold text-gray-900 mb-2`}>
                Welcome back, {user?.user_metadata?.name || user?.name || 'User'}!
              </h1>
              <p className={`${textClasses}`}>
                Manage your health and appointments with ease and confidence.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-blue-500 text-white font-bold">
                  {(user?.user_metadata?.name || user?.name || 'U').charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className={`font-semibold ${headingClasses}`}>{user?.user_metadata?.name || user?.name || 'User'}</p>
                <p className={`text-sm ${textClasses}`}>Patient Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <AnimatedSection animation="fade-in-up" delay={0}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={stat.title} className={`${cardClasses} p-5 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${textClasses} mb-1`}>{stat.title}</p>
                  <p className={`text-2xl font-bold ${headingClasses}`}>{stat.value}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection animation="scale-in" delay={0.1}>
          <div className={`${cardClasses} p-5 mb-6`}>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button 
              className="flex flex-col h-auto py-4 px-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0" 
              onClick={() => setIsBookAppointmentOpen(true)}
            >
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-xs">Book Appointment</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 px-2 bg-white hover:bg-blue-50 text-gray-700 border border-blue-200 hover:border-blue-300">
              <FileText className="h-5 w-5 mb-1" />
              <span className="text-xs">View Records</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 px-2 bg-white hover:bg-blue-50 text-gray-700 border border-blue-200 hover:border-blue-300">
              <Download className="h-5 w-5 mb-1" />
              <span className="text-xs">Download Reports</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 px-2 bg-white hover:bg-blue-50 text-gray-700 border border-blue-200 hover:border-blue-300">
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">My Profile</span>
            </Button>
          </div>
        </div>
        </AnimatedSection>

        {/* Upcoming Appointments Preview */}
        {upcomingAppointments.length > 0 && (
          <div className={`${cardClasses} p-5 mb-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Upcoming Appointments</h3>
              <Button 
                className="bg-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-700 border-0 px-3 py-1" 
                size="sm" 
                onClick={() => setActiveTab('appointments')}
              >
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 2).map(appointment => {
                const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                return (
                  <div key={appointment.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={doctor?.image} alt={appointment.doctorName} />
                      <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-500 truncate">{appointment.hospitalName}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Management Tabs */}
        <AnimatedSection animation="bounce-in" delay={0.2}>
          <div className={`${cardClasses} p-5`}>
          <Tabs defaultValue="appointments" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-blue-100">
              <TabsTrigger value="appointments" className="text-xs sm:text-sm text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-700">
                <span className="hidden sm:inline">Appointments</span>
                <span className="sm:hidden">Appts</span>
              </TabsTrigger>
              <TabsTrigger value="doctors" className="text-xs sm:text-sm text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-700">
                <span className="hidden sm:inline">Find Doctors</span>
                <span className="sm:hidden">Doctors</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-700">
                <span className="hidden sm:inline">Medical History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-700">
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">Profile</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Appointments Management */}
            <TabsContent value="appointments" className="mt-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${headingClasses}`}>My Appointments</h3>
                  <p className={`text-sm ${textClasses} opacity-80 mt-1`}>View and manage your upcoming and past appointments</p>
                </div>
                <Dialog open={isBookAppointmentOpen} onOpenChange={setIsBookAppointmentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Book Appointment</span>
                      <span className="sm:hidden">Book Now</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Book New Appointment</DialogTitle>
                    </DialogHeader>
                    {isLoading ? (
                      <div className="space-y-4 py-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
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
                          <Button 
                            type="button" 
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400" 
                            onClick={() => setIsBookAppointmentOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                          >
                            Book Appointment
                          </Button>
                        </DialogFooter>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              {patientAppointments.length === 0 ? (
                <div className={`text-center py-12 px-4 ${cardClasses}`}>
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 backdrop-blur-sm">
                    <Calendar className="h-12 w-12 text-blue-600 mx-auto" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${headingClasses}`}>No appointments yet</h3>
                  <p className={`${textClasses} mb-6 max-w-md mx-auto`}>
                    Start your healthcare journey by booking your first appointment with our trusted medical professionals
                  </p>
                  <Button 
                    onClick={() => setIsBookAppointmentOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Your First Appointment
                  </Button>
                </div>
              ) : (
                <div>
                  {/* Mobile Card View (hidden on lg screens) */}
                  <div className="lg:hidden space-y-4">
                    {patientAppointments.map(appointment => {
                      const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                      return (
                        <div key={appointment.id} className={`${cardClasses} p-4 hover:shadow-xl transition-all duration-300`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={doctor?.image} alt={appointment.doctorName} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                  {appointment.doctorName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className={`font-semibold ${headingClasses}`}>{appointment.doctorName}</h4>
                                <p className={`text-sm ${textClasses} opacity-80`}>{appointment.hospitalName}</p>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                appointment.status === 'upcoming' ? 'default' : 
                                appointment.status === 'completed' ? 'secondary' : 'outline'
                              }
                              className={
                                appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide`}>Date</p>
                              <p className={`font-medium ${headingClasses}`}>{new Date(appointment.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide`}>Time</p>
                              <p className={`font-medium ${headingClasses}`}>{appointment.time}</p>
                            </div>
                          </div>
                          
                          {appointment.reason && (
                            <div className="mb-3">
                              <p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide`}>Reason</p>
                              <p className={`text-sm ${textClasses}`}>{appointment.reason}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-end pt-2 border-t border-gray-200">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="h-8 w-8 p-0 bg-transparent hover:bg-blue-50 text-gray-600 hover:text-blue-700 border-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                {appointment.status === 'upcoming' && (
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Table View (hidden on smaller screens) */}
                  <div className="hidden lg:block border rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm">
                    <div className="relative w-full overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50/50">
                            <TableHead className="font-semibold">Doctor</TableHead>
                            <TableHead className="font-semibold">Hospital</TableHead>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="font-semibold">Time</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {patientAppointments.map(appointment => {
                            const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                            return (
                              <TableRow key={appointment.id} className="hover:bg-white/70 transition-colors">
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={doctor?.image} alt={appointment.doctorName} />
                                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                        {appointment.doctorName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className={headingClasses}>{appointment.doctorName}</span>
                                  </div>
                                </TableCell>
                                <TableCell className={textClasses}>{appointment.hospitalName}</TableCell>
                                <TableCell className={headingClasses}>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                                <TableCell className={headingClasses}>{appointment.time}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={
                                      appointment.status === 'upcoming' ? 'default' : 
                                      appointment.status === 'completed' ? 'secondary' : 'outline'
                                    }
                                    className={
                                      appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''
                                    }
                                  >
                                    {appointment.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button className="h-8 w-8 p-0 bg-transparent hover:bg-blue-50 text-gray-600 hover:text-blue-700 border-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Reschedule
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      {appointment.status === 'upcoming' && (
                                        <DropdownMenuItem className="text-red-600">
                                          <X className="h-4 w-4 mr-2" />
                                          Cancel
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Find Doctors Tab */}
            <TabsContent value="doctors" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div>
                  <h3 className={`text-xl font-semibold ${headingClasses}`}>Find Doctors</h3>
                  <p className={`text-sm ${textClasses} opacity-80 mt-1`}>Search and connect with healthcare professionals</p>
                </div>
              </div>
              
              <div className={`text-center py-12 px-4 ${cardClasses}`}>
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 backdrop-blur-sm">
                  <Search className="h-12 w-12 text-blue-600 mx-auto" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${headingClasses}`}>Doctor Search Coming Soon</h3>
                <p className={`${textClasses} mb-6 max-w-md mx-auto`}>
                  Advanced doctor search and booking functionality will be available here
                </p>
              </div>
            </TabsContent>

            {/* Medical History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div>
                  <h3 className={`text-xl font-semibold ${headingClasses}`}>Medical History</h3>
                  <p className={`text-sm ${textClasses} opacity-80 mt-1`}>View your complete medical records and history</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download Records</span>
                  <span className="sm:hidden">Download</span>
                </Button>
              </div>

              {medicalHistory.length === 0 ? (
                <div className={`text-center py-12 px-4 ${cardClasses}`}>
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 backdrop-blur-sm">
                    <FileText className="h-12 w-12 text-blue-600 mx-auto" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${headingClasses}`}>No medical history yet</h3>
                  <p className={`${textClasses} mb-6 max-w-md mx-auto`}>
                    Your medical records and history will appear here after your first appointment
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {medicalHistory.map((record) => (
                    <div key={record.id} className={`${cardClasses} p-6 hover:shadow-xl transition-all duration-300`}>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div>
                          <h4 className={`font-semibold text-lg ${headingClasses}`}>{record.diagnosis}</h4>
                          <p className={`${textClasses} opacity-80`}>{record.doctor} • {record.hospital}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${headingClasses}`}>{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide mb-1`}>Prescription</p>
                          <p className={`${textClasses}`}>{record.prescription}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide mb-1`}>Notes</p>
                          <p className={`${textClasses}`}>{record.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div>
                  <h3 className={`text-xl font-semibold ${headingClasses}`}>Profile Settings</h3>
                  <p className={`text-sm ${textClasses} opacity-80 mt-1`}>Manage your account information and preferences</p>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 bg-white text-gray-900 p-6 rounded-lg shadow-md">
                <div className={`${cardClasses} p-6`}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={profileData.firstName + ' ' + profileData.lastName}
                    onChange={(e) => {
                      const [firstName, ...lastName] = e.target.value.split(' ');
                      setProfileData(prev => ({
                        ...prev,
                        firstName,
                        lastName: lastName.join(' ')
                      }));
                    }}
                    className="mt-1 bg-white text-gray-900 border border-gray-300"
                    required
                  />
                </div>

                <div className={`${cardClasses} p-6`}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileInputChange('email', e.target.value)}
                    className="mt-1 bg-white text-gray-900 border border-gray-300"
                    required
                  />
                </div>

                <div className={`${cardClasses} p-6`}>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                    className="mt-1 bg-white text-gray-900 border border-gray-300"
                    required
                  />
                </div>

                <div className="lg:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PatientDashboard;

