
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 mt-16">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <p>Last updated: April 5, 2025</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the StockOracle platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on StockOracle's website for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
            </p>
            
            <h2>3. Financial Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only. It should not be considered as financial advice. All investments involve risk, including the possible loss of principal. Past performance does not guarantee future results.
            </p>
            
            <h2>4. Limitation of Liability</h2>
            <p>
              StockOracle shall not be liable for any direct, indirect, incidental, consequential or punitive damages arising out of your access to, or use of, the website or the services provided.
            </p>
            
            <h2>5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
