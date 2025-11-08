'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { useEffect } from 'react';

const StarIcon = () => (
  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      if (user.role === 'pharmacist') {
        router.push('/pharmacist-dashboard');
      } else if (user.profileComplete) {
        router.push('/home');
      } else {
        router.push('/setup-profile');
      }
    }
  }, [user, isUserLoading, router]);

  const handleGetStarted = () => {
    router.push('/language');
  };

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
        {/* Left side - Text content */}
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:flex-1 lg:py-20 lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="block">Your Personal</span>
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Pharmacy Assistant
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 sm:max-w-3xl">
            Never miss a dose again with our smart medication management system. Get timely reminders, track your prescriptions, and stay on top of your health.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button 
              onClick={handleGetStarted}
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-100 hover:shadow-blue-200"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12">
            <p className="text-sm font-medium text-gray-500">TRUSTED BY THOUSANDS OF USERS</p>
            <div className="mt-6 flex flex-wrap justify-center gap-8 lg:justify-start">
              {['4.9/5', '100K+ Downloads', '24/7 Support'].map((item) => (
                <div key={item} className="flex items-center">
                  <StarIcon />
                  <span className="ml-2 text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative mt-16 lg:mt-0 lg:flex-1">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90"></div>
            <div className="relative flex items-center justify-center p-8">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold">Your Health,</h3>
                <h3 className="mb-6 text-2xl font-bold">Our Priority</h3>
                <p className="mb-8 text-blue-100">
                  Join thousands of users managing their medications with ease
                </p>
                <Button 
                  variant="outline" 
                  className="border-2 border-white bg-transparent text-white hover:bg-white/10"
                >
                  Download Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
