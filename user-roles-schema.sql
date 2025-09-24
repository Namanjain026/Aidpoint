-- Separate tables for Hospital and Patient data
-- This extends Supabase Auth with role-specific information

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    blood_type VARCHAR(10),
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    allergies TEXT DEFAULT 'No known allergies',
    medical_conditions TEXT,
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(100),
    profile_image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hospitals table (separate from the previous hospitals table for location)
CREATE TABLE IF NOT EXISTS hospital_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    hospital_name VARCHAR(255) NOT NULL,
    hospital_type VARCHAR(100), -- 'General', 'Specialty', 'Clinic', etc.
    license_number VARCHAR(100) UNIQUE NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'United States',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
        CASE 
            WHEN latitude IS NOT NULL AND longitude IS NOT NULL 
            THEN ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) 
            ELSE NULL 
        END
    ) STORED,
    website VARCHAR(255),
    description TEXT,
    specialties TEXT[], -- Array of specialties
    services TEXT[], -- Array of services offered
    facilities TEXT[], -- Array of facilities available
    bed_count INTEGER DEFAULT 0,
    emergency_services BOOLEAN DEFAULT false,
    parking_available BOOLEAN DEFAULT true,
    insurance_accepted TEXT[], -- Array of accepted insurance providers
    operating_hours JSONB DEFAULT '{"monday": {"open": "08:00", "close": "18:00"}, "tuesday": {"open": "08:00", "close": "18:00"}, "wednesday": {"open": "08:00", "close": "18:00"}, "thursday": {"open": "08:00", "close": "18:00"}, "friday": {"open": "08:00", "close": "18:00"}, "saturday": {"open": "09:00", "close": "17:00"}, "sunday": {"closed": true}}',
    rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    verification_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
    verification_documents TEXT[], -- Array of document URLs
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to automatically create patient/hospital record on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- Get the role from user metadata
    user_role := NEW.raw_user_meta_data->>'role';
    
    IF user_role = 'patient' THEN
        -- Create patient record
        INSERT INTO patients (
            id, 
            email, 
            first_name, 
            last_name, 
            phone
        ) VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(COALESCE(NEW.raw_user_meta_data->>'name', ''), ' ', 1)),
            COALESCE(NEW.raw_user_meta_data->>'last_name', split_part(COALESCE(NEW.raw_user_meta_data->>'name', ''), ' ', 2)),
            NEW.raw_user_meta_data->>'phone'
        );
    ELSIF user_role = 'hospital' THEN
        -- Create hospital record
        INSERT INTO hospital_users (
            id,
            email,
            hospital_name,
            license_number,
            contact_person,
            contact_phone,
            address,
            city,
            state,
            zip_code
        ) VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'hospital_name', 'Hospital Name Required'),
            COALESCE(NEW.raw_user_meta_data->>'license_number', 'LICENSE-' || substring(NEW.id::text, 1, 8)),
            COALESCE(NEW.raw_user_meta_data->>'contact_person', 'Contact Person Required'),
            COALESCE(NEW.raw_user_meta_data->>'phone', 'Phone Required'),
            COALESCE(NEW.raw_user_meta_data->>'address', 'Address Required'),
            COALESCE(NEW.raw_user_meta_data->>'city', 'City Required'),
            COALESCE(NEW.raw_user_meta_data->>'state', 'State Required'),
            NEW.raw_user_meta_data->>'zip_code'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically handle new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patients table
CREATE POLICY "Patients can view own data" ON patients
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Patients can update own data" ON patients
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for hospital_users table
CREATE POLICY "Hospitals can view own data" ON hospital_users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Hospitals can update own data" ON hospital_users
    FOR UPDATE USING (auth.uid() = id);

-- Allow hospitals to be viewed by patients (for finding doctors/hospitals)
CREATE POLICY "Patients can view hospital data" ON hospital_users
    FOR SELECT USING (is_active = true AND verification_status = 'verified');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS patients_email_idx ON patients(email);
CREATE INDEX IF NOT EXISTS patients_phone_idx ON patients(phone);
CREATE INDEX IF NOT EXISTS hospital_users_email_idx ON hospital_users(email);
CREATE INDEX IF NOT EXISTS hospital_users_license_idx ON hospital_users(license_number);
CREATE INDEX IF NOT EXISTS hospital_users_city_state_idx ON hospital_users(city, state);
CREATE INDEX IF NOT EXISTS hospital_users_location_idx ON hospital_users USING GIST(location);
CREATE INDEX IF NOT EXISTS hospital_users_specialties_idx ON hospital_users USING GIN(specialties);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hospital_users_updated_at BEFORE UPDATE ON hospital_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
-- Sample patients (these would be created automatically through the trigger)
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at, email_confirmed_at) VALUES
(gen_random_uuid(), 'john.doe@example.com', '{"role": "patient", "name": "John Doe", "phone": "+1-555-0101"}', NOW(), NOW(), NOW()),
(gen_random_uuid(), 'jane.smith@example.com', '{"role": "patient", "name": "Jane Smith", "phone": "+1-555-0102"}', NOW(), NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Sample hospitals (these would be created automatically through the trigger)
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at, email_confirmed_at) VALUES
(gen_random_uuid(), 'admin@citygeneralhospital.com', '{"role": "hospital", "hospital_name": "City General Hospital", "license_number": "LIC-001", "contact_person": "Dr. Admin", "phone": "+1-555-1001", "address": "123 Main Street", "city": "New York", "state": "NY", "zip_code": "10001"}', NOW(), NOW(), NOW()),
(gen_random_uuid(), 'admin@metromedical.com', '{"role": "hospital", "hospital_name": "Metro Medical Center", "license_number": "LIC-002", "contact_person": "Dr. Administrator", "phone": "+1-555-1002", "address": "456 Oak Avenue", "city": "Los Angeles", "state": "CA", "zip_code": "90210"}', NOW(), NOW(), NOW())
ON CONFLICT (email) DO NOTHING;