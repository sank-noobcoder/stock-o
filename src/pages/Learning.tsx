
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  BookOpen, 
  Search, 
  Video, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  Bookmark, 
  Play, 
  Star,
  MessageCircle,
  ListFilter,
  Layers
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ChatbotButton from '@/components/Dashboard/ChatbotButton';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnail: string;
  author: string;
  rating: number;
  enrolled: number;
  progress?: number;
  completed?: boolean;
  featured?: boolean;
  lessons: {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'article' | 'quiz';
    completed?: boolean;
  }[];
}

const learningModules: LearningModule[] = [
  {
    id: '1',
    title: 'Stock Market Fundamentals',
    description: 'Learn the basics of how the stock market works, key terminology, and fundamental analysis.',
    level: 'Beginner',
    duration: '2 hours 30 min',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    author: 'Michael Chen',
    rating: 4.8,
    enrolled: 2456,
    progress: 35,
    featured: true,
    lessons: [
      { id: '1-1', title: 'Introduction to Stock Markets', duration: '15 min', type: 'video', completed: true },
      { id: '1-2', title: 'Understanding Stock Prices', duration: '20 min', type: 'video', completed: true },
      { id: '1-3', title: 'Types of Stock Orders', duration: '25 min', type: 'video' },
      { id: '1-4', title: 'Reading Stock Charts', duration: '30 min', type: 'video' },
      { id: '1-5', title: 'Fundamental Analysis Basics', duration: '20 min', type: 'article' },
      { id: '1-6', title: 'Market Indices Explained', duration: '15 min', type: 'article' },
      { id: '1-7', title: 'Module Assessment', duration: '25 min', type: 'quiz' }
    ]
  },
  {
    id: '2',
    title: 'Technical Analysis Masterclass',
    description: 'Deep dive into chart patterns, technical indicators, and trading strategies.',
    level: 'Intermediate',
    duration: '4 hours 15 min',
    thumbnail: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?q=80&w=2070&auto=format&fit=crop',
    author: 'Sarah Johnson',
    rating: 4.9,
    enrolled: 1872,
    lessons: [
      { id: '2-1', title: 'Introduction to Technical Analysis', duration: '20 min', type: 'video' },
      { id: '2-2', title: 'Support and Resistance', duration: '30 min', type: 'video' },
      { id: '2-3', title: 'Moving Averages', duration: '25 min', type: 'video' },
      { id: '2-4', title: 'RSI and MACD Indicators', duration: '35 min', type: 'video' },
      { id: '2-5', title: 'Chart Patterns', duration: '40 min', type: 'video' },
      { id: '2-6', title: 'Volume Analysis', duration: '20 min', type: 'article' },
      { id: '2-7', title: 'Trading Strategies', duration: '35 min', type: 'video' },
      { id: '2-8', title: 'Technical Assessment', duration: '30 min', type: 'quiz' }
    ]
  },
  {
    id: '3',
    title: 'Options Trading Strategies',
    description: 'Master options trading with strategies for income generation, hedging, and speculation.',
    level: 'Advanced',
    duration: '5 hours 45 min',
    thumbnail: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop',
    author: 'Dr. Robert Williams',
    rating: 4.7,
    enrolled: 1243,
    progress: 10,
    lessons: [
      { id: '3-1', title: 'Options Basics', duration: '30 min', type: 'video', completed: true },
      { id: '3-2', title: 'Call and Put Options', duration: '35 min', type: 'video' },
      { id: '3-3', title: 'Options Pricing', duration: '40 min', type: 'video' },
      { id: '3-4', title: 'The Greeks Explained', duration: '45 min', type: 'video' },
      { id: '3-5', title: 'Covered Call Strategy', duration: '30 min', type: 'video' },
      { id: '3-6', title: 'Protective Put Strategy', duration: '25 min', type: 'video' },
      { id: '3-7', title: 'Spreads and Straddles', duration: '50 min', type: 'video' },
      { id: '3-8', title: 'Advanced Options Quiz', duration: '40 min', type: 'quiz' }
    ]
  },
  {
    id: '4',
    title: 'AI in Stock Market Prediction',
    description: 'Understand how AI and machine learning are revolutionizing stock market predictions.',
    level: 'Intermediate',
    duration: '3 hours 20 min',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    author: 'Dr. Emily Lee',
    rating: 4.9,
    enrolled: 986,
    featured: true,
    lessons: [
      { id: '4-1', title: 'Introduction to AI in Finance', duration: '25 min', type: 'video' },
      { id: '4-2', title: 'Machine Learning Basics', duration: '30 min', type: 'video' },
      { id: '4-3', title: 'Time Series Analysis', duration: '35 min', type: 'video' },
      { id: '4-4', title: 'Sentiment Analysis', duration: '30 min', type: 'video' },
      { id: '4-5', title: 'Neural Networks for Predictions', duration: '40 min', type: 'video' },
      { id: '4-6', title: 'Case Studies', duration: '25 min', type: 'article' },
      { id: '4-7', title: 'AI Prediction Assessment', duration: '25 min', type: 'quiz' }
    ]
  },
  {
    id: '5',
    title: 'Risk Management for Traders',
    description: 'Essential techniques to manage risk and protect your capital in any market condition.',
    level: 'Beginner',
    duration: '2 hours 50 min',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    author: 'James Wilson',
    rating: 4.6,
    enrolled: 1567,
    progress: 75,
    lessons: [
      { id: '5-1', title: 'Importance of Risk Management', duration: '20 min', type: 'video', completed: true },
      { id: '5-2', title: 'Position Sizing', duration: '25 min', type: 'video', completed: true },
      { id: '5-3', title: 'Stop Loss Strategies', duration: '30 min', type: 'video', completed: true },
      { id: '5-4', title: 'Risk-Reward Ratio', duration: '25 min', type: 'video' },
      { id: '5-5', title: 'Portfolio Diversification', duration: '30 min', type: 'video' },
      { id: '5-6', title: 'Risk Management Quiz', duration: '20 min', type: 'quiz' }
    ]
  },
  {
    id: '6',
    title: 'Understanding Indian Stock Markets',
    description: 'Learn about the unique aspects of Indian stock markets, regulations, and trading strategies.',
    level: 'Beginner',
    duration: '3 hours 10 min',
    thumbnail: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop',
    author: 'Priya Sharma',
    rating: 4.8,
    enrolled: 2134,
    lessons: [
      { id: '6-1', title: 'Introduction to BSE and NSE', duration: '25 min', type: 'video' },
      { id: '6-2', title: 'Indian Market Regulations', duration: '30 min', type: 'video' },
      { id: '6-3', title: 'Demat and Trading Accounts', duration: '20 min', type: 'video' },
      { id: '6-4', title: 'Indian Market Indices', duration: '25 min', type: 'video' },
      { id: '6-5', title: 'Taxation on Stock Investments', duration: '35 min', type: 'article' },
      { id: '6-6', title: 'Indian Market Assessment', duration: '25 min', type: 'quiz' }
    ]
  }
];

