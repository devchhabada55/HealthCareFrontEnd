import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  status?: 'normal' | 'warning' | 'critical' | 'good';
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  change, 
  status = 'normal',
  description,
  icon,
  className = '',
  onClick
}: MetricCardProps) {
  
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'border-green-200 bg-green-50/50 hover:bg-green-50/80';
      case 'warning':
        return 'border-amber-200 bg-amber-50/50 hover:bg-amber-50/80';
      case 'critical':
        return 'border-red-200 bg-red-50/50 hover:bg-red-50/80';
      default:
        return 'border-gray-100 bg-white hover:bg-gray-50/50';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-700';
      case 'warning':
        return 'text-amber-700';
      case 'critical':
        return 'text-red-700';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-amber-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getChangeColor = () => {
    if (change === undefined) return '';
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const isClickable = onClick !== undefined;

  return (
    <div 
      className={cn(
        "relative p-4 sm:p-5 lg:p-6 xl:p-7 rounded-xl shadow-sm border transition-all duration-300 ease-out",
        "animate-fade-in group",
        "min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex flex-col justify-between",
        isClickable && "cursor-pointer hover:shadow-lg hover:shadow-health-blue/10 hover:-translate-y-1 active:scale-[0.98] touch-manipulation",
        !isClickable && "hover:shadow-md",
        getStatusColor(),
        className
      )}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {/* Status Indicator */}
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full rounded-l-xl",
        getStatusIndicator()
      )} />

      {/* Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4 lg:mb-5">
        <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide leading-tight pr-2 flex-1">
          {title}
        </h3>
        {icon && (
          <div className="text-health-blue group-hover:scale-110 transition-transform duration-200 flex-shrink-0 ml-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
              {icon}
            </div>
          </div>
        )}
      </div>
      
      {/* Value */}
      <div className="flex items-end gap-2 mb-2 sm:mb-3">
        <span className={cn(
          "font-bold leading-none",
          "text-xl sm:text-2xl lg:text-3xl xl:text-4xl",
          getStatusTextColor()
        )}>
          {value}
        </span>
        {unit && (
          <span className="text-gray-500 text-sm sm:text-base lg:text-lg mb-1 flex-shrink-0">
            {unit}
          </span>
        )}
      </div>
      
      {/* Change and Status */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        {change !== undefined && (
          <div className={cn(
            "flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded-full bg-white/60",
            getChangeColor()
          )}>
            {change > 0 ? (
              <ArrowUpIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            ) : change < 0 ? (
              <ArrowDownIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            ) : null}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
        
        {status !== 'normal' && (
          <div className={cn(
            "flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded-full",
            "bg-white/60 backdrop-blur-sm",
            getStatusTextColor()
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full mr-2",
              getStatusIndicator()
            )} />
            <span className="capitalize">{status}</span>
          </div>
        )}
      </div>
      
      {/* Description */}
      {description && (
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 lg:line-clamp-3">
          {description}
        </p>
      )}

      {/* Click indicator */}
      {isClickable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-1.5 h-1.5 bg-health-blue rounded-full" />
        </div>
      )}
    </div>
  );
}

