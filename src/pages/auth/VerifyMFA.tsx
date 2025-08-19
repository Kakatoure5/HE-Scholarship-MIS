import React from 'react';
export const VerifyMFA: React.FC = () => {
  return <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Verify MFA</h1>
        <p className="mt-2 text-gray-600">
          Enter the verification code to continue
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-center text-gray-600">
          This is a placeholder for the Verify MFA page.
        </p>
      </div>
    </div>;
};