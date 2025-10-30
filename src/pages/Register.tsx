// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, Heart, User, Building } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/lib/supabaseClient';  // ✅ Supabase client

// const Register = () => {
//   const [formData, setFormData] = useState({
//     // Common fields
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'patient' as 'patient' | 'hospital',
    
//     // Patient fields
//     firstName: '',
//     lastName: '',
//     phone: '',
//     dateOfBirth: '',
    
//     // Hospital fields
//     hospitalName: '',
//     licenseNumber: '',
//     contactPerson: '',
//     contactPhone: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Password Mismatch",
//         description: "Passwords do not match. Please try again.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast({
//         title: "Password Too Short",
//         description: "Password must be at least 6 characters long.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Prepare metadata based on role
//       const userData = formData.role === 'patient' 
//         ? {
//             role: formData.role,
//             first_name: formData.firstName,
//             last_name: formData.lastName,
//             name: `${formData.firstName} ${formData.lastName}`,
//             phone: formData.phone,
//             date_of_birth: formData.dateOfBirth,
//           }
//         : {
//             role: formData.role,
//             hospital_name: formData.hospitalName,
//             license_number: formData.licenseNumber,
//             contact_person: formData.contactPerson,
//             phone: formData.contactPhone,
//             address: formData.address,
//             city: formData.city,
//             state: formData.state,
//             zip_code: formData.zipCode,
//           };

//       // ✅ Create Supabase user with metadata
//       const { data, error } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//         options: {
//           data: userData,
//         },
//       });

//       if (error) throw error;

//       toast({
//         title: "Account Created!",
//         description: `Welcome to AidPoint! Your ${formData.role} account has been created. Please check your email to verify your account.`,
//       });

//       navigate('/login'); // redirect to login after signup
//     } catch (error: any) {
//       toast({
//         title: "Registration Failed",
//         description: error.message || "An error occurred while creating your account.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleRoleChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       role: value as 'patient' | 'hospital',
//     }));
//   };


//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2 group">
//             <div className="bg-white p-2 rounded-lg">
//               <img src="/src/assets/logo.png" alt="AidPoint Logo" className="h-8 w-auto" />
//             </div>
//             <span className="text-2xl font-bold text-white">AidPoint</span>
//           </Link>
//         </div>

//         {/* Registration Form */}
//         <Card className="shadow-strong animate-scale-in">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Create Account</CardTitle>
//             <p className="text-muted-foreground">
//               Join AidPoint to access quality healthcare
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Account Type */}
//               <div>
//                 <Label className="text-base font-medium">Account Type</Label>
//                 <RadioGroup
//                   value={formData.role}
//                   onValueChange={handleRoleChange}
//                   className="mt-2"
//                 >
//                   <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
//                     <RadioGroupItem value="patient" id="patient" />
//                     <User className="h-4 w-4" />
//                     <Label htmlFor="patient" className="flex-1 cursor-pointer">
//                       Patient - Find doctors and book appointments
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
//                     <RadioGroupItem value="hospital" id="hospital" />
//                     <Building className="h-4 w-4" />
//                     <Label htmlFor="hospital" className="flex-1 cursor-pointer">
//                       Hospital - Manage operations and doctors
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               {/* Dynamic fields based on role */}
//               {formData.role === 'patient' ? (
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="firstName">First Name</Label>
//                       <Input
//                         id="firstName"
//                         name="firstName"
//                         required
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         placeholder="First name"
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="lastName">Last Name</Label>
//                       <Input
//                         id="lastName"
//                         name="lastName"
//                         required
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         placeholder="Last name"
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="+1 (555) 123-4567"
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="dateOfBirth">Date of Birth</Label>
//                       <Input
//                         id="dateOfBirth"
//                         name="dateOfBirth"
//                         type="date"
//                         value={formData.dateOfBirth}
//                         onChange={handleInputChange}
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="hospitalName">Hospital Name</Label>
//                     <Input
//                       id="hospitalName"
//                       name="hospitalName"
//                       required
//                       value={formData.hospitalName}
//                       onChange={handleInputChange}
//                       placeholder="Enter hospital name"
//                       className="mt-1"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="licenseNumber">License Number</Label>
//                       <Input
//                         id="licenseNumber"
//                         name="licenseNumber"
//                         required
//                         value={formData.licenseNumber}
//                         onChange={handleInputChange}
//                         placeholder="Hospital license number"
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="contactPerson">Contact Person</Label>
//                       <Input
//                         id="contactPerson"
//                         name="contactPerson"
//                         required
//                         value={formData.contactPerson}
//                         onChange={handleInputChange}
//                         placeholder="Primary contact name"
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="contactPhone">Contact Phone</Label>
//                     <Input
//                       id="contactPhone"
//                       name="contactPhone"
//                       type="tel"
//                       required
//                       value={formData.contactPhone}
//                       onChange={handleInputChange}
//                       placeholder="+1 (555) 123-4567"
//                       className="mt-1"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="address">Address</Label>
//                     <Input
//                       id="address"
//                       name="address"
//                       required
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       placeholder="Street address"
//                       className="mt-1"
//                     />
//                   </div>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor="city">City</Label>
//                       <Input
//                         id="city"
//                         name="city"
//                         required
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         placeholder="City"
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="state">State</Label>
//                       <Input
//                         id="state"
//                         name="state"
//                         required
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         placeholder="State"
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="zipCode">ZIP Code</Label>
//                       <Input
//                         id="zipCode"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleInputChange}
//                         placeholder="ZIP"
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Enter your email"
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative mt-1">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     minLength={6}
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="Create a password"
//                     className="pr-10"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </Button>
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative mt-1">
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     placeholder="Confirm your password"
//                     className="pr-10"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </Button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Creating Account...' : 'Create Account'}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{' '}
//                 <Link 
//                   to="/login" 
//                   className="text-primary font-medium hover:underline"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>

