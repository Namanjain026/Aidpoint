import React from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'slide-up' | 'bounce-in' | 'zoom-in';
  delay?: number;
  duration?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0,
  duration = 500,
  className = '' 
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    if (isInView) {
      return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }

    switch (animation) {
      case 'fade-in':
        return `${baseClasses} ${durationClass} opacity-0`;
      case 'fade-in-up':
        return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      case 'fade-in-left':
        return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
      case 'fade-in-right':
        return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
      case 'scale-in':
        return `${baseClasses} ${durationClass} opacity-0 scale-95`;
      case 'slide-up':
        return `${baseClasses} ${durationClass} opacity-0 translate-y-12`;
      case 'bounce-in':
        return `${baseClasses} ${durationClass} opacity-0 scale-50`;
      case 'zoom-in':
        return `${baseClasses} ${durationClass} opacity-0 scale-90`;
      default:
        return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
    }
  };

  return (
    <div 
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;