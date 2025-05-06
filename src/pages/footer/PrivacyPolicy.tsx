
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 mt-16">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <p>Last updated: April 5, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              StockOracle ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways including:</p>
            <ul>
              <li>Personal Data: Name, email address, phone numbers, etc.</li>
              <li>Financial Information: For payment processing and portfolio management</li>
              <li>Usage Data: How you interact with our services</li>
              <li>Cookies and Tracking Technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We may use your information to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Understand how you use our services</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you</li>
              <li>Process transactions</li>
              <li>Prevent fraudulent transactions</li>
            </ul>

            <h2>4. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
              privacy@stockoracle.com
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
