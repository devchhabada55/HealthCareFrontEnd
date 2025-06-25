import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

const ResponsiveDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overscroll-contain">
        {/* Mobile padding top to account for mobile nav header with enhanced responsive spacing */}
        <div className="pt-16 md:pt-0 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-4rem)]">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResponsiveDashboard;
