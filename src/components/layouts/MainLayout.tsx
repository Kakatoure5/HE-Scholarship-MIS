import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import { NotificationContainer } from '../ui/NotificationContainer';
export const MainLayout: React.FC = () => {
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <NotificationContainer />
    </div>;
};