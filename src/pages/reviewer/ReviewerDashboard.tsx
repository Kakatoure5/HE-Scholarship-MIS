import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardIcon, CheckCircleIcon, ClockIcon, FileTextIcon, UserIcon, StarIcon, ChevronRightIcon, FilterIcon } from 'lucide-react';
// Mock data
const stats = [{
  name: 'Assigned Applications',
  value: '24',
  icon: ClipboardIcon,
  color: 'bg-blue-500'
}, {
  name: 'Completed Reviews',
  value: '18',
  icon: CheckCircleIcon,
  color: 'bg-green-500'
}, {
  name: 'Pending Reviews',
  value: '6',
  icon: ClockIcon,
  color: 'bg-yellow-500'
}];
const assignedApplications = [{
  id: '1',
  blindedCode: 'APP-2023-0472',
  program: 'National Merit Scholarship',
  assignedDate: '2023-09-15',
  dueDate: '2023-09-25',
  status: 'Pending',
  statusColor: 'bg-yellow-100 text-yellow-800'
}, {
  id: '2',
  blindedCode: 'APP-2023-0513',
  program: 'STEM Excellence Grant',
  assignedDate: '2023-09-14',
  dueDate: '2023-09-24',
  status: 'Pending',
  statusColor: 'bg-yellow-100 text-yellow-800'
}, {
  id: '3',
  blindedCode: 'APP-2023-0389',
  program: 'International Exchange Program',
  assignedDate: '2023-09-10',
  dueDate: '2023-09-20',
  status: 'Completed',
  statusColor: 'bg-green-100 text-green-800'
}, {
  id: '4',
  blindedCode: 'APP-2023-0427',
  program: 'Future Teachers Scholarship',
  assignedDate: '2023-09-08',
  dueDate: '2023-09-18',
  status: 'Completed',
  statusColor: 'bg-green-100 text-green-800'
}, {
  id: '5',
  blindedCode: 'APP-2023-0502',
  program: 'Arts & Humanities Fellowship',
  assignedDate: '2023-09-12',
  dueDate: '2023-09-22',
  status: 'Pending',
  statusColor: 'bg-yellow-100 text-yellow-800'
}];
const recentReviews = [{
  id: '1',
  blindedCode: 'APP-2023-0389',
  program: 'International Exchange Program',
  reviewedDate: '2023-09-15',
  score: '85/100',
  recommendation: 'Approve'
}, {
  id: '2',
  blindedCode: 'APP-2023-0427',
  program: 'Future Teachers Scholarship',
  reviewedDate: '2023-09-13',
  score: '92/100',
  recommendation: 'Approve'
}, {
  id: '3',
  blindedCode: 'APP-2023-0356',
  program: 'Healthcare Heroes Grant',
  reviewedDate: '2023-09-11',
  score: '78/100',
  recommendation: 'Consider'
}];
export const ReviewerDashboard: React.FC = () => {
  const [sortBy, setSortBy] = useState('dueDate');
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reviewer Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your assigned applications and track your review progress.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map(stat => <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className={`rounded-full p-3 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-500">{stat.name}</p>
              </div>
            </div>
          </div>)}
      </div>
      {/* Assigned Applications */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Assigned Applications
              </h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm text-gray-500 mr-2">
                    Sort by:
                  </label>
                  <select id="sort" name="sort" className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="dueDate">Due Date</option>
                    <option value="assignedDate">Assigned Date</option>
                    <option value="program">Program</option>
                  </select>
                </div>
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <FilterIcon className="h-4 w-4 mr-1" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignedApplications.map(application => <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.blindedCode}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {application.program}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(application.assignedDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(application.dueDate)}
                      </div>
                      {application.status === 'Pending' && <div className="text-xs text-red-600">
                          {calculateDaysLeft(application.dueDate)} days left
                        </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${application.statusColor}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {application.status === 'Pending' ? <Link to={`/reviewer/applications/${application.id}`} className="text-blue-600 hover:text-blue-900">
                          Review
                        </Link> : <Link to={`/reviewer/applications/${application.id}`} className="text-gray-600 hover:text-gray-900">
                          View
                        </Link>}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Link to="/reviewer/queue" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
              View all assigned applications
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reviews */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Reviews
              </h2>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentReviews.map(review => <li key={review.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {review.blindedCode}
                        </p>
                        <p className="text-sm text-gray-500">
                          {review.program}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Reviewed on {formatDate(review.reviewedDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {review.score}
                        </p>
                        <p className={`text-xs mt-1 ${review.recommendation === 'Approve' ? 'text-green-600' : review.recommendation === 'Consider' ? 'text-yellow-600' : 'text-red-600'}`}>
                          {review.recommendation}
                        </p>
                      </div>
                    </div>
                  </li>)}
              </ul>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <Link to="/reviewer/history" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                View all reviews
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        {/* Reviewer Profile */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Your Reviewer Profile
              </h2>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserIcon className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Dr. James Wilson
                  </h3>
                  <p className="text-sm text-gray-500">
                    Senior Reviewer • Engineering & Technology
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Expertise Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Computer Science
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Electrical Engineering
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Robotics
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Artificial Intelligence
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Review Statistics
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">98%</p>
                    <p className="text-xs text-gray-500">On-time Rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">4.9</p>
                    <p className="text-xs text-gray-500">Quality Score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">127</p>
                    <p className="text-xs text-gray-500">Total Reviews</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Rating
                </h4>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    <StarIcon className="h-5 w-5 fill-current" />
                    <StarIcon className="h-5 w-5 fill-current" />
                    <StarIcon className="h-5 w-5 fill-current" />
                    <StarIcon className="h-5 w-5 fill-current" />
                    <StarIcon className="h-5 w-5 fill-current" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Top Reviewer</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <Link to="/reviewer/profile" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Update profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};