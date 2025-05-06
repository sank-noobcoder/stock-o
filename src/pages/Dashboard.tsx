
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Bell, Search, Wallet, Cpu, TrendingUp, LineChart, ArrowUpRight } from 'lucide-react';
import StockChart from '@/components/Dashboard/StockChart';
import Portfolio from '@/components/Dashboard/Portfolio';
import NewsCard from '@/components/Dashboard/NewsCard';
import PredictionCard from '@/components/Dashboard/PredictionCard';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoading]);

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search stocks..." 
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardDescription>Total Portfolio Value</CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-bold">$24,568.78</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-success">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+2.5% ($612.23)</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardDescription>Today's Change</CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-bold">$312.42</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-success">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+1.3% today</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription>Top Performer</CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-bold">AAPL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-success">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+3.7% ($5.78)</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="overflow-x-auto -mx-2 px-2">
            <TabsList className="grid grid-cols-4 w-full max-w-md min-w-[300px]">
              <TabsTrigger value="overview" className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">Portfolio</span>
              </TabsTrigger>
              <TabsTrigger value="predictions" className="flex items-center">
                <Cpu className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">Predictions</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">News</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <StockChart />
                <NewsCard />
              </div>
              <div className="space-y-6">
                <Portfolio />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-6">
            <Portfolio />
          </TabsContent>
          
          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredictionCard />
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Prediction Accuracy</CardTitle>
                  <CardDescription>Historical performance of our prediction model</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>30-day accuracy</span>
                    <span className="font-semibold">87.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>60-day accuracy</span>
                    <span className="font-semibold">82.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>90-day accuracy</span>
                    <span className="font-semibold">79.3%</span>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg flex items-start mt-4">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-2" />
                    <p className="text-xs text-muted-foreground">
                      Past performance does not guarantee future results. These metrics represent historical accuracy based on backtesting with actual market data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-6">
            <NewsCard />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
