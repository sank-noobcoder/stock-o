
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, TrendingUp, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateChartData } from '@/services/marketDataService';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';
type ChartType = 'area' | 'line' | 'bar' | 'composed';

interface StockChartProps {
  symbol?: string;
  name?: string;
  initialData?: any[];
  origin?: 'US' | 'India' | 'Other';
  tradingType?: 'intraday' | 'options' | 'futures' | 'standard';
}

const StockChart: React.FC<StockChartProps> = ({ 
  symbol = 'AAPL', 
  name = 'Apple Inc.',
  initialData = [],
  origin = 'US',
  tradingType = 'standard'
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);

  useEffect(() => {
    setLoading(true);
    
    // Generate data based on selected time range
    const chartData = generateChartData(timeRange, symbol, origin);
    setData(chartData);
    
    // Calculate current price and change
    if (chartData.length > 0) {
      const current = chartData[chartData.length - 1].price;
      const previous = chartData.length > 1 ? chartData[chartData.length - 2].price : current;
      
      setCurrentPrice(current);
      setPriceChange(parseFloat((current - previous).toFixed(2)));
      setPriceChangePercent(parseFloat(((current - previous) / previous * 100).toFixed(2)));
    }
    
    setLoading(false);
  }, [timeRange, symbol, origin, tradingType]);

  const getPriceColor = () => {
    if (priceChange > 0) return 'text-success';
    if (priceChange < 0) return 'text-danger';
    return 'text-muted-foreground';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: origin === 'India' ? 'INR' : 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading chart data...</div>
        </div>
      );
    }

    // For 1D view, use time as x-axis instead of date
    const dataKey = timeRange === '1D' ? 'time' : 'date';

    const renderChartContent = () => {
      switch (chartType) {
        case 'line':
          return (
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey={dataKey} 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                minTickGap={20}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${origin === 'India' ? '₹' : '$'}${value}`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Price']}
                labelFormatter={(label) => timeRange === '1D' ? `Time: ${label}` : `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? "#10b981" : "#ef4444"} 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          );
        case 'bar':
          return (
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey={dataKey} 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                minTickGap={20}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${origin === 'India' ? '₹' : '$'}${value}`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Price']}
                labelFormatter={(label) => timeRange === '1D' ? `Time: ${label}` : `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Bar 
                dataKey="price" 
                fill={priceChange >= 0 ? "#10b981" : "#ef4444"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          );
        case 'composed':
          return (
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey={dataKey} 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                minTickGap={20}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${origin === 'India' ? '₹' : '$'}${value}`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Price']}
                labelFormatter={(label) => timeRange === '1D' ? `Time: ${label}` : `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                fill="url(#colorPrice)"
                stroke={priceChange >= 0 ? "#10b981" : "#ef4444"} 
                fillOpacity={0.3}
              />
              <Bar dataKey="volume" fill="#9ca3af" opacity={0.3} barSize={20} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? "#10b981" : "#ef4444"} 
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          );
        default:
          return (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={priceChange >= 0 ? "#10b981" : "#ef4444"} 
                    stopOpacity={0.8}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={priceChange >= 0 ? "#10b981" : "#ef4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey={dataKey} 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                minTickGap={20}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${origin === 'India' ? '₹' : '$'}${value}`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Price']}
                labelFormatter={(label) => timeRange === '1D' ? `Time: ${label}` : `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? "#10b981" : "#ef4444"} 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          );
      }
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        {renderChartContent()}
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="w-full glass-card">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 space-y-2 sm:space-y-0">
        <CardTitle className="text-xl font-bold">
          {name} ({symbol})
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex flex-wrap gap-1">
            {['1D', '1W', '1M', '3M', '1Y', '5Y'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range as TimeRange)}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="composed">Composed Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold mr-2">{formatCurrency(currentPrice)}</span>
          <div className={`flex items-center ${getPriceColor()}`}>
            {priceChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-medium">
              {priceChange > 0 ? '+' : ''}{formatCurrency(priceChange)} ({priceChangePercent > 0 ? '+' : ''}{priceChangePercent}%)
            </span>
          </div>
        </div>
        
        <div className="h-80">
          {renderChart()}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <div className="flex items-center">
            <TrendingUp className="text-muted-foreground mr-2" size={18} />
            <span className="text-sm text-muted-foreground">
              Volume: {data.length > 0 ? new Intl.NumberFormat().format(data[data.length - 1].volume) : '0'}
            </span>
          </div>
          <div className="flex items-center">
            <Activity className="text-muted-foreground mr-2" size={18} />
            <span className="text-sm text-muted-foreground">
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
