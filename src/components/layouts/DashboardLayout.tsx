import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NotificationContainer } from '../ui/NotificationContainer';
import { UserIcon, LogOutIcon, MenuIcon, XIcon, HomeIcon, FileTextIcon, InboxIcon, SettingsIcon, UsersIcon, BarChart2Icon, BookOpenIcon, ShieldIcon, AlertTriangleIcon } from 'lucide-react';
export const DashboardLayout: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  // Navigation links based on user role
  const getNavLinks = () => {
    switch (user?.role) {
      case 'applicant':
        return [{
          name: 'Dashboard',
          href: '/applicant/dashboard',
          icon: HomeIcon
        }, {
          name: 'My Applications',
          href: '/applicant/applications/list',
          icon: FileTextIcon
        }, {
          name: 'Documents',
          href: '/applicant/documents',
          icon: FileTextIcon
        }, {
          name: 'Messages',
          href: '/applicant/messages',
          icon: InboxIcon
        }, {
          name: 'Profile',
          href: '/applicant/profile',
          icon: UserIcon
        }];
      case 'reviewer':
        return [{
          name: 'Dashboard',
          href: '/reviewer/dashboard',
          icon: HomeIcon
        }, {
          name: 'Review Queue',
          href: '/reviewer/queue',
          icon: FileTextIcon
        }, {
          name: 'Profile',
          href: '/reviewer/profile',
          icon: UserIcon
        }];
      case 'admin':
        return [{
          name: 'Dashboard',
          href: '/admin/dashboard',
          icon: HomeIcon
        }, {
          name: 'Scholarships',
          href: '/admin/scholarships',
          icon: BookOpenIcon
        }, {
          name: 'Applications',
          href: '/admin/applications',
          icon: FileTextIcon
        }, {
          name: 'Users',
          href: '/admin/users',
          icon: UsersIcon
        }, {
          name: 'Reports',
          href: '/admin/reports',
          icon: BarChart2Icon
        }, {
          name: 'Settings',
          href: '/admin/settings',
          icon: SettingsIcon
        }];
      case 'superadmin':
        return [{
          name: 'Dashboard',
          href: '/superadmin/dashboard',
          icon: HomeIcon
        }, {
          name: 'Audit Logs',
          href: '/superadmin/audit',
          icon: AlertTriangleIcon
        }, {
          name: 'System Config',
          href: '/superadmin/configuration',
          icon: ShieldIcon
        }];
      default:
        return [];
    }
  };
  const navLinks = getNavLinks();
  return <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-blue-700 transition duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-6 text-white">
          <div className="text-xl font-bold">Scholarship Portal</div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-8 px-4">
          <div className="mb-8 flex items-center px-2">
            <div className="mr-4 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-blue-200">{user?.role}</div>
            </div>
          </div>
          <nav className="space-y-1">
            {navLinks.map(link => {
            const isActive = location.pathname === link.href;
            return <Link key={link.name} to={link.href} className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}>
                  <link.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                  {link.name}
                </Link>;
          })}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4">
          <button onClick={handleLogout} className="flex w-full items-center px-2 py-2 text-base font-medium text-blue-100 rounded-md hover:bg-blue-600 hover:text-white">
            <LogOutIcon className="mr-4 h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <button className="text-gray-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                  <span className="mr-2 text-sm">{user?.name}</span>
                  <UserIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <NotificationContainer />
    </div>;
};