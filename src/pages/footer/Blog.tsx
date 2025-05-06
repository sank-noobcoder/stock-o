
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, Search, ChevronRight } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Market Volatility: Key Indicators to Watch',
      excerpt: 'Market volatility can be challenging to navigate. Learn about the key indicators that can help you make informed decisions during turbulent times.',
      author: 'Jane Smith',
      date: 'April 2, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1000&auto=format&fit=crop',
      categories: ['Market Analysis', 'Trading Strategy']
    },
    {
      id: 2,
      title: 'The Rise of AI in Stock Market Prediction',
      excerpt: 'Artificial intelligence is revolutionizing the way we predict stock market trends. Discover how machine learning models are being used to forecast price movements with increasing accuracy.',
      author: 'Michael Johnson',
      date: 'March 25, 2025',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000&auto=format&fit=crop',
      categories: ['Technology', 'AI', 'Predictions']
    },
    {
      id: 3,
      title: '5 Essential Technical Analysis Patterns for Beginners',
      excerpt: 'Technical analysis can be overwhelming for beginners. This article breaks down five fundamental patterns that every new trader should understand.',
      author: 'Sarah Williams',
      date: 'March 15, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
      categories: ['Technical Analysis', 'Education']
    },
    {
      id: 4,
      title: 'How to Build a Balanced Investment Portfolio in 2025',
      excerpt: 'With changing economic conditions, portfolio diversification strategies need to evolve. Learn how to create a balanced investment portfolio suited for the current market environment.',
      author: 'Robert Chen',
      date: 'March 8, 2025',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1000&auto=format&fit=crop',
      categories: ['Portfolio Management', 'Investment Strategy']
    }
  ];

  const categories = ['All', 'Market Analysis', 'Technical Analysis', 'Investment Strategy', 'AI', 'Technology', 'Education'];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">StockOracle Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights, analysis, and educational content from our financial experts
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button 
                key={index} 
                variant={index === 0 ? "default" : "outline"} 
                size="sm"
                className={index === 0 ? '' : 'border-primary/20 text-primary'}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="glass-card overflow-hidden">
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
                      {category}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-primary group">
                    Read Article 
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button>Load More Articles</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
