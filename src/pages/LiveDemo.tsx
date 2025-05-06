
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, BookOpen, TrendingUp, TrendingDown, ArrowRight, Award, Lightbulb, Check, CircleCheck } from 'lucide-react';
import StockChart from '@/components/Dashboard/StockChart';
import Chatbot from '@/components/Dashboard/Chatbot';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const LiveDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(1);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoading]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLessonSelect = (lessonNum: number) => {
    setActiveLesson(lessonNum);
    setLessonProgress(0);
    setShowSuccess(false);
  };

  const handleCompleteStep = () => {
    if (lessonProgress < 100) {
      const newProgress = lessonProgress + 25;
      setLessonProgress(newProgress);
      
      if (newProgress >= 100) {
        setShowSuccess(true);
      }
    }
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to Stock Trading",
      description: "Learn the basics of stock markets and trading",
      steps: [
        "Understanding market terminology",
        "How to read stock charts",
        "Market orders vs. limit orders",
        "Setting up your first trade"
      ]
    },
    {
      id: 2,
      title: "Technical Analysis Fundamentals",
      description: "Learn how to analyze stock price movements",
      steps: [
        "Price trends and patterns",
        "Support and resistance levels",
        "Moving averages",
        "Volume analysis"
      ]
    },
    {
      id: 3,
      title: "Risk Management Strategies",
      description: "Learn how to protect your investments",
      steps: [
        "Position sizing principles",
        "Stop loss strategies",
        "Diversification techniques",
        "Managing emotional biases"
      ]
    }
  ];

  const activeLessonData = lessons.find(lesson => lesson.id === activeLesson) || lessons[0];

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Interactive Trading Demo</h1>
            <p className="text-muted-foreground">
              Learn stock trading with hands-on practice
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{activeLessonData.title}</CardTitle>
                    <CardDescription>{activeLessonData.description}</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary">
                    Lesson {activeLesson} of {lessons.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Lesson Progress</span>
                    <span className="text-sm">{lessonProgress}%</span>
                  </div>
                  <Progress value={lessonProgress} className="h-2" />
                </div>
                
                {!showSuccess ? (
                  <>
                    <div className="space-y-4">
                      {activeLessonData.steps.map((step, index) => {
                        const isCompleted = lessonProgress >= ((index + 1) * 25);
                        const isActive = lessonProgress >= (index * 25) && lessonProgress < ((index + 1) * 25);
                        
                        return (
                          <div 
                            key={index} 
                            className={`p-4 border rounded-lg transition-all ${
                              isCompleted 
                                ? 'bg-success/10 border-success/20' 
                                : isActive 
                                ? 'bg-primary/5 border-primary/20' 
                                : 'bg-muted/20 border-muted'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                                  isCompleted 
                                    ? 'bg-success text-white' 
                                    : isActive 
                                    ? 'bg-primary text-white' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {isCompleted ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <span className="text-xs">{index + 1}</span>
                                  )}
                                </div>
                                <span className={`font-medium ${isCompleted ? 'line-through opacity-70' : ''}`}>{step}</span>
                              </div>
                              {isActive && (
                                <Button size="sm" onClick={handleCompleteStep}>
                                  Complete Step
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg flex items-start">
                      <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mr-3" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Pro Tip:</span> The best way to learn trading is through practice. Use the interactive chart below to apply what you're learning.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 bg-success/10 border border-success/20 rounded-lg flex flex-col items-center text-center">
                    <CircleCheck className="h-16 w-16 text-success mb-4" />
                    <h3 className="text-xl font-bold mb-2">Lesson Completed!</h3>
                    <p className="text-muted-foreground mb-6">
                      Great job! You've completed lesson {activeLesson}. Ready for the next one?
                    </p>
                    {activeLesson < lessons.length ? (
                      <Button onClick={() => handleLessonSelect(activeLesson + 1)}>
                        Next Lesson
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Badge className="bg-primary/10 text-primary px-3 py-1.5">
                          All Lessons Completed!
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          You've completed all the beginner lessons. Ready to start trading?
                        </p>
                        <Button onClick={() => navigate('/brokerage')}>
                          Go to Brokerage
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Interactive Practice Chart</CardTitle>
                <CardDescription>
                  Apply your learning on this real-time chart simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart">
                  <TabsList className="w-full max-w-md grid grid-cols-3">
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="indicators">Indicators</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart" className="pt-4">
                    <StockChart />
                  </TabsContent>
                  <TabsContent value="indicators" className="pt-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-medium mb-2">Technical Indicators</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add technical indicators to your chart to enhance your analysis.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">Moving Average</Button>
                        <Button variant="outline" size="sm">MACD</Button>
                        <Button variant="outline" size="sm">RSI</Button>
                        <Button variant="outline" size="sm">Bollinger Bands</Button>
                        <Button variant="outline" size="sm">Volume</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="orders" className="pt-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-medium mb-2">Practice Orders</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Place practice orders without using real money.
                      </p>
                      <div className="space-x-2">
                        <Button className="bg-success hover:bg-success/90">Buy</Button>
                        <Button className="bg-danger hover:bg-danger/90">Sell</Button>
                        <Button variant="outline">Place Limit Order</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        activeLesson === lesson.id 
                          ? 'bg-primary/10 border-primary/20' 
                          : 'hover:bg-muted/20'
                      }`}
                      onClick={() => handleLessonSelect(lesson.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">
                          Lesson {lesson.id}: {lesson.title}
                        </h3>
                        {activeLesson === lesson.id && lessonProgress === 100 && (
                          <Badge className="bg-success/20 text-success">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lesson.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium">Your Progress</span>
                  </div>
                  <Progress value={33} className="w-32 h-2" />
                </div>
              </CardFooter>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Trading Assistant</CardTitle>
                <CardDescription>Get help with your trading questions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Chatbot />
              </CardContent>
            </Card>
            
            <Card className="glass-card border-warning/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-warning">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Important Reminder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a simulated trading environment for educational purposes only. No real money is being used, and all data is for demonstration.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <TrendingUp className="h-4 w-4 text-success mr-2 mt-0.5" />
                    <span className="text-sm">
                      <span className="font-medium">Markets can go up</span> - Learn to identify buying opportunities
                    </span>
                  </div>
                  <div className="flex items-start">
                    <TrendingDown className="h-4 w-4 text-danger mr-2 mt-0.5" />
                    <span className="text-sm">
                      <span className="font-medium">Markets can go down</span> - Learn to manage risk and protect capital
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveDemo;
