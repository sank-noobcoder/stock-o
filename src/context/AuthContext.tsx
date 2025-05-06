
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeAccount: () => void;
  startFreeTimer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Initialize free trial timer for non-premium users
        if (!parsedUser.isPremium && !localStorage.getItem('freeTrialTimeRemaining')) {
          startFreeTimer();
        }
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('user');
      }
    }
    setIsPending(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsPending(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - in real app this would validate against a backend
      if (email && password.length >= 6) {
        // Check if we have a stored user with this email to preserve premium status
        const storedUsers = localStorage.getItem('allUsers');
        let existingUser = null;
        
        if (storedUsers) {
          try {
            const users = JSON.parse(storedUsers);
            existingUser = users.find((u: User) => u.email === email);
          } catch (e) {
            console.error('Failed to parse stored users', e);
          }
        }
        
        const newUser = existingUser || {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
          isPremium: false
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Store user in allUsers for persistence across logins
        if (!existingUser) {
          const allUsers = storedUsers ? JSON.parse(storedUsers) : [];
          allUsers.push(newUser);
          localStorage.setItem('allUsers', JSON.stringify(allUsers));
        }
        
        // Initialize free trial timer for non-premium users
        if (!newUser.isPremium && !localStorage.getItem('freeTrialTimeRemaining')) {
          startFreeTimer();
        }
        
        toast({
          title: "Login successful",
          description: "Welcome back to StockOracle!",
        });
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsPending(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - in real app this would create an account on the backend
      if (name && email && password.length >= 6) {
        const newUser = {
          id: crypto.randomUUID(),
          email,
          name,
          isPremium: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Store user in allUsers for persistence across logins
        const storedUsers = localStorage.getItem('allUsers');
        const allUsers = storedUsers ? JSON.parse(storedUsers) : [];
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        
        // Initialize free trial timer for new users
        startFreeTimer();
        
        toast({
          title: "Registration successful",
          description: "Welcome to StockOracle! Your account has been created.",
        });
        navigate('/dashboard');
      } else {
        throw new Error('Invalid registration details');
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your details and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const upgradeAccount = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update the user in allUsers as well for persistence
      const storedUsers = localStorage.getItem('allUsers');
      if (storedUsers) {
        try {
          const allUsers = JSON.parse(storedUsers);
          const updatedUsers = allUsers.map((u: User) => 
            u.id === user.id ? { ...u, isPremium: true } : u
          );
          localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        } catch (e) {
          console.error('Failed to update stored users', e);
        }
      }
      
      // Remove free trial timer data when upgrading to premium
      localStorage.removeItem('freeTrialTimeRemaining');
      localStorage.removeItem('freeTrialExpiry');
      
      toast({
        title: "Account upgraded",
        description: "Your account has been upgraded to Premium!",
      });
    }
  };

  const startFreeTimer = () => {
    // Initialize free trial (5 hours in seconds)
    localStorage.setItem('freeTrialTimeRemaining', String(5 * 60 * 60));
    localStorage.removeItem('freeTrialExpiry');
    
    toast({
      title: "Free Trial Started",
      description: "You have 5 hours of free access to premium features.",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isPending,
        login, 
        register, 
        logout,
        upgradeAccount,
        startFreeTimer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
