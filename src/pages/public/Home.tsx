import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, BookOpenIcon, ClockIcon, AwardIcon, UserIcon, ShieldIcon } from 'lucide-react';
export const Home: React.FC = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Access Educational Opportunities Through Government Scholarships
              </h1>
              <p className="text-xl mb-8">
                Discover, apply, and track your applications for
                government-funded scholarships through our secure and
                transparent platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/scholarships" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg flex items-center justify-center">
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Find Scholarships
                </Link>
                <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-medium text-lg flex items-center justify-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  Create Account
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" alt="Students studying" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Use Our Scholarship Portal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines the entire scholarship application
              process, from discovery to award notification.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
                <SearchIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Opportunities</h3>
              <p className="text-gray-600">
                Browse through hundreds of scholarships filtered by field,
                level, and eligibility criteria.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
                <ClockIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">
                Complete applications with our step-by-step wizard and auto-save
                feature. No more paperwork.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Secure & Transparent
              </h3>
              <p className="text-gray-600">
                Your data is protected with end-to-end encryption, and our
                selection process is fair and transparent.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Document Management
              </h3>
              <p className="text-gray-600">
                Upload and manage all your educational documents in one secure
                place.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
                <UserIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Personalized Profile
              </h3>
              <p className="text-gray-600">
                Create a comprehensive profile that can be used across multiple
                applications.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
                <AwardIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your application status in real-time and receive timely
                notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting talented students with life-changing educational
              opportunities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600">Scholarships Awarded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600">Funding Distributed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Educational Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                50,000+
              </div>
              <div className="text-gray-600">Registered Users</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Create an account today to discover scholarships tailored to your
            educational background and career aspirations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium text-lg">
              Register Now
            </Link>
            <Link to="/scholarships" className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-md font-medium text-lg">
              Browse Scholarships
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students whose lives were changed through our
              scholarship programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="mb-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Student portrait" className="w-20 h-20 rounded-full object-cover mx-auto" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The scholarship I received through this platform allowed me to
                pursue my dream of studying medicine. The application process
                was straightforward and transparent."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-gray-500">
                Medical Student, University of Health Sciences
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="mb-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Student portrait" className="w-20 h-20 rounded-full object-cover mx-auto" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "As a first-generation college student, navigating financial aid
                was overwhelming. This platform guided me through each step and
                helped me secure funding for my education."
              </p>
              <div className="font-semibold">Michael Rodriguez</div>
              <div className="text-sm text-gray-500">
                Engineering Graduate, Tech Institute
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="mb-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Student portrait" className="w-20 h-20 rounded-full object-cover mx-auto" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The real-time status updates and notifications kept me informed
                throughout the entire process. I'm now studying abroad thanks to
                the scholarship I found here."
              </p>
              <div className="font-semibold">Emily Chen</div>
              <div className="text-sm text-gray-500">
                International Relations, Global University
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};