
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Share2, ThumbsUp, MessageSquare, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { fetchMarketNews, NewsItem } from '@/services/marketDataService';

interface NewsCardProps {
  news?: NewsItem[];
}

const NewsCard: React.FC<NewsCardProps> = ({ news: initialNews }) => {
  // Fetch news data using React Query
  const { data: newsData, isLoading, error } = useQuery({
    queryKey: ['marketNews'],
    queryFn: fetchMarketNews,
    initialData: initialNews || undefined,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success/10 text-success hover:bg-success/20 border-success/30';
      case 'negative':
        return 'bg-danger/10 text-danger hover:bg-danger/20 border-danger/30';
      default:
        return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHrs / 24);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-finance-700/10 to-finance-400/5">
          <CardTitle className="text-xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-finance-500" />
            Market News
          </CardTitle>
          <CardDescription>Loading latest news...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-finance-700/10 to-finance-400/5">
          <CardTitle className="text-xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-finance-500" />
            Market News
          </CardTitle>
          <CardDescription>Could not load market news</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">There was an error loading the latest news. Please try again later.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>Retry</Button>
        </CardFooter>
      </Card>
    );
  }

  const news = newsData || [];

  return (
    <Card className="glass-card overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-finance-700/10 to-finance-400/5">
        <CardTitle className="text-xl font-bold flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-finance-500" />
          Market News
        </CardTitle>
        <CardDescription>Latest news affecting the markets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {news.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No news available at this time.</p>
          </div>
        ) : (
          news.map((item) => (
            <div key={item.id} className="group hover:bg-muted/10 rounded-lg transition-all duration-200 -mx-2 px-2 py-3">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 h-40 overflow-hidden rounded-lg shadow-md relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20">
                    <div className="flex flex-wrap gap-1">
                      {item.relatedSymbols.map((symbol) => (
                        <Badge key={symbol} variant="outline" className="bg-black/30 backdrop-blur-sm text-white border-white/20 text-xs">
                          ${symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="font-normal bg-finance-500/10 border-finance-500/30 text-finance-600 dark:text-finance-400">
                      {item.source}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`font-normal ${getSentimentColor(item.sentiment)}`}
                    >
                      {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center ml-auto">
                      <Clock size={12} className="mr-1" />
                      {getTimeAgo(item.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10 hover:text-primary">
                      <ThumbsUp size={14} className="mr-1" />
                      <span className="text-xs">Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10 hover:text-primary">
                      <MessageSquare size={14} className="mr-1" />
                      <span className="text-xs">Comment</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10 hover:text-primary">
                      <Share2 size={14} className="mr-1" />
                      <span className="text-xs">Share</span>
                    </Button>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="ml-auto">
                      <Button variant="outline" size="sm" className="h-8 px-3 bg-finance-500/10 border-finance-500/30 hover:bg-finance-500/20 text-finance-600 dark:text-finance-400">
                        <ExternalLink size={14} className="mr-1" />
                        <span className="text-xs">Read More</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-b border-border last:border-0"></div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-finance-400/5 to-finance-700/10 p-4">
        <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20">View All News</Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
