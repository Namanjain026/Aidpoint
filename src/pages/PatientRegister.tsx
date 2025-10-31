import { useState } from 'react';
import { Eye, EyeOff, Heart, AlertCircle, CheckCircle } from 'lucide-react';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  type FormFields = 'email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName' | 'phone' | 'dateOfBirth';

  const [errors, setErrors] = useState<Partial<Record<FormFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormFields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const passwordStrength = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecial: /[!@#$%^&*]/.test(formData.password),
  };

  const passwordScore = Object.values(passwordStrength).filter(Boolean).length;
  const isPasswordStrong = passwordScore >= 3;

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length < 2 ? 'Must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10) return 'Phone number must be at least 10 digits';
        if (digitsOnly.length > 15) return 'Phone number is too long';
        return '';
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        return age < 18 ? 'Must be 18 years or older' : '';
      case 'password':
        return !isPasswordStrong && value.length > 0 ? 'Password is not strong enough' : '';
      case 'confirmPassword':
        return value !== formData.password && value.length > 0 ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Do not sanitize/format while typing to avoid caret/typing glitches
    setFormData((prev) => ({ ...prev, [name]: value }));
    // If field already touched, live-validate current raw value
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    // Light sanitize phone after user finishes typing
    if (name === 'phone') {
      const sanitized = value.replace(/[^\d\s\-+()]/g, '');
      if (sanitized !== value) {
        value = sanitized;
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsLoading(false);
    
    setTimeout(() => {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
      });
      setErrors({});
      setTouched({});
      setSubmitted(false);
    }, 2000);
  };

  const isFormValid = Object.keys(formData).every(key => {
    const value = formData[key];
    return value && value.toString().trim() !== '' && !validateField(key, value);
  });

  const InputField = ({ name, label, type = 'text', placeholder }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={(formData[name] ?? '').toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={
            name === 'email'
              ? 'email'
              : name === 'password' || name === 'confirmPassword'
              ? 'new-password'
              : name === 'firstName'
              ? 'given-name'
              : name === 'lastName'
              ? 'family-name'
              : name === 'phone'
              ? 'tel'
              : 'on'
          }
          {...(name === 'phone' ? { inputMode: 'tel', pattern: '[0-9+()\-\s]*', maxLength: 20 } : {})}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none transition-all duration-300 ${
            errors[name] && touched[name]
              ? 'border-red-400 focus:border-red-500 bg-red-50/50'
              : 'border-gray-200 focus:border-blue-400 bg-white'
          }`}
        />
        {touched[name] && !errors[name] && formData[name] && (
          <div className="absolute right-3 top-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>
      {errors[name] && touched[name] && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="space-y-3 text-center pb-6 pt-8 px-6 relative">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-3 shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm mt-2">Join us to manage your health journey</p>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-900">Registration Successful! 🎉</p>
                <p className="text-sm text-green-700">Check your email to verify your account.</p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <InputField name="firstName" label="First Name" placeholder="John" />
                <InputField name="lastName" label="Last Name" placeholder="Doe" />
              </div>

              {/* Email */}
              <InputField name="email" label="Email Address" type="email" placeholder="you@example.com" />

              {/* Phone */}
              <InputField name="phone" label="Phone Number" type="tel" placeholder="(555) 123-4567" />

              {/* Date of Birth */}
              <InputField name="dateOfBirth" label="Date of Birth" type="date" placeholder="YYYY-MM-DD" />

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter a strong password"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none transition-all ${
                      errors.password && touched.password
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50'
                        : 'border-gray-200 focus:border-blue-400 bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600">Password Strength</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${passwordScore <= 2 ? 'bg-red-500' : passwordScore === 3 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        <span className={`text-xs font-bold ${passwordScore <= 2 ? 'text-red-600' : passwordScore === 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {passwordScore <= 2 ? 'Weak' : passwordScore === 3 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${passwordScore <= 2 ? 'bg-red-500' : passwordScore === 3 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{width: `${(passwordScore / 5) * 100}%`}}></div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className={`${passwordStrength.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ At least 8 characters
                      </div>
                      <div className={`${passwordStrength.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ Uppercase letter
                      </div>
                      <div className={`${passwordStrength.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ Lowercase letter
                      </div>
                      <div className={`${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ Number
                      </div>
                      <div className={`${passwordStrength.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ Special character (!@#$%^&*)
                      </div>
                    </div>
                  </div>
                )}
                {errors.password && touched.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none transition-all ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50'
                        : 'border-gray-200 focus:border-blue-400 bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  isLoading || !isFormValid
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <Heart className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign in
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          By registering, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default PatientRegister;