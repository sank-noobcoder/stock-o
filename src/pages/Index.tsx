
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, BarChart2, LineChart, TrendingUp, BrainCircuit, Clock, Users } from 'lucide-react';
import StockChart from '@/components/Dashboard/StockChart';
import Chatbot from '@/components/Dashboard/Chatbot';

const Index: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`space-y-6 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              Next-Gen Stock Market Intelligence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block">Predict the Future of</span>
              <span className="bg-gradient-to-r from-finance-400 to-finance-700 bg-clip-text text-transparent">
                Stock Markets
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leverage AI-driven insights to make smarter investment decisions with our cutting-edge stock prediction platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/live-demo">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-12 text-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold mb-4">Live Market Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time visualization of market trends and performance metrics
            </p>
          </div>
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StockChart />
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-16 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how StockOracle can transform your investment strategy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={`glass-card transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-finance-500/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-finance-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Stock Brokerage</h3>
                <p className="text-muted-foreground">
                  Trade stocks with ease using our intuitive platform. Real-time data, commission-free trades, and advanced tools for every investor.
                </p>
                <Link to="/brokerage" className="mt-4">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className={`glass-card transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-finance-500/10 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-finance-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Future Prediction</h3>
                <p className="text-muted-foreground">
                  Harness the power of AI to predict stock price movements. Our algorithms analyze vast amounts of data to provide accurate forecasts.
                </p>
                <Link to="/prediction" className="mt-4">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className={`glass-card transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-finance-500/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-finance-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Demo</h3>
                <p className="text-muted-foreground">
                  Practice trading in a risk-free environment. Learn the ropes of stock market investing with our guided demo mode.
                </p>
                <Link to="/live-demo" className="mt-4">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl font-bold mb-6">Ask Our AI Assistant</h2>
              <p className="text-muted-foreground mb-8">
                Get instant answers to your investment questions, real-time market insights, and personalized recommendations.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">24/7 Availability</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI assistant is always ready to help, providing round-the-clock support for your investment queries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Data-Driven Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Get personalized stock analyses based on the latest market data and trends.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Learning Resources</h3>
                    <p className="text-sm text-muted-foreground">
                      Build your knowledge with educational content about investing strategies and market concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Chatbot />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`space-y-6 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold">Ready to Transform Your Trading?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of investors who are leveraging AI for smarter financial decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
