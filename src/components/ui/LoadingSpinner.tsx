
import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="bg-background/50 backdrop-blur-xl p-8 rounded-2xl border border-border/20 shadow-lg flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
          <p className="text-foreground mt-4 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-4">
      <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
