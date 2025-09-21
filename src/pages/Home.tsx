import { useState, useEffect } from 'react';
import { ArrowRight, Users, Building2, Calendar, Shield, Award, HeartHandshake, Sun, Moon, Star, Zap, CheckCircle, PlayCircle, ChevronDown, MapPin, Clock, Bell, Search } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Find Hospitals',
      description: 'Search and compare hospitals by location, specialization, and ratings with real-time availability',
      color: 'from-blue-500 to-blue-600',
      delay: 0.2,
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Book Doctors',
      description: 'Browse verified doctor profiles and book appointments with specialists instantly',
      color: 'from-emerald-500 to-emerald-600',
      delay: 0.3,
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment management with automated reminders and rescheduling',
      color: 'from-purple-500 to-purple-600',
      delay: 0.4,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Insurance Support',
      description: 'Seamless insurance verification and cost estimation for all treatments',
      color: 'from-rose-500 to-rose-600',
      delay: 0.5,
    },
  ];

  const services = [
    {
      title: "Hospital Network",
      description: "Access to quality healthcare facilities",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop&crop=faces",
      features: ["Emergency Care", "Specialized Treatment", "Modern Equipment"]
    },
    {
      title: "Expert Doctors",
      description: "Certified medical professionals at your service",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&crop=faces",
      features: ["Online Consultations", "Specialized Care", "Follow-up Support"]
    },
    {
      title: "Digital Health Records",
      description: "Secure and accessible medical history management",
      image: "https://plus.unsplash.com/premium_photo-1726769176212-1ab1fd60f42a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Cloud Storage", "Easy Access", "Privacy Protected"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "AidPoint made finding the right specialist so easy. The interface is intuitive and booking was seamless!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "The platform streamlined our patient management significantly. Highly recommended for healthcare providers.",
      rating: 5
    },
    {
      name: "City General Hospital",
      role: "Healthcare Partner",
      content: "Our patient satisfaction improved dramatically after integrating with AidPoint's system.",
      rating: 5
    }
  ];

 const themeClasses = 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300';

  const cardClasses = 'backdrop-blur-xl bg-white/80 border border-blue-100';
  const textClasses = 'text-gray-700';
  const headingClasses = 'text-gray-800';

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses} relative overflow-x-hidden`}>
      {/* Medical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Medical cross pattern */}
        <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.05] overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMax slice" className="text-blue-600">
            {/* Large medical crosses */}
            <g fill="currentColor">
              <rect x="900" y="100" width="60" height="200" />
              <rect x="840" y="160" width="180" height="60" />
              <rect x="600" y="300" width="40" height="150" />
              <rect x="560" y="340" width="120" height="40" />
              <rect x="300" y="450" width="50" height="180" />
              <rect x="250" y="510" width="150" height="50" />
            </g>
            {/* Medical symbols */}
            <g fill="currentColor" opacity="0.3">
              <circle cx="700" cy="200" r="30" />
              <circle cx="700" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M690,200 L710,200 M700,190 L700,210" stroke="currentColor" strokeWidth="3" />
              <circle cx="400" cy="600" r="25" />
              <circle cx="400" cy="600" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M392,600 L408,600 M400,592 L400,608" stroke="currentColor" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Animated floating medical elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}


      {/* Hero Section */}
      <AnimatedSection animation="fade-in-up" delay={0}>
        <section className="pt-32 pb-20 px-6 relative">
          <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="opacity-0 animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 backdrop-blur-xl bg-white/80 border border-blue-100 rounded-full mb-8 shadow-lg">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-gray-600">AidPoint: New Healthcare Platform</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight opacity-0 animate-fade-in text-gray-800" style={{ animationDelay: '0.1s' }}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Healthcare Made
                </span>
                <span className="text-4xl md:text-5xl text-gray-800 font-bold">
                  {" "}Simple
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Connect with trusted hospitals and doctors instantly. Experience the future of healthcare with AI-powered booking and comprehensive medical management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center transform hover:scale-105">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 backdrop-blur-xl bg-white/80 border border-blue-100 text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {/* Phone mockup */}
                <div className="relative mx-auto w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-gray-50">
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-xl w-1/3 mx-auto z-50"></div>

                    {/* App UI mockup */}
                    <div className="h-full flex flex-col">
                      {/* App header */}
                      <div className="flex justify-between items-center p-4 pb-2">
                        <div className="text-base font-bold text-gray-800 flex items-center">
                          <HeartHandshake className="w-5 h-5 mr-1 text-blue-600" />
                          AidPoint
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full shadow-sm"></div>
                          <div className="w-5 h-5 bg-purple-500 rounded-full shadow-sm"></div>
                        </div>
                      </div>

                      {/* App content */}
                      <div className="flex-1 relative overflow-hidden p-4">
                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 p-3 rounded-xl">
                            <Calendar className="h-6 w-6 text-blue-500 mb-2" />
                            <p className="text-xs text-gray-600">Next Appointment</p>
                            <p className="font-semibold text-sm text-gray-800">Today 2:30 PM</p>
                          </div>
                          <div className="backdrop-blur-xl bg-white/80 border border-blue-100 p-3 rounded-xl">
                            <Users className="h-6 w-6 text-purple-500 mb-2" />
                            <p className="text-xs text-gray-600">Available Doctors</p>
                            <p className="font-semibold text-sm text-gray-800">147 Online</p>
                          </div>
                        </div>

                        {/* Hospital card */}
                        <div className="backdrop-blur-xl bg-white/80 border border-blue-100 rounded-xl p-4 mb-4">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                              <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">City General Hospital</h4>
                              <p className="text-xs text-gray-600">2.3 km away • Available</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs ml-1 text-gray-600">4.8</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-green-500" />
                              <span className="text-xs ml-1 text-gray-600">Open 24/7</span>
                            </div>
                          </div>
                        </div>

                        {/* Doctor appointment */}
                        <div className="backdrop-blur-xl bg-white/80 border border-blue-100 rounded-xl p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-semibold">DR</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-gray-800">Dr. Sarah Wilson</h4>
                                <p className="text-xs text-gray-600">Cardiologist</p>
                              </div>
                            </div>
                            <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full">
                              Book Now
                            </button>
                          </div>
                        </div>

                        {/* Nearby facilities map mockup */}
                        <div className="backdrop-blur-xl bg-white/80 border border-blue-100 rounded-xl p-4 relative overflow-hidden h-32">
                          <h5 className="font-semibold text-sm mb-3 text-gray-800">Nearby Facilities</h5>
                          <div className="absolute inset-0 p-4">
                            {/* Map dots */}
                            <div className="absolute top-6 left-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="absolute top-10 right-8 w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-8 left-12 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute bottom-6 right-6 w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                            
                            {/* Map lines */}
                            <svg className="absolute inset-0 w-full h-full" style={{ top: '16px', left: '16px' }}>
                              <path
                                d="M0,20 Q40,10 80,20 T160,20"
                                fill="none"
                                stroke="#CBD5E1"
                                strokeWidth="1"
                                opacity="0.5"
                              />
                              <path
                                d="M20,0 Q30,30 20,60 T20,120"
                                fill="none"
                                stroke="#CBD5E1"
                                strokeWidth="1"
                                opacity="0.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-300/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-gradient-to-tr from-purple-400/30 to-blue-300/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            <span className="text-gray-600 text-sm mb-2">Scroll to explore</span>
            <div className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        )}
      </section>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection animation="scale-in" delay={0.1}>
        <section className="py-20" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Our Services</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed for modern needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index}
                className="backdrop-blur-xl bg-white/80 border border-blue-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection animation="bounce-in" delay={0.2}>
        <section className="py-20 px-6 bg-white/30 backdrop-blur-sm" id="features">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 backdrop-blur-xl bg-white/80 border border-blue-100 rounded-full mb-6 shadow-lg">
              <Zap className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose AidPoint?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience healthcare like never before with our cutting-edge platform designed for patients, doctors, and hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="backdrop-blur-xl bg-white/80 border border-blue-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fade-in"
                style={{ animationDelay: `${feature.delay}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection animation="fade-in-up" delay={0.3}>
        <section className="py-20" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing community of patients and healthcare providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="backdrop-blur-xl bg-white/80 border border-blue-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="scale-in" delay={0.4}>
        <section className="py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-800 rounded-2xl shadow-xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join our growing community of patients and healthcare providers who are experiencing the future of healthcare management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-blue-100">Free to start</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-blue-100">No setup fees</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-blue-100">24/7 support</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center transform hover:scale-105">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 backdrop-blur-xl bg-white/20 border border-white/30 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl"></div>
      </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl mr-3">
                <HeartHandshake className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">AidPoint</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} AidPoint. Transforming healthcare, one connection at a time.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;