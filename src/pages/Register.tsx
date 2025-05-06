
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import RegisterForm from '@/components/Auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

const Register: React.FC = () => {
  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
          <div className="w-full max-w-md order-2 md:order-1">
            <Link to="/" className="hidden md:block mb-8">
              <Button variant="ghost" size="sm" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Join thousands of successful investors</h2>
                <p className="text-muted-foreground mt-2">
                  Create your account and get access to all our features.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Advanced Stock Analysis</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Access detailed stock metrics, technical indicators, and fundamental data.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">AI-Powered Predictions</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Get stock price forecasts using our machine learning algorithms.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Real-time Market Data</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stay updated with live stock prices, charts, and news feeds.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Interactive Learning Resources</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Learn through guided tutorials and interactive stock simulations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Portfolio Tracking</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Monitor your investments and track performance over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/" className="block md:hidden mt-8">
              <Button variant="ghost" size="sm" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="w-full max-w-md order-1 md:order-2">
            <RegisterForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