const Learning: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();
  
  const filteredModules = learningModules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(module => {
    if (activeTab === 'all') return true;
    if (activeTab === 'beginner') return module.level === 'Beginner';
    if (activeTab === 'intermediate') return module.level === 'Intermediate';
    if (activeTab === 'advanced') return module.level === 'Advanced';
    if (activeTab === 'in-progress') return module.progress !== undefined && module.progress > 0 && module.progress < 100;
    return true;
  });

  const getLevelBadgeColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return '';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Learning Hub</h1>
            <p className="text-muted-foreground">
              Master trading with our comprehensive educational resources
            </p>
          </div>
          
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Modules */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningModules.filter(module => module.featured).map(module => (
              <Card key={module.id} className="overflow-hidden glass-card hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={module.thumbnail} 
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Badge className={`${getLevelBadgeColor(module.level)} mb-2`}>
                      {module.level}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-1">{module.title}</h3>
                    <div className="flex items-center text-sm">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {module.duration}
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground line-clamp-2">{module.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                        <span className="font-medium">{module.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {module.enrolled.toLocaleString()} students
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 py-3 px-6 flex justify-between items-center">
                  <div className="text-sm font-medium">By {module.author}</div>
                  <Button>Start Learning</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Tabs and Listing */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Browse Courses</h2>
            <Button variant="outline" size="sm" className="flex items-center">
              <ListFilter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              {user && <TabsTrigger value="in-progress">In Progress</TabsTrigger>}
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-6">
              {filteredModules.length === 0 ? (
                <div className="text-center py-12">
                  <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredModules.map(module => (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 h-40 md:h-auto">
                          <img 
                            src={module.thumbnail} 
                            alt={module.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-3/4 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={getLevelBadgeColor(module.level)}>
                                {module.level}
                              </Badge>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{module.rating}</span>
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                            <p className="text-muted-foreground mb-4">{module.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="mr-4">{module.duration}</span>
                              <BookOpen className="h-4 w-4 mr-1" />
                              <span>{module.lessons.length} lessons</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            {module.progress !== undefined && (
                              <div className="w-full sm:w-1/2">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span className="font-medium">{module.progress}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${module.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            <div className="flex gap-2 ml-auto">
                              <Button variant="outline" className="flex items-center">
                                <Bookmark className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                              <Button className="flex items-center">
                                {module.progress !== undefined && module.progress > 0 ? (
                                  <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Continue
                                  </>
                                ) : (
                                  <>
                                    Start Learning
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Learning Paths Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Learning Paths</h2>
          <p className="text-muted-foreground">
            Structured sequences of courses designed to help you master specific trading domains
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Beginner to Pro Trader</CardTitle>
                <CardDescription>
                  A complete journey from stock market basics to advanced trading strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  <span>5 Courses</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>15+ Hours</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>3 Certificates</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Includes:</p>
                  <ul className="space-y-1 text-sm pl-5 list-disc">
                    <li>Stock Market Fundamentals</li>
                    <li>Technical Analysis Basics</li>
                    <li>Risk Management</li>
                    <li>Trading Psychology</li>
                    <li>Advanced Trading Strategies</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Path Details</Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Options Trading Expert</CardTitle>
                <CardDescription>
                  Master options trading from basic concepts to complex strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  <span>4 Courses</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>12+ Hours</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>2 Certificates</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Includes:</p>
                  <ul className="space-y-1 text-sm pl-5 list-disc">
                    <li>Options Basics</li>
                    <li>Call & Put Strategies</li>
                    <li>Spreads & Straddles</li>
                    <li>Income Generation</li>
                    <li>Risk Hedging with Options</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Path Details</Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>AI Trading Specialist</CardTitle>
                <CardDescription>
                  Learn to leverage AI and machine learning for smarter trading decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  <span>6 Courses</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>18+ Hours</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>4 Certificates</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Includes:</p>
                  <ul className="space-y-1 text-sm pl-5 list-disc">
                    <li>AI & ML Fundamentals</li>
                    <li>Data Analysis for Trading</li>
                    <li>Predictive Models</li>
                    <li>Algorithmic Trading</li>
                    <li>Backtesting Strategies</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Path Details</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 bg-primary/10 rounded-xl p-10 text-center glass-card">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Trading Skills?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're just starting out or looking to enhance your expertise, 
            our comprehensive learning materials will help you become a more confident trader.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="flex items-center">
              Start Learning Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <ChatbotButton />
    </MainLayout>
  );
};

export default Learning;
