import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Droplet, SmilePlus, Brain, Dna, Menu, X, BarChart3, Bell, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: number;
}

const MobileNavItem = ({ to, icon, label, onClick, badge }: MobileNavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out",
        "hover:bg-health-blue/10 active:bg-health-blue/20 active:scale-[0.98] touch-manipulation",
        "text-base min-h-[48px] relative group",
        "focus:outline-none focus:ring-2 focus:ring-health-blue/50 focus:ring-offset-2",
        isActive
          ? "bg-health-blue text-white hover:bg-health-blue active:bg-health-blue-dark shadow-lg shadow-health-blue/20"
          : "text-gray-700 hover:text-health-blue active:text-health-blue-dark"
      )}
    >
      <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </span>
      <span className="font-medium text-sm flex-1 truncate">{label}</span>
      {badge && badge > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center font-semibold animate-pulse">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );
};

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = localStorage.getItem('role') === 'admin';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 flex items-center justify-between shadow-sm backdrop-blur-md bg-white/95">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-health-blue truncate">
            Health Dashboard
          </h1>
        </div>
        <button 
          onClick={toggleMenu} 
          className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center relative"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <div className="relative w-6 h-6">
            <div className={cn(
              "absolute inset-0 transition-all duration-300 ease-in-out",
              isOpen ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
            )}>
              <Menu size={24} />
            </div>
            <div className={cn(
              "absolute inset-0 transition-all duration-300 ease-in-out",
              isOpen ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
            )}>
              <X size={24} />
            </div>
          </div>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Navigation Drawer */}
      <div
        id="mobile-navigation"
        className={cn(
          "md:hidden fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white z-50 transform transition-all duration-300 ease-out shadow-2xl",
          "overflow-y-auto overscroll-contain",
          "border-l border-gray-200",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="p-4 space-y-6 pb-8">
          {/* Dashboard Section */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3 font-semibold border-b border-gray-100 pb-2">
              Dashboard
            </p>
            <div className="space-y-1">
              <MobileNavItem 
                to={isAdmin ? "/" : "/dashboard"} 
                icon={<BarChart3 className="h-5 w-5" />} 
                label="Dashboard" 
                onClick={closeMenu} 
              />
            </div>
          </div>
          
          {/* Health Reports Section */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3 font-semibold border-b border-gray-100 pb-2">
              Health Reports
            </p>
            <div className="space-y-1">
              <MobileNavItem 
                to="/physical-health" 
                icon={<User className="h-5 w-5" />} 
                label="Physical Health" 
                onClick={closeMenu} 
              />
              <MobileNavItem 
                to="/mental-health" 
                icon={<Brain className="h-5 w-5" />} 
                label="Mental Health" 
                onClick={closeMenu} 
              />
              <MobileNavItem 
                to="/nutrition" 
                icon={<Droplet className="h-5 w-5" />} 
                label="Nutrition" 
                onClick={closeMenu} 
              />
              <MobileNavItem 
                to="/sleep" 
                icon={<SmilePlus className="h-5 w-5" />} 
                label="Sleep" 
                onClick={closeMenu} 
              />
              <MobileNavItem 
                to="/inflammatory" 
                icon={<Brain className="h-5 w-5" />} 
                label="Inflammatory" 
                onClick={closeMenu} 
              />
              <MobileNavItem 
                to="/medical" 
                icon={<Dna className="h-5 w-5" />} 
                label="Medical" 
                onClick={closeMenu} 
              />
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3 font-semibold border-b border-gray-100 pb-2">
              {isAdmin ? 'Admin Tools' : 'Tools'}
            </p>
            <div className="space-y-1">
              {isAdmin && (
                <MobileNavItem 
                  to="/manage-patients" 
                  icon={<Users className="h-5 w-5" />} 
                  label="Manage Patients" 
                  onClick={closeMenu} 
                />
              )}
              {!isAdmin && (
                <MobileNavItem 
                  to="/my-requests" 
                  icon={<Bell className="h-5 w-5" />} 
                  label="My Requests" 
                  onClick={closeMenu}
                />
              )}
              <MobileNavItem 
                to="/profile" 
                icon={<User className="h-5 w-5" />} 
                label="Profile" 
                onClick={closeMenu} 
              />
              <MobileNavItem 
                to="/settings" 
                icon={<Settings className="h-5 w-5" />} 
                label="Settings" 
                onClick={closeMenu} 
              />
            </div>
          </div>
        </nav>
        
        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Health Dashboard v2.1
            </p>
          </div>
        </div>
      </div>
    </>
  );
}; 