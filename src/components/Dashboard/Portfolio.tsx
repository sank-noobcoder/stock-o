
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
}

const Portfolio: React.FC = () => {
  const stocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, buyPrice: 145.23, currentPrice: 156.78 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 5, buyPrice: 287.45, currentPrice: 273.89 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 2, buyPrice: 2542.12, currentPrice: 2630.55 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 3, buyPrice: 135.67, currentPrice: 145.23 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 8, buyPrice: 210.32, currentPrice: 196.45 },
  ];

  const calculateTotalValue = () => {
    return stocks.reduce((total, stock) => total + (stock.currentPrice * stock.shares), 0);
  };

  const calculateTotalInvestment = () => {
    return stocks.reduce((total, stock) => total + (stock.buyPrice * stock.shares), 0);
  };

  const calculateTotalReturn = () => {
    const currentValue = calculateTotalValue();
    const investment = calculateTotalInvestment();
    return currentValue - investment;
  };

  const calculateReturnPercentage = () => {
    const currentValue = calculateTotalValue();
    const investment = calculateTotalInvestment();
    return investment ? ((currentValue - investment) / investment) * 100 : 0;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const totalValue = calculateTotalValue();
  const totalReturn = calculateTotalReturn();
  const returnPercentage = calculateReturnPercentage();

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Total Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Total Return</p>
              <p className={`text-lg font-semibold flex items-center justify-end ${totalReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalReturn >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                {formatCurrency(totalReturn)} ({returnPercentage.toFixed(2)}%)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Asset Allocation</span>
              <span className="text-muted-foreground">% of Portfolio</span>
            </div>
            {stocks.map((stock) => {
              const stockValue = stock.currentPrice * stock.shares;
              const percentage = (stockValue / totalValue) * 100;
              
              return (
                <div key={stock.symbol} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{stock.symbol}</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Holdings</h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              {stocks.map((stock) => {
                const currentValue = stock.currentPrice * stock.shares;
                const investedValue = stock.buyPrice * stock.shares;
                const stockReturn = currentValue - investedValue;
                const stockReturnPercentage = (stockReturn / investedValue) * 100;
                
                return (
                  <div key={stock.symbol} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground">{stock.shares} shares</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(currentValue)}</p>
                      <p className={`text-sm flex items-center justify-end ${stockReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                        {stockReturn >= 0 ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                        {stockReturnPercentage.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <Button className="w-full">View All Holdings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
