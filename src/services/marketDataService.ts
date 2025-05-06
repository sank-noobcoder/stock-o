
// Market Data Service for handling stock and news data

// API endpoints for stock data
const API_ENDPOINTS = {
  US_STOCKS: 'https://api.example.com/us-stocks', // Replace with actual API endpoint
  INDIA_STOCKS: 'https://api.example.com/india-stocks', // Replace with actual API endpoint
  MARKET_NEWS: 'https://api.example.com/market-news', // Replace with actual API endpoint
};

// US Stock data
export const usStockList = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'PG', name: 'Procter & Gamble Co.' },
  { symbol: 'MA', name: 'Mastercard Inc.' },
  { symbol: 'DIS', name: 'Walt Disney Co.' },
  { symbol: 'BAC', name: 'Bank of America Corp.' },
  { symbol: 'INTC', name: 'Intel Corp.' },
  { symbol: 'VZ', name: 'Verizon Communications Inc.' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
  { symbol: 'CRM', name: 'Salesforce Inc.' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'KO', name: 'Coca-Cola Co.' },
  { symbol: 'PEP', name: 'PepsiCo Inc.' },
  { symbol: 'CMCSA', name: 'Comcast Corp.' },
  { symbol: 'AVGO', name: 'Broadcom Inc.' },
  { symbol: 'ACN', name: 'Accenture plc' },
  { symbol: 'ABBV', name: 'AbbVie Inc.' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.' },
  { symbol: 'NKE', name: 'Nike Inc.' }
];

// Indian Stock data
export const indianStockList = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys Ltd' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'HCLTECH', name: 'HCL Technologies' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd' },
  { symbol: 'WIPRO', name: 'Wipro Ltd' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical' },
  { symbol: 'TITAN', name: 'Titan Company Ltd' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd' },
  { symbol: 'ITC', name: 'ITC Ltd' },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation' },
  { symbol: 'NTPC', name: 'NTPC Ltd' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation' },
  { symbol: 'COALINDIA', name: 'Coal India Ltd' },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd' },
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd' },
  { symbol: 'GAIL', name: 'GAIL (India) Ltd' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries' },
  { symbol: 'UPL', name: 'UPL Ltd' },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd' }
];

// News data interface
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  summary: string;
  publishedAt: string;
  imageUrl: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedSymbols: string[];
}

// Fetch market news (simulating API call for now)
export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  try {
    // In a production app, this would be a real API call
    // const response = await fetch(API_ENDPOINTS.MARKET_NEWS);
    // const data = await response.json();
    // return data;
    
    // For demo purposes, we'll simulate an API response with current timestamp
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Sample news data with current timestamps
    const currentDate = new Date();
    const news: NewsItem[] = [
      {
        id: crypto.randomUUID(),
        title: 'Apple Reports Record Q4 Earnings, Exceeds Expectations',
        source: 'Financial Times',
        summary: 'Apple Inc. reported record fourth-quarter earnings on Thursday, exceeding Wall Street expectations with strong iPhone and services sales, despite challenges in the Chinese market.',
        publishedAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        imageUrl: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2070&auto=format&fit=crop',
        url: 'https://example.com/news/1',
        sentiment: 'positive',
        relatedSymbols: ['AAPL', 'MSFT', 'GOOGL']
      },
      {
        id: crypto.randomUUID(),
        title: 'Tesla Announces Plans for New Gigafactory in Mexico',
        source: 'Reuters',
        summary: "Tesla Inc. has announced plans to build a new Gigafactory in Mexico, in a move that could significantly expand the electric car maker's production capacity.",
        publishedAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
        url: 'https://example.com/news/2',
        sentiment: 'positive',
        relatedSymbols: ['TSLA', 'F', 'GM']
      },
      {
        id: crypto.randomUUID(),
        title: 'Federal Reserve Signals Potential Interest Rate Hike',
        source: 'Bloomberg',
        summary: 'The Federal Reserve has signaled a potential interest rate hike in the coming months, as inflation concerns persist despite signs of economic cooling.',
        publishedAt: new Date(currentDate.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        imageUrl: 'https://images.unsplash.com/photo-1582281171984-45e11d8efee9?q=80&w=2070&auto=format&fit=crop',
        url: 'https://example.com/news/3',
        sentiment: 'negative',
        relatedSymbols: ['JPM', 'GS', 'BAC']
      },
      {
        id: crypto.randomUUID(),
        title: 'Nvidia Stock Surges on AI Demand Forecasts',
        source: 'CNBC',
        summary: 'Nvidia shares jumped 8% today after the company released updated forecasts showing stronger-than-expected demand for its AI chips from data centers and cloud providers.',
        publishedAt: new Date(currentDate.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2070&auto=format&fit=crop',
        url: 'https://example.com/news/4',
        sentiment: 'positive',
        relatedSymbols: ['NVDA', 'AMD', 'INTC']
      },
      {
        id: crypto.randomUUID(),
        title: 'Oil Prices Fall After OPEC+ Meeting Delay',
        source: 'Wall Street Journal',
        summary: 'Global oil prices dropped sharply following the delay of a key OPEC+ meeting where production cuts were expected to be discussed, raising concerns about oversupply in the market.',
        publishedAt: new Date(currentDate.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        imageUrl: 'https://images.unsplash.com/photo-1615767797820-5088a2536f90?q=80&w=2070&auto=format&fit=crop',
        url: 'https://example.com/news/5',
        sentiment: 'negative',
        relatedSymbols: ['XOM', 'CVX', 'BP']
      }
    ];
    
    return news;
  } catch (error) {
    console.error("Failed to fetch market news:", error);
    throw new Error("Failed to load market news");
  }
};

// Generate stock chart data for different time frames
export const generateChartData = (timeFrame: string, symbol: string, origin: 'US' | 'India' | 'Other') => {
  // Base price is higher for Indian stocks (in rupees)
  const basePrice = origin === 'India' ? 1500 : 150;
  let days = 30; // Default to 30 days
  let volatility = 2;
  
  // Set days and volatility based on timeFrame
  switch (timeFrame) {
    case '1D':
      return generateIntradayData(basePrice, symbol);
    case '1W':
      days = 7;
      volatility = 1;
      break;
    case '1M':
      days = 30;
      volatility = 2;
      break;
    case '3M':
      days = 90;
      volatility = 3;
      break;
    case '1Y':
      days = 365;
      volatility = 5;
      break;
    case '5Y':
      days = 1825;
      volatility = 10;
      break;
  }
  
  return generateDailyData(days, basePrice, volatility, symbol);
};

// Generate daily stock data
const generateDailyData = (days: number, basePrice: number, volatility: number, symbol: string) => {
  const data = [];
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - days);
  
  let price = basePrice;
  
  for (let i = 0; i < days; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    // Skip weekends
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      continue;
    }
    
    // Random price change with trend bias based on symbol
    const symbolHash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const bias = (symbolHash % 10) / 100; // -0.05 to 0.05
    
    const change = (Math.random() - 0.48 + bias) * volatility;
    price = Math.max(price + change, 0.1);
    
    // Generate volume data
    const volumeData = Math.floor(Math.random() * 10000000) + 1000000;
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      volume: volumeData
    });
  }
  
  return data;
};

// Generate intraday data (for 1D view)
const generateIntradayData = (basePrice: number, symbol: string) => {
  const data = [];
  const now = new Date();
  const marketOpen = new Date(now);
  marketOpen.setHours(9, 30, 0, 0);
  
  let price = basePrice;
  
  // Generate data points for each hour of the trading day
  for (let hour = 9; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      // Skip before market open
      if (hour === 9 && minute < 30) {
        continue;
      }
      
      // Skip after market close
      if (hour === 16 && minute > 0) {
        continue;
      }
      
      const timePoint = new Date(now);
      timePoint.setHours(hour, minute, 0, 0);
      
      // Don't include future times
      if (timePoint > now) {
        break;
      }
      
      // Calculate time string (e.g., "09:30")
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Random price change
      const change = (Math.random() - 0.5) * 0.5;
      price = Math.max(price + change, 0.1);
      
      data.push({
        time: timeString,
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000
      });
    }
  }
  
  return data;
};
