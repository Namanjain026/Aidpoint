// src/pages/AppointmentsPage.tsx   (or wherever you keep pages)
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";
import { Calendar, Clock, User, Stethoscope, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
}

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          patient_name,
          doctor_name,
          appointment_date,
          appointment_time,
          status,
          created_at
        `)
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setAppointments(data ?? []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const getStatusBadge = (status: string) => {
    const map: Record<string, { variant: "default" | "secondary" | "outline", className?: string }> = {
      scheduled: { variant: "default", className: "bg-blue-100 text-blue-800" },
      completed: { variant: "default", className: "bg-green-100 text-green-800" },
      cancelled: { variant: "default", className: "bg-red-100 text-red-800" },
    };
    const cfg = map[status.toLowerCase()] ?? { variant: "secondary" };
    return <Badge variant={cfg.variant} className={cfg.className}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">

        {/* Header + Back */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            size="sm"
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Appointments</h1>
            <p className="text-gray-600">Sorted by newest first</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Appointments Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-gray-900">Patient</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-900">Doctor</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-900">Date</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-900">Time</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{a.patient_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Dr. {a.doctor_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{format(new Date(a.appointment_date), "dd MMM yyyy")}</td>
                      <td className="px-6 py-4 flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {a.appointment_time}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(a.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {appointments.map(a => (
            <Card key={a.id} className="border border-blue-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{a.patient_name}</p>
                    <p className="text-sm text-gray-600">Dr. {a.doctor_name}</p>
                  </div>
                  {getStatusBadge(a.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(a.appointment_date), "dd MMM yyyy")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {a.appointment_time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {!loading && appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500">Start booking appointments from the patient portal.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;