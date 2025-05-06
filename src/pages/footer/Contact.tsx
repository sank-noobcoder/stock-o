
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond shortly.",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is here to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-2">For general inquiries:</p>
              <p className="font-medium">info@stockoracle.com</p>
              <p className="text-muted-foreground mt-4 mb-2">For support:</p>
              <p className="font-medium">support@stockoracle.com</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-2">Headquarters:</p>
              <p className="font-medium">123 Finance Street</p>
              <p className="font-medium">New York, NY 10001</p>
              <p className="text-muted-foreground mt-4 mb-2">Office Hours:</p>
              <p className="font-medium">Monday - Friday: 9AM - 6PM EST</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Call Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-2">Customer Service:</p>
              <p className="font-medium">+1 (800) 123-4567</p>
              <p className="text-muted-foreground mt-4 mb-2">Technical Support:</p>
              <p className="font-medium">+1 (800) 765-4321</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please provide details about your inquiry..." className="min-h-[150px]" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Contact;
