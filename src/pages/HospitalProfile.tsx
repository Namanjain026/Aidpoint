import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Upload,
  Save,
  ArrowLeft,
  Shield,
  BedDouble,
  Stethoscope,
  HeartPulse,
} from "lucide-react";

const HospitalProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    established_year: "",
    total_beds: "",
    icu_beds: "",
    emergency_available: true,
    insurance_partners: "",
    specializations: "",
    logo_url: "",
    banner_url: "",
  });

  // Load existing profile
  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("hospital_profile")
        .select("*")
        .single();

      if (data) {
        setFormData(data);
      }
    };
    loadProfile();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `hospital/${type}/${fileName}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    setFormData(prev => ({
      ...prev,
      [type === "logo" ? "logo_url" : "banner_url"]: publicUrl
    }));

    setUploading(false);
    toast.success(`${type === "logo" ? "Logo" : "Banner"} uploaded!`);
  };

  // Save profile
  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("hospital_profile")
      .upsert(formData, { onConflict: "id" });

    setLoading(false);
    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Hospital profile updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-20">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hospital Profile</h1>
              <p className="text-gray-600">Update your hospital's public information and branding</p>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          {formData.banner_url ? (
            <img src={formData.banner_url} alt="Hospital Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full h-full flex items-center justify-center">
              <Building2 className="h-24 w-24 text-white opacity-50" />
            </div>
          )}
          <label className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black/80">
            <Upload className="h-4 w-4 inline mr-2" />
            Change Banner
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "banner")}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Logo + Name */}
        <div className="flex items-center gap-6 mb-10 -mt-20 relative z-10">
          <div className="relative">
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              {formData.logo_url ? (
                <img src={formData.logo_url} alt="Logo" className="h-32 w-32 object-contain rounded-xl" />
              ) : (
                <div className="h-32 w-32 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "logo")}
                disabled={uploading}
              />
            </label>
          </div>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Hospital Name"
            className="text-4xl font-bold bg-transparent border-none shadow-none"
          />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Address</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Health St"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>State</Label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Maharashtra"
                  />
                </div>
                <div>
                  <Label>Established Year</Label>
                  <Input
                    value={formData.established_year}
                    onChange={(e) => setFormData({ ...formData, established_year: e.target.value })}
                    placeholder="1995"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell patients about your hospital..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" /> Contact & Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="contact@hospital.com" />
              </div>
              <div>
                <Label>Website</Label>
                <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://www.hospital.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Total Beds</Label>
                  <Input type="number" value={formData.total_beds} onChange={(e) => setFormData({ ...formData, total_beds: e.target.value })} />
                </div>
                <div>
                  <Label>ICU Beds</Label>
                  <Input type="number" value={formData.icu_beds} onChange={(e) => setFormData({ ...formData, icu_beds: e.target.value })} />
                </div>
              </div>

              <div>
                <Label>Specializations (comma separated)</Label>
                <Input
                  value={formData.specializations}
                  onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                  placeholder="Cardiology, Neurology, Orthopedics"
                />
              </div>

              <div>
                <Label>Insurance Partners</Label>
                <Textarea
                  value={formData.insurance_partners}
                  onChange={(e) => setFormData({ ...formData, insurance_partners: e.target.value })}
                  placeholder="HDFC Ergo, Star Health, MediAssist..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-10 text-center">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12"
          >
            <Save className="h-5 w-5 mr-2" />
            {loading ? "Saving..." : "Save Hospital Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;