import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Droplet, SmilePlus, Brain, Dna, BarChart3, Bell, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '../../logo.png';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const NavItem = ({ to, icon, label, badge }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-out mb-1",
        "hover:bg-health-blue/10 active:bg-health-blue/20 group relative",
        "min-h-[42px] touch-manipulation", // Enhanced touch target
        "focus:outline-none focus:ring-2 focus:ring-health-blue/50 focus:ring-offset-2",
        "hover:shadow-sm hover:translate-x-1", // Subtle animation
        isActive
          ? "bg-health-blue text-white hover:bg-health-blue active:bg-health-blue-dark shadow-lg shadow-health-blue/20"
          : "text-gray-700 hover:text-health-blue active:text-health-blue-dark"
      )}
    >
      <span className="text-lg group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
        {icon}
      </span>
      <span className="font-medium text-xs lg:text-sm truncate flex-1 leading-tight">
        {label}
      </span>
      {badge && badge > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center font-semibold animate-pulse">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );
};

export const Sidebar = () => {
  // Note: Using in-memory state instead of localStorage for demo purposes
  // In a real app, you'd use your preferred state management solution
  const isAdmin = false; // Replace with your actual admin check

  return (
    <aside className="hidden md:flex md:flex-col min-h-screen w-40 lg:w-44 xl:w-48 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="flex-shrink-0 p-2 lg:p-3 border-b border-gray-100">
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="Healthcare Project Logo"
            className="w-auto h-10 md:h-12 lg:h-14 object-contain hover:scale-105 transition-transform duration-300 ease-out cursor-pointer"
          />
        </div>
      </div>

      {/* Health Score Section - Enhanced for responsiveness */}
      <div className="flex-shrink-0 px-2 lg:px-3 py-2 lg:py-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 lg:p-3 border border-blue-200 relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative">
            <p className="text-xs font-medium text-blue-800 mb-1">Health Score</p>
            <h4 className="text-lg lg:text-xl font-bold text-blue-900 mb-1">88%</h4>
            <div className="h-1.5 bg-blue-200 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-health-blue rounded-full transition-all duration-1000 ease-out" 
                style={{ width: '88%' }}
              ></div>
            </div>
            <p className="text-xs text-blue-700 mt-1 leading-tight">Overall health</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-1 lg:px-2 py-2 space-y-3 lg:space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* Dashboard Section */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-1 font-semibold border-b border-gray-100 pb-1">
            Dashboard
          </p>
          <div className="space-y-1">
            <NavItem 
              to={isAdmin ? "/" : "/dashboard"} 
              icon={<BarChart3 className="h-5 w-5" />} 
              label="Dashboard" 
            />
          </div>
        </div>
        
        {/* Health Reports Section */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2 font-semibold border-b border-gray-100 pb-1">
            Health Reports
          </p>
          <div className="space-y-1">
            <NavItem to="/physical-health" icon={<User className="h-5 w-5" />} label="Physical Health" />
            <NavItem to="/mental-health" icon={<Brain className="h-5 w-5" />} label="Mental Health" />
            <NavItem to="/nutrition" icon={<Droplet className="h-5 w-5" />} label="Nutrition" />
            <NavItem to="/sleep" icon={<SmilePlus className="h-5 w-5" />} label="Sleep" />
            <NavItem to="/inflammatory" icon={<Brain className="h-5 w-5" />} label="Inflammatory" />
            <NavItem to="/medical" icon={<Dna className="h-5 w-5" />} label="Medical" />
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2 font-semibold border-b border-gray-100 pb-1">
            {isAdmin ? 'Admin Tools' : 'Tools'}
          </p>
          <div className="space-y-1">
            {isAdmin && (
              <NavItem 
                to="/manage-patients" 
                icon={<Users className="h-5 w-5" />} 
                label="Manage Patients" 
              />
            )}
            {!isAdmin && (
              <NavItem 
                to="/my-requests" 
                icon={<Bell className="h-5 w-5" />} 
                label="My Requests"
              />
            )}
            <NavItem to="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
            <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
          </div>
        </div>
      </nav>

      {/* Bottom Section - Support Card */}
      <div className="flex-shrink-0 p-2 lg:p-3">
        <div className="bg-gradient-to-br from-health-blue/5 to-health-blue/10 rounded-lg p-2 lg:p-3 border border-health-blue/20 relative overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <p className="text-xs text-gray-600 font-medium mb-1">Need help?</p>
            <button className="text-xs font-medium text-health-blue hover:text-health-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-health-blue/50 focus:ring-offset-2 rounded-md p-1 -m-1">
              Support
            </button>
          </div>
        </div>

        {/* User Profile section */}
        <div className="mt-2 flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
          <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-health-blue text-white flex items-center justify-center font-medium flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <span className="text-xs">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">P001</p>
          </div>
        </div>
      </div>
    </aside>
  );
};