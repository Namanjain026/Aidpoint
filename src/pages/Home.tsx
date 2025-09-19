import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Building2, Calendar, Shield, Award, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/search-bar';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (location) params.set('location', location);
    navigate(`/hospitals?${params.toString()}`);
  };

  const features = [
    {
      icon: Building2,
      title: 'Find Hospitals',
      description: 'Search and compare hospitals by location, specialization, and ratings',
    },
    {
      icon: Users,
      title: 'Book Doctors',
      description: 'Browse doctor profiles and book appointments with specialists',
    },
    {
      icon: Calendar,
      title: 'Manage Appointments',
      description: 'Track your appointments and medical history in one place',
    },
    {
      icon: Shield,
      title: 'Insurance Support',
      description: 'Find hospitals that accept your insurance for cost-effective care',
    },
  ];

  const stats = [
    { number: '500+', label: 'Partner Hospitals' },
    { number: '2000+', label: 'Verified Doctors' },
    { number: '50,000+', label: 'Happy Patients' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Health,{' '}
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connect with trusted hospitals and doctors. Book appointments, manage your health records, and get the care you deserve.
            </p>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search hospitals by name or specialization..."
                className="mb-8"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
                <Link to="/hospitals">
                  Find Hospitals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/doctors">
                  Browse Doctors
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose AidPoint?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make healthcare accessible, transparent, and efficient for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-hero w-16 h-16 rounded-lg mx-auto mb-6 flex items-center justify-center group-hover:shadow-strong transition-shadow">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Patients */}
            <div className="bg-card rounded-2xl p-8 shadow-medium hover:shadow-strong transition-shadow animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <HeartHandshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">For Patients</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Find the best healthcare providers, book appointments, and manage your medical records all in one place.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Search hospitals by specialty and location
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Compare ratings, prices, and availability
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Book and manage appointments online
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/hospitals">
                  Find Healthcare
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* For Hospitals */}
            <div className="bg-card rounded-2xl p-8 shadow-medium hover:shadow-strong transition-shadow animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">For Hospitals</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Manage your hospital operations, doctor schedules, and patient appointments efficiently.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Manage bed availability and resources
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Update doctor schedules and fees
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  Track appointments and analytics
                </li>
              </ul>
              <Button asChild variant="secondary" className="w-full">
                <Link to="/register">
                  Join as Hospital
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;