import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2Icon, TrendingUpIcon, UsersIcon, FileTextIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon, CalendarIcon, FilterIcon } from 'lucide-react';
// Mock data
const stats = [{
  name: 'Total Applications',
  value: '1,284',
  icon: FileTextIcon,
  color: 'bg-blue-500'
}, {
  name: 'Approved',
  value: '423',
  icon: CheckCircleIcon,
  color: 'bg-green-500'
}, {
  name: 'Under Review',
  value: '356',
  icon: ClockIcon,
  color: 'bg-yellow-500'
}, {
  name: 'Rejected',
  value: '289',
  icon: XCircleIcon,
  color: 'bg-red-500'
}, {
  name: 'Total Users',
  value: '2,541',
  icon: UsersIcon,
  color: 'bg-purple-500'
}, {
  name: 'Active Scholarships',
  value: '18',
  icon: CalendarIcon,
  color: 'bg-indigo-500'
}];
const recentApplications = [{
  id: '1',
  applicant: 'Sarah Johnson',
  program: 'National Merit Scholarship',
  submittedDate: '2023-09-18',
  status: 'Under Review',
  statusColor: 'bg-yellow-100 text-yellow-800'
}, {
  id: '2',
  applicant: 'Michael Rodriguez',
  program: 'STEM Excellence Grant',
  submittedDate: '2023-09-17',
  status: 'Under Review',
  statusColor: 'bg-yellow-100 text-yellow-800'
}, {
  id: '3',
  applicant: 'Emily Chen',
  program: 'International Exchange Program',
  submittedDate: '2023-09-16',
  status: 'Approved',
  statusColor: 'bg-green-100 text-green-800'
}, {
  id: '4',
  applicant: 'David Kim',
  program: 'Future Teachers Scholarship',
  submittedDate: '2023-09-15',
  status: 'Rejected',
  statusColor: 'bg-red-100 text-red-800'
}, {
  id: '5',
  applicant: 'Lisa Patel',
  program: 'Arts & Humanities Fellowship',
  submittedDate: '2023-09-14',
  status: 'Under Review',
  statusColor: 'bg-yellow-100 text-yellow-800'
}];
const alerts = [{
  id: '1',
  message: 'National Merit Scholarship deadline approaching in 5 days',
  type: 'warning'
}, {
  id: '2',
  message: '15 applications pending review for more than 7 days',
  type: 'alert'
}, {
  id: '3',
  message: 'System maintenance scheduled for September 25, 2023',
  type: 'info'
}];
export const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of scholarship applications, user statistics, and system
          alerts.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Applications Over Time */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Applications Over Time
            </h2>
            <div className="flex space-x-2">
              <button onClick={() => setDateRange('week')} className={`px-3 py-1 text-xs rounded-md ${dateRange === 'week' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Week
              </button>
              <button onClick={() => setDateRange('month')} className={`px-3 py-1 text-xs rounded-md ${dateRange === 'month' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Month
              </button>
              <button onClick={() => setDateRange('year')} className={`px-3 py-1 text-xs rounded-md ${dateRange === 'year' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Year
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* This would be a real chart in a production app */}
            <div className="text-center text-gray-500">
              <BarChart2Icon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p>Application trend visualization would appear here</p>
              <p className="text-sm mt-2">
                Showing data for the last {dateRange}
              </p>
            </div>
          </div>
        </div>
        {/* Demographics Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Demographics Breakdown
            </h2>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <FilterIcon className="h-4 w-4 mr-1" />
              Filter
            </button>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* This would be a real chart in a production app */}
            <div className="text-center text-gray-500">
              <TrendingUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p>Demographics visualization would appear here</p>
              <p className="text-sm mt-2">
                Showing gender, age, and location distribution
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Applications
                </h2>
                <Link to="/admin/applications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
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
                  {recentApplications.map(application => <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.applicant}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {application.program}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(application.submittedDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${application.statusColor}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link to={`/admin/applications/${application.id}`} className="text-blue-600 hover:text-blue-900">
                          Review
                        </Link>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* System Alerts */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                System Alerts
              </h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {alerts.map(alert => <li key={alert.id} className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {alert.type === 'warning' && <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />}
                      {alert.type === 'alert' && <AlertTriangleIcon className="h-5 w-5 text-red-500" />}
                      {alert.type === 'info' && <AlertTriangleIcon className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                  </div>
                </li>)}
            </ul>
            <div className="px-6 py-4 border-t border-gray-200">
              <Link to="/admin/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all alerts
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/applications/new" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <FileTextIcon className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Create New Scholarship
            </span>
          </Link>
          <Link to="/admin/users/new" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <UsersIcon className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Add New User
            </span>
          </Link>
          <Link to="/admin/reports/generate" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <BarChart2Icon className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Generate Report
            </span>
          </Link>
          <Link to="/admin/settings" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <FilterIcon className="h-8 w-8 text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              System Settings
            </span>
          </Link>
        </div>
      </div>
    </div>;
};