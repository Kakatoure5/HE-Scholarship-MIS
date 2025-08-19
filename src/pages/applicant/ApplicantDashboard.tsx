import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, FileTextIcon, BellIcon, SearchIcon, PlusIcon } from 'lucide-react';
// Mock data for applications
const applications = [{
  id: '1',
  programName: 'National Merit Scholarship',
  status: 'Under Review',
  submittedDate: '2023-09-15',
  deadline: '2023-10-30',
  progress: 100,
  statusColor: 'bg-yellow-500'
}, {
  id: '2',
  programName: 'STEM Excellence Grant',
  status: 'Draft',
  submittedDate: null,
  deadline: '2023-11-15',
  progress: 65,
  statusColor: 'bg-blue-500'
}, {
  id: '3',
  programName: 'Arts & Humanities Fellowship',
  status: 'Rejected',
  submittedDate: '2023-08-01',
  deadline: '2023-08-30',
  progress: 100,
  statusColor: 'bg-red-500'
}, {
  id: '4',
  programName: 'International Exchange Program',
  status: 'Approved',
  submittedDate: '2023-07-10',
  deadline: '2023-07-31',
  progress: 100,
  statusColor: 'bg-green-500'
}];
// Mock data for recommended scholarships
const recommendedScholarships = [{
  id: '5',
  title: 'Future Teachers Scholarship',
  deadline: '2023-10-30',
  match: '95%'
}, {
  id: '6',
  title: 'Healthcare Heroes Grant',
  deadline: '2023-11-30',
  match: '87%'
}, {
  id: '7',
  title: 'Digital Innovation Scholarship',
  deadline: '2023-12-15',
  match: '82%'
}];
// Mock data for notifications
const notifications = [{
  id: '1',
  message: 'Your application for National Merit Scholarship has moved to the review stage.',
  date: '2023-09-16',
  read: false
}, {
  id: '2',
  message: 'Reminder: Complete your STEM Excellence Grant application before the deadline.',
  date: '2023-09-14',
  read: true
}, {
  id: '3',
  message: 'Your Arts & Humanities Fellowship application has been reviewed and a decision has been made.',
  date: '2023-09-10',
  read: true
}];
export const ApplicantDashboard: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Under Review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Draft':
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, John!
        </h1>
        <p className="text-gray-600">
          Track your applications, discover new opportunities, and manage your
          scholarship journey.
        </p>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100">
              <FileTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">4</h3>
              <p className="text-sm text-gray-500">Total Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-yellow-100">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">1</h3>
              <p className="text-sm text-gray-500">Under Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">1</h3>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100">
              <SearchIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">3</h3>
              <p className="text-sm text-gray-500">Recommended</p>
            </div>
          </div>
        </div>
      </div>
      {/* Applications Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Applications
          </h2>
          <Link to="/scholarships" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            <PlusIcon className="h-4 w-4 mr-1" />
            New Application
          </Link>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map(application => <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.programName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(application.status)}
                        <span className="ml-2 text-sm text-gray-900">
                          {application.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {application.submittedDate ? formatDate(application.submittedDate) : 'Not submitted'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(application.deadline)}
                      </div>
                      {application.status === 'Draft' && <div className="text-xs text-red-600 font-medium">
                          {calculateDaysLeft(application.deadline)} days left
                        </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${application.statusColor}`} style={{
                      width: `${application.progress}%`
                    }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {application.progress}% Complete
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link to={`/applicant/applications/${application.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      {application.status === 'Draft' && <Link to={`/applicant/apply/${application.id}`} className="text-blue-600 hover:text-blue-900">
                          Continue
                        </Link>}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Scholarships */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recommended For You
            </h2>
            <Link to="/scholarships" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View All
            </Link>
          </div>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recommendedScholarships.map(scholarship => <li key={scholarship.id} className="p-4 hover:bg-gray-50">
                  <Link to={`/scholarships/${scholarship.id}`} className="block">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {scholarship.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Deadline: {formatDate(scholarship.deadline)}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full h-fit">
                        {scholarship.match} Match
                      </div>
                    </div>
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>
        {/* Recent Notifications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Notifications
            </h2>
            <Link to="/applicant/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View All
            </Link>
          </div>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {notifications.map(notification => <li key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex">
                    <div className={`flex-shrink-0 pt-0.5 ${!notification.read ? 'text-blue-500' : 'text-gray-400'}`}>
                      <BellIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm text-gray-900 ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(notification.date)}
                      </p>
                    </div>
                  </div>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>;
};