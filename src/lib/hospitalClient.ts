// src/lib/hospitalClient.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getHospitalId(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('hospitals')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (error || !data) return null;
  return data.id;
}

// Use this in all hospital dashboard pages
export async function getHospitalSupabase(userId: string) {
  const hospitalId = await getHospitalId(userId);
  if (!hospitalId) throw new Error("Hospital not found");

  return {
    hospitalId,
    doctors: () => supabase.from('doctors').select('*').eq('hospital_id', hospitalId),
    appointments: () => supabase.from('appointments').select('*, doctors(name), patients(*)').eq('hospital_id', hospitalId),
    // add more as needed
  };
}