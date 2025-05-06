import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ArrowDownUp, 
  Plus, 
  Minus, 
  Info, 
  AlertTriangle, 
  Bell,
  History,
  BookOpen,
} from 'lucide-react';
import StockChart from '@/components/Dashboard/StockChart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ChatbotButton from '@/components/Dashboard/ChatbotButton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  origin: 'US' | 'India';
}

const Brokerage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [quantity, setQuantity] = useState('1');
  const [orderType, setOrderType] = useState('buy');
  const [stockOrigin, setStockOrigin] = useState<'US' | 'India'>('US');
  const [entryPrice, setEntryPrice] = useState<string>('');
  const [exitPrice, setExitPrice] = useState<string>('');
  const [priceAlertValue, setPriceAlertValue] = useState<string>('');
  const { user, isAuthenticated } = useAuth();
  const [orderHistory, setOrderHistory] = useState<{
    id: string;
    symbol: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    total: number;
    status: 'completed' | 'pending' | 'cancelled';
    date: string;
  }[]>([
    {
      id: '1',
      symbol: 'AAPL',
      type: 'buy',
      quantity: 10,
      price: 155.74,
      total: 1557.40,
      status: 'completed',
      date: '2025-04-04 14:22:38'
    },
    {
      id: '2',
      symbol: 'MSFT',
      type: 'buy',
      quantity: 5,
      price: 273.89,
      total: 1369.45,
      status: 'completed',
      date: '2025-04-03 09:45:12'
    },
    {
      id: '3',
      symbol: 'TSLA',
      type: 'sell',
      quantity: 3,
      price: 196.45,
      total: 589.35,
      status: 'completed',
      date: '2025-04-02 11:32:06'
    }
  ]);
  
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

  const usStockQuotes: StockQuote[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 156.78, change: 2.45, changePercent: 1.58, volume: 85_432_100, marketCap: '2.48T', origin: 'US' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 273.89, change: -1.32, changePercent: -0.48, volume: 42_567_800, marketCap: '2.05T', origin: 'US' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2630.55, change: 15.22, changePercent: 0.58, volume: 1_987_600, marketCap: '1.76T', origin: 'US' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.23, change: -0.89, changePercent: -0.61, volume: 56_789_300, marketCap: '1.49T', origin: 'US' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 196.45, change: 5.67, changePercent: 2.97, volume: 123_456_700, marketCap: '623.8B', origin: 'US' },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 324.18, change: 4.21, changePercent: 1.31, volume: 32_456_100, marketCap: '836.7B', origin: 'US' },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 418.95, change: -3.15, changePercent: -0.75, volume: 7_654_300, marketCap: '185.2B', origin: 'US' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 208.76, change: 8.43, changePercent: 4.21, volume: 98_765_400, marketCap: '515.3B', origin: 'US' },
  ];

  const indianStockQuotes: StockQuote[] = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2450.75, change: 34.25, changePercent: 1.42, volume: 3_267_890, marketCap: '15.6L Cr', origin: 'India' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3644.30, change: -22.80, changePercent: -0.62, volume: 1_876_540, marketCap: '13.3L Cr', origin: 'India' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1478.60, change: 12.50, changePercent: 0.85, volume: 2_345_670, marketCap: '6.1L Cr', origin: 'India' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1612.90, change: -8.70, changePercent: -0.54, volume: 2_134_560, marketCap: '8.9L Cr', origin: 'India' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 867.35, change: 15.80, changePercent: 1.86, volume: 3_456_780, marketCap: '6.0L Cr', origin: 'India' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 785.60, change: 10.45, changePercent: 1.35, volume: 1_987_650, marketCap: '4.4L Cr', origin: 'India' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 542.80, change: -2.15, changePercent: -0.39, volume: 4_567_890, marketCap: '4.8L Cr', origin: 'India' },
    { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1078.45, change: 25.75, changePercent: 2.45, volume: 1_456_780, marketCap: '2.9L Cr', origin: 'India' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 782.30, change: 8.45, changePercent: 1.09, volume: 3_123_456, marketCap: '2.6L Cr', origin: 'India' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 425.15, change: -3.20, changePercent: -0.75, volume: 1_987_543, marketCap: '2.3L Cr', origin: 'India' },
    { symbol: 'AXISBANK', name: 'Axis Bank Ltd', price: 1045.70, change: 12.35, changePercent: 1.19, volume: 2_345_678, marketCap: '3.2L Cr', origin: 'India' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 7124.55, change: -45.65, changePercent: -0.64, volume: 876_543, marketCap: '4.3L Cr', origin: 'India' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India', price: 10478.90, change: 134.20, changePercent: 1.30, volume: 345_678, marketCap: '3.2L Cr', origin: 'India' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1245.30, change: 23.45, changePercent: 1.92, volume: 1_234_567, marketCap: '2.9L Cr', origin: 'India' },
    { symbol: 'TITAN', name: 'Titan Company Ltd', price: 3267.80, change: -23.45, changePercent: -0.71, volume: 567_890, marketCap: '2.9L Cr', origin: 'India' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2534.65, change: 15.70, changePercent: 0.62, volume: 987_654, marketCap: '5.9L Cr', origin: 'India' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1835.40, change: -5.60, changePercent: -0.30, volume: 1_345_678, marketCap: '3.6L Cr', origin: 'India' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 3128.75, change: 32.45, changePercent: 1.05, volume: 456_789, marketCap: '3.0L Cr', origin: 'India' }
  ];

  const getStockQuotes = () => {
    return stockOrigin === 'India' ? indianStockQuotes : usStockQuotes;
  };

  const filteredStocks = getStockQuotes().filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStockData = filteredStocks.find(stock => stock.symbol === selectedStock);

  useEffect(() => {
    if (selectedStockData) {
      setEntryPrice(selectedStockData.price.toString());
      setExitPrice((orderType === 'sell' ? 
        selectedStockData.price * 0.95 : 
        selectedStockData.price * 1.05).toFixed(2));
      setPriceAlertValue(selectedStockData.price.toString());
    }
  }, [selectedStockData, orderType]);

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStockData) return;

    const newOrder = {
      id: `${Date.now()}`,
      symbol: selectedStock,
      type: orderType as 'buy' | 'sell',
      quantity: parseInt(quantity),
      price: selectedStockData.price,
      total: selectedStockData.price * parseInt(quantity),
      status: 'completed' as const,
      date: new Date().toLocaleString()
    };

    setOrderHistory([newOrder, ...orderHistory]);

    toast({
      title: `Order ${orderType === 'buy' ? 'Purchased' : 'Sold'} Successfully`,
      description: `${orderType === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${selectedStock} at ${formatCurrency(selectedStockData.price)}`,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: stockOrigin === 'India' ? 'INR' : 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const handleStockOriginChange = (value: string) => {
    setStockOrigin(value as 'US' | 'India');
    if (value === 'India') {
      setSelectedStock('RELIANCE');
    } else {
      setSelectedStock('AAPL');
    }
  };

  const handleSetPriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!priceAlertValue || !selectedStockData) return;
    
    toast({
      title: "Price Alert Set",
      description: `You'll be notified when ${selectedStock} reaches ${formatCurrency(parseFloat(priceAlertValue))}.`,
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

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Stock Brokerage</h1>
            <p className="text-muted-foreground">
              Trade stocks with real-time market data
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search stocks..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <RadioGroup 
              className="flex space-x-4"
              defaultValue="US"
              value={stockOrigin}
              onValueChange={handleStockOriginChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="US" id="us-stocks" />
                <Label htmlFor="us-stocks">US</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="India" id="indian-stocks" />
                <Label htmlFor="indian-stocks">India</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStocks.map((stock) => (
                      <TableRow key={stock.symbol} className={selectedStock === stock.symbol ? 'bg-muted/30' : ''}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(stock.price)}</TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                            {stock.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {formatCurrency(stock.change)} ({stock.changePercent.toFixed(2)}%)
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatNumber(stock.volume)}</TableCell>
                        <TableCell className="text-right">{stock.marketCap}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleStockSelect(stock.symbol)}
                          >
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <StockChart 
              symbol={selectedStock} 
              name={selectedStockData?.name || ''}
              origin={stockOrigin}
            />
          </div>
          
          <div className="lg:col-start-3">
            <div className="sticky top-20 space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Trade {selectedStock}</CardTitle>
                  <CardDescription>
                    {selectedStockData?.name} - {selectedStockData ? formatCurrency(selectedStockData.price) : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="market" className="space-y-4">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="market">Market Order</TabsTrigger>
                      <TabsTrigger value="limit">Limit Order</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="market">
                      <form onSubmit={handleOrderSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Order Type</label>
                            <Badge variant="outline" className="font-normal">Market Price</Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              type="button" 
                              variant={orderType === 'buy' ? 'default' : 'outline'} 
                              onClick={() => setOrderType('buy')}
                              className="w-full flex items-center"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Buy
                            </Button>
                            <Button 
                              type="button" 
                              variant={orderType === 'sell' ? 'default' : 'outline'} 
                              onClick={() => setOrderType('sell')}
                              className="w-full flex items-center"
                            >
                              <Minus className="h-4 w-4 mr-2" />
                              Sell
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Quantity</label>
                          <Input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Entry Price</label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              value={entryPrice}
                              onChange={handleEntryPriceChange}
                              className="w-full" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Exit Price (Target)</label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              value={exitPrice}
                              onChange={handleExitPriceChange}
                              className="w-full"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Estimated Cost</label>
                          <div className="p-3 border rounded-md bg-muted/10 flex justify-between items-center">
                            <span>
                              {quantity} × {selectedStockData ? formatCurrency(selectedStockData.price) : ''}
                            </span>
                            <span className="font-semibold">
                              {selectedStockData ? formatCurrency(selectedStockData.price * parseInt(quantity || '0')) : ''}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-muted/30 rounded-lg border border-muted flex items-start">
                          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-2" />
                          <p className="text-xs text-muted-foreground">
                            Market orders execute immediately at the best available price. The actual execution price may differ from the current quote due to market fluctuations.
                          </p>
                        </div>
                        
                        <Button type="submit" className="w-full">
                          {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedStock}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="limit">
                      <form onSubmit={handleOrderSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Order Type</label>
                            <Badge variant="outline" className="font-normal">Limit Price</Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              type="button" 
                              variant={orderType === 'buy' ? 'default' : 'outline'} 
                              onClick={() => setOrderType('buy')}
                              className="w-full flex items-center"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Buy
                            </Button>
                            <Button 
                              type="button" 
                              variant={orderType === 'sell' ? 'default' : 'outline'} 
                              onClick={() => setOrderType('sell')}
                              className="w-full flex items-center"
                            >
                              <Minus className="h-4 w-4 mr-2" />
                              Sell
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Quantity</label>
                          <Input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Entry Price</label>
                            <span className="text-sm font-medium">{selectedStockData ? formatCurrency(selectedStockData.price) : '-'}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Exit Price (Target)</label>
                            <span className="text-sm font-medium">
                              {selectedStockData ? formatCurrency(selectedStockData.price * (orderType === 'buy' ? 1.05 : 0.95)) : '-'}
                            </span>
                          </div>
                          <Input 
                            type="number" 
                            step="0.01" 
                            defaultValue={selectedStockData ? (selectedStockData.price * (orderType === 'buy' ? 1.05 : 0.95)).toFixed(2) : '0.00'} 
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Time in Force</label>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">Day Only</span>
                            </div>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg border border-muted flex items-start">
                            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mr-2" />
                            <p className="text-xs text-muted-foreground">
                              Limit orders allow you to specify the price at which you want to buy or sell. The order will only execute if the market reaches your specified price or better.
                            </p>
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full">
                          Place Limit Order
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Trading Rules
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Trading Rules</SheetTitle>
                        <SheetDescription>
                          Guidelines and policies for trading on our platform
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h3 className="text-base font-semibold">Market Hours</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            US Markets: 9:30 AM - 4:00 PM ET, Monday to Friday<br />
                            Indian Markets: 9:15 AM - 3:30 PM IST, Monday to Friday
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold">Order Types</h3>
                          <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                            <li>Market orders execute immediately at the best available price</li>
                            <li>Limit orders execute only at your specified price or better</li>
                            <li>Stop orders convert to market orders when a trigger price is reached</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold">Fees & Commissions</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Trading fees vary by account type and trading volume. Please refer to our fee schedule for detailed information.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold">Settlement</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Trades typically settle in T+2 days (two business days after the transaction date).
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold">Risk Management</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Always maintain sufficient funds in your account to cover your positions. Margin calls may be issued if your account falls below the required maintenance margin.
                          </p>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        Order History
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle>Order History</SheetTitle>
                        <SheetDescription>
                          Your recent trading activity
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Symbol</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orderHistory.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.symbol}</TableCell>
                                <TableCell>
                                  <Badge variant={order.type === 'buy' ? 'default' : 'destructive'} className="font-normal">
                                    {order.type === 'buy' ? 'Buy' : 'Sell'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">{order.quantity}</TableCell>
                                <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={
                                    order.status === 'completed' ? 'bg-success/10 text-success' : 
                                    order.status === 'pending' ? 'bg-warning/10 text-warning' : 
                                    'bg-danger/10 text-danger'
                                  }>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>

              <Card className="glass-card sticky top-6 z-10">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Bell className="h-5 w-5 mr-2" />
                    Set Price Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSetPriceAlert}>
                    <div className="space-y-2">
                      <Label htmlFor="alert-price">Alert me when {selectedStock} reaches:</Label>
                      <Input 
                        id="alert-price" 
                        type="number" 
                        step="0.01" 
                        value={priceAlertValue}
                        onChange={handleAlertValueChange}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full">Set Alert</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ChatbotButton />
    </MainLayout>
  );
};

export default Brokerage;
