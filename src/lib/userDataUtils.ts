// Utility functions for fetching user data from role-specific tables
import { supabase } from '@/lib/supabaseClient';

export interface PatientData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  blood_type?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  allergies?: string;
  medical_conditions?: string;
  insurance_provider?: string;
  insurance_number?: string;
  profile_image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HospitalData {
  id: string;
  email: string;
  hospital_name: string;
  hospital_type?: string;
  license_number: string;
  contact_person: string;
  contact_phone: string;
  contact_email?: string;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  description?: string;
  specialties?: string[];
  services?: string[];
  facilities?: string[];
  bed_count?: number;
  emergency_services: boolean;
  parking_available: boolean;
  insurance_accepted?: string[];
  operating_hours?: any;
  rating: number;
  total_reviews: number;
  verification_status: string;
  verification_documents?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch patient data by user ID
export const fetchPatientData = async (userId: string): Promise<PatientData | null> => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching patient data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
};

// Fetch hospital data by user ID
export const fetchHospitalData = async (userId: string): Promise<HospitalData | null> => {
  try {
    const { data, error } = await supabase
      .from('hospital_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching hospital data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    return null;
  }
};

// Update patient data
export const updatePatientData = async (userId: string, updates: Partial<PatientData>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating patient data:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating patient data:', error);
    return false;
  }
};

// Update hospital data
export const updateHospitalData = async (userId: string, updates: Partial<HospitalData>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('hospital_users')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating hospital data:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating hospital data:', error);
    return false;
  }
};

// Get user role from auth metadata
export const getUserRole = (user: any): 'patient' | 'hospital' | null => {
  return user?.user_metadata?.role || null;
};

// Fetch complete user data based on role
export const fetchUserDataByRole = async (user: any) => {
  if (!user) return null;
  
  const role = getUserRole(user);
  
  if (role === 'patient') {
    return await fetchPatientData(user.id);
  } else if (role === 'hospital') {
    return await fetchHospitalData(user.id);
  }
  
  return null;
};