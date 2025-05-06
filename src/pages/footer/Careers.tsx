
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Careers: React.FC = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      department: 'AI Research',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'Financial Analyst',
      department: 'Finance',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time'
    },
    {
      id: 5,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building the future of financial technology. Join us in our mission to make stock market insights and predictions accessible to everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Innovation First</h3>
                <p className="text-sm text-muted-foreground">We push boundaries and embrace new technologies to solve complex problems.</p>
              </div>
              <div>
                <h3 className="font-semibold">User-Centered</h3>
                <p className="text-sm text-muted-foreground">Every decision we make is focused on providing value to our users.</p>
              </div>
              <div>
                <h3 className="font-semibold">Data-Driven</h3>
                <p className="text-sm text-muted-foreground">We believe in making decisions based on data and evidence.</p>
              </div>
              <div>
                <h3 className="font-semibold">Inclusive Growth</h3>
                <p className="text-sm text-muted-foreground">We foster a diverse and supportive environment where everyone can thrive.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Competitive Compensation</h3>
                <p className="text-sm text-muted-foreground">Salary, equity, and bonuses that reward your contributions.</p>
              </div>
              <div>
                <h3 className="font-semibold">Flexible Work</h3>
                <p className="text-sm text-muted-foreground">Remote-first with flexible hours to support your optimal productivity.</p>
              </div>
              <div>
                <h3 className="font-semibold">Health & Wellness</h3>
                <p className="text-sm text-muted-foreground">Comprehensive benefits including health, dental, and wellness programs.</p>
              </div>
              <div>
                <h3 className="font-semibold">Learning & Development</h3>
                <p className="text-sm text-muted-foreground">Budget for courses, conferences, and resources to help you grow.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card mb-12">
          <CardHeader>
            <CardTitle>Open Positions</CardTitle>
            <CardDescription>Join our team and help shape the future of finance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {openPositions.map((position) => (
                <div key={position.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{position.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See a Fit?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals. Send us your resume and let us know how you can contribute.
          </p>
          <Button size="lg">Send Your Resume</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Careers;
