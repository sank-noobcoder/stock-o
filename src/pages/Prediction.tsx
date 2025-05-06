
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Info, CreditCard, Check, Clock, Lock, BrainCircuit, ChevronRight, BellRing, Cpu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import PredictionCard, { 
  PredictionData, 
  defaultPrediction, 
  intradayPrediction, 
  optionsPrediction, 
  futuresPrediction,
  indianStockPrediction
} from '@/components/Dashboard/PredictionCard';
import StockChart from '@/components/Dashboard/StockChart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ChatbotButton from '@/components/Dashboard/ChatbotButton';
import { toast } from '@/components/ui/use-toast';
import { usStockList, indianStockList } from '@/services/marketDataService';

const Prediction: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockOrigin, setStockOrigin] = useState<'US' | 'India' | 'Other'>('US');
  const [tradingType, setTradingType] = useState<'intraday' | 'options' | 'futures' | 'standard'>('standard');
  const [predictionData, setPredictionData] = useState<PredictionData | undefined>(defaultPrediction);
  const [entryPrice, setEntryPrice] = useState<string>('');
  const [exitPrice, setExitPrice] = useState<string>('');
  const [priceAlertValue, setPriceAlertValue] = useState<string>('');
  
  const { user, isAuthenticated, upgradeAccount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stockOrigin === 'India') {
      setPredictionData({
        ...indianStockPrediction,
        tradingType: tradingType
      });
    } else {
      switch (tradingType) {
        case 'intraday':
          setPredictionData(intradayPrediction);
          break;
        case 'options':
          setPredictionData(optionsPrediction);
          break;
        case 'futures':
          setPredictionData(futuresPrediction);
          break;
        default:
          setPredictionData(defaultPrediction);
      }
    }

    const stockData = stockOrigin === 'India' 
      ? indianStockList.find(s => s.symbol === selectedStock)
      : usStockList.find(s => s.symbol === selectedStock);
      
    if (stockData) {
      const basePrice = stockOrigin === 'India' ? 1500 : 150;
      setEntryPrice(basePrice.toString());
      setExitPrice((basePrice * 1.05).toFixed(2));
      setPriceAlertValue(basePrice.toString());
    }
  }, [tradingType, stockOrigin, selectedStock]);

  const getPopularStocks = () => {
    return stockOrigin === 'India' ? indianStockList : usStockList;
  };

  const filteredStocks = getPopularStocks().filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTradingTypeChange = (value: string) => {
    setTradingType(value as 'intraday' | 'options' | 'futures' | 'standard');
  };

  const handleStockOriginChange = (value: string) => {
    setStockOrigin(value as 'US' | 'India' | 'Other');
    if (value === 'India' && !indianStockList.some(s => s.symbol === selectedStock)) {
      setSelectedStock('RELIANCE');
    } else if (value === 'US' && !usStockList.some(s => s.symbol === selectedStock)) {
      setSelectedStock('AAPL');
    }
  };

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleSetAlerts = () => {
    toast({
      title: "Price Alert Set",
      description: `You'll be notified when ${selectedStock} reaches ${priceAlertValue}.`,
    });
  };

  const handleEntryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryPrice(e.target.value);
  };

  const handleExitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExitPrice(e.target.value);
  };
  
  const handleAlertValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceAlertValue(e.target.value);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Check if user has no free trial time remaining and is not premium
  const freePeriodExpired = !user?.isPremium && parseInt(localStorage.getItem('freeTrialTimeRemaining') || '0') <= 0;

  if (freePeriodExpired) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Free Trial Ended</CardTitle>
              <CardDescription>Your free access period has expired</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You can access premium features again in 24 hours or upgrade to premium for unlimited access.</p>
              
              <Button onClick={() => upgradeAccount()} className="w-full">
                Upgrade to Premium
              </Button>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">Free access will be restored in 24 hours.</p>
            </CardFooter>
          </Card>
          <ChatbotButton />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Future Prediction</h1>
            <p className="text-muted-foreground">
              AI-powered stock price predictions
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {user?.isPremium && (
              <Badge className="bg-success/20 text-success border-success/20 px-3 py-1">
                <Check className="mr-1 h-4 w-4" />
                Premium Account
              </Badge>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="whitespace-nowrap">
                  {user?.isPremium ? "Account Settings" : "Upgrade to Premium"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upgrade to Premium</DialogTitle>
                  <DialogDescription>
                    Get unlimited access to advanced AI predictions and features
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Monthly</CardTitle>
                        <CardDescription>
                          $29.99 per month
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-success mr-2 mt-1" />
                            <span>Unlimited predictions</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-success mr-2 mt-1" />
                            <span>All timeframes</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-success mr-2 mt-1" />
                            <span>Email alerts</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => upgradeAccount()}>
                          Choose Plan
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Annual</CardTitle>
                        <CardDescription>
                          $249.99 per year
                          <Badge className="ml-2 bg-success/20 text-success border-success/20">
                            Save 30%
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-success mr-2 mt-1" />
                            <span>Unlimited predictions</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-success mr-2 mt-1" />
                            <span>All timeframes</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-success mr-2 mt-1" />
                            <span>Priority support</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => upgradeAccount()}>
                          Best Value
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Secure payment with 7-day money back guarantee</span>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button type="button" variant="outline" onClick={() => upgradeAccount()}>
                    Continue with Free Trial
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Stock Search</CardTitle>
                  <CardDescription>Search for a stock to predict</CardDescription>
                </div>
                <Badge className="font-normal flex items-center">
                  <BrainCircuit className="mr-1 h-3.5 w-3.5" />
                  AI Powered
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter stock symbol or name..." 
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <RadioGroup 
                      className="flex space-x-2"
                      defaultValue="US"
                      value={stockOrigin}
                      onValueChange={handleStockOriginChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="US" id="us" />
                        <Label htmlFor="us">US</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="India" id="india" />
                        <Label htmlFor="india">India</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Popular Stocks</h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredStocks.slice(0, 12).map((stock) => (
                        <Button 
                          key={stock.symbol} 
                          variant={selectedStock === stock.symbol ? "default" : "outline"}
                          size="sm" 
                          className="flex items-center"
                          onClick={() => handleStockSelect(stock.symbol)}
                        >
                          {stock.symbol}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Trading Type</h3>
                    <RadioGroup 
                      className="flex flex-wrap gap-4"
                      defaultValue="standard"
                      value={tradingType}
                      onValueChange={handleTradingTypeChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intraday" id="intraday" />
                        <Label htmlFor="intraday">Intraday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="options" id="options" />
                        <Label htmlFor="options">Options</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="futures" id="futures" />
                        <Label htmlFor="futures">Futures</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entry-price">Entry Price</Label>
                      <Input 
                        id="entry-price" 
                        type="number" 
                        step="0.01" 
                        value={entryPrice} 
                        onChange={handleEntryPriceChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exit-price">Exit Price (Target)</Label>
                      <Input 
                        id="exit-price" 
                        type="number" 
                        step="0.01" 
                        value={exitPrice} 
                        onChange={handleExitPriceChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <PredictionCard prediction={predictionData} />
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Current Market Data</CardTitle>
                <CardDescription>Live chart for {selectedStock}</CardDescription>
              </CardHeader>
              <CardContent>
                <StockChart 
                  symbol={selectedStock} 
                  name={
                    filteredStocks.find(stock => stock.symbol === selectedStock)?.name || 
                    (stockOrigin === 'India' ? 'Reliance Industries' : 'Apple Inc.')
                  }
                  origin={stockOrigin}
                  tradingType={tradingType}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Prediction Timeframes</CardTitle>
                <CardDescription>Select your prediction horizon</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="short">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="short">Short-Term</TabsTrigger>
                    <TabsTrigger value="medium">Medium-Term</TabsTrigger>
                    <TabsTrigger value="long">Long-Term</TabsTrigger>
                  </TabsList>
                  <TabsContent value="short" className="p-4 bg-muted/20 rounded-lg mt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">1-Day Forecast</span>
                        {user?.isPremium ? <Check className="h-4 w-4 text-success" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">3-Day Forecast</span>
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">7-Day Forecast</span>
                        <Check className="h-4 w-4 text-success" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="medium" className="p-4 bg-muted/20 rounded-lg mt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">2-Week Forecast</span>
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">1-Month Forecast</span>
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">3-Month Forecast</span>
                        {user?.isPremium ? <Check className="h-4 w-4 text-success" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="long" className="p-4 bg-muted/20 rounded-lg mt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">6-Month Forecast</span>
                        {user?.isPremium ? <Check className="h-4 w-4 text-success" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">1-Year Forecast</span>
                        {user?.isPremium ? <Check className="h-4 w-4 text-success" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">5-Year Trend</span>
                        {user?.isPremium ? <Check className="h-4 w-4 text-success" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              {!user?.isPremium && (
                <CardFooter>
                  <Button className="w-full" onClick={() => upgradeAccount()}>Upgrade for All Timeframes</Button>
                </CardFooter>
              )}
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cpu className="mr-2 h-5 w-5" />
                  How Our AI Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs font-medium">1</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Data Collection</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Our system gathers historical price data, financial statements, economic indicators, and news sentiment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs font-medium">2</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Advanced Analysis</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Machine learning models process the data to identify patterns and correlations that humans might miss.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs font-medium">3</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Prediction Generation</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Our neural networks forecast future prices with confidence intervals and key market factors.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs font-medium">4</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Continuous Learning</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Our algorithms improve over time by learning from prediction accuracy and market developments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card bg-primary/5 border-primary/10">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <BellRing className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-lg">Get Price Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when stocks hit your target prices or when our AI detects significant movement potential.
                </p>
                <div className="w-full space-y-3">
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="Target price"
                    value={priceAlertValue}
                    onChange={handleAlertValueChange}
                  />
                  <Button className="w-full" onClick={handleSetAlerts}>
                    Set Up Alert
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChatbotButton />
    </MainLayout>
  );
};

export default Prediction;
