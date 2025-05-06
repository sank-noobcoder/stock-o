
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 mt-16">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <p>Last updated: April 5, 2025</p>
            
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
            
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisements delivery, including behavioral advertising</li>
            </ul>
            
            <h2>3. Types of Cookies We Use</h2>
            <ul>
              <li>Essential cookies: Necessary for the operation of our website</li>
              <li>Analytical/performance cookies: Allow us to recognize and count the number of visitors</li>
              <li>Functionality cookies: Recognize you when you return to our website</li>
              <li>Targeting cookies: Record your visit to our website, the pages you have visited and the links you have followed</li>
            </ul>
            
            <h2>4. Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CookiePolicy;
