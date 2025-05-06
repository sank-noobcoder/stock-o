
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Disclaimer: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 mt-16">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <p>Last updated: April 5, 2025</p>
            
            <h2>Investment & Trading Disclaimer</h2>
            <p>
              The information provided on StockOracle is for general informational and educational purposes only and is not a recommendation to buy or sell any security. All investments involve risk, including the potential loss of principal. Past performance does not guarantee future results.
            </p>
            
            <h2>Prediction Accuracy</h2>
            <p>
              Our AI predictions and forecasts are generated using machine learning algorithms based on historical data and other factors. These predictions are not guarantees of future performance and should not be the sole basis for any investment decision. Markets are unpredictable, and many factors beyond our analysis can affect outcomes.
            </p>
            
            <h2>No Financial Advice</h2>
            <p>
              StockOracle is not a registered investment advisor, broker-dealer, or financial planner. The content on this platform should not be considered financial advice. Always consult with a qualified financial professional before making investment decisions.
            </p>
            
            <h2>Data Accuracy</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
            </p>
            
            <h2>Third-Party Content</h2>
            <p>
              StockOracle may contain links to third-party websites or display content from third parties. We have no control over the nature, content, and availability of those sites or resources. The inclusion of any links does not necessarily imply a recommendation or endorsement.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Disclaimer;
