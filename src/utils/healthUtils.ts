import { 
  Activity, 
  Heart,
  Dumbbell,
  User,
} from 'lucide-react';

// Color utility functions
export const getColorClass = (color: 'red' | 'blue' | 'green' | 'purple' | 'orange') => {
  const colors = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500'
  };
  return colors[color] || 'text-gray-500';
};

export const getStatusColorClass = (color: 'red' | 'orange' | 'green') => {
  const colors = {
    red: 'text-red-600',
    orange: 'text-orange-600',
    green: 'text-green-600'
  };
  return colors[color] || 'text-gray-600';
};

// Health score utility functions
export const getHealthScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

export const getHealthScoreBgColor = (score: number) => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const getHealthScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  return 'Needs Improvement';
};

// Metric score utility functions
export const getScoreColor = (score: number) => {
  if (score >= 75) return 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100';
  if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
  return 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100';
};

export const getScoreLabel = (score: number) => {
  if (score >= 75) return 'Excellent';
  if (score >= 50) return 'Good';
  return 'Needs Work';
};

// Default metrics configuration
export const defaultMetricsConfig = [
  { 
    key: 'vo2max', 
    title: 'VO2 Max', 
    icon: Heart, 
    color: 'red' as const, 
    status: 'Below Average',
    statusColor: 'red' as const
  },
  { 
    key: 'handgripRight', 
    title: 'Handgrip (R)', 
    icon: Dumbbell, 
    color: 'blue' as const, 
    status: 'Normal but Low',
    statusColor: 'orange' as const,
    unit: 'kg'
  },
  { 
    key: 'pushups', 
    title: 'Push-ups', 
    icon: Activity, 
    color: 'green' as const, 
    status: 'Poor',
    statusColor: 'red' as const
  },
  { 
    key: 'bmi', 
    title: 'BMI', 
    icon: User, 
    color: 'purple' as const, 
    status: 'Overweight',
    statusColor: 'orange' as const
  }
]; 