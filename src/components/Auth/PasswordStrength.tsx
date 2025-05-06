
import React, { useState, useEffect } from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState({
    score: 0,
    label: 'Weak',
    color: 'bg-danger'
  });

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      
      // Length check
      if (pwd.length >= 8) score += 1;
      if (pwd.length >= 12) score += 1;
      
      // Complexity checks
      if (/[A-Z]/.test(pwd)) score += 1; // Has uppercase
      if (/[a-z]/.test(pwd)) score += 1; // Has lowercase
      if (/[0-9]/.test(pwd)) score += 1; // Has number
      if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // Has special char
      
      // Determine label and color based on score
      let label, color;
      if (score <= 2) {
        label = 'Weak';
        color = 'bg-danger';
      } else if (score <= 4) {
        label = 'Medium';
        color = 'bg-warning';
      } else {
        label = 'Strong';
        color = 'bg-success';
      }
      
      return { score: Math.min(score, 6), label, color };
    };
    
    setStrength(calculateStrength(password));
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium">{strength.label}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`${strength.color} h-full rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${(strength.score / 6) * 100}%` }}
        ></div>
      </div>
      
      {strength.label === 'Weak' && password.length > 0 && (
        <p className="text-xs text-danger mt-1">
          Password is too weak. Add uppercase, lowercase, numbers, and special characters.
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
