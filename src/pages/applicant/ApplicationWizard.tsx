import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ChevronRightIcon, ChevronLeftIcon, SaveIcon, AlertCircleIcon, UploadIcon } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
// Define the steps of the application wizard
const steps = [{
  id: 'personal',
  name: 'Personal Information'
}, {
  id: 'education',
  name: 'Education History'
}, {
  id: 'financial',
  name: 'Financial Information'
}, {
  id: 'program',
  name: 'Program Questions'
}, {
  id: 'essays',
  name: 'Essays'
}, {
  id: 'documents',
  name: 'Documents'
}, {
  id: 'review',
  name: 'Review & Submit'
}];
// Mock program data
const programData = {
  id: '1',
  name: 'National Merit Scholarship',
  description: 'Merit-based scholarship for outstanding undergraduate students with exceptional academic achievements.',
  deadline: '2023-12-31',
  funding: '$10,000 per year',
  eligibility: 'GPA 3.5+, Citizenship required'
};
export const ApplicationWizard: React.FC = () => {
  const {
    programId
  } = useParams<{
    programId: string;
  }>();
  const navigate = useNavigate();
  const {
    addNotification
  } = useNotification();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      citizenship: '',
      idNumber: ''
    },
    // Education History
    education: {
      highSchool: '',
      highSchoolGraduationYear: '',
      highSchoolGPA: '',
      university: '',
      universityGraduationYear: '',
      universityGPA: '',
      major: '',
      degree: '',
      currentLevel: ''
    },
    // Financial Information
    financial: {
      householdIncome: '',
      dependents: '',
      employmentStatus: '',
      otherScholarships: '',
      financialNeed: ''
    },
    // Program Specific Questions
    program: {
      researchInterest: '',
      careerGoals: '',
      communityService: '',
      leadershipExperience: ''
    },
    // Essays
    essays: {
      personalStatement: '',
      academicGoals: '',
      impactStatement: ''
    },
    // Documents
    documents: {
      transcripts: null,
      idDocument: null,
      recommendationLetters: null,
      additionalDocuments: null
    }
  });
  // Auto-save form data every 30 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      handleAutoSave();
    }, 30000);
    return () => clearInterval(saveInterval);
  }, [formData]);
  const handleAutoSave = () => {
    // In a real app, this would save to backend
    console.log('Auto-saving form data:', formData);
  };
  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value
      }
    });
  };
  const handleFileChange = (section: string, field: string, file: File | null) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: file
      }
    });
  };
  const handleSaveAndExit = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      addNotification({
        type: 'success',
        message: 'Your application has been saved. You can continue later.'
      });
      navigate('/applicant/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to save your application. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would submit to backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      addNotification({
        type: 'success',
        message: 'Your application has been submitted successfully!'
      });
      navigate('/applicant/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to submit your application. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };
  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'personal':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="firstName" name="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.firstName} onChange={e => handleInputChange('personal', 'firstName', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="lastName" name="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.lastName} onChange={e => handleInputChange('personal', 'lastName', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.email} onChange={e => handleInputChange('personal', 'email', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" id="phone" name="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.phone} onChange={e => handleInputChange('personal', 'phone', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.dateOfBirth} onChange={e => handleInputChange('personal', 'dateOfBirth', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select id="gender" name="gender" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.gender} onChange={e => handleInputChange('personal', 'gender', e.target.value)}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <input type="text" id="address" name="address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.address} onChange={e => handleInputChange('personal', 'address', e.target.value)} required />
              </div>
              <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="city" name="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.city} onChange={e => handleInputChange('personal', 'city', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="state" name="state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.state} onChange={e => handleInputChange('personal', 'state', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    Postal/ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="zipCode" name="zipCode" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.zipCode} onChange={e => handleInputChange('personal', 'zipCode', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select id="country" name="country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.country} onChange={e => handleInputChange('personal', 'country', e.target.value)} required>
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="KE">Kenya</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                    <option value="ZA">South Africa</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="citizenship" className="block text-sm font-medium text-gray-700">
                    Citizenship Status <span className="text-red-500">*</span>
                  </label>
                  <select id="citizenship" name="citizenship" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.citizenship} onChange={e => handleInputChange('personal', 'citizenship', e.target.value)} required>
                    <option value="">Select citizenship status</option>
                    <option value="citizen">Citizen</option>
                    <option value="permanent-resident">
                      Permanent Resident
                    </option>
                    <option value="foreign-national">Foreign National</option>
                    <option value="refugee">Refugee</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                    National ID / Passport Number{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="idNumber" name="idNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.personal.idNumber} onChange={e => handleInputChange('personal', 'idNumber', e.target.value)} required />
                </div>
              </div>
            </div>
          </div>;
      case 'education':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Education History
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="highSchool" className="block text-sm font-medium text-gray-700">
                    High School Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="highSchool" name="highSchool" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.highSchool} onChange={e => handleInputChange('education', 'highSchool', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="highSchoolGraduationYear" className="block text-sm font-medium text-gray-700">
                    High School Graduation Year{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select id="highSchoolGraduationYear" name="highSchoolGraduationYear" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.highSchoolGraduationYear} onChange={e => handleInputChange('education', 'highSchoolGraduationYear', e.target.value)} required>
                    <option value="">Select year</option>
                    {Array.from({
                    length: 20
                  }, (_, i) => new Date().getFullYear() - i).map(year => <option key={year} value={year.toString()}>
                        {year}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="highSchoolGPA" className="block text-sm font-medium text-gray-700">
                    High School GPA <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="highSchoolGPA" name="highSchoolGPA" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., 3.8" value={formData.education.highSchoolGPA} onChange={e => handleInputChange('education', 'highSchoolGPA', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                    University/College Name
                  </label>
                  <input type="text" id="university" name="university" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.university} onChange={e => handleInputChange('education', 'university', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="universityGraduationYear" className="block text-sm font-medium text-gray-700">
                    University Graduation Year (Expected)
                  </label>
                  <select id="universityGraduationYear" name="universityGraduationYear" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.universityGraduationYear} onChange={e => handleInputChange('education', 'universityGraduationYear', e.target.value)}>
                    <option value="">Select year</option>
                    {Array.from({
                    length: 10
                  }, (_, i) => new Date().getFullYear() + i).map(year => <option key={year} value={year.toString()}>
                        {year}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="universityGPA" className="block text-sm font-medium text-gray-700">
                    University GPA (if applicable)
                  </label>
                  <input type="text" id="universityGPA" name="universityGPA" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., 3.5" value={formData.education.universityGPA} onChange={e => handleInputChange('education', 'universityGPA', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                    Major/Field of Study
                  </label>
                  <input type="text" id="major" name="major" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.major} onChange={e => handleInputChange('education', 'major', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                    Degree Type
                  </label>
                  <select id="degree" name="degree" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.degree} onChange={e => handleInputChange('education', 'degree', e.target.value)}>
                    <option value="">Select degree</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="doctorate">Doctorate</option>
                    <option value="associate">Associate's</option>
                    <option value="diploma">Diploma</option>
                    <option value="certificate">Certificate</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="currentLevel" className="block text-sm font-medium text-gray-700">
                    Current Education Level{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select id="currentLevel" name="currentLevel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.education.currentLevel} onChange={e => handleInputChange('education', 'currentLevel', e.target.value)} required>
                    <option value="">Select level</option>
                    <option value="high-school">High School Student</option>
                    <option value="high-school-graduate">
                      High School Graduate
                    </option>
                    <option value="undergraduate">Undergraduate Student</option>
                    <option value="graduate">Graduate Student</option>
                    <option value="doctorate">Doctorate Student</option>
                  </select>
                </div>
              </div>
            </div>
          </div>;
      case 'financial':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Financial Information
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                This information is used to assess your financial need and
                eligibility for this scholarship. All information provided is
                kept confidential and secure.
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="householdIncome" className="block text-sm font-medium text-gray-700">
                    Annual Household Income{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select id="householdIncome" name="householdIncome" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.financial.householdIncome} onChange={e => handleInputChange('financial', 'householdIncome', e.target.value)} required>
                    <option value="">Select income range</option>
                    <option value="below-25000">Below $25,000</option>
                    <option value="25000-50000">$25,000 - $50,000</option>
                    <option value="50000-75000">$50,000 - $75,000</option>
                    <option value="75000-100000">$75,000 - $100,000</option>
                    <option value="above-100000">Above $100,000</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">
                    Number of Dependents <span className="text-red-500">*</span>
                  </label>
                  <select id="dependents" name="dependents" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.financial.dependents} onChange={e => handleInputChange('financial', 'dependents', e.target.value)} required>
                    <option value="">Select</option>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map(num => <option key={num} value={num.toString()}>
                        {num}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">
                    Employment Status <span className="text-red-500">*</span>
                  </label>
                  <select id="employmentStatus" name="employmentStatus" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.financial.employmentStatus} onChange={e => handleInputChange('financial', 'employmentStatus', e.target.value)} required>
                    <option value="">Select status</option>
                    <option value="full-time">Employed Full-Time</option>
                    <option value="part-time">Employed Part-Time</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="student">Full-Time Student</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="otherScholarships" className="block text-sm font-medium text-gray-700">
                    Other Scholarships/Financial Aid{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select id="otherScholarships" name="otherScholarships" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={formData.financial.otherScholarships} onChange={e => handleInputChange('financial', 'otherScholarships', e.target.value)} required>
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="partial">Partial Scholarship/Aid</option>
                    <option value="full">Full Scholarship/Aid</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="financialNeed" className="block text-sm font-medium text-gray-700">
                  Statement of Financial Need{' '}
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-1 mb-2">
                  Please explain your financial circumstances and why you need
                  this scholarship (300-500 words).
                </p>
                <textarea id="financialNeed" name="financialNeed" rows={6} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Explain your financial need here..." value={formData.financial.financialNeed} onChange={e => handleInputChange('financial', 'financialNeed', e.target.value)} required />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.financial.financialNeed.length} characters
                  (recommended: 1500-2500 characters)
                </p>
              </div>
            </div>
          </div>;
      case 'program':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Program-Specific Questions
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Please answer the following questions specific to the{' '}
                {programData.name} program.
              </p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="researchInterest" className="block text-sm font-medium text-gray-700">
                    Research Interests <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Describe your primary research interests and how they align
                    with this scholarship program.
                  </p>
                  <textarea id="researchInterest" name="researchInterest" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Describe your research interests..." value={formData.program.researchInterest} onChange={e => handleInputChange('program', 'researchInterest', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700">
                    Career Goals <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    What are your long-term career goals and how will this
                    scholarship help you achieve them?
                  </p>
                  <textarea id="careerGoals" name="careerGoals" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Describe your career goals..." value={formData.program.careerGoals} onChange={e => handleInputChange('program', 'careerGoals', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="communityService" className="block text-sm font-medium text-gray-700">
                    Community Service Experience{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Describe any community service or volunteer work you have
                    done in the last 3 years.
                  </p>
                  <textarea id="communityService" name="communityService" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Describe your community service experience..." value={formData.program.communityService} onChange={e => handleInputChange('program', 'communityService', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="leadershipExperience" className="block text-sm font-medium text-gray-700">
                    Leadership Experience{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Describe your leadership roles and experiences that
                    demonstrate your leadership abilities.
                  </p>
                  <textarea id="leadershipExperience" name="leadershipExperience" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Describe your leadership experience..." value={formData.program.leadershipExperience} onChange={e => handleInputChange('program', 'leadershipExperience', e.target.value)} required />
                </div>
              </div>
            </div>
          </div>;
      case 'essays':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Essays</h3>
              <p className="text-sm text-gray-500 mb-6">
                Please complete the following essays. Your responses will be
                evaluated on content, clarity, and writing quality.
              </p>
              <div className="space-y-8">
                <div>
                  <label htmlFor="personalStatement" className="block text-sm font-medium text-gray-700">
                    Personal Statement <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Tell us about yourself, your background, and what makes you
                    unique. How have your experiences shaped who you are today?
                    (500-750 words)
                  </p>
                  <textarea id="personalStatement" name="personalStatement" rows={8} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Write your personal statement here..." value={formData.essays.personalStatement} onChange={e => handleInputChange('essays', 'personalStatement', e.target.value)} required />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.essays.personalStatement.length} characters
                    (recommended: 2500-3750 characters)
                  </p>
                </div>
                <div>
                  <label htmlFor="academicGoals" className="block text-sm font-medium text-gray-700">
                    Academic and Career Goals{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Describe your academic interests and career aspirations. How
                    will this scholarship help you achieve these goals? (400-600
                    words)
                  </p>
                  <textarea id="academicGoals" name="academicGoals" rows={6} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Write about your academic and career goals here..." value={formData.essays.academicGoals} onChange={e => handleInputChange('essays', 'academicGoals', e.target.value)} required />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.essays.academicGoals.length} characters
                    (recommended: 2000-3000 characters)
                  </p>
                </div>
                <div>
                  <label htmlFor="impactStatement" className="block text-sm font-medium text-gray-700">
                    Impact Statement <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    How do you plan to use your education to make a positive
                    impact in your community or field? (300-500 words)
                  </p>
                  <textarea id="impactStatement" name="impactStatement" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Write your impact statement here..." value={formData.essays.impactStatement} onChange={e => handleInputChange('essays', 'impactStatement', e.target.value)} required />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.essays.impactStatement.length} characters
                    (recommended: 1500-2500 characters)
                  </p>
                </div>
              </div>
            </div>
          </div>;
      case 'documents':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Required Documents
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Please upload the following required documents. Accepted
                formats: PDF, DOCX, JPG (max 10MB per file).
              </p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="transcripts" className="block text-sm font-medium text-gray-700">
                    Academic Transcripts <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Upload your most recent academic transcripts. If you have
                    multiple, combine them into a single PDF.
                  </p>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      {formData.documents.transcripts ? <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div> : <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <UploadIcon className="h-6 w-6" />
                        </div>}
                    </span>
                    <input type="file" id="transcripts" name="transcripts" className="hidden" accept=".pdf,.docx,.jpg,.jpeg,.png" onChange={e => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange('documents', 'transcripts', file);
                  }} />
                    <label htmlFor="transcripts" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      {formData.documents.transcripts ? 'Replace file' : 'Upload file'}
                    </label>
                    {formData.documents.transcripts && <span className="ml-4 text-sm text-gray-500">
                        {formData.documents.transcripts.name}
                      </span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700">
                    ID Document <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Upload a copy of your national ID, passport, or other
                    government-issued ID.
                  </p>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      {formData.documents.idDocument ? <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div> : <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <UploadIcon className="h-6 w-6" />
                        </div>}
                    </span>
                    <input type="file" id="idDocument" name="idDocument" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange('documents', 'idDocument', file);
                  }} />
                    <label htmlFor="idDocument" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      {formData.documents.idDocument ? 'Replace file' : 'Upload file'}
                    </label>
                    {formData.documents.idDocument && <span className="ml-4 text-sm text-gray-500">
                        {formData.documents.idDocument.name}
                      </span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="recommendationLetters" className="block text-sm font-medium text-gray-700">
                    Recommendation Letters{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Upload at least two recommendation letters from teachers,
                    professors, or employers.
                  </p>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      {formData.documents.recommendationLetters ? <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div> : <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <UploadIcon className="h-6 w-6" />
                        </div>}
                    </span>
                    <input type="file" id="recommendationLetters" name="recommendationLetters" className="hidden" accept=".pdf,.docx" onChange={e => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange('documents', 'recommendationLetters', file);
                  }} />
                    <label htmlFor="recommendationLetters" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      {formData.documents.recommendationLetters ? 'Replace file' : 'Upload file'}
                    </label>
                    {formData.documents.recommendationLetters && <span className="ml-4 text-sm text-gray-500">
                        {formData.documents.recommendationLetters.name}
                      </span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="additionalDocuments" className="block text-sm font-medium text-gray-700">
                    Additional Supporting Documents (Optional)
                  </label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Upload any additional documents that support your
                    application (e.g., certificates, awards, portfolio).
                  </p>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      {formData.documents.additionalDocuments ? <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div> : <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <UploadIcon className="h-6 w-6" />
                        </div>}
                    </span>
                    <input type="file" id="additionalDocuments" name="additionalDocuments" className="hidden" accept=".pdf,.docx,.jpg,.jpeg,.png" onChange={e => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange('documents', 'additionalDocuments', file);
                  }} />
                    <label htmlFor="additionalDocuments" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      {formData.documents.additionalDocuments ? 'Replace file' : 'Upload file'}
                    </label>
                    {formData.documents.additionalDocuments && <span className="ml-4 text-sm text-gray-500">
                        {formData.documents.additionalDocuments.name}
                      </span>}
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Document Guidelines
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>All documents must be clear and legible</li>
                        <li>Maximum file size: 10MB per document</li>
                        <li>Acceptable formats: PDF, DOCX, JPG, PNG</li>
                        <li>
                          Documents in languages other than English must include
                          certified translations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      case 'review':
        return <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Review Your Application
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Please review all the information you've provided before
                submitting your application. Make sure everything is accurate
                and complete.
              </p>
              <div className="space-y-8">
                {/* Personal Information Summary */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded">
                      1
                    </span>
                    Personal Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Full Name
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.personal.firstName}{' '}
                          {formData.personal.lastName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.personal.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.personal.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Date of Birth
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.personal.dateOfBirth}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.personal.address}, {formData.personal.city},{' '}
                          {formData.personal.state} {formData.personal.zipCode},{' '}
                          {formData.personal.country}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Citizenship
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.personal.citizenship}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500" onClick={() => setCurrentStep(0)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                {/* Education Summary */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded">
                      2
                    </span>
                    Education History
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          High School
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.education.highSchool}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          High School GPA
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.education.highSchoolGPA}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          University/College
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.education.university || 'N/A'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          University GPA
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.education.universityGPA || 'N/A'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Major/Field of Study
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.education.major || 'N/A'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Current Education Level
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.education.currentLevel}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500" onClick={() => setCurrentStep(1)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                {/* Financial Summary */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded">
                      3
                    </span>
                    Financial Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Household Income
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.financial.householdIncome}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Number of Dependents
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.financial.dependents}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Employment Status
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.financial.employmentStatus}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Other Financial Aid
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formData.financial.otherScholarships}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500" onClick={() => setCurrentStep(2)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                {/* Essays Summary */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded">
                      4 & 5
                    </span>
                    Program Questions & Essays
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">
                      You have completed the following essays:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-900 space-y-1">
                      <li>
                        Personal Statement (
                        {formData.essays.personalStatement.length} characters)
                      </li>
                      <li>
                        Academic and Career Goals (
                        {formData.essays.academicGoals.length} characters)
                      </li>
                      <li>
                        Impact Statement (
                        {formData.essays.impactStatement.length} characters)
                      </li>
                    </ul>
                    <div className="mt-3 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500 mr-4" onClick={() => setCurrentStep(3)}>
                        Edit Program Questions
                      </button>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500" onClick={() => setCurrentStep(4)}>
                        Edit Essays
                      </button>
                    </div>
                  </div>
                </div>
                {/* Documents Summary */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded">
                      6
                    </span>
                    Documents
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">
                      You have uploaded the following documents:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-900 space-y-1">
                      <li>
                        Academic Transcripts:
                        {formData.documents.transcripts ? <span className="text-green-600 ml-1">Uploaded</span> : <span className="text-red-600 ml-1">Missing</span>}
                      </li>
                      <li>
                        ID Document:
                        {formData.documents.idDocument ? <span className="text-green-600 ml-1">Uploaded</span> : <span className="text-red-600 ml-1">Missing</span>}
                      </li>
                      <li>
                        Recommendation Letters:
                        {formData.documents.recommendationLetters ? <span className="text-green-600 ml-1">Uploaded</span> : <span className="text-red-600 ml-1">Missing</span>}
                      </li>
                      <li>
                        Additional Documents:
                        {formData.documents.additionalDocuments ? <span className="text-green-600 ml-1">Uploaded</span> : <span className="text-gray-500 ml-1">Optional</span>}
                      </li>
                    </ul>
                    <div className="mt-3 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500" onClick={() => setCurrentStep(5)}>
                        Edit Documents
                      </button>
                    </div>
                  </div>
                </div>
                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="terms" name="terms" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">
                        I certify that all information provided is true and
                        accurate
                      </label>
                      <p className="text-gray-500">
                        By submitting this application, I certify that all
                        information and documents provided are true, complete,
                        and accurate to the best of my knowledge. I understand
                        that any false or misleading information may result in
                        disqualification from this scholarship program.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Before you submit
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Please ensure that all required fields are completed
                          and all necessary documents are uploaded. Once
                          submitted, you will not be able to make changes to
                          your application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="max-w-4xl mx-auto">
      {/* Program Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {programData.name}
        </h1>
        <p className="text-gray-600 mb-4">{programData.description}</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700">
            Funding: {programData.funding}
          </div>
          <div className="bg-red-50 px-3 py-1 rounded-full text-sm text-red-700">
            Deadline: {new Date(programData.deadline).toLocaleDateString()}
          </div>
          <div className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-700">
            Eligibility: {programData.eligibility}
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step, index) => <li key={step.id} className="md:flex-1">
              <button onClick={() => setCurrentStep(index)} className={`group pl-4 py-2 flex flex-col border-l-4 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 w-full text-left ${index < currentStep ? 'border-blue-600 hover:border-blue-800' : index === currentStep ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                <span className={`text-xs font-semibold tracking-wide uppercase ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                  Step {index + 1}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            </li>)}
        </ol>
      </nav>
      {/* Form Content */}
      <div className="mb-8">{renderStepContent()}</div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 border-t border-gray-200 pt-6">
        <div>
          {currentStep > 0 && <button type="button" onClick={handlePrevious} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="flex items-center">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Previous
              </div>
            </button>}
        </div>
        <div className="flex space-x-3">
          <button type="button" onClick={handleSaveAndExit} disabled={isSaving} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <div className="flex items-center">
              <SaveIcon className="h-5 w-5 mr-1" />
              Save & Exit
            </div>
          </button>
          {currentStep < steps.length - 1 ? <button type="button" onClick={handleNext} className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="flex items-center">
                Next
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </div>
            </button> : <button type="button" onClick={handleSubmit} disabled={isSaving} className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isSaving ? <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div> : 'Submit Application'}
            </button>}
        </div>
      </div>
      {/* Auto-save indicator */}
      <div className="text-xs text-gray-500 text-center mt-4">
        Your progress is automatically saved every 30 seconds.
      </div>
    </div>;
};