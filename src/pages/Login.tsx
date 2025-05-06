
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { Button } from '@/components/ui/button';
import { BadgeCheck, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

const Login: React.FC = () => {
  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4">
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-md mb-8 flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
          
          <div className="mt-12 w-full max-w-md">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Secure Authentication:</span> Your data is protected with industry-standard encryption.
                </p>
              </div>
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Privacy Focused:</span> We never share your personal information with third parties.
                </p>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">No Credit Card Required:</span> Get started with our free tier immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
