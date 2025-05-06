
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PasswordStrength from './PasswordStrength';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PasswordRequirement {
  text: string;
  met: boolean;
}

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
    { text: "At least 8 characters", met: false },
    { text: "At least one uppercase letter", met: false },
    { text: "At least one lowercase letter", met: false },
    { text: "At least one number", met: false },
    { text: "At least one special character", met: false }
  ]);
  const { register } = useAuth();

  useEffect(() => {
    // Check password requirements
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    
    const updatedRequirements = [
      { text: "At least 8 characters", met: hasMinLength },
      { text: "At least one uppercase letter", met: hasUpperCase },
      { text: "At least one lowercase letter", met: hasLowerCase },
      { text: "At least one number", met: hasNumber },
      { text: "At least one special character", met: hasSpecialChar }
    ];
    
    setPasswordRequirements(updatedRequirements);
    setIsPasswordStrong(
      hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    );
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (!isPasswordStrong) {
      alert("Please use a stronger password");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await register(name, email, password);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create a StockOracle account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <PasswordStrength password={password} />
            
            {/* Password requirements list */}
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Password requirements:</p>
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center">
                  {req.met ? (
                    <Check className="h-3 w-3 text-success mr-2" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground mr-2" />
                  )}
                  <span className={`text-xs ${req.met ? 'text-success' : 'text-muted-foreground'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            {confirmPassword && (
              <div className="flex items-center mt-1">
                {password === confirmPassword ? (
                  <div className="flex items-center text-success text-xs">
                    <Check size={12} className="mr-1" />
                    Passwords match
                  </div>
                ) : (
                  <div className="flex items-center text-danger text-xs">
                    <X size={12} className="mr-1" />
                    Passwords don't match
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isPasswordStrong || password !== confirmPassword || isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : 'Create Account'}
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
