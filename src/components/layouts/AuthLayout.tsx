import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationContainer } from '../ui/NotificationContainer';
export const AuthLayout: React.FC = () => {
  return <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block lg:w-1/2 bg-blue-600 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl font-bold mb-6">
              Government Scholarship Portal
            </h1>
            <p className="text-xl mb-8">
              Access educational opportunities and secure your future through
              our comprehensive scholarship programs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-500 p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Secure application process</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-blue-500 p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Transparent selection process</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-blue-500 p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Real-time application status updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <NotificationContainer />
    </div>;
};