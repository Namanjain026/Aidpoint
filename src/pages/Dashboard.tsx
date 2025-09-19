import { useState } from 'react';
import { Plus, Edit, Save, X, Bed, Users, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { mockHospitals, mockDoctors, mockAppointments } from '@/data/mockData';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [editingPricing, setEditingPricing] = useState(false);
  
  // Mock hospital data for current user (assuming they're a hospital admin)
  const currentHospital = mockHospitals[0]; // In real app, this would be filtered by user
  const hospitalDoctors = mockDoctors.filter(d => d.hospitalId === currentHospital.id);
  const hospitalAppointments = mockAppointments.filter(a => 
    hospitalDoctors.some(d => d.id === a.doctorId)
  );

  const [bedCount, setBedCount] = useState({
    total: currentHospital.totalBeds,
    available: currentHospital.availableBeds,
  });
  
  const [pricing, setPricing] = useState(currentHospital.pricing);
  
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    experience: '',
    consultationFee: '',
    education: '',
    description: '',
  });

  if (!isAuthenticated || user?.role !== 'hospital') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-muted-foreground mb-6">
            This dashboard is only available for hospital administrators.
          </p>
          <Button asChild>
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleUpdateBeds = () => {
    toast({
      title: "Bed Count Updated",
      description: "Hospital bed availability has been updated successfully.",
    });
  };

  const handleSavePricing = () => {
    setEditingPricing(false);
    toast({
      title: "Pricing Updated",
      description: "Service pricing has been updated successfully.",
    });
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddDoctorOpen(false);
    setNewDoctor({
      name: '',
      specialization: '',
      experience: '',
      consultationFee: '',
      education: '',
      description: '',
    });
    toast({
      title: "Doctor Added",
      description: "New doctor has been added to your hospital successfully.",
    });
  };

  const stats = [
    {
      title: 'Total Beds',
      value: bedCount.total,
      icon: Bed,
      color: 'text-primary',
    },
    {
      title: 'Available Beds',
      value: bedCount.available,
      icon: Bed,
      color: 'text-success',
    },
    {
      title: 'Total Doctors',
      value: hospitalDoctors.length,
      icon: Users,
      color: 'text-secondary',
    },
    {
      title: 'Today\'s Appointments',
      value: hospitalAppointments.length,
      icon: Calendar,
      color: 'text-accent',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentHospital.name}! Manage your hospital operations here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="beds" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="beds">Bed Management</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Bed Management */}
          <TabsContent value="beds" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bed Availability Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="totalBeds">Total Beds</Label>
                    <Input
                      id="totalBeds"
                      type="number"
                      value={bedCount.total}
                      onChange={(e) => setBedCount(prev => ({ ...prev, total: parseInt(e.target.value) || 0 }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availableBeds">Available Beds</Label>
                    <Input
                      id="availableBeds"
                      type="number"
                      value={bedCount.available}
                      onChange={(e) => setBedCount(prev => ({ ...prev, available: parseInt(e.target.value) || 0 }))}
                      className="mt-1"
                      max={bedCount.total}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Occupancy Rate</div>
                    <div className="text-lg font-semibold">
                      {Math.round(((bedCount.total - bedCount.available) / bedCount.total) * 100)}%
                    </div>
                  </div>
                  <Button onClick={handleUpdateBeds}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Bed Count
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Management */}
          <TabsContent value="doctors" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Doctor Management</CardTitle>
                  <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Doctor
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Add New Doctor</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddDoctor} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="doctorName">Doctor Name</Label>
                            <Input
                              id="doctorName"
                              required
                              value={newDoctor.name}
                              onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="specialization">Specialization</Label>
                            <Input
                              id="specialization"
                              required
                              value={newDoctor.specialization}
                              onChange={(e) => setNewDoctor(prev => ({ ...prev, specialization: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="experience">Experience (years)</Label>
                            <Input
                              id="experience"
                              type="number"
                              required
                              value={newDoctor.experience}
                              onChange={(e) => setNewDoctor(prev => ({ ...prev, experience: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                            <Input
                              id="consultationFee"
                              type="number"
                              required
                              value={newDoctor.consultationFee}
                              onChange={(e) => setNewDoctor(prev => ({ ...prev, consultationFee: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="education">Education</Label>
                          <Input
                            id="education"
                            required
                            value={newDoctor.education}
                            onChange={(e) => setNewDoctor(prev => ({ ...prev, education: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newDoctor.description}
                            onChange={(e) => setNewDoctor(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsAddDoctorOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Add Doctor</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitalDoctors.map(doctor => (
                    <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                          <p className="text-sm text-muted-foreground">${doctor.consultationFee}/consultation</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{doctor.experience}y exp</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Management */}
          <TabsContent value="pricing" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Service Pricing</CardTitle>
                  {!editingPricing ? (
                    <Button onClick={() => setEditingPricing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Pricing
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button onClick={handleSavePricing}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPricing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="consultationPrice">General Consultation</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-lg mr-2">$</span>
                      <Input
                        id="consultationPrice"
                        type="number"
                        value={pricing.consultation}
                        onChange={(e) => setPricing(prev => ({ ...prev, consultation: parseInt(e.target.value) || 0 }))}
                        disabled={!editingPricing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="emergencyPrice">Emergency Visit</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-lg mr-2">$</span>
                      <Input
                        id="emergencyPrice"
                        type="number"
                        value={pricing.emergency}
                        onChange={(e) => setPricing(prev => ({ ...prev, emergency: parseInt(e.target.value) || 0 }))}
                        disabled={!editingPricing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="surgeryPrice">Surgery (Starting from)</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-lg mr-2">$</span>
                      <Input
                        id="surgeryPrice"
                        type="number"
                        value={pricing.surgery}
                        onChange={(e) => setPricing(prev => ({ ...prev, surgery: parseInt(e.target.value) || 0 }))}
                        disabled={!editingPricing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments */}
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hospitalAppointments.map(appointment => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">Patient #{appointment.id}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Badge variant={appointment.status === 'upcoming' ? 'secondary' : 'default'}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${appointment.fees}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;