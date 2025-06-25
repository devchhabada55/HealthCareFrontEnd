import React from 'react';
import { MetricCard } from './MetricCard';
import { cn } from '@/lib/utils';

interface MetricCardGridProps {
  title: string;
  metrics: {
    title: string;
    value: string | number;
    unit?: string;
    change?: number;
    status?: 'normal' | 'warning' | 'critical' | 'good';
    description?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }[];
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5;
  showTitle?: boolean;
  emptyState?: {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
  };
}

const getGridColumns = (columns: number) => {
  switch (columns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    case 5:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
};

export function MetricCardGrid({ 
  title, 
  metrics, 
  className = "",
  columns = 4,
  showTitle = true,
  emptyState
}: MetricCardGridProps) {
  const defaultEmptyState = {
    title: "No metrics available",
    description: "Metrics will appear here once data is available."
  };

  const emptyStateConfig = { ...defaultEmptyState, ...emptyState };

  return (
    <div className={cn("space-y-4 sm:space-y-6 lg:space-y-8", className)}>
      {/* Title */}
      {showTitle && (
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 flex-shrink-0">
            {title}
          </h2>
          <div className="h-px bg-gradient-to-r from-health-blue/20 via-health-blue/10 to-transparent flex-1 ml-4" />
        </div>
      )}
      
      {/* Responsive Grid */}
      {metrics.length > 0 ? (
        <div className={cn(
          "grid gap-4 sm:gap-5 lg:gap-6 xl:gap-8",
          getGridColumns(columns)
        )}>
          {metrics.map((metric, index) => (
            <div key={index} className="w-full">
              <MetricCard
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                change={metric.change}
                status={metric.status}
                description={metric.description}
                icon={metric.icon}
                onClick={metric.onClick}
                className="h-full" // Ensure consistent height
              />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            {emptyStateConfig.icon ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400">
                {emptyStateConfig.icon}
              </div>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full" />
            )}
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-500 mb-2 sm:mb-3">
            {emptyStateConfig.title}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-md leading-relaxed">
            {emptyStateConfig.description}
          </p>
        </div>
      )}
    </div>
  );
}
