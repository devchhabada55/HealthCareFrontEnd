import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useWindowSize, useBreakpoint, useIsTouchDevice } from '../../hooks/use-mobile';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SpiderChartProps {
  data: {
    physical: number;
    mental: number;
    nutrition: number;
    sleep: number;
    inflammatory: number;
    medical: number;
  };
  className?: string;
  height?: number;
  showLegend?: boolean;
  interactive?: boolean;
  colors?: {
    primary?: string;
    background?: string;
    border?: string;
  };
}

export const SpiderChart: React.FC<SpiderChartProps> = ({ 
  data, 
  className = "",
  height,
  showLegend = false,
  interactive = true,
  colors = {}
}) => {
  const windowSize = useWindowSize();
  const breakpoint = useBreakpoint();
  const isTouchDevice = useIsTouchDevice();

  // Default colors
  const defaultColors = {
    primary: 'rgb(124, 58, 237)',
    background: 'rgba(124, 58, 237, 0.15)',
    border: 'rgb(124, 58, 237)',
    ...colors
  };

  // Responsive configuration based on breakpoint
  const config = useMemo(() => {
    const isMobile = breakpoint === 'mobile';
    const isTablet = breakpoint === 'tablet';
    
    return {
      // Font sizes
      pointLabels: isMobile ? 10 : isTablet ? 11 : 12,
      ticks: isMobile ? 7 : isTablet ? 8 : 9,
      tooltip: isMobile ? 11 : isTablet ? 12 : 13,
      
      // Padding and spacing
      padding: isMobile ? 8 : isTablet ? 12 : 16,
      pointRadius: isMobile ? 3 : isTablet ? 4 : 5,
      pointHoverRadius: isMobile ? 5 : isTablet ? 6 : 7,
      borderWidth: isMobile ? 1.5 : isTablet ? 2 : 2.5,
      
      // Animation duration (shorter for mobile performance)
      animationDuration: isMobile ? 600 : isTablet ? 800 : 1000,
      
      // Labels (abbreviated on mobile for better fit)
      labels: isMobile 
        ? ['Physical', 'Mental', 'Nutrition', 'Sleep', 'Inflam.', 'Medical']
        : isTablet
        ? ['Physical', 'Mental', 'Nutrition', 'Sleep', 'Inflammatory', 'Medical']
        : ['Physical Health', 'Mental Health', 'Nutrition', 'Sleep Quality', 'Inflammatory', 'Medical Records']
    };
  }, [breakpoint]);

  // Responsive height calculation
  const chartHeight = useMemo(() => {
    if (height) return height;
    
    switch (breakpoint) {
      case 'mobile':
        return Math.min(windowSize.width || 300, 300);
      case 'tablet':
        return 350;
      default:
        return 400;
    }
  }, [breakpoint, windowSize.width, height]);

  const chartData = useMemo(() => ({
    labels: config.labels,
    datasets: [
      {
        label: 'Health Parameters',
        data: [
          data.physical,
          data.mental,
          data.nutrition,
          data.sleep,
          data.inflammatory,
          data.medical,
        ],
        backgroundColor: defaultColors.background,
        borderColor: defaultColors.border,
        borderWidth: config.borderWidth,
        pointBackgroundColor: defaultColors.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: breakpoint === 'mobile' ? 1 : 2,
        pointRadius: config.pointRadius,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: defaultColors.primary,
        pointHoverRadius: config.pointHoverRadius,
        pointHoverBorderWidth: 2,
        tension: 0.1,
      },
    ],
  }), [data, config, defaultColors, breakpoint]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 1,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: config.pointLabels,
            weight: 'normal' as const,
            family: "'Inter', 'system-ui', sans-serif"
          },
          color: '#374151',
          padding: config.padding,
        },
        ticks: {
          display: !breakpoint || breakpoint !== 'mobile', // Hide ticks on mobile for cleaner look
          beginAtZero: true,
          font: {
            size: config.ticks,
            family: "'Inter', 'system-ui', sans-serif"
          },
          color: '#6B7280',
          stepSize: 20,
          showLabelBackdrop: false,
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend && breakpoint !== 'mobile',
        position: 'bottom' as const,
        labels: {
          font: {
            size: config.pointLabels,
            family: "'Inter', 'system-ui', sans-serif"
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        enabled: interactive,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: 'rgba(20, 184, 166, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: config.tooltip,
          weight: 'bold' as const,
          family: "'Inter', 'system-ui', sans-serif"
        },
        bodyFont: {
          size: config.tooltip - 1,
          family: "'Inter', 'system-ui', sans-serif"
        },
        padding: breakpoint === 'mobile' ? 8 : 12,
        caretSize: breakpoint === 'mobile' ? 4 : 6,
        callbacks: {
          title: function(tooltipItems: any[]) {
            return tooltipItems[0].label;
          },
          label: function(context: any) {
            return `Score: ${context.parsed.r}/100`;
          }
        }
      }
    },
    layout: {
      padding: config.padding
    },
    interaction: {
      intersect: false,
      mode: 'point' as const,
    },
    elements: {
      line: {
        tension: 0.1,
        borderCapStyle: 'round' as const,
      },
      point: {
        hoverBorderWidth: 2,
        hitRadius: isTouchDevice ? 15 : 5, // Larger hit area for touch devices
      }
    },
    // Performance optimizations
    animation: {
      duration: config.animationDuration,
      easing: 'easeInOutQuart' as const,
    },
    onHover: interactive ? (event: any, activeElements: any[]) => {
      if (event?.native?.target) {
        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    } : undefined,
    // Touch optimization
    onTouchStart: isTouchDevice ? (event: any) => {
      event.preventDefault();
    } : undefined,
  }), [config, breakpoint, showLegend, interactive, isTouchDevice]);

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className="relative w-full" 
        style={{ height: chartHeight }}
        role="img"
        aria-label={`Spider chart showing health metrics: Physical ${data.physical}%, Mental ${data.mental}%, Nutrition ${data.nutrition}%, Sleep ${data.sleep}%, Inflammatory ${data.inflammatory}%, Medical ${data.medical}%`}
      >
        <Radar 
          data={chartData} 
          options={options}
          plugins={[
            {
              id: 'responsiveSpiderChart',
              beforeDraw: (chart) => {
                // Ensure chart is properly sized on mobile
                if (breakpoint === 'mobile') {
                  const ctx = chart.ctx;
                  ctx.imageSmoothingEnabled = true;
                  ctx.imageSmoothingQuality = 'high';
                }
              }
            }
          ]}
        />
      </div>
      
      {/* Mobile legend if needed */}
      {showLegend && breakpoint === 'mobile' && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {config.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-1 text-xs">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: defaultColors.primary }}
              />
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 