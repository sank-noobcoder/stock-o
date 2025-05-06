
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Clock, Crown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const FreeTrialTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [freePeriodExpired, setFreePeriodExpired] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);
  const { user } = useAuth();
  
  // Total free trial time in seconds (5 hours)
  const totalFreeTime = 5 * 60 * 60;

  useEffect(() => {
    // Only initialize or check timer for non-premium users
    if (user && !user.isPremium) {
      const storedTime = localStorage.getItem('freeTrialTimeRemaining');
      const storedExpiry = localStorage.getItem('freeTrialExpiry');
      
      // If no time is stored, initialize it for new users
      if (!storedTime) {
        // Initialize with 5 hours (in seconds)
        const initialTime = totalFreeTime;
        localStorage.setItem('freeTrialTimeRemaining', initialTime.toString());
        setTimeRemaining(initialTime);
        setProgress(100);
      } else {
        const timeLeft = parseInt(storedTime);
        setTimeRemaining(timeLeft > 0 ? timeLeft : 0);
        setProgress((timeLeft / totalFreeTime) * 100);
        setFreePeriodExpired(timeLeft <= 0 || (storedExpiry && new Date(storedExpiry) < new Date()));
      }
    }

    const interval = setInterval(() => {
      if (user && !user.isPremium) {
        setTimeRemaining(prev => {
          const newTime = prev <= 0 ? 0 : prev - 1;
          localStorage.setItem('freeTrialTimeRemaining', newTime.toString());
          
          // Update progress
          setProgress((newTime / totalFreeTime) * 100);
          
          if (newTime === 0 && !freePeriodExpired) {
            setFreePeriodExpired(true);
            const expiryTime = new Date();
            expiryTime.setHours(expiryTime.getHours() + 24);
            localStorage.setItem('freeTrialExpiry', expiryTime.toISOString());
          }
          
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, freePeriodExpired, totalFreeTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Only show timer for non-premium users when there is time remaining
  if (!user || user.isPremium) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-50 flex justify-center animate-fade-in">
      <div className="glass-card px-4 py-2 shadow-lg flex items-center gap-3">
        {freePeriodExpired ? (
          <>
            <Crown className="h-4 w-4 text-warning" />
            <span className="text-sm">
              Trial expired. <span className="text-primary font-semibold hover:underline cursor-pointer">Upgrade now</span>
            </span>
          </>
        ) : (
          <>
            <Clock className="h-4 w-4 text-primary animate-pulse-light" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                Free Trial: {formatTime(timeRemaining)}
              </span>
              <Progress value={progress} className="h-1 w-36" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FreeTrialTimer;
