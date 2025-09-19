export interface Hospital {
  id: string;
  name: string;
  location: string;
  city: string;
  specializations: string[];
  rating: number;
  totalBeds: number;
  availableBeds: number;
  image: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  acceptedInsurance: string[];
  pricing: {
    consultation: number;
    emergency: number;
    surgery: number;
  };
  reviews: Review[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  hospitalId: string;
  experience: number;
  rating: number;
  consultationFee: number;
  image: string;
  availability: string[];
  education: string;
  languages: string[];
  description: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
  fees: number;
}

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    location: '123 Main Street',
    city: 'New York',
    specializations: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency Medicine'],
    rating: 4.5,
    totalBeds: 500,
    availableBeds: 45,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    phone: '(555) 123-4567',
    email: 'info@citygeneral.com',
    website: 'https://citygeneral.com',
    description: 'A leading healthcare institution providing comprehensive medical services with state-of-the-art facilities.',
    acceptedInsurance: ['Blue Cross', 'Aetna', 'Medicare', 'Medicaid'],
    pricing: {
      consultation: 150,
      emergency: 500,
      surgery: 5000,
    },
    reviews: [
      {
        id: '1',
        patientName: 'Sarah Johnson',
        rating: 5,
        comment: 'Excellent care and professional staff. Highly recommended!',
        date: '2024-01-15',
      },
      {
        id: '2',
        patientName: 'Mike Chen',
        rating: 4,
        comment: 'Good facilities but wait times could be better.',
        date: '2024-01-10',
      },
    ],
  },
  {
    id: '2',
    name: 'St. Mary Medical Center',
    location: '456 Oak Avenue',
    city: 'Los Angeles',
    specializations: ['Pediatrics', 'Oncology', 'Psychiatry', 'Internal Medicine'],
    rating: 4.3,
    totalBeds: 350,
    availableBeds: 28,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
    phone: '(555) 987-6543',
    email: 'contact@stmary.com',
    description: 'Compassionate healthcare with a focus on patient-centered care and innovative treatments.',
    acceptedInsurance: ['Humana', 'Cigna', 'Medicare'],
    pricing: {
      consultation: 175,
      emergency: 600,
      surgery: 6000,
    },
    reviews: [
      {
        id: '3',
        patientName: 'Emily Davis',
        rating: 5,
        comment: 'Outstanding pediatric care for my children.',
        date: '2024-01-12',
      },
    ],
  },
  {
    id: '3',
    name: 'Metro Health Institute',
    location: '789 Health Plaza',
    city: 'Chicago',
    specializations: ['Dermatology', 'Gastroenterology', 'Radiology', 'Surgery'],
    rating: 4.7,
    totalBeds: 600,
    availableBeds: 72,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
    phone: '(555) 456-7890',
    email: 'info@metrohealth.com',
    description: 'Premier medical institution with cutting-edge technology and specialized care.',
    acceptedInsurance: ['United Healthcare', 'Blue Cross', 'Aetna'],
    pricing: {
      consultation: 200,
      emergency: 750,
      surgery: 7500,
    },
    reviews: [
      {
        id: '4',
        patientName: 'Robert Wilson',
        rating: 5,
        comment: 'Best medical facility in the city. Top-notch equipment.',
        date: '2024-01-08',
      },
    ],
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    specialization: 'Cardiology',
    hospital: 'City General Hospital',
    hospitalId: '1',
    experience: 12,
    rating: 4.8,
    consultationFee: 200,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300',
    availability: ['Monday', 'Wednesday', 'Friday'],
    education: 'MD from Harvard Medical School',
    languages: ['English', 'Spanish'],
    description: 'Specialized in interventional cardiology with extensive experience in heart surgeries.',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    hospital: 'City General Hospital',
    hospitalId: '1',
    experience: 15,
    rating: 4.9,
    consultationFee: 250,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    education: 'MD from Johns Hopkins University',
    languages: ['English', 'Mandarin'],
    description: 'Expert in neurological disorders and brain surgery with international recognition.',
  },
  {
    id: '3',
    name: 'Dr. Jennifer Rodriguez',
    specialization: 'Pediatrics',
    hospital: 'St. Mary Medical Center',
    hospitalId: '2',
    experience: 8,
    rating: 4.7,
    consultationFee: 150,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    education: 'MD from UCLA Medical School',
    languages: ['English', 'Spanish'],
    description: 'Passionate about children\'s health with specialization in developmental pediatrics.',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Williams',
    hospitalName: 'City General Hospital',
    date: '2024-02-15',
    time: '10:00 AM',
    status: 'upcoming',
    reason: 'Regular Checkup',
    fees: 200,
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    hospitalName: 'City General Hospital',
    date: '2024-01-20',
    time: '2:00 PM',
    status: 'completed',
    reason: 'Headache Consultation',
    fees: 250,
  },
];