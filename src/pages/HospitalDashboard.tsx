import { Calendar, Users, Stethoscope, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const HospitalDashboard = () => {
  // 🔹 Dummy Data (replace with API calls later)
  const stats = [
    { icon: Users, value: 128, label: "Registered Patients", color: "text-primary" },
    { icon: Stethoscope, value: 24, label: "Active Doctors", color: "text-green-600" },
    { icon: Calendar, value: 56, label: "Appointments Today", color: "text-blue-600" },
  ];

  const doctors = [
    { name: "Dr. John Smith", specialty: "Cardiology", patients: 8 },
    { name: "Dr. Emily Brown", specialty: "Dermatology", patients: 5 },
    { name: "Dr. David Wilson", specialty: "Neurology", patients: 12 },
  ];

  const appointments = [
    { patient: "Jane Doe", doctor: "Dr. Smith", time: "10:00 AM" },
    { patient: "Michael Lee", doctor: "Dr. Brown", time: "11:30 AM" },
    { patient: "Sara Khan", doctor: "Dr. Wilson", time: "1:00 PM" },
  ];

  const reportData = [
    { month: "Jan", patients: 40 },
    { month: "Feb", patients: 60 },
    { month: "Mar", patients: 80 },
    { month: "Apr", patients: 65 },
    { month: "May", patients: 90 },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hospital Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your doctors, patients, and appointments from one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Doctors & Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Doctors */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Doctors</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add Doctor
              </Button>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              <ul className="space-y-3">
                {doctors.map((doc, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>
                      {doc.name} ({doc.specialty})
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {doc.patients} patients
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Appointments */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Recent Appointments</CardTitle>
              <Button size="sm" variant="outline">View All</Button>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              <ul className="space-y-3">
                {appointments.map((appt, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>
                      {appt.patient} with {appt.doctor}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {appt.time}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="patients"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
