
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, Info, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PredictionData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  tradingType: 'intraday' | 'options' | 'futures' | 'standard';
  origin: 'US' | 'India' | 'Other';
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    strength: number;
  }[];
}

interface PredictionCardProps {
  prediction?: PredictionData;
}

const defaultPrediction: PredictionData = {
  symbol: 'AAPL',
  companyName: 'Apple Inc.',
  currentPrice: 155.74,
  predictedPrice: 172.50,
  confidence: 76,
  timeframe: '3 months',
  tradingType: 'standard',
  origin: 'US',
  factors: [
    {
      name: 'Strong Earnings',
      impact: 'positive',
      strength: 85
    },
    {
      name: 'Product Innovation',
      impact: 'positive',
      strength: 78
    },
    {
      name: 'Market Competition',
      impact: 'negative',
      strength: 62
    },
    {
      name: 'Supply Chain Issues',
      impact: 'negative',
      strength: 45
    },
    {
      name: 'Economic Outlook',
      impact: 'neutral',
      strength: 50
    }
  ]
};

const intradayPrediction: PredictionData = {
  ...defaultPrediction,
  timeframe: '1 day',
  tradingType: 'intraday',
  predictedPrice: 157.85,
  confidence: 82,
  factors: [
    {
      name: 'Market Sentiment',
      impact: 'positive',
      strength: 88
    },
    {
      name: 'Technical Indicators',
      impact: 'positive',
      strength: 76
    },
    {
      name: 'Volume Trends',
      impact: 'positive',
      strength: 70
    },
    {
      name: 'Short-term Volatility',
      impact: 'negative',
      strength: 45
    }
  ]
};

const optionsPrediction: PredictionData = {
  ...defaultPrediction,
  timeframe: '2 weeks',
  tradingType: 'options',
  predictedPrice: 164.20,
  confidence: 65,
  factors: [
    {
      name: 'Implied Volatility',
      impact: 'positive',
      strength: 72
    },
    {
      name: 'Options Chain Interest',
      impact: 'positive',
      strength: 68
    },
    {
      name: 'Time Decay',
      impact: 'negative',
      strength: 76
    },
    {
      name: 'Strike Price Trends',
      impact: 'neutral',
      strength: 55
    }
  ]
};

const futuresPrediction: PredictionData = {
  ...defaultPrediction,
  timeframe: '6 months',
  tradingType: 'futures',
  predictedPrice: 182.30,
  confidence: 68,
  factors: [
    {
      name: 'Long-term Market Trends',
      impact: 'positive',
      strength: 75
    },
    {
      name: 'Sector Performance',
      impact: 'positive',
      strength: 82
    },
    {
      name: 'Economic Indicators',
      impact: 'neutral',
      strength: 58
    },
    {
      name: 'Rollover Interest',
      impact: 'negative',
      strength: 43
    }
  ]
};

const indianStockPrediction: PredictionData = {
  symbol: 'RELIANCE',
  companyName: 'Reliance Industries Ltd',
  currentPrice: 2450.75,
  predictedPrice: 2650.25,
  confidence: 72,
  timeframe: '3 months',
  tradingType: 'standard',
  origin: 'India',
  factors: [
    {
      name: 'Quarterly Results',
      impact: 'positive',
      strength: 80
    },
    {
      name: 'Sector Growth',
      impact: 'positive',
      strength: 75
    },
    {
      name: 'Competition',
      impact: 'negative',
      strength: 58
    },
    {
      name: 'Economic Outlook',
      impact: 'neutral',
      strength: 60
    }
  ]
};

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const getPredictionByType = () => {
    if (!prediction) {
      return defaultPrediction;
    }
    return prediction;
  };

  const predictionData = getPredictionByType();
  const priceChange = predictionData.predictedPrice - predictionData.currentPrice;
  const percentChange = (priceChange / predictionData.currentPrice) * 100;
  const isPriceUp = priceChange > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: predictionData.origin === 'India' ? 'INR' : 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'bg-success';
    if (confidence >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  const getTradingTypeLabel = () => {
    switch (predictionData.tradingType) {
      case 'intraday':
        return 'Intraday Trading';
      case 'options':
        return 'Options Trading';
      case 'futures':
        return 'Futures Trading';
      default:
        return 'Standard Trading';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {predictionData.symbol} Price Prediction
            </CardTitle>
            <CardDescription>{predictionData.companyName}</CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/10">
              <Clock className="mr-1 h-3 w-3" />
              {predictionData.timeframe}
            </Badge>
            <Badge variant="outline" className="bg-muted/10">
              {getTradingTypeLabel()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-xl font-semibold">{formatCurrency(predictionData.currentPrice)}</p>
          </div>
          <div className="flex items-center text-2xl font-bold">
            →
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Predicted Price</p>
            <p className="text-xl font-semibold">{formatCurrency(predictionData.predictedPrice)}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
          <div className="flex items-center">
            {isPriceUp ? (
              <TrendingUp className="mr-2 h-5 w-5 text-success" />
            ) : (
              <TrendingDown className="mr-2 h-5 w-5 text-danger" />
            )}
            <span className={`font-bold text-lg ${isPriceUp ? 'text-success' : 'text-danger'}`}>
              {isPriceUp ? '+' : ''}{formatCurrency(priceChange)} ({percentChange.toFixed(2)}%)
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Confidence</span>
            <span className="font-semibold">{predictionData.confidence}%</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Prediction Confidence</h3>
            <div className="flex items-center">
              <Info className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-xs text-muted-foreground">Based on AI analysis</span>
            </div>
          </div>
          <Progress 
            value={predictionData.confidence} 
            className="h-2.5" 
            style={{ background: 'rgba(100, 100, 100, 0.2)', overflow: 'hidden' }}
          >
            <div 
              className={`h-full ${getConfidenceColor(predictionData.confidence)}`} 
              style={{ width: `${predictionData.confidence}%`, transition: 'width 0.3s ease' }}
            />
          </Progress>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Key Factors</h3>
          <div className="space-y-3">
            {predictionData.factors.map((factor, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{factor.name}</span>
                  <span className={`text-xs font-medium ${getImpactColor(factor.impact)}`}>
                    {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={factor.strength} 
                    className="h-1.5"
                    style={{ background: 'rgba(100, 100, 100, 0.2)', overflow: 'hidden' }}
                  >
                    <div 
                      className={`h-full ${factor.impact === 'positive' ? 'bg-success' : factor.impact === 'negative' ? 'bg-danger' : 'bg-muted-foreground'}`} 
                      style={{ width: `${factor.strength}%`, transition: 'width 0.3s ease' }}
                    />
                  </Progress>
                  <span className="text-xs text-muted-foreground">{factor.strength}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-muted/30 rounded-lg border border-border flex items-start">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5 mr-3" />
          <p className="text-xs text-muted-foreground">
            This prediction is for informational purposes only and should not be considered as financial advice. The stock market is unpredictable, and all investments carry risk. Always consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Share</Button>
        <Button>Detailed Analysis</Button>
      </CardFooter>
    </Card>
  );
};

export { PredictionCard, defaultPrediction, intradayPrediction, optionsPrediction, futuresPrediction, indianStockPrediction };
export type { PredictionData };
export default PredictionCard;
