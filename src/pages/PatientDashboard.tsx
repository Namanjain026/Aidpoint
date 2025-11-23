'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Calendar, User, FileText, Clock, Star, MapPin, Phone,
  Search, ChevronDown, Filter, Edit3, Download, MoreHorizontal,
  X, ArrowRight, Upload
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Avatar, AvatarFallback, AvatarImage
} from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabaseClient';
import { Skeleton } from '@/components/ui/skeleton';
import { format, addMinutes, parse } from 'date-fns';

/* --------------------------------------------------------------
   1. GLOBAL CSS HELPERS (these were missing in the previous file)
   -------------------------------------------------------------- */
const themeClasses   = 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300';
const cardClasses    = 'backdrop-blur-xl bg-white/80 border border-blue-100 shadow-sm rounded-xl';
const textClasses    = 'text-gray-700';
const headingClasses = 'text-gray-800';

/* --------------------------------------------------------------
   2. PATIENT DASHBOARD
   -------------------------------------------------------------- */
const PatientDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  /* ----- real appointments ----- */
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  /* ----- profile ----- */
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.name?.split(' ')[0] || '',
    lastName:  user?.user_metadata?.name?.split(' ')[1] || '',
    email:     user?.email || '',
    phone:     user?.user_metadata?.phone || '',
    dateOfBirth: user?.user_metadata?.date_of_birth || '',
    gender:    user?.user_metadata?.gender || '',
    address:   user?.user_metadata?.address || '',
    city:      user?.user_metadata?.city || '',
    state:     user?.user_metadata?.state || '',
    zipCode:   user?.user_metadata?.zip_code || '',
    bloodType: user?.user_metadata?.blood_type || '',
    emergencyContact: user?.user_metadata?.emergency_contact || '',
    allergies: user?.user_metadata?.allergies || 'No known allergies'
  });

  /* ----- static medical history (replace with real data later) ----- */
  const [medicalHistory] = useState([
    { id: 1, date: '2024-01-15', doctor: 'Dr. Sarah Johnson', hospital: 'City General Hospital', diagnosis: 'Annual Health Checkup', prescription: 'Vitamin D supplements, Regular exercise', notes: 'Patient in good health' },
    { id: 2, date: '2024-02-20', doctor: 'Dr. Michael Chen',   hospital: 'Metro Medical Center',   diagnosis: 'Mild Hypertension',      prescription: 'Lisinopril 10mg daily', notes: 'Blood pressure slightly elevated' }
  ]);

  /* -------------------------------------------------
     Load appointments + real-time subscription
     ------------------------------------------------- */
  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      const { data } = await supabase
        .from('appointments')
        .select('id, doctor_name, hospital, appointment_date, appointment_time, status, notes')
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: false });

      setAppointments(data ?? []);
      setAppointmentsLoading(false);
    };
    load();

    const sub = supabase
      .channel('appointments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'appointments', filter: `patient_id=eq.${user.id}` },
        payload => setAppointments(prev => [payload.new, ...prev])
      )
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [user?.id]);

  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const patientAppointments   = appointments;

  /* -------------------------------------------------
     Profile update
     ------------------------------------------------- */
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
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
        }
      });
      if (error) throw error;
      toast({ title: 'Profile Updated', description: 'Your information has been saved.' });
    } catch (err: any) {
      toast({ title: 'Update Failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  /* -------------------------------------------------
     Stats
     ------------------------------------------------- */
  const stats = [
    { title: 'Upcoming Appointments', value: upcomingAppointments.length, icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Total Appointments',    value: patientAppointments.length,   icon: Clock,    color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { title: 'Medical Records',       value: medicalHistory.length,        icon: FileText, color: 'text-green-600',  bgColor: 'bg-green-100' },
    { title: 'Active Prescriptions',  value: 2,                            icon: User,     color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  /* -------------------------------------------------
     UI – not logged-in / not patient
     ------------------------------------------------- */
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses} p-4`}>
        <div className={`w-full max-w-md p-8 ${cardClasses}`}>
          <h2 className={`text-2xl font-bold text-center mb-4 ${headingClasses}`}>Please Log In</h2>
          <Button asChild className="w-full"><a href="/">Go Home</a></Button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------
     MAIN DASHBOARD
     ------------------------------------------------- */
  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses} relative overflow-x-hidden`}>
      {/* ----- decorative background ----- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.05] overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMax slice" className="text-blue-600">
            <g fill="currentColor">
              <rect x="900" y="100" width="60" height="200" />
              <rect x="840" y="160" width="180" height="60" />
              <rect x="600" y="300" width="40" height="150" />
              <rect x="560" y="340" width="120" height="40" />
              <rect x="300" y="450" width="50" height="180" />
              <rect x="250" y="510" width="150" height="50" />
            </g>
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

        {/* ----- Header ----- */}
        <div className={`mb-6 p-6 ${cardClasses}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold text-gray-900 mb-2`}>
                Welcome back, {user?.user_metadata?.name || user?.name || 'User'}!
              </h1>
              <p className={`${textClasses}`}>Manage your health and appointments with ease.</p>
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

        {/* ----- Stats ----- */}
        <AnimatedSection animation="fade-in-up" delay={0}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
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

        {/* ----- Quick Actions ----- */}
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

        {/* ----- Upcoming preview ----- */}
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
              {upcomingAppointments.slice(0, 2).map(a => (
                <div key={a.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{a.doctor_name}</p>
                    <p className="text-sm text-gray-500 truncate">{a.hospital}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium">{new Date(a.appointment_date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{a.appointment_time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----- TABS ----- */}
        <AnimatedSection animation="bounce-in" delay={0.2}>
          <div className={`${cardClasses} p-5`}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-blue-100">
                <TabsTrigger value="appointments" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <span className="hidden sm:inline">Appointments</span>
                  <span className="sm:hidden">Appts</span>
                </TabsTrigger>
                <TabsTrigger value="doctors" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <span className="hidden sm:inline">Find Doctors</span>
                  <span className="sm:hidden">Doctors</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <span className="hidden sm:inline">Medical History</span>
                  <span className="sm:hidden">History</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <span className="hidden sm:inline">Profile</span>
                  <span className="sm:hidden">Profile</span>
                </TabsTrigger>
              </TabsList>

              {/* ----- BOOK APPOINTMENT DIALOG ----- */}
              <Dialog open={isBookAppointmentOpen} onOpenChange={setIsBookAppointmentOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" /> Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader><DialogTitle>Book New Appointment</DialogTitle></DialogHeader>
                  <BookAppointmentForm
                    onClose={() => setIsBookAppointmentOpen(false)}
                    onSuccess={() => {
                      setIsBookAppointmentOpen(false);
                      toast({ title: 'Success', description: 'Appointment booked!' });
                    }}
                  />
                </DialogContent>
              </Dialog>

              {/* ----- APPOINTMENTS TAB ----- */}
              <TabsContent value="appointments" className="mt-4">
                {appointmentsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
                  </div>
                ) : appointments.length === 0 ? (
                  <div className={`text-center py-12 px-4 ${cardClasses}`}>
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 backdrop-blur-sm">
                      <Calendar className="h-12 w-12 text-blue-600 mx-auto" />
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 ${headingClasses}`}>No appointments yet</h3>
                    <Button
                      onClick={() => setIsBookAppointmentOpen(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Book Your First Appointment
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Mobile cards */}
                    <div className="lg:hidden space-y-4">
                      {appointments.map(a => (
                        <div key={a.id} className={`${cardClasses} p-4 hover:shadow-xl transition-all duration-300`}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className={`font-semibold ${headingClasses}`}>{a.doctor_name}</h4>
                              <p className={`text-sm ${textClasses} opacity-80`}>{a.hospital}</p>
                            </div>
                            <Badge
                              variant={a.status === 'scheduled' ? 'default' : 'secondary'}
                              className={a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                            >
                              {a.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className={`text-xs ${textClasses} opacity-60 uppercase`}>Date</p>
                              <p className={`font-medium ${headingClasses}`}>{new Date(a.appointment_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${textClasses} opacity-60 uppercase`}>Time</p>
                              <p className={`font-medium ${headingClasses}`}>{a.appointment_time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden lg:block">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50/50">
                            <TableHead>Doctor</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {appointments.map(a => (
                            <TableRow key={a.id}>
                              <TableCell className="font-medium">{a.doctor_name}</TableCell>
                              <TableCell>{a.hospital}</TableCell>
                              <TableCell>{new Date(a.appointment_date).toLocaleDateString()}</TableCell>
                              <TableCell>{a.appointment_time}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={a.status === 'scheduled' ? 'default' : 'secondary'}
                                  className={a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                                >
                                  {a.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* ----- FIND DOCTORS TAB ----- */}
              <TabsContent value="doctors" className="mt-4">
                <DoctorSearchTab />
              </TabsContent>

              {/* ----- HISTORY TAB ----- */}
              <TabsContent value="history" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                  <div><h3 className={`text-xl font-semibold ${headingClasses}`}>Medical History</h3></div>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" /> Download Records
                  </Button>
                </div>
                {medicalHistory.map(r => (
                  <div key={r.id} className={`${cardClasses} p-6 hover:shadow-xl transition-all duration-300`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div>
                        <h4 className={`font-semibold text-lg ${headingClasses}`}>{r.diagnosis}</h4>
                        <p className={`${textClasses} opacity-80`}>{r.doctor} • {r.hospital}</p>
                      </div>
                      <div className="text-right"><p className={`font-medium ${headingClasses}`}>{new Date(r.date).toLocaleDateString()}</p></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div><p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide mb-1`}>Prescription</p><p className={`${textClasses}`}>{r.prescription}</p></div>
                      <div><p className={`text-xs ${textClasses} opacity-60 uppercase tracking-wide mb-1`}>Notes</p><p className={`${textClasses}`}>{r.notes}</p></div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* ----- PROFILE TAB ----- */}
              <TabsContent value="profile" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                  <div><h3 className={`text-xl font-semibold ${headingClasses}`}>Profile Settings</h3></div>
                </div>

                <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 bg-white text-gray-900 p-6 rounded-lg shadow-md">
                  <div className={`${cardClasses} p-6`}>
                    <Label>Name</Label>
                    <Input
                      value={profileData.firstName + ' ' + profileData.lastName}
                      onChange={e => {
                        const [f, ...l] = e.target.value.split(' ');
                        setProfileData(p => ({ ...p, firstName: f, lastName: l.join(' ') }));
                      }}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className={`${cardClasses} p-6`}>
                    <Label>Email</Label>
                    <Input type="email" value={profileData.email} onChange={e => handleProfileInputChange('email', e.target.value)} className="mt-1" required />
                  </div>

                  <div className={`${cardClasses} p-6`}>
                    <Label>Phone</Label>
                    <Input type="tel" value={profileData.phone} onChange={e => handleProfileInputChange('phone', e.target.value)} className="mt-1" required />
                  </div>

                  <div className="lg:col-span-2 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
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

/* --------------------------------------------------------------
   3. BOOK APPOINTMENT FORM – SCROLLABLE + SLOTS AFTER DOCTOR+DATE
   -------------------------------------------------------------- */
interface BookFormProps { onClose: () => void; onSuccess: () => void; }

const BookAppointmentForm: React.FC<BookFormProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [hospitals, setHospitals] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean; selected?: boolean }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ reason: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  /* 1. Load hospitals */
  useEffect(() => {
    supabase.from('doctors').select('hospital').then(({ data }) => {
      const uniq = Array.from(new Set(data?.map(d => d.hospital).filter(Boolean)));
      setHospitals(uniq);
    });
  }, []);

  /* 2. Load doctors for selected hospital */
  useEffect(() => {
    if (!selectedHospital) { setDoctors([]); return; }
    supabase.from('doctors')
      .select('id, name, speciality')
      .eq('hospital', selectedHospital)
      .then(({ data }) => setDoctors(data ?? []));
  }, [selectedHospital]);

  /* 3. Fixed 10 AM – 4 PM slots (15‑min) + availability check */
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setTimeSlots([]);
      return;
    }

    // ---- generate 10:00 AM to 4:00 PM (inclusive) ----
    const start = parse('10:00 AM', 'h:mm a', new Date());
    const end   = parse('4:00 PM',  'h:mm a', new Date());

    const slots: { time: string }[] = [];
    let cur = start;
    while (cur <= end) {
      slots.push({ time: format(cur, 'h:mm a') });
      cur = addMinutes(cur, 15);
    }

    setLoadingSlots(true);
    Promise.all(
      slots.map(async slot => {
        const { count } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('doctor_id', selectedDoctor)
          .eq('appointment_date', selectedDate)
          .eq('appointment_time', slot.time)
          .eq('status', 'scheduled');
        return { ...slot, available: (count ?? 0) === 0 };
      })
    )
      .then(results => {
        setTimeSlots(results);
        setLoadingSlots(false);
      })
      .catch(() => {
        setTimeSlots(slots.map(s => ({ ...s, available: true })));
        setLoadingSlots(false);
      });
  }, [selectedDoctor, selectedDate]);

  /* 4. Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setMsg({ type: 'error', text: 'Login required' });

    const slot = timeSlots.find(s => s.selected && s.available);
    if (!slot) return setMsg({ type: 'error', text: 'Select a free slot' });

    setSubmitting(true);
    const doc = doctors.find(d => d.id === selectedDoctor)!;
    const { error } = await supabase.from('appointments').insert({
      patient_id: user.id,
      patient_name: user.user_metadata?.name || user.email,
      doctor_id: selectedDoctor,
      doctor_name: doc.name,
      hospital: selectedHospital,
      appointment_date: selectedDate,
      appointment_time: slot.time,
      notes: form.notes,
    });
    setSubmitting(false);
    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      toast({ title: 'Success', description: 'Appointment booked!' });
      onSuccess();
    }
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Hospital */}
        <div>
          <Label>Hospital</Label>
          <Select value={selectedHospital} onValueChange={setSelectedHospital}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Choose…" /></SelectTrigger>
            <SelectContent>{hospitals.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {/* Doctor */}
        {selectedHospital && (
          <div>
            <Label>Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Choose…" /></SelectTrigger>
              <SelectContent>
                {doctors.map(d => (
                  <SelectItem key={d.id} value={d.id}>
                    Dr. {d.name} – {d.speciality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date */}
        {selectedDoctor && (
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>
        )}

        {/* Fixed 10 AM – 4 PM Slots */}
        {selectedDoctor && selectedDate && (
          <div>
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Available Slots (10 AM – 4 PM)
            </Label>

            {loadingSlots ? (
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[...Array(12)].map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={!s.available}
                    onClick={() =>
                      setTimeSlots(prev =>
                        prev.map(p => ({ ...p, selected: p.time === s.time }))
                      )
                    }
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${s.selected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                        : s.available
                          ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 hover:shadow-sm'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            )}

            {timeSlots.length > 0 && timeSlots.every(s => !s.available) && (
              <p className="text-sm text-red-600 mt-2">
                No available slots for this doctor on the selected date
              </p>
            )}
          </div>
        )}

        {/* Reason */}
        <div>
          <Label className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reason for Visit <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            value={form.reason}
            onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
            placeholder="e.g. Annual check-up, flu symptoms, etc."
            className="mt-1"
          />
        </div>

        {/* Notes */}
        <div>
          <Label>Additional Notes (optional)</Label>
          <Textarea
            rows={3}
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            placeholder="Any specific concerns or preparation instructions..."
            className="mt-1"
          />
        </div>

        {/* Message */}
        {msg && (
          <div className={`p-3 rounded-lg text-sm ${msg.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-blue-50 border border-blue-200 text-blue-700'}`}>
            {msg.text}
          </div>
        )}

        {/* Sticky footer */}
        <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 pt-4 pb-2 z-10">
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || !timeSlots.some(s => s.selected && s.available)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Booking…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </div>
  );
};

/* --------------------------------------------------------------
   4. DOCTOR SEARCH TAB
   -------------------------------------------------------------- */
const DoctorSearchTab = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('doctors')
      .select('id, name, speciality, timings, hospital, fees, experience, phone, address')
      .then(({ data }) => {
        setDoctors(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.speciality.toLowerCase().includes(search.toLowerCase()) ||
    d.hospital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-5 w-5 text-gray-500" />
        <Input placeholder="Search by name, speciality or hospital…" value={search} onChange={e => setSearch(e.target.value)} className="flex-1" />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No doctors found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(doc => (
            <div
              key={doc.id}
              className={`${cardClasses} p-4 cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => setSelectedDoctor(doc)}
            >
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {doc.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className={`font-semibold ${headingClasses}`}>Dr. {doc.name}</h4>
                  <p className={`text-sm ${textClasses}`}>{doc.speciality}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{doc.hospital}</p>
              <p className="text-sm font-medium text-blue-600 mt-1">₹{doc.fees} / visit</p>
            </div>
          ))}
        </div>
      )}

      {/* Doctor detail modal */}
      <Dialog open={!!selectedDoctor} onOpenChange={open => !open && setSelectedDoctor(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedDoctor && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {selectedDoctor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  Dr. {selectedDoctor.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div><Label>Speciality</Label><p>{selectedDoctor.speciality}</p></div>
                <div><Label>Hospital</Label><p>{selectedDoctor.hospital}</p></div>
                <div><Label>Timings</Label><p>{selectedDoctor.timings}</p></div>
                <div><Label>Consultation Fee</Label><p className="font-medium">₹{selectedDoctor.fees}</p></div>
                <div><Label>Experience</Label><p>{selectedDoctor.experience} years</p></div>
                {selectedDoctor.phone && <div><Label>Phone</Label><p>{selectedDoctor.phone}</p></div>}
                {selectedDoctor.address && <div><Label>Address</Label><p>{selectedDoctor.address}</p></div>}
              </div>
              <DialogFooter>
                <Button onClick={() => setSelectedDoctor(null)}>Close</Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => { setSelectedDoctor(null); /* you can open booking here */ }}
                >
                  Book Appointment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientDashboard;