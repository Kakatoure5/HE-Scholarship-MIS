import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyMFA } from './pages/auth/VerifyMFA';
// Public Pages
import { Home } from './pages/public/Home';
import { ScholarshipDirectory } from './pages/public/ScholarshipDirectory';
import { ScholarshipDetails } from './pages/public/ScholarshipDetails';
import { AboutUs } from './pages/public/AboutUs';
import { Contact } from './pages/public/Contact';
import { FAQ } from './pages/public/FAQ';
// Applicant Pages
import { ApplicantDashboard } from './pages/applicant/ApplicantDashboard';
import { ApplicationWizard } from './pages/applicant/ApplicationWizard';
import { ApplicationStatus } from './pages/applicant/ApplicationStatus';
import { ApplicantProfile } from './pages/applicant/ApplicantProfile';
import { ApplicantDocuments } from './pages/applicant/ApplicantDocuments';
import { ApplicantMessages } from './pages/applicant/ApplicantMessages';
// Reviewer Pages
import { ReviewerDashboard } from './pages/reviewer/ReviewerDashboard';
import { ApplicationReview } from './pages/reviewer/ApplicationReview';
import { ReviewerQueue } from './pages/reviewer/ReviewerQueue';
import { ReviewerProfile } from './pages/reviewer/ReviewerProfile';
// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ScholarshipManagement } from './pages/admin/ScholarshipManagement';
import { UserManagement } from './pages/admin/UserManagement';
import { ApplicationManagement } from './pages/admin/ApplicationManagement';
import { ReportingAnalytics } from './pages/admin/ReportingAnalytics';
import { SystemSettings } from './pages/admin/SystemSettings';
// Super Admin Pages
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';
import { AuditLogs } from './pages/superadmin/AuditLogs';
import { SystemConfiguration } from './pages/superadmin/SystemConfiguration';
// Layout Components
import { MainLayout } from './components/layouts/MainLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';
// Error Pages
import { NotFound } from './pages/errors/NotFound';
import { Unauthorized } from './pages/errors/Unauthorized';
export function App() {
  return <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/scholarships" element={<ScholarshipDirectory />} />
              <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-mfa" element={<VerifyMFA />} />
            </Route>
            {/* Applicant Routes */}
            <Route element={<ProtectedRoute role="applicant" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
                <Route path="/applicant/apply/:programId" element={<ApplicationWizard />} />
                <Route path="/applicant/applications/:id" element={<ApplicationStatus />} />
                <Route path="/applicant/profile" element={<ApplicantProfile />} />
                <Route path="/applicant/documents" element={<ApplicantDocuments />} />
                <Route path="/applicant/messages" element={<ApplicantMessages />} />
              </Route>
            </Route>
            {/* Reviewer Routes */}
            <Route element={<ProtectedRoute role="reviewer" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
                <Route path="/reviewer/queue" element={<ReviewerQueue />} />
                <Route path="/reviewer/applications/:id" element={<ApplicationReview />} />
                <Route path="/reviewer/profile" element={<ReviewerProfile />} />
              </Route>
            </Route>
            {/* Admin Routes */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/scholarships" element={<ScholarshipManagement />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/applications" element={<ApplicationManagement />} />
                <Route path="/admin/reports" element={<ReportingAnalytics />} />
                <Route path="/admin/settings" element={<SystemSettings />} />
              </Route>
            </Route>
            {/* Super Admin Routes */}
            <Route element={<ProtectedRoute role="superadmin" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
                <Route path="/superadmin/audit" element={<AuditLogs />} />
                <Route path="/superadmin/configuration" element={<SystemConfiguration />} />
              </Route>
            </Route>
            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>;
}