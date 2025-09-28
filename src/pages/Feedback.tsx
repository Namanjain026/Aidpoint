import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Star, Send, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const Feedback = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [feedbackData, setFeedbackData] = useState({
    category: '',
    rating: '',
    subject: '',
    message: '',
    email: user?.email || '',
    name: user?.name || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingClick = (rating: string) => {
    setFeedbackData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!feedbackData.category || !feedbackData.rating || !feedbackData.subject || !feedbackData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Here you would typically send the feedback to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // You can integrate with your backend here:
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(feedbackData)
      // });

      setIsSubmitted(true);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it and get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 pt-20 pb-12 relative overflow-x-hidden">
          {/* Medical background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Medical cross pattern */}
            <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.05] overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMaxYMax slice"
                className="text-blue-600"
              >
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
                  <circle
                    cx="700"
                    cy="200"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M690,200 L710,200 M700,190 L700,210"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle cx="400" cy="600" r="25" />
                  <circle
                    cx="400"
                    cy="600"
                    r="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M392,600 L408,600 M400,592 L400,608"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>

            {/* Animated floating medical elements */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Card className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl">
              <CardContent className="pt-16 pb-16 text-center">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h2>
                  <p className="text-gray-700 text-lg">
                    Your feedback has been submitted successfully.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 text-sm">
                    We appreciate you taking the time to share your thoughts with us. 
                    Our team will review your feedback and may reach out to you if we need any clarification.
                  </p>
                </div>
                <Button 
                  onClick={() => window.history.back()} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 pt-20 pb-12 relative overflow-x-hidden">
        {/* Medical background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Medical cross pattern */}
          <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.05] overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 800"
              preserveAspectRatio="xMaxYMax slice"
              className="text-blue-600"
            >
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
                <circle
                  cx="700"
                  cy="200"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M690,200 L710,200 M700,190 L700,210"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle cx="400" cy="600" r="25" />
                <circle
                  cx="400"
                  cy="600"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M392,600 L408,600 M400,592 L400,608"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>

          {/* Animated floating medical elements */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              We Value Your Feedback
            </h1>
            <p className="text-gray-700 text-lg">
              Help us improve AidPoint by sharing your experience and suggestions
            </p>
          </div>

          <Card className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">
                Share Your Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={feedbackData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={feedbackData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Feedback Category */}
                <div>
                  <Label htmlFor="category">Feedback Category *</Label>
                  <Select value={feedbackData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Feedback</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="usability">User Experience</SelectItem>
                      <SelectItem value="appointment">Appointment System</SelectItem>
                      <SelectItem value="hospital">Hospital Services</SelectItem>
                      <SelectItem value="doctor">Doctor Services</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <Label className="text-base font-medium">Overall Rating *</Label>
                  <p className="text-sm text-gray-700 mb-3">
                    How would you rate your overall experience with AidPoint?
                  </p>
                  <RadioGroup 
                    value={feedbackData.rating} 
                    onValueChange={(value) => handleInputChange('rating', value)}
                    className="flex flex-wrap gap-4"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label 
                          htmlFor={`rating-${rating}`} 
                          className="flex items-center cursor-pointer"
                        >
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm">
                            {rating === 1 ? 'Poor' : 
                             rating === 2 ? 'Fair' : 
                             rating === 3 ? 'Good' : 
                             rating === 4 ? 'Very Good' : 'Excellent'}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={feedbackData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief summary of your feedback"
                    className="mt-1"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Your Feedback *</Label>
                  <Textarea
                    id="message"
                    value={feedbackData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please share your detailed feedback, suggestions, or report any issues you've encountered..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 sm:w-auto flex-1 sm:flex-none"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-700">
              Your feedback is important to us. We read every submission and use your input to improve our services.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Feedback;