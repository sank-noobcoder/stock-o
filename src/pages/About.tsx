
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, BarChart3, Globe, Shield, MessageCircle } from 'lucide-react';
import ChatbotButton from '@/components/Dashboard/ChatbotButton';

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Platform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building the future of intelligent financial analysis and trading
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              We're on a mission to democratize financial markets by providing advanced AI-powered tools
              that were previously only available to large institutions and hedge funds. 
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Our platform combines cutting-edge technology with user-friendly interfaces to make sophisticated
              trading strategies and market analysis accessible to everyone, from beginners to seasoned professionals.
            </p>
            <div className="mt-8">
              <Button size="lg">Learn More</Button>
            </div>
          </div>
          
          <div className="bg-muted/10 rounded-xl p-8 glass-card">
            <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Innovation</h4>
                  <p className="text-muted-foreground">Continuously pushing boundaries with cutting-edge AI technology</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Transparency</h4>
                  <p className="text-muted-foreground">Clear, honest information about how our platform works</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Accessibility</h4>
                  <p className="text-muted-foreground">Making advanced tools available to traders of all experience levels</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-muted-foreground">Empowering users through comprehensive learning resources</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="glass-card">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Powerful AI-driven market analysis and visualization tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform processes millions of data points to provide actionable insights and predictions,
                helping you make informed trading decisions backed by data science.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Global Markets</CardTitle>
              <CardDescription>
                Access to US, Indian, and other international stock markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trade and analyze stocks from multiple global exchanges with real-time data, 
                comprehensive research tools, and localized market insights.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Community-Driven</CardTitle>
              <CardDescription>
                Learn and grow with fellow traders and investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join a vibrant community of traders sharing strategies, insights, and analyses.
                Participate in discussions and collaborative learning to improve your trading skills.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 mb-16 glass-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Security & Reliability</h2>
              <p className="text-lg mb-6">
                Your security is our top priority. Our platform implements state-of-the-art security measures
                to protect your data and investments.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>End-to-end encryption for all user data</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>99.9% uptime guarantee for trading services</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>Transparent privacy policy and data handling</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img src="/placeholder.svg" alt="Security Illustration" className="h-80 w-auto" />
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of traders who are already leveraging our AI-powered platform to make smarter investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg">Create Free Account</Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Our Team
            </Button>
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <ChatbotButton />
    </MainLayout>
  );
};

export default About;