//             {/* Terms */}
//             <div className="mt-4 text-center">
//               <p className="text-xs text-muted-foreground">
//                 By creating an account, you agree to our{' '}
//                 <Link to="#" className="text-primary hover:underline">
//                   Terms of Service
//                 </Link>{' '}
//                 and{' '}
//                 <Link to="#" className="text-primary hover:underline">
//                   Privacy Policy
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Back to Home */}
//         <div className="text-center mt-6">
//           <Link 
//             to="/" 
//             className="text-white/80 hover:text-white text-sm transition-colors"
//           >
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'hospital',

    // Patient fields
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',

    // Hospital fields
    hospitalName: '',
    licenseNumber: '',
    contactPerson: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // Helper: nicer error messages
  // ------------------------------------------------------------
  const friendlyError = (err: any): string => {
    if (!err?.message) return 'Something went wrong.';

    const msg = err.message.toLowerCase();

    if (msg.includes('only request this after')) {
      return 'Too many sign-up attempts. Please wait 60 seconds and try again.';
    }
    if (msg.includes('email already registered')) {
      return 'This email is already registered. Try logging in.';
    }
    if (msg.includes('row-level security')) {
      return 'Permission denied while creating profile. Contact support.';
    }
    return err.message;
  };

  // ------------------------------------------------------------
  // Submit handler
  // ------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ---- Basic validation -------------------------------------------------
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    if (formData.password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // ---- 1. Build metadata that will be stored in auth.users ----------
      const userMeta = formData.role === 'patient'
        ? {
            role: formData.role,
            first_name: formData.firstName,
            last_name: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            date_of_birth: formData.dateOfBirth,
          }
        : {
            role: formData.role,
            hospital_name: formData.hospitalName,
            license_number: formData.licenseNumber,
            contact_person: formData.contactPerson,
            phone: formData.contactPhone,
            address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          };

      // ---- 2. Sign-up (email confirmation disabled → returns session) ---
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: userMeta,
          // No redirect needed when email confirmation is off
        },
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error('User creation failed.');
      if (!signUpData.session) {
        // This should never happen when email confirmations are disabled
        throw new Error('No session after sign-up. Enable “Disable email confirmations”.');
      }

      const userId = signUpData.user.id;

      // ---- 3. Insert profile row (RLS now sees auth.uid() = userId) -----
      if (formData.role === 'patient') {
        const { error: patientErr } = await supabase.from('patients').insert({
          user_id: userId,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: '',
          date_of_birth: formData.dateOfBirth || null,
        });

        if (patientErr) throw patientErr;
      } else {
        const { error: hospitalErr } = await supabase.from('hospitals').insert({
          user_id: userId,
          email: formData.email,
          name: formData.hospitalName,
          phone: formData.contactPhone,
          address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          registration_number: formData.licenseNumber,
        });

        if (hospitalErr) throw hospitalErr;
      }

      // ---- Success -------------------------------------------------------
      toast({
        title: 'Account Created!',
        description: 'You are now logged in. Welcome to AidPoint!',
      });
      navigate('/dashboard'); // or wherever you want after registration
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: friendlyError(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------
  // Input handlers
  // ------------------------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value as 'patient' | 'hospital',
    }));
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-white p-2 rounded-lg">
              <img src="/src/assets/logo.png" alt="AidPoint Logo" className="h-8 w-auto" />
            </div>
            <span className="text-2xl font-bold text-white">AidPoint</span>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="shadow-strong animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <p className="text-muted-foreground">
              Join AidPoint to access quality healthcare
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ---- Account Type ---- */}
              <div>
                <Label className="text-base font-medium">Account Type</Label>
                <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="mt-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value="patient" id="patient" />
                    <User className="h-4 w-4" />
                    <Label htmlFor="patient" className="flex-1 cursor-pointer">
                      Patient - Find doctors and book appointments
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value="hospital" id="hospital" />
                    <Building className="h-4 w-4" />
                    <Label htmlFor="hospital" className="flex-1 cursor-pointer">
                      Hospital - Manage operations and doctors
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* ---- Dynamic role fields ---- */}
              {formData.role === 'patient' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      name="hospitalName"
                      required
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      placeholder="Enter hospital name"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        required
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        placeholder="Hospital license number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        placeholder="Primary contact name"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      required
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ---- Email ---- */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              {/* ---- Password ---- */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* ---- Confirm Password ---- */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* ---- Submit ---- */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* ---- Login link ---- */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* ---- Terms ---- */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link to="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ---- Back home ---- */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;