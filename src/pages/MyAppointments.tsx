// import { useState } from 'react';
// import { Calendar, Clock, MapPin, Phone, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import { useToast } from '@/hooks/use-toast';
// import { useAuth } from '@/contexts/AuthContext';
// import { mockAppointments, Appointment } from '@/data/mockData';

// const MyAppointments = () => {
//   const { user, isAuthenticated } = useAuth();
//   const { toast } = useToast();
//   const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
//           <p className="text-muted-foreground mb-6">You need to be logged in to view your appointments.</p>
//           <Button asChild>
//             <a href="/login">Log In</a>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
//   const pastAppointments = appointments.filter(apt => apt.status === 'completed');
//   const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

//   const handleCancelAppointment = (appointmentId: string) => {
//     setAppointments(prev => 
//       prev.map(apt => 
//         apt.id === appointmentId 
//           ? { ...apt, status: 'cancelled' as const }
//           : apt
//       )
//     );
    
//     toast({
//       title: "Appointment Cancelled",
//       description: "Your appointment has been cancelled successfully.",
//     });
//   };

//   const handleRescheduleAppointment = (appointmentId: string) => {
//     // Mock reschedule - in real app, this would open a modal or redirect to booking
//     toast({
//       title: "Reschedule Request",
//       description: "Please contact the hospital to reschedule your appointment.",
//     });
//   };

//   const getStatusBadge = (status: Appointment['status']) => {
//     switch (status) {
//       case 'upcoming':
//         return <Badge variant="secondary">Upcoming</Badge>;
//       case 'completed':
//         return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
//       case 'cancelled':
//         return <Badge variant="destructive">Cancelled</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
//     <Card className="hover:shadow-medium transition-shadow animate-fade-in">
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between">
//           <div>
//             <CardTitle className="text-lg">{appointment.doctorName}</CardTitle>
//             <p className="text-sm text-muted-foreground">{appointment.hospitalName}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             {getStatusBadge(appointment.status)}
//             {appointment.status === 'upcoming' && (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="sm">
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => handleRescheduleAppointment(appointment.id)}>
//                     Reschedule
//                   </DropdownMenuItem>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                         <span className="text-destructive">Cancel</span>
//                       </DropdownMenuItem>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           Are you sure you want to cancel this appointment? This action cannot be undone.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
//                         <AlertDialogAction 
//                           onClick={() => handleCancelAppointment(appointment.id)}
//                           className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                         >
//                           Cancel Appointment
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}
//           </div>
//         </div>
//       </CardHeader>
      
//       <CardContent className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           <div className="flex items-center text-muted-foreground">
//             <Calendar className="h-4 w-4 mr-2" />
//             <span>{new Date(appointment.date).toLocaleDateString()}</span>
//           </div>
//           <div className="flex items-center text-muted-foreground">
//             <Clock className="h-4 w-4 mr-2" />
//             <span>{appointment.time}</span>
//           </div>
//         </div>
        
//         <div className="space-y-2">
//           <div className="text-sm">
//             <span className="font-medium">Reason:</span> {appointment.reason}
//           </div>
//           <div className="text-sm">
//             <span className="font-medium">Consultation Fee:</span> ${appointment.fees}
//           </div>
//         </div>

//         {appointment.status === 'upcoming' && (
//           <div className="pt-2 border-t">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Phone className="h-4 w-4 mr-2" />
//               <span>Contact hospital for any changes or queries</span>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
//           <p className="text-gray-700">
//             Welcome back, {user?.name}! Here are your medical appointments.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="animate-fade-in">
//             <CardContent className="p-6 text-center">
//               <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
//               <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
//               <div className="text-sm text-muted-foreground">Upcoming</div>
//             </CardContent>
//           </Card>
          
//           <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
//             <CardContent className="p-6 text-center">
//               <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
//               <div className="text-2xl font-bold">{pastAppointments.length}</div>
//               <div className="text-sm text-muted-foreground">Completed</div>
//             </CardContent>
//           </Card>
          
//           <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
//             <CardContent className="p-6 text-center">
//               <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
//               <div className="text-2xl font-bold">{cancelledAppointments.length}</div>
//               <div className="text-sm text-muted-foreground">Cancelled</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Appointments Tabs */}
//         <Tabs defaultValue="upcoming" className="animate-fade-in">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="upcoming">
//               Upcoming ({upcomingAppointments.length})
//             </TabsTrigger>
//             <TabsTrigger value="past">
//               Past ({pastAppointments.length})
//             </TabsTrigger>
//             <TabsTrigger value="cancelled">
//               Cancelled ({cancelledAppointments.length})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="upcoming" className="mt-6">
//             {upcomingAppointments.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {upcomingAppointments.map(appointment => (
//                   <AppointmentCard key={appointment.id} appointment={appointment} />
//                 ))}
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="p-12 text-center">
//                   <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
//                   <p className="text-muted-foreground mb-6">
//                     You don't have any upcoming appointments. Would you like to book one?
//                   </p>
//                   <Button asChild>
//                     <a href="/doctors">Find Doctors</a>
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>

//           <TabsContent value="past" className="mt-6">
//             {pastAppointments.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {pastAppointments.map(appointment => (
//                   <AppointmentCard key={appointment.id} appointment={appointment} />
//                 ))}
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="p-12 text-center">
//                   <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold mb-2">No Past Appointments</h3>
//                   <p className="text-muted-foreground">
//                     Your completed appointments will appear here.
//                   </p>
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>

//           <TabsContent value="cancelled" className="mt-6">
//             {cancelledAppointments.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {cancelledAppointments.map(appointment => (
//                   <AppointmentCard key={appointment.id} appointment={appointment} />
//                 ))}
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="p-12 text-center">
//                   <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold mb-2">No Cancelled Appointments</h3>
//                   <p className="text-muted-foreground">
//                     Your cancelled appointments will appear here.
//                   </p>
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;

'use client';

import { useState, useEffect } from 'react';
import {
  Calendar, Clock, MapPin, Phone, MoreHorizontal,
  CheckCircle, XCircle, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Appointment } from '@/data/mockData';

// -------------------------------------------------------------------
// BOOK APPOINTMENT FORM (same as dashboard – 10 AM‑4 PM slots)
// -------------------------------------------------------------------
interface BookFormProps {
  appointment?: Appointment;
  onClose: () => void;
  onSuccess: () => void;
}
const BookAppointmentForm: React.FC<BookFormProps> = ({ appointment, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [hospitals, setHospitals] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState(appointment?.hospitalName ?? '');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState(appointment?.doctorName ?? '');
  const [selectedDate, setSelectedDate] = useState(appointment?.date ?? '');
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean; selected?: boolean }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ reason: appointment?.reason ?? '', notes: appointment?.notes ?? '' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  // 1. Load hospitals
  useEffect(() => {
    supabase.from('doctors').select('hospital').then(({ data }) => {
      const uniq = Array.from(new Set(data?.map(d => d.hospital).filter(Boolean)));
      setHospitals(uniq);
    });
  }, []);

  // 2. Load doctors
  useEffect(() => {
    if (!selectedHospital) { setDoctors([]); return; }
    supabase.from('doctors')
      .select('id, name, speciality')
      .eq('hospital', selectedHospital)
      .then(({ data }) => setDoctors(data ?? []));
  }, [selectedHospital]);

  // 3. Fixed 10 AM – 4 PM slots
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) { setTimeSlots([]); return; }

    const start = new Date(); start.setHours(10, 0, 0, 0);
    const end   = new Date(); end.setHours(16, 0, 0, 0);
    const slots: { time: string }[] = [];
    let cur = start;
    while (cur <= end) {
      slots.push({ time: format(cur, 'h:mm a') });
      cur = new Date(cur.getTime() + 15 * 60 * 1000);
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
      .then(results => { setTimeSlots(results); setLoadingSlots(false); })
      .catch(() => { setTimeSlots(slots.map(s => ({ ...s, available: true }))); setLoadingSlots(false); });
  }, [selectedDoctor, selectedDate]);

  // 4. Submit (insert / update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setMsg({ type: 'error', text: 'Login required' });

    const slot = timeSlots.find(s => s.selected && s.available);
    if (!slot) return setMsg({ type: 'error', text: 'Select a free slot' });

    setSubmitting(true);
    const doc = doctors.find(d => d.id === selectedDoctor)!;

    const payload = {
      patient_id: user.id,
      patient_name: user.user_metadata?.name || user.email,
      doctor_id: selectedDoctor,
      doctor_name: doc.name,
      hospital: selectedHospital,
      appointment_date: selectedDate,
      appointment_time: slot.time,
      status: 'scheduled' as const,
      notes: form.notes,
      reason: form.reason,
    };

    const { error } = appointment
      ? await supabase.from('appointments')
          .update(payload)
          .eq('id', appointment.id)
          .select()
      : await supabase.from('appointments')
          .insert(payload)
          .select();

    setSubmitting(false);
    if (error) setMsg({ type: 'error', text: error.message });
    else { toast({ title: 'Success', description: appointment ? 'Rescheduled!' : 'Booked!' }); onSuccess(); }
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hospital */}
        <div>
          <label className="block text-sm font-medium">Hospital</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={selectedHospital}
            onChange={e => setSelectedHospital(e.target.value)}
          >
            <option value="">Choose…</option>
            {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        {/* Doctor */}
        {selectedHospital && (
          <div>
            <label className="block text-sm font-medium">Doctor</label>
            <select
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              value={selectedDoctor}
              onChange={e => setSelectedDoctor(e.target.value)}
            >
              <option value="">Choose…</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.name} – {d.speciality}</option>
              ))}
            </select>
          </div>
        )}

        {/* Date */}
        {selectedDoctor && (
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        )}

        {/* Slots */}
        {selectedDoctor && selectedDate && (
          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Available Slots (10 AM – 4 PM)
            </label>
            {loadingSlots ? (
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[...Array(12)].map((_, i) => <Skeleton key={i} className="h-9 w-full rounded-lg" />)}
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={!s.available}
                    onClick={() => setTimeSlots(prev => prev.map(p => ({ ...p, selected: p.time === s.time })))}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all
                      ${s.selected ? 'bg-blue-600 text-white' : s.available ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium">
            Reason for Visit <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.reason}
            onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
            placeholder="e.g. Annual check-up"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium">Additional Notes (optional)</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            placeholder="Any concerns…"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {msg && (
          <div className={`p-3 rounded-lg text-sm ${msg.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-blue-50 border border-blue-200 text-blue-700'}`}>
            {msg.text}
          </div>
        )}

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t pt-4 pb-2">
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={submitting || !timeSlots.some(s => s.selected && s.available)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {submitting ? 'Saving…' : appointment ? 'Reschedule' : 'Book Appointment'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

// -------------------------------------------------------------------
// MAIN PAGE
// -------------------------------------------------------------------
const MyAppointments = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleModal, setRescheduleModal] = useState<Appointment | null>(null);

  // -------------------------------------------------
// Load + real‑time
// -------------------------------------------------
useEffect(() => {
  if (!user?.id) return;

  const load = async () => {
    const { data } = await supabase
      .from('appointments')
      .select('id, doctor_id, doctor_name, hospital, appointment_date, appointment_time, status, reason, fees')
      .eq('patient_id', user.id)
      .order('appointment_date', { ascending: false });

    const mapped: Appointment[] = (data ?? []).map(a => ({
      id: a.id,
      doctorId: a.doctor_id,          // ← required
      doctorName: a.doctor_name,
      hospitalName: a.hospital,
      date: a.appointment_date,
      time: a.appointment_time,
      status: a.status === 'scheduled' ? 'upcoming' : a.status === 'completed' ? 'completed' : 'cancelled',
      reason: a.reason ?? '',
      fees: a.fees ?? 0,
      patientId: user.id,             // ← required
    }));

    setAppointments(mapped);
    setLoading(false);
  };
  load();

  const channel = supabase
    .channel('appointments')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'appointments', filter: `patient_id=eq.${user.id}` },
      payload => {
        const a = payload.new;
        const mapped: Appointment = {
          id: a.id,
          doctorId: a.doctor_id,
          doctorName: a.doctor_name,
          hospitalName: a.hospital,
          date: a.appointment_date,
          time: a.appointment_time,
          status: a.status === 'scheduled' ? 'upcoming' : a.status,
          reason: a.reason ?? '',
          fees: a.fees ?? 0,
          patientId: user.id,
        };
        setAppointments(prev => [mapped, ...prev]);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'appointments', filter: `patient_id=eq.${user.id}` },
      payload => {
        const a = payload.new;
        const mapped: Appointment = {
          id: a.id,
          doctorId: a.doctor_id,
          doctorName: a.doctor_name,
          hospitalName: a.hospital,
          date: a.appointment_date,
          time: a.appointment_time,
          status: a.status === 'scheduled' ? 'upcoming' : a.status,
          reason: a.reason ?? '',
          fees: a.fees ?? 0,
          patientId: user.id,
        };
        setAppointments(prev => prev.map(p => p.id === a.id ? mapped : p));
      }
    )
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [user?.id]);

  // -------------------------------------------------
  // Cancel (real DB update)
  // -------------------------------------------------
  const handleCancelAppointment = async (id: string) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Cancelled', description: 'Appointment cancelled.' });
    }
  };

  // -------------------------------------------------
  // Reschedule – opens modal with current data
  // -------------------------------------------------
  const openReschedule = (apt: Appointment) => setRescheduleModal(apt);
  const closeReschedule = () => setRescheduleModal(null);

  // -------------------------------------------------
  // UI helpers
  // -------------------------------------------------
  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
  const pastAppointments     = appointments.filter(a => a.status === 'completed');
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled');

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':   return <Badge variant="secondary">Upcoming</Badge>;
      case 'completed':  return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'cancelled':  return <Badge variant="destructive">Cancelled</Badge>;
      default:           return <Badge variant="outline">{status}</Badge>;
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="hover:shadow-medium transition-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{appointment.doctorName}</CardTitle>
            <p className="text-sm text-muted-foreground">{appointment.hospitalName}</p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(appointment.status)}
            {appointment.status === 'upcoming' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openReschedule(appointment)}>
                    Reschedule
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <span className="text-destructive">Cancel</span>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Cancel Appointment
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{appointment.time}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Reason:</span> {appointment.reason}
          </div>
          <div className="text-sm">
            <span className="font-medium">Consultation Fee:</span> ₹{appointment.fees}
          </div>
        </div>

        {appointment.status === 'upcoming' && (
          <div className="pt-2 border-t">
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              <span>Contact hospital for any changes or queries</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
        <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <Button asChild><a href="/login">Log In</a></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-700">
            Welcome back, {user?.user_metadata?.name || user?.email}! Here are your appointments.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{pastAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold">{cancelledAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
          </TabsList>

          {/* UPCOMING */}
          <TabsContent value="upcoming" className="mt-6">
            {loading ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {upcomingAppointments.map(a => <AppointmentCard key={a.id} appointment={a} />)}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                <Button asChild>
                  <a href="/dashboard">Book One</a>
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* PAST */}
          <TabsContent value="past" className="mt-6">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {pastAppointments.map(a => <AppointmentCard key={a.id} appointment={a} />)}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Past Appointments</h3>
              </Card>
            )}
          </TabsContent>

          {/* CANCELLED */}
          <TabsContent value="cancelled" className="mt-6">
            {cancelledAppointments.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {cancelledAppointments.map(a => <AppointmentCard key={a.id} appointment={a} />)}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Cancelled Appointments</h3>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* RESCHEDULE MODAL */}
        <Dialog open={!!rescheduleModal} onOpenChange={open => !open && closeReschedule()}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>Reschedule Appointment</DialogTitle></DialogHeader>
            {rescheduleModal && (
              <BookAppointmentForm
                appointment={rescheduleModal}
                onClose={closeReschedule}
                onSuccess={() => {
                  closeReschedule();
                  toast({ title: 'Rescheduled', description: 'Your appointment has been updated.' });
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyAppointments;